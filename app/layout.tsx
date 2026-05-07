import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})


export const metadata: Metadata = {
  title: {
    template: '%s | Hearthline Realty',
    default: 'Hearthline Realty — Seattle & Eastside Real Estate',
  },
  description:
    'Find the place you\'ll love coming home to. Hearthline Realty offers local expertise, transparent pricing, and a guided experience from first showing to closing day.',
  metadataBase: new URL('https://hearthline.realty'),
  openGraph: {
    siteName: 'Hearthline Realty',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />

        {/* Dialpad chat widget — persists across all page navigations */}
        <div
          id="dx_chatbot_fab_wrapper_id"
          style={{
            backgroundColor: '#7C52FF',
            borderRadius: '50%',
            boxSizing: 'border-box',
            display: 'flex',
            height: '56px',
            overflow: 'hidden',
            padding: '12px',
            width: '56px',
            position: 'fixed',
            bottom: '16px',
            right: '16px',
            zIndex: 123,
          }}
        >
          <img
            data-dxchannelid="92941a98869849cbb93f075cb7c094e7"
            data-dxprovemail="5052583267647488@5052583267647488.dialpad.com"
            id="dx_chatbot_fab_id"
            src="https://us-central.dx.dialpad.com/kpd-static/providers/0/webchat/default/images/fab-icon.png"
            alt="Chat with us"
            style={{ clipPath: 'circle(50%)', objectFit: 'contain', height: 'auto', width: '100%' }}
          />
        </div>

        {/* window.dxe must be set before the chatbot module loads */}
        <Script id="dialpad-config" strategy="beforeInteractive">
          {`window.dxe = { "server": "https://us-central.dx.dialpad.com" };`}
        </Script>
        <Script
          src="https://us-central.dx.dialpad.com/dxclient/dist/dialpad-chatbot.es.js"
          type="module"
          strategy="afterInteractive"
        />
      </body>
    </html>
  )
}
