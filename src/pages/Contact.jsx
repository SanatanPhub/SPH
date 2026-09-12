import { useState } from 'react'
import toast from 'react-hot-toast'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    toast.success('Message sent! We will get back to you soon.')
    setForm({ name: '', email: '', phone: '', subject: '', message: '' })
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-10">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Contact Us</h1>
        <p className="text-gray-500 mt-2">We are here to assist you on your spiritual journey</p>
      </div>

      <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
        <div>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-saffron-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-xl">📧</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Email</h3>
                <p className="text-sm text-gray-600">info@sanatanpoojahub.com</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 bg-saffron-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-xl">📱</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Phone / WhatsApp</h3>
                <p className="text-sm text-gray-600">+91 70007 35410 / +91 96734 40637</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 bg-saffron-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-xl">🕐</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Working Hours</h3>
                <p className="text-sm text-gray-600">Mon - Sat: 9:00 AM - 7:00 PM</p>
                <p className="text-sm text-gray-600">Sunday: 10:00 AM - 4:00 PM</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-12 h-12 bg-saffron-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-xl">📍</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Location</h3>
                <p className="text-sm text-gray-600">India (Online Store)</p>
              </div>
            </div>
          </div>

          <div className="bg-saffron-50 rounded-xl p-6 mt-8">
            <h3 className="font-semibold text-gray-800 mb-2">Quick Consultation</h3>
            <p className="text-sm text-gray-600">
              Need immediate guidance? Book a consultation session and connect with our experts within 24 hours.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-100 p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              required
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-saffron-400 focus:border-transparent"
              placeholder="Your name"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-saffron-400 focus:border-transparent"
                placeholder="you@email.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input
                type="tel"
                value={form.phone}
                onChange={e => setForm({ ...form, phone: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-saffron-400 focus:border-transparent"
                placeholder="+91"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
            <select
              value={form.subject}
              onChange={e => setForm({ ...form, subject: e.target.value })}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-saffron-400 focus:border-transparent"
            >
              <option value="">Select a topic</option>
              <option value="products">Product Inquiry</option>
              <option value="consultation">Consultation Booking</option>
              <option value="order">Order Support</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
            <textarea
              required
              rows={4}
              value={form.message}
              onChange={e => setForm({ ...form, message: e.target.value })}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-saffron-400 focus:border-transparent resize-none"
              placeholder="How can we help you?"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-saffron-500 hover:bg-saffron-600 text-white font-semibold py-3 rounded-lg transition-colors cursor-pointer"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  )
}
