"use client";
import { useEffect, useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import axios from "axios";
import LoginHistory from '@/components/LoginHistory';
import {
  Trash2,
  ChevronRight,
  Loader2,
  Mail,
  Shield,
  User,
  LogOut,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const PermissionCard = ({ name, checked, onChange }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    className="flex items-center p-3 bg-white rounded-lg shadow-sm border border-gray-200"
  >
    <input
      type="checkbox"
      id={name}
      name={name}
      checked={checked}
      onChange={onChange}
      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
    />
    <label
      htmlFor={name}
      className="ml-3 block text-sm font-medium text-gray-700 capitalize"
    >
      {name}
    </label>
  </motion.div>
);

const MemberItem = ({ email, onDelete }) => (
  <motion.li
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="flex justify-between items-center p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg shadow-sm"
  >
    <div className="flex items-center">
      <User className="h-5 w-5 text-indigo-500 mr-2" />
      <span className="text-gray-700">{email}</span>
    </div>
    <button
      onClick={() => onDelete(email)}
      className="p-1 rounded-full hover:bg-red-100 transition-colors"
      aria-label="Delete member"
    >
      <Trash2 className="h-5 w-5 text-red-500" />
    </button>
  </motion.li>
);

export default function AdminAndMemberPage() {
  const { data: session, status } = useSession();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [memberEmail, setMemberEmail] = useState("");
  const [memberPermissions, setMemberPermissions] = useState({ event: false, collaboration: false, sponsor: false, webinars: false, past_events: false, gallery: false });
  const [members, setMembers] = useState([]);

  const requestOtp = async () => {
    setLoading(true);
    setError("");
    setSuccessMsg("");
    try {
      const result = await signIn("credentials", { email, redirect: false });
      if (result.error === "OTP_SENT") {
        setSuccessMsg("OTP sent successfully!");
      } else {
        setError(result.error || "Failed to send OTP.");
      }
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    if (!otp) {
      setError("Please enter OTP");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const result = await signIn("credentials", { email, otp, redirect: false });
      if (result.error) {
        setError(result.error);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    signOut({ callbackUrl: "/" });
  };
  
  const fetchAllMembers = async () => {
    try {
      const { data } = await axios.get("/api/admin");
      setMembers(data.members);
    } catch (err) {
      console.error("Failed to fetch members", err);
      setError("Could not load members list.");
    }
  };
  
  useEffect(() => {
    if (status === "authenticated" && session.user.isAdmin) {
      fetchAllMembers();
    }
  }, [status, session]);

  const handlePermissionChange = (e) => {
    const { name, checked } = e.target;
    setMemberPermissions((prev) => ({ ...prev, [name]: checked }));
  };

  const addMember = async () => {
    if (!memberEmail) {
      setError("Please enter member email");
      return;
    }
    setLoading(true);
    setError("");
    try {
      await axios.post("/api/admin", { email: memberEmail, permissions: memberPermissions });
      setSuccessMsg("Member added successfully");
      setMemberEmail("");
      setMemberPermissions({ event: false, collaboration: false, sponsor: false, webinars: false, past_events: false, gallery: false });
      fetchAllMembers();
    } catch {
      setError("Failed to add member");
    } finally {
      setLoading(false);
    }
  };

  const deleteMember = async (emailToDelete) => {
    if (window.confirm(`Are you sure you want to remove ${emailToDelete}?`)) {
      setLoading(true);
      try {
        await axios.delete("/api/admin", { data: { memberEmail: emailToDelete } });
        fetchAllMembers();
      } catch {
        setError("Failed to delete member");
      } finally {
        setLoading(false);
      }
    }
  };

  const renderLoginForm = () => (
    <motion.div initial="hidden" animate="visible" exit="exit" variants={fadeIn} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Mail className="h-5 w-5 text-gray-400" /></div>
          <input id="email" type="email" placeholder="Enter your email" className="pl-10 w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-indigo-500" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
      </div>
      <button onClick={requestOtp} disabled={loading || !email} className="w-full flex justify-center items-center bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 text-white py-2 px-4 rounded-lg shadow-md transition-all disabled:opacity-70">
        {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Send OTP"}
      </button>
      {successMsg && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-3 bg-green-100 text-green-700 rounded-lg text-sm">{successMsg}</motion.div>}
      <div className="pt-4 border-t border-gray-200">
        <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-1">OTP Code</label>
        <input id="otp" type="text" placeholder="Enter OTP" className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-indigo-500" value={otp} onChange={(e) => setOtp(e.target.value)} />
      </div>
      <button onClick={verifyOtp} disabled={loading || !otp} className="w-full flex justify-center items-center bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 text-white py-2 px-4 rounded-lg shadow-md transition-all disabled:opacity-70">
        {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "Verify & Login"}
      </button>
      {error && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-3 bg-red-100 text-red-700 rounded-lg text-sm">{error}</motion.div>}
    </motion.div>
  );

  const renderAdminPanel = () => (
    <motion.div initial="hidden" animate="visible" variants={fadeIn} className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-indigo-100 rounded-full"><Shield className="h-6 w-6 text-indigo-600" /></div>
          <h2 className="text-2xl font-bold text-gray-800">Admin Dashboard</h2>
        </div>
        <button onClick={handleLogout} className="flex items-center space-x-2 bg-red-100 text-red-600 px-3 py-2 rounded hover:bg-red-200 transition">
          <LogOut className="h-4 w-4" />
          <span className="text-sm font-semibold">Logout</span>
        </button>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Add New Member</h3>
        <div className="mb-4">
          <label htmlFor="memberEmail" className="block text-sm font-medium text-gray-700 mb-1">Member Email</label>
          <input id="memberEmail" type="email" placeholder="member@example.com" className="w-full border border-gray-300 rounded-lg py-2 px-3 focus:ring-2 focus:ring-indigo-500" value={memberEmail} onChange={(e) => setMemberEmail(e.target.value)} />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Permissions</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {Object.entries(memberPermissions).map(([key, value]) => (<PermissionCard key={key} name={key} checked={value} onChange={handlePermissionChange} />))}
          </div>
        </div>
        <button onClick={addMember} disabled={loading} className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 text-white py-2 px-4 rounded-lg shadow-md disabled:opacity-70">
          {loading ? <Loader2 className="h-5 w-5 animate-spin mx-auto" /> : "Add Member"}
        </button>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Members List</h3>
        {members.length === 0 ? (<div className="text-center py-8"><p className="text-gray-500">No members found</p></div>) : (<ul className="space-y-3"><AnimatePresence>{members.map((member) => (<MemberItem key={member} email={member} onDelete={deleteMember} />))}</AnimatePresence></ul>)}
      </div>
      <LoginHistory />
    </motion.div>
  );

  const renderMemberPanel = () => (
    <motion.div initial="hidden" animate="visible" variants={fadeIn} className="space-y-6">
      <div className="flex items-center justify-between px-4 md:px-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-100 rounded-full"><User className="h-6 w-6 text-blue-600" /></div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Welcome back</h2>
            <p className="text-gray-600">{session.user.email}</p>
          </div>
        </div>
        <button onClick={handleLogout} className="flex items-center space-x-2 bg-red-100 text-red-600 px-3 py-2 rounded hover:bg-red-200 transition">
          <LogOut className="h-4 w-4" /><span>Logout</span>
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {session.user.permissions?.event && <motion.a href="/add-event" className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-4 rounded-xl shadow-md flex justify-between items-center"><span>Add Event</span><ChevronRight /></motion.a>}
        {/* ... and so on for other permissions */}
      </div>
      {Object.keys(session.user.permissions || {}).length === 0 && (<div className="text-center py-8"><p className="text-gray-500">You don't have any permissions yet</p></div>)}
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto sm:max-w-lg lg:max-w-2xl">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl"><span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-500">Admin & Member Portal</span></h1>
          <p className="mt-3 text-gray-500">
            {status === "unauthenticated" ? "Sign in to access your dashboard" : status === "authenticated" && session.user.isAdmin ? "Manage members and permissions" : "Access your authorized features"}
          </p>
        </motion.div>
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8">
            {status === "loading" && (<div className="flex justify-center py-12"><Loader2 className="h-8 w-8 text-indigo-600 animate-spin" /></div>)}
            {status === "unauthenticated" && renderLoginForm()}
            {status === "authenticated" && (session.user.role === 'admin' ? renderAdminPanel() : renderMemberPanel())}
          </div>
        </div>
      </div>
    </div>
  );
}
