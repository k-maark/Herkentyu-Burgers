import { useState } from 'react'
import {
  ArrowUpRight,
  ChevronDown,
  Clock3,
  Flame,
  MapPin,
  Menu,
  Minus,
  Plus,
  ShoppingBag,
  Sparkles,
  Star,
  X,
} from 'lucide-react'

const navigation = [
  { id: 'home', label: 'Home' },
  { id: 'menu', label: 'The menu' },
  { id: 'order', label: 'Order ahead' },
  { id: 'journal', label: 'Journal' },
  { id: 'visit', label: 'Visit us' },
]

const menuItems = [
  { name: 'The Classic', detail: 'Dry-aged beef, smoked cheddar, house pickles', price: 14, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=85', tag: 'House icon' },
  { name: 'Green Room', detail: 'Crispy zucchini, herbs, whipped feta, lemon', price: 13, image: 'https://images.unsplash.com/photo-1520072959219-c595dc870360?auto=format&fit=crop&w=900&q=85', tag: 'Vegetarian' },
  { name: 'Hot Honey', detail: 'Buttermilk chicken, hot honey, cooling slaw', price: 15, image: 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?auto=format&fit=crop&w=900&q=85', tag: 'A little heat' },
  { name: 'Diner Fries', detail: 'Shoestring fries, burger sauce, chive salt', price: 7, image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=900&q=85', tag: 'To share' },
]

function App() {
  const [page, setPage] = useState('home')
  const [cart, setCart] = useState([])
  const [mobileOpen, setMobileOpen] = useState(false)

  const addToCart = (item) => setCart((current) => [...current, item])
  const total = cart.reduce((sum, item) => sum + item.price, 0)

  const navigate = (nextPage) => {
    setPage(nextPage)
    setMobileOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-cream text-ink">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 lg:px-10">
        <button onClick={() => navigate('home')} className="group flex items-center gap-3 text-left" aria-label="Go to Burger Lab home">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-ink text-cream transition-transform group-hover:rotate-12"><Flame size={19} fill="currentColor" /></span>
          <span className="text-lg font-bold leading-none tracking-[-0.04em]">BURGER<br />LAB<span className="text-tomato">.</span></span>
        </button>
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary navigation">
          {navigation.map((item) => <NavButton key={item.id} item={item} page={page} onClick={navigate} />)}
        </nav>
        <button onClick={() => navigate('order')} className="flex items-center gap-2 rounded-full border border-ink/15 bg-white/40 px-4 py-2 text-sm font-semibold transition hover:border-ink/40">
          <ShoppingBag size={16} /> <span>{cart.length ? `${cart.length} · $${total}` : 'Your bag'}</span>
        </button>
        <button className="ml-3 rounded-full p-2 lg:hidden" onClick={() => setMobileOpen((value) => !value)} aria-label="Toggle menu">
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </header>
      {mobileOpen && <div className="border-y border-ink/10 px-5 py-4 lg:hidden">{navigation.map((item) => <NavButton key={item.id} item={item} page={page} onClick={navigate} mobile />)}</div>}

      <main>
        {page === 'home' && <HomePage navigate={navigate} addToCart={addToCart} />}
        {page === 'menu' && <MenuPage addToCart={addToCart} />}
        {page === 'order' && <OrderPage cart={cart} total={total} addToCart={addToCart} setCart={setCart} />}
        {page === 'journal' && <JournalPage navigate={navigate} />}
        {page === 'visit' && <VisitPage />}
      </main>

      <footer className="mx-auto mt-24 flex max-w-7xl flex-col gap-8 border-t border-ink/15 px-5 py-8 text-sm lg:flex-row lg:items-center lg:justify-between lg:px-10">
        <p className="font-bold tracking-[-0.02em]">Good burgers, no small talk<span className="text-tomato">.</span></p>
        <div className="flex gap-6 text-ink/55"><span>Instagram</span><span>Newsletter</span><span>© 2024 Burger Lab</span></div>
      </footer>
    </div>
  )
}

function NavButton({ item, page, onClick, mobile = false }) {
  return <button onClick={() => onClick(item.id)} className={`${mobile ? 'block w-full border-b border-ink/10 py-3 text-left last:border-0' : ''} text-sm font-semibold transition hover:text-tomato ${page === item.id ? 'text-tomato' : 'text-ink/65'}`}>{item.label}</button>
}

function HomePage({ navigate, addToCart }) {
  return <>
    <section className="mx-auto grid max-w-7xl gap-10 px-5 pb-20 pt-10 lg:grid-cols-[1fr_0.9fr] lg:items-center lg:px-10 lg:pt-16">
      <div>
        <div className="mb-8 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.18em] text-tomato"><span className="h-px w-8 bg-tomato" /> Independent burger joint · Est. 2014</div>
        <h1 className="max-w-2xl font-display text-[clamp(4rem,9vw,8.8rem)] leading-[0.82] tracking-[-0.06em]">Make room<br /><em>for messy.</em></h1>
        <p className="mt-9 max-w-md text-lg leading-relaxed text-ink/65">Big flavour, crisp edges, and the kind of sauce you think about on the walk home. Come hungry. Leave happy.</p>
        <div className="mt-9 flex flex-wrap gap-3"><button onClick={() => navigate('menu')} className="rounded-full bg-tomato px-6 py-3 text-sm font-bold text-white transition hover:bg-ink">See the menu <ArrowUpRight className="ml-2 inline" size={16} /></button><button onClick={() => navigate('order')} className="rounded-full border border-ink/20 px-6 py-3 text-sm font-bold transition hover:border-ink">Order ahead</button></div>
        <div className="mt-14 flex items-center gap-3 text-sm text-ink/60"><div className="flex -space-x-2">{['#e5ae41', '#5d6b4b', '#e24d31'].map((color) => <span key={color} style={{ backgroundColor: color }} className="h-7 w-7 rounded-full border-2 border-cream" />)}</div><span><b className="text-ink">4.9/5</b> from 2,000+ hungry people</span></div>
      </div>
      <div className="relative min-h-[520px] overflow-hidden rounded-[2.5rem] bg-mustard p-5 lg:min-h-[650px]">
        <div className="absolute -right-10 -top-10 h-52 w-52 rounded-full border-[28px] border-cream/60" /><div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-tomato" />
        <img className="relative z-10 h-full min-h-[480px] w-full rounded-[2rem] object-cover mix-blend-multiply" src="https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1200&q=90" alt="A juicy burger with melted cheese" />
        <div className="absolute bottom-10 left-10 z-20 max-w-[220px] rounded-2xl bg-cream p-4 shadow-soft"><p className="text-xs font-bold uppercase tracking-[0.14em] text-tomato">This week's special</p><p className="mt-2 font-display text-2xl leading-none">The Hot Honey<br />Chicken</p><button onClick={() => addToCart(menuItems[2])} className="mt-3 text-xs font-bold underline underline-offset-4">Add to bag · $15</button></div>
      </div>
    </section>
    <section className="bg-ink text-cream"><div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 lg:grid-cols-3 lg:px-10"><Stat value="10" label="years making a mess" /><Stat value="16" label="ingredients, max, per burger" /><Stat value="0" label="boring menu items" /></div></section>
    <section className="mx-auto max-w-7xl px-5 py-20 lg:px-10"><div className="flex items-end justify-between gap-6"><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-tomato">No. 01 · The favourites</p><h2 className="mt-3 font-display text-5xl leading-none tracking-[-0.04em]">Start here<span className="text-tomato">.</span></h2></div><button onClick={() => navigate('menu')} className="hidden text-sm font-bold underline underline-offset-4 sm:block">View everything <ArrowUpRight className="ml-1 inline" size={15} /></button></div><div className="mt-10 grid gap-5 md:grid-cols-3">{menuItems.slice(0, 3).map((item) => <MenuCard key={item.name} item={item} addToCart={addToCart} />)}</div></section>
  </>
}

function Stat({ value, label }) { return <div><p className="font-display text-6xl text-mustard">{value}</p><p className="mt-2 max-w-[160px] text-sm text-cream/60">{label}</p></div> }

function MenuPage({ addToCart }) {
  const [filter, setFilter] = useState('All')
  const filters = ['All', 'Burgers', 'Sides']
  const filtered = filter === 'Sides' ? menuItems.slice(3) : filter === 'Burgers' ? menuItems.slice(0, 3) : menuItems
  return <section className="mx-auto max-w-7xl px-5 pb-20 pt-10 lg:px-10 lg:pt-16"><div className="max-w-2xl"><p className="text-xs font-bold uppercase tracking-[0.18em] text-tomato">No. 02 · The menu</p><h1 className="mt-4 font-display text-7xl leading-[0.83] tracking-[-0.06em]">Pick your<br /><em>poison.</em></h1><p className="mt-7 text-lg leading-relaxed text-ink/65">Everything is made to order, with ingredients we would happily put on our own table.</p></div><div className="mt-12 flex gap-2 border-b border-ink/15 pb-4">{filters.map((item) => <button key={item} onClick={() => setFilter(item)} className={`rounded-full px-4 py-2 text-sm font-semibold ${filter === item ? 'bg-ink text-cream' : 'text-ink/55 hover:text-ink'}`}>{item}</button>)}</div><div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{filtered.map((item) => <MenuCard key={item.name} item={item} addToCart={addToCart} large />)}</div></section>
}

function MenuCard({ item, addToCart, large = false }) { return <article className="group overflow-hidden rounded-3xl bg-white/55 p-3 transition hover:-translate-y-1 hover:shadow-soft"><div className={`${large ? 'aspect-[1.2]' : 'aspect-[1.15]'} overflow-hidden rounded-2xl bg-mustard`}><img src={item.image} alt={item.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" /></div><div className="px-2 pb-2 pt-4"><div className="flex items-start justify-between gap-4"><div><p className="text-lg font-bold tracking-[-0.03em]">{item.name}</p><p className="mt-1 text-sm leading-snug text-ink/55">{item.detail}</p></div><span className="font-bold">${item.price}</span></div><div className="mt-5 flex items-center justify-between"><span className="text-[11px] font-bold uppercase tracking-[0.12em] text-tomato">{item.tag}</span><button onClick={() => addToCart(item)} className="grid h-9 w-9 place-items-center rounded-full bg-ink text-cream transition hover:bg-tomato" aria-label={`Add ${item.name} to bag`}><Plus size={17} /></button></div></div></article> }

function OrderPage({ cart, total, addToCart, setCart }) { return <section className="mx-auto max-w-7xl px-5 pb-20 pt-10 lg:px-10 lg:pt-16"><p className="text-xs font-bold uppercase tracking-[0.18em] text-tomato">No. 03 · Order ahead</p><div className="mt-4 grid gap-12 lg:grid-cols-[1fr_0.8fr]"><div><h1 className="font-display text-7xl leading-[0.83] tracking-[-0.06em]">Skip the<br /><em>queue.</em></h1><p className="mt-7 max-w-md text-lg text-ink/65">Choose your pickup time, then walk straight to the good stuff.</p><div className="mt-10 grid max-w-lg gap-3 sm:grid-cols-2"><label className="rounded-2xl border border-ink/15 bg-white/45 p-4"><span className="text-xs font-bold uppercase tracking-[0.12em] text-ink/45">Pick-up spot</span><span className="mt-2 flex items-center justify-between font-bold">Soho <ChevronDown size={16} /></span></label><label className="rounded-2xl border border-ink/15 bg-white/45 p-4"><span className="text-xs font-bold uppercase tracking-[0.12em] text-ink/45">Ready by</span><span className="mt-2 flex items-center justify-between font-bold">12:45 PM <ChevronDown size={16} /></span></label></div><div className="mt-12"><p className="text-sm font-bold">Popular right now</p><div className="mt-4 flex gap-3 overflow-x-auto pb-3">{menuItems.slice(0, 3).map((item) => <button key={item.name} onClick={() => addToCart(item)} className="min-w-[180px] rounded-2xl border border-ink/10 bg-white/45 p-3 text-left transition hover:border-tomato"><img src={item.image} alt="" className="h-24 w-full rounded-xl object-cover" /><p className="mt-3 text-sm font-bold">{item.name}</p><p className="mt-1 text-xs text-ink/55">${item.price} · Add +</p></button>)}</div></div></div><aside className="h-fit rounded-3xl bg-ink p-6 text-cream lg:p-8"><div className="flex items-center justify-between"><h2 className="font-display text-3xl">Your order</h2><ShoppingBag className="text-mustard" /></div>{cart.length === 0 ? <div className="border-b border-cream/15 py-14 text-center text-sm text-cream/55"><p>Your bag is feeling light.</p><p className="mt-2">Add something delicious to begin.</p></div> : <div className="my-7 space-y-4 border-b border-cream/15 pb-6">{cart.map((item, index) => <div key={`${item.name}-${index}`} className="flex items-center justify-between text-sm"><span>{item.name}</span><span>${item.price}</span></div>)}</div>}<div className="flex justify-between text-sm text-cream/55"><span>Subtotal</span><span>${total}</span></div><div className="mt-3 flex justify-between text-lg font-bold"><span>Total</span><span>${total}</span></div><button disabled={!cart.length} className="mt-7 w-full rounded-full bg-mustard py-3 text-sm font-bold text-ink transition hover:bg-cream disabled:cursor-not-allowed disabled:opacity-40">Continue to checkout <ArrowUpRight className="ml-2 inline" size={16} /></button>{cart.length > 0 && <button onClick={() => setCart([])} className="mt-3 w-full text-xs text-cream/45 underline">Clear bag</button>}</aside></div></section> }

function JournalPage({ navigate }) { return <section className="mx-auto max-w-7xl px-5 pb-20 pt-10 lg:px-10 lg:pt-16"><div className="flex flex-col justify-between gap-8 border-b border-ink/15 pb-10 md:flex-row md:items-end"><div><p className="text-xs font-bold uppercase tracking-[0.18em] text-tomato">No. 04 · Journal</p><h1 className="mt-4 font-display text-7xl leading-[0.83] tracking-[-0.06em]">From the<br /><em>lab.</em></h1></div><p className="max-w-xs text-sm leading-relaxed text-ink/55">Behind the grill, between the buns, and everywhere we find a good story.</p></div><div className="mt-10 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]"><article className="group"><div className="aspect-[1.6] overflow-hidden rounded-3xl"><img src="https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1200&q=85" alt="The Burger Lab kitchen counter" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" /></div><p className="mt-5 text-xs font-bold uppercase tracking-[0.14em] text-tomato">Culture · 6 min read</p><h2 className="mt-2 max-w-xl font-display text-4xl leading-tight">Why the best burger is always the one you did not plan to eat</h2></article><div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">{['The perfect crunch, explained', 'A field guide to hot sauce', 'Meet our local growers'].map((title, index) => <article key={title} className="flex gap-4 border-b border-ink/15 pb-6"><div className={`h-24 w-24 shrink-0 rounded-2xl ${['bg-mustard', 'bg-moss', 'bg-tomato'][index]}`} /><div><p className="text-xs font-bold uppercase tracking-[0.12em] text-ink/45">Notes · 4 min read</p><h3 className="mt-2 font-bold leading-tight">{title}</h3><button onClick={() => navigate('journal')} className="mt-3 text-xs font-bold underline">Read story</button></div></article>)}</div></div></section> }

function VisitPage() { return <section className="mx-auto max-w-7xl px-5 pb-20 pt-10 lg:px-10 lg:pt-16"><p className="text-xs font-bold uppercase tracking-[0.18em] text-tomato">No. 05 · Visit us</p><div className="mt-4 grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-end"><div><h1 className="font-display text-7xl leading-[0.83] tracking-[-0.06em]">Pull up<br /><em>a chair.</em></h1><p className="mt-7 max-w-md text-lg leading-relaxed text-ink/65">Find us in the neighbourhoods that keep the city moving. Walk-ins welcome, good moods encouraged.</p><div className="mt-10 divide-y divide-ink/15 border-y border-ink/15">{[['Soho', '17 Berwick Street', 'Mon–Sun · 11:30–23:00'], ['Hackney', '42 Mare Street', 'Tue–Sun · 12:00–22:30']].map(([name, address, hours]) => <div key={name} className="py-5"><div className="flex items-center justify-between"><h2 className="font-display text-3xl">{name}</h2><ArrowUpRight size={18} /></div><p className="mt-2 flex items-center gap-2 text-sm text-ink/55"><MapPin size={14} /> {address}</p><p className="mt-1 flex items-center gap-2 text-sm text-ink/55"><Clock3 size={14} /> {hours}</p></div>)}</div></div><div className="relative min-h-[490px] overflow-hidden rounded-[2rem] bg-moss p-6"><div className="absolute inset-6 rounded-[1.5rem] border border-cream/25" /><div className="relative flex h-full min-h-[440px] flex-col justify-between rounded-[1.5rem] bg-[#a5ad83] p-7 text-ink"><div className="flex items-start justify-between"><span className="text-xs font-bold uppercase tracking-[0.15em]">Burger Lab<br />neighbourhood guide</span><MapPin size={26} /></div><div><p className="font-display text-6xl leading-[0.85]">Meet us<br /><em>outside.</em></p><p className="mt-5 max-w-[260px] text-sm leading-relaxed text-ink/65">A table in the sun, a cold drink, and a burger that needs two hands.</p><button className="mt-7 rounded-full bg-ink px-5 py-3 text-sm font-bold text-cream">Get directions <ArrowUpRight className="ml-2 inline" size={15} /></button></div></div></div></div></section> }

export default App
