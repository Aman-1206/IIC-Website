// components/CTAForm.jsx
'use client';
import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from './ui/button';

export default function CTAForm({ type = 'idea', initialValues = {} }) {
  const [form, setForm] = useState({
    name: initialValues.name || '',
    email: initialValues.email || '',
    message: initialValues.message || '',
  });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/forms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, ...form }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err?.error || 'Failed to submit');
      }

      setDone(true);
      toast.success('Submitted! We will reach out soon.');
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      console.error(err);
      toast.error(err.message || 'Submission failed');
    } finally {
      setLoading(false);
    }
  };

  if (done) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-sm text-center">
        <h3 className="text-lg font-semibold">Thank you!</h3>
        <p className="text-sm text-gray-600 mt-1">We received your submission and will contact you soon.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm max-w-2xl">
      <div className="grid gap-3">
        <label className="text-sm font-medium">Name</label>
        <input name="name" value={form.name} onChange={handleChange} required className="w-full border rounded px-3 py-2" />

        <label className="text-sm font-medium">Email</label>
        <input name="email" value={form.email} onChange={handleChange} required type="email" className="w-full border rounded px-3 py-2" />

        <label className="text-sm font-medium">Message</label>
        <textarea name="message" value={form.message} onChange={handleChange} required rows={5} className="w-full border rounded px-3 py-2" />

        <Button type="submit" disabled={loading} className="mt-2 bg-orange-600 hover:bg-orange-700 text-white">
          {loading ? 'Submitting...' : 'Submit'}
        </Button>
      </div>
    </form>
  );
}
