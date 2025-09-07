"use client";
import { useRouter } from "next/navigation";
import { useState,useEffect } from "react";

export default function AddSponsor() {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
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
          const hasPermission = permissions?.event;
          if (!isAdmin && !hasPermission) router.push("/");
        })
        .catch(() => {
          router.push("/");
        });
    }, [router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("/api/sponsor", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, image }),
    });
    alert("Sponsor added");
  };

  return (
    <form onSubmit={handleSubmit} className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Add Sponsor</h1>
      <input
        className="w-full p-2 border rounded mb-4"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className="w-full p-2 border rounded mb-4"
        placeholder="Image URL"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <button type="submit" className="bg-orange-500 text-white px-4 py-2 rounded">Submit</button>
    </form>
  );
}