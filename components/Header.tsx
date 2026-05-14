'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/listings', label: 'Listings' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export default function Header() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const isTransparent = pathname === '/' && !scrolled && !menuOpen

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        isTransparent
          ? 'bg-transparent'
          : 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100'
      }`}
    >
      <div className="container-wide">
        <div className="flex items-center justify-between h-16 lg:h-18">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-gold rounded-lg flex items-center justify-center flex-shrink-0">
              <svg viewBox="0 0 24 24" fill="white" className="w-4 h-4">
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
              </svg>
            </div>
            <span
              className={`font-serif text-lg font-semibold transition-colors ${
                isTransparent ? 'text-white' : 'text-navy'
              }`}
            >
              Hearthline
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  pathname === href
                    ? isTransparent
                      ? 'text-white bg-white/20'
                      : 'text-navy bg-warm-100'
                    : isTransparent
                    ? 'text-white/80 hover:text-white hover:bg-white/10'
                    : 'text-gray-600 hover:text-navy hover:bg-warm-100'
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="tel:+12065550172"
              className={`text-sm font-medium transition-colors ${
                isTransparent ? 'text-white/80 hover:text-white' : 'text-gray-600 hover:text-navy'
              }`}
            >
              (701) 639-9361
            </a>
            <Link href="/contact" className="btn-gold text-sm py-2 px-4">
              Schedule a Tour
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className={`md:hidden p-2 rounded-lg transition-colors ${
              isTransparent
                ? 'text-white hover:bg-white/10'
                : 'text-navy hover:bg-warm-100'
            }`}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white pb-4">
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className={`block px-4 py-3 text-sm font-medium transition-colors ${
                  pathname === href ? 'text-navy bg-warm-100' : 'text-gray-600 hover:text-navy hover:bg-warm-50'
                }`}
              >
                {label}
              </Link>
            ))}
            <div className="px-4 pt-3 flex flex-col gap-2">
              <a href="tel:+12065550172" className="text-sm text-gray-600 font-medium">
                (701) 639-9361
              </a>
              <Link href="/contact" onClick={() => setMenuOpen(false)} className="btn-gold text-sm py-2.5 text-center">
                Schedule a Tour
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
