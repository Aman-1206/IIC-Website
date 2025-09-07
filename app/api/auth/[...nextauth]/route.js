import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "@/lib/mongodb";
import Otp from "@/models/Otp";
import User from "@/models/User";
import LoginHistory from "@/models/LoginHistory";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const authOptions = {
  // 1. Providers: Defines how users can log in.
  providers: [
    CredentialsProvider({
      name: "Email and OTP",
      credentials: {
        email: { label: "Email", type: "email" },
        otp: { label: "OTP", type: "text" },
      },
      async authorize(credentials) {
        await dbConnect();
        const { email, otp } = credentials;

        if (!email) throw new Error("Email not provided.");

        // Phase 1: Send OTP
        if (!otp) {
          const generatedOtp = Math.floor(
            100000 + Math.random() * 900000
          ).toString();
          const tenMinutesFromNow = new Date(Date.now() + 10 * 60 * 1000);
          await Otp.findOneAndUpdate(
            { email },
            { email, otp: generatedOtp, expiresAt: tenMinutesFromNow },
            { upsert: true, new: true }
          );

          await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Your IIC Login OTP Code",
            text: `Your OTP code is: ${generatedOtp}. It will expire in 10 minutes.`,
          });

          throw new Error("OTP_SENT");
        }

        // Phase 2: Verify OTP and Authorize User
        if (otp) {
          const otpRecord = await Otp.findOne({ email });
          if (
            !otpRecord ||
            otpRecord.otp !== otp ||
            new Date() > otpRecord.expiresAt
          ) {
            throw new Error("Invalid or expired OTP");
          }
          await Otp.deleteOne({ email });

          const user = await User.findOne({ email });
          if (!user) {
            throw new Error("You are not authorized. Please contact an admin.");
          }

          if (user.email === process.env.ADMIN_EMAIL && user.role !== "admin") {
            user.role = "admin";
            await user.save();
          }

          return {
            id: user._id,
            email: user.email,
            role: user.role, // <-- Return role instead of isAdmin
            permissions: user.permissions,
          };
        }
        return null;
      },
    }),
  ],

  // 2. Session Configuration
  session: {
    strategy: "jwt",
    maxAge: 3 * 60 * 60, // Session expires in 3 hours
  },

  // 3. Callbacks: The most important part for customizing the session
  callbacks: {
    async signIn({ user }) {
      // This function for login history stays the same
      try {
        const loginRecord = new LoginHistory({ email: user.email });
        await loginRecord.save();
      } catch (error) {
        console.error("Failed to record login history:", error);
      }
      return true;
    },
    async jwt({ token, user }) {
      // This now re-fetches the role and permissions every time
      if (user) {
        // On initial sign-in
        token.role = user.role;
        token.permissions = user.permissions;
      }
      const dbUser = await User.findOne({ email: token.email });
      if (dbUser) {
        token.role = dbUser.role;
        token.permissions = dbUser.permissions;
      }
      return token;
    },
    async session({ session, token }) {
      // This now passes the role to the client-side session
      if (token) {
        session.user.role = token.role;
        session.user.permissions = token.permissions;
      }
      return session;
    },
  },

  // 4. General Settings
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/admin",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
