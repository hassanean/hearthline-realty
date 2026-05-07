'use client'

import { useSearchParams } from 'next/navigation'
import { useState, Suspense } from 'react'

function ContactContent() {
  const searchParams = useSearchParams()
  const listingId = searchParams.get('listing')
  const contactType = searchParams.get('type') ?? 'tour'

  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: listingId
      ? `I'm interested in listing ${listingId.toUpperCase()} and would like to ${contactType === 'info' ? 'request more information' : 'schedule a tour'}.`
      : '',
    preferredContact: 'email',
    preferredTime: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="pt-16 min-h-screen bg-warm-50 flex items-center justify-center px-4">
        <div className="bg-white rounded-2xl p-10 shadow-sm border border-gray-100 text-center max-w-md w-full">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-5">
            <svg viewBox="0 0 24 24" className="w-8 h-8 fill-emerald-600" aria-hidden>
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
            </svg>
          </div>
          <h2 className="text-2xl font-serif font-semibold text-navy mb-3">We&apos;ll be in touch!</h2>
          <p className="text-gray-600 mb-6 text-sm leading-relaxed">
            Thanks for reaching out, <strong>{form.name}</strong>. A Hearthline agent will contact you within one business hour.
          </p>
          <a href="/listings" className="btn-primary w-full text-center">
            Browse More Listings
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-16 min-h-screen bg-warm-50">
      <div className="bg-white border-b border-gray-100">
        <div className="container-wide py-8">
          <p className="section-label mb-2">Get in Touch</p>
          <h1 className="text-3xl font-serif font-semibold text-navy">
            {contactType === 'info' ? 'Request More Information' : 'Schedule a Tour'}
          </h1>
          {listingId && (
            <p className="text-gray-500 text-sm mt-1">
              Regarding listing <strong className="text-navy">{listingId.toUpperCase()}</strong>
            </p>
          )}
        </div>
      </div>

      <div className="container-wide py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="name">
                    Full Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    placeholder="Jane Smith"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-navy/30 bg-warm-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="email">
                    Email <span className="text-red-400">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    placeholder="jane@example.com"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-navy/30 bg-warm-50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="phone">
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                    placeholder="(206) 555-0000"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-navy/30 bg-warm-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="time">
                    Preferred Time
                  </label>
                  <select
                    id="time"
                    value={form.preferredTime}
                    onChange={(e) => setForm((f) => ({ ...f, preferredTime: e.target.value }))}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm bg-warm-50 focus:outline-none focus:ring-2 focus:ring-navy/30"
                  >
                    <option value="">Any time</option>
                    <option value="morning">Morning (9am–12pm)</option>
                    <option value="afternoon">Afternoon (12pm–5pm)</option>
                    <option value="evening">Evening (5pm–7pm)</option>
                    <option value="weekend">Weekend only</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="contact-method">
                  Preferred Contact Method
                </label>
                <div className="flex gap-4">
                  {['email', 'phone', 'text'].map((method) => (
                    <label key={method} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="preferredContact"
                        value={method}
                        checked={form.preferredContact === method}
                        onChange={(e) => setForm((f) => ({ ...f, preferredContact: e.target.value }))}
                        className="accent-navy"
                      />
                      <span className="text-sm text-gray-700 capitalize">{method}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5" htmlFor="message">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-navy/30 bg-warm-50 resize-none"
                />
              </div>

              <button type="submit" className="btn-gold w-full py-3 text-base">
                {contactType === 'info' ? 'Send Request' : 'Schedule Tour'}
              </button>

              <p className="text-xs text-gray-400 text-center">
                By submitting you agree to be contacted by a Hearthline agent. We never share your information.
              </p>
            </form>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-serif font-semibold text-navy mb-4">Contact Us Directly</h3>
              <div className="space-y-3 text-sm text-gray-700">
                <a href="tel:+12065550172" className="flex items-center gap-3 hover:text-navy transition-colors group">
                  <div className="w-8 h-8 bg-warm-100 rounded-lg flex items-center justify-center group-hover:bg-warm-200 transition-colors flex-shrink-0">
                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-navy" aria-hidden>
                      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                    </svg>
                  </div>
                  (206) 555-0172
                </a>
                <a href="mailto:hello@hearthline.realty" className="flex items-center gap-3 hover:text-navy transition-colors group">
                  <div className="w-8 h-8 bg-warm-100 rounded-lg flex items-center justify-center group-hover:bg-warm-200 transition-colors flex-shrink-0">
                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-navy" aria-hidden>
                      <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                    </svg>
                  </div>
                  hello@hearthline.realty
                </a>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-warm-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-navy" aria-hidden>
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                    </svg>
                  </div>
                  <div>
                    <p>5414 Leary Ave NW</p>
                    <p>Seattle, WA 98107</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-serif font-semibold text-navy mb-3">Office Hours</h3>
              <div className="space-y-2 text-sm text-gray-700">
                <div className="flex justify-between">
                  <span className="text-gray-500">Monday – Friday</span>
                  <span>9am – 6pm</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Saturday – Sunday</span>
                  <span>10am – 4pm</span>
                </div>
              </div>
              <p className="text-xs text-gray-400 mt-3">Same-day tours available for active listings. Call to confirm availability.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ContactPage() {
  return (
    <Suspense fallback={<div className="pt-16 min-h-screen bg-warm-50" />}>
      <ContactContent />
    </Suspense>
  )
}
