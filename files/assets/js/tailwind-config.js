tailwind.config = {
  theme: {
    extend: {
      colors: {
        charcoal:   '#1c1b17',   // header / hero base
        charcoal2:  '#27251e',   // content section
        charcoal3:  '#18170f',   // footer
        cream:      '#f4efe4',   // primary text
        muted:      '#a89f8f',   // paragraph text
        line:       '#f4efe4',   // used with /opacity for hairlines
        gold:       '#d3a54c',   // script accent
        leaf:       '#82b06c',   // "open" green
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        body:    ['"Lora"', 'serif'],
      },
      fontSize: {
        badge:  ['0.8125rem', { lineHeight: '1.1', letterSpacing: '.01em' }],
        nav:    ['1rem',      { lineHeight: '1.2' }],
        logo:   ['1.5rem',    { lineHeight: '1.15', letterSpacing: '.01em' }],
        script: ['1.4rem',    { lineHeight: '1.5' }],
        h1:     ['clamp(2.25rem, 1.1rem + 4.4vw, 3.75rem)', { lineHeight: '1.14', letterSpacing: '-.01em' }],
        h2:     ['clamp(1.5rem, 1.1rem + 1.4vw, 2.0625rem)', { lineHeight: '1.25' }],
        body:   ['1.0625rem', { lineHeight: '1.95' }],
      },
      maxWidth: {
        prose: '42rem',
      },
      keyframes: {
        revealUp: {
          '0%':   { opacity: 0, transform: 'translateY(26px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        dot: {
          '0%, 100%': { opacity: 1 },
          '50%':      { opacity: .3 },
        },
        drift: {
          '0%, 100%': { transform: 'translateY(0px) rotate(-3deg)' },
          '50%':      { transform: 'translateY(-14px) rotate(2deg)' },
        },
      },
      animation: {
        revealUp: 'revealUp .9s cubic-bezier(.16,.8,.4,1) both',
        dot: 'dot 2.2s ease-in-out infinite',
        drift: 'drift 7s ease-in-out infinite',
      },
    },
  },
};
