import React, { useState } from 'react';
import { Mail, MessageSquare, Send, CheckCircle2, Clock } from 'lucide-react';
import { AdSlot } from '../components/ads/AdSlot';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Feedback on Calculators');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email && message) {
      setSubmitted(true);
    }
  };

  return (
    <div className="space-y-12 max-w-4xl mx-auto">
      {/* Header */}
      <div className="rounded-3xl border border-stone-200/80 bg-white p-6 sm:p-12 shadow-xs space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-800">
          <Mail className="w-4 h-4" /> Direct Communication
        </div>
        <h1 className="text-3xl sm:text-5xl font-black font-editorial text-stone-900 leading-tight">
          Contact the PlantCare Lab Team
        </h1>
        <p className="text-sm sm:text-base text-stone-600 leading-relaxed max-w-2xl">
          Have a question about our botanical formulas, an inquiry regarding Google AdSense partnerships, or feedback on a calculator? Send our horticultural engineering desk a message.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Contact Form (7 cols) */}
        <div className="md:col-span-7 rounded-2xl border border-stone-200/80 bg-white p-6 sm:p-8 shadow-xs">
          {submitted ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h2 className="text-xl font-bold font-editorial text-stone-900">
                Message Received!
              </h2>
              <p className="text-xs text-stone-600 max-w-sm mx-auto leading-relaxed">
                Thank you for reaching out, {name}. A member of our horticultural research team will review your inquiry and reply to {email} within 24 to 48 hours.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setMessage('');
                }}
                className="mt-2 text-xs font-bold text-emerald-800 underline hover:text-emerald-950 cursor-pointer"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                  Your Full Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Jane Doe"
                  className="w-full rounded-xl border border-stone-300 bg-stone-50 px-3.5 py-2.5 text-sm text-stone-900 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. jane@example.com"
                  className="w-full rounded-xl border border-stone-300 bg-stone-50 px-3.5 py-2.5 text-sm text-stone-900 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                  Inquiry Topic
                </label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full rounded-xl border border-stone-300 bg-stone-50 px-3.5 py-2.5 text-sm text-stone-900 focus:border-emerald-600"
                >
                  <option value="Feedback on Calculators">Feedback on Calculators</option>
                  <option value="Horticultural Question">Botanical / Care Guide Question</option>
                  <option value="AdSense & Partnership">AdSense & Advertising Inquiry</option>
                  <option value="Technical Support">PWA / Technical Support</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700 mb-1">
                  Message Details
                </label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="How can we assist your indoor gardening journey?"
                  className="w-full rounded-xl border border-stone-300 bg-stone-50 px-3.5 py-2.5 text-sm text-stone-900 focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 bg-[#315B43] hover:bg-[#254A36] text-white text-sm font-semibold rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                Submit Message
              </button>
            </form>
          )}
        </div>

        {/* Sidebar Info (5 cols) */}
        <div className="md:col-span-5 space-y-6">
          <div className="rounded-2xl border border-stone-200/80 bg-white p-6 shadow-xs space-y-4">
            <h3 className="font-bold text-sm text-stone-900 uppercase tracking-wider">
              Communication Protocol
            </h3>
            <div className="space-y-3 text-xs text-stone-600">
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-stone-900 block">Response Time:</strong>
                  Inquiries are answered within 24 to 48 business hours.
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-stone-900 block">Editorial Desk:</strong>
                  support@plants.wdbloog.com
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <MessageSquare className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-stone-900 block">Publisher Site:</strong>
                  https://plants.wdbloog.com
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AdSlot type="responsive" />
    </div>
  );
};
