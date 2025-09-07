"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import GalleryForm from "@/components/GalleryForm";

export default function GalleryPage() {
  const router = useRouter();

  useEffect(() => {
    const cookie = document.cookie
      .split("; ")
      .find((row) => row.startsWith("auth="));

    if (!cookie) return router.push("/");

    const email = atob(cookie.split("=")[1]);

    fetch(`/api/member?email=${email}`)
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then(({ permissions }) => {
        const isAdmin = email === process.env.ADMIN_EMAIL;
        const hasPermission = permissions?.gallery;
        if (!isAdmin && !hasPermission) router.push("/");
      })
      .catch(() => {
        router.push("/");
      });
  }, [router]);

  return (
    <div className="min-h-screen py-10 bg-gray-50">
      <h1 className="text-center text-4xl font-bold text-[#003566] mb-8">Manage Gallery</h1>
      <GalleryForm />
    </div>
  );
}
