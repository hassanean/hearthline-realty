'use client'

interface Props {
  variant?: 'outline' | 'primary' | 'ghost-white'
  className?: string
}

export default function ChatButton({ variant = 'outline', className = '' }: Props) {
  function openChat() {
    // Trigger the Dialpad FAB — the widget listens for a click on this element
    const fab = document.getElementById('dx_chatbot_fab_id') as HTMLElement | null
    fab?.click()
  }

  const baseClass =
    variant === 'primary'
      ? 'btn-primary'
      : variant === 'ghost-white'
      ? 'inline-flex items-center justify-center gap-2 px-6 py-3 border border-white/40 text-white font-medium rounded-lg hover:bg-white/10 transition-colors duration-200'
      : 'btn-outline'

  return (
    <button onClick={openChat} className={`${baseClass} ${className}`}>
      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current flex-shrink-0" aria-hidden>
        <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" />
      </svg>
      Chat with a Virtual Agent
    </button>
  )
}
