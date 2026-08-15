/* Reference-matched Nike Commerce: stacked retail bands, compact hero, category tiles, product grid, promos, and a direct checkout path. */
import { ArrowRight, ChevronDown, Heart, Menu, Search, ShoppingBag, Truck, RotateCcw, ShieldCheck, Headphones, X, Instagram, Facebook, Youtube } from "lucide-react";
import { useEffect, useRef, useState, type PointerEvent } from "react";

const ASSETS = {
  hero: "/manus-storage/nike-hero_7b912362.jpg",
  silver: "/manus-storage/nike-shoe-silver_11d04c29.jpg",
  volt: "/manus-storage/nike-shoe-volt_bc35daa5.jpg",
  red: "/manus-storage/nike-shoe-red_7d78c1dd.jpg",
  mark: "/manus-storage/nike-mark_9e908d43.png",
};

const categories = [
  { name: "Men", note: "Shop now", image: ASSETS.silver },
  { name: "Women", note: "Shop now", image: ASSETS.hero },
  { name: "Kids", note: "Shop now", image: ASSETS.red },
  { name: "Running", note: "Shop now", image: ASSETS.volt },
  { name: "Casual", note: "Shop now", image: ASSETS.red },
  { name: "Slides", note: "Shop now", image: ASSETS.silver },
];

const products = [
  { name: "Vomero 18", code: "Daily miles", price: "$150", color: "Cool Silver / White", image: ASSETS.silver, swatches: ["#c6c8c6", "#111214"] },
  { name: "Pegasus Premium", code: "Tempo runs", price: "$180", color: "Volt / Black", image: ASSETS.volt, swatches: ["#c8ff00", "#111214"] },
  { name: "Field General", code: "Everyday motion", price: "$110", color: "Crimson / Cream", image: ASSETS.red, swatches: ["#8c1d2b", "#e7e4dc"] },
  { name: "Air Zoom Structure", code: "Steady support", price: "$140", color: "Ink / White", image: ASSETS.hero, swatches: ["#111214", "#f3f1ec"] },
  { name: "Dunk Low", code: "Street ready", price: "$125", color: "Black / Sail", image: ASSETS.red, swatches: ["#111214", "#e7e4dc"] },
  { name: "Free Run", code: "Barefoot feeling", price: "$105", color: "Stone / Black", image: ASSETS.silver, swatches: ["#777872", "#111214"] },
];

const announcements = [
  "Free shipping on orders over $75",
  "10% off your first order, use code MOVE10",
  "Join Nike Run Club for early access",
];

const hotspots = [
  { label: "Engineered mesh", detail: "Breathable upper built for cool, flexible miles.", left: "28%", top: "35%" },
  { label: "ReactX cushioning", detail: "Responsive foam that softens landing and sharpens push-off.", left: "61%", top: "62%" },
  { label: "Rubber traction", detail: "Durable grip pattern for confident everyday movement.", left: "48%", top: "83%" },
];

const benefits = [
  { title: "Free shipping", text: "On orders over $75", icon: Truck },
  { title: "Easy returns", text: "30-day hassle-free returns", icon: RotateCcw },
  { title: "Secure payment", text: "100% secure checkout", icon: ShieldCheck },
  { title: "Customer support", text: "We’re here to help", icon: Headphones },
];

function MagneticCartButton({ onAdd }: { onAdd: () => void }) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const handleMove = (event: PointerEvent<HTMLButtonElement>) => {
    if (event.pointerType === "touch") return;
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--mag-x", `${(event.clientX - rect.left - rect.width / 2) * 0.18}px`);
    event.currentTarget.style.setProperty("--mag-y", `${(event.clientY - rect.top - rect.height / 2) * 0.22}px`);
  };
  const reset = () => {
    buttonRef.current?.style.setProperty("--mag-x", "0px");
    buttonRef.current?.style.setProperty("--mag-y", "0px");
  };
  return <button ref={buttonRef} className="magnetic-cart" onPointerMove={handleMove} onPointerLeave={reset} onClick={onAdd}>Add to bag <ShoppingBag size={13} /></button>;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [saved, setSaved] = useState<string[]>([]);
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [productFilter, setProductFilter] = useState("All");
  const [cartCount, setCartCount] = useState(0);
  const [activeColorways, setActiveColorways] = useState<Record<string, number>>({});
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  const heroRef = useRef<HTMLElement>(null);
  const productSectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let frame = 0;
    let active = false;

    const tick = () => {
      currentX += (targetX - currentX) * 0.1;
      currentY += (targetY - currentY) * 0.1;
      hero.style.setProperty("--hero-x", `${currentX.toFixed(2)}px`);
      hero.style.setProperty("--hero-y", `${currentY.toFixed(2)}px`);
      hero.style.setProperty("--hero-rotate", `${(currentY * -0.08).toFixed(2)}deg`);
      if (active || Math.abs(currentX) > 0.02 || Math.abs(currentY) > 0.02) frame = requestAnimationFrame(tick);
      else frame = 0;
    };

    const start = () => { if (!frame) frame = requestAnimationFrame(tick); };
    const onPointerMove = (event: globalThis.PointerEvent) => {
      if (event.pointerType === "touch") return;
      const rect = hero.getBoundingClientRect();
      targetX = ((event.clientX - rect.left) / rect.width - 0.5) * 24;
      targetY = ((event.clientY - rect.top) / rect.height - 0.5) * 16;
      active = true;
      start();
    };
    const onPointerLeave = () => {
      targetX = 0;
      targetY = 0;
      active = false;
      start();
    };

    hero.addEventListener("pointermove", onPointerMove, { passive: true });
    hero.addEventListener("pointerleave", onPointerLeave, { passive: true });
    return () => {
      hero.removeEventListener("pointermove", onPointerMove);
      hero.removeEventListener("pointerleave", onPointerLeave);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  useEffect(() => {
    const section = productSectionRef.current;
    if (!section || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      section?.style.setProperty("--product-focus", "1");
      return;
    }
    const updateFocus = () => {
      const rect = section.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, (window.innerHeight * 0.86 - rect.top) / (window.innerHeight * 0.72)));
      section.style.setProperty("--product-focus", progress.toFixed(3));
    };
    updateFocus();
    window.addEventListener("scroll", updateFocus, { passive: true });
    return () => window.removeEventListener("scroll", updateFocus);
  }, []);

  const toggleSaved = (name: string) => setSaved((items) => items.includes(name) ? items.filter((item) => item !== name) : [...items, name]);
  const addToCart = () => setCartCount((count) => count + 1);
  const filteredProducts = productFilter === "All" ? products : products.filter((product) => productFilter === "Running" ? /miles|tempo|support/i.test(product.code) : productFilter === "Everyday" ? /everyday|street|barefoot/i.test(product.code) : Number(product.price.replace("$", "")) <= 110);

  return (
    <main className="commerce-shell">
      <div className="announcement-bar"><div className="announcement-viewport"><div className="announcement-track">{[0, 1].map((copy) => <div className="announcement-copy" key={copy} aria-hidden={copy === 1}>{announcements.map((message, index) => <button className="announcement-message" key={`${copy}-${message}`} onClick={() => scrollTo(index === 2 ? "newsletter" : "products")} tabIndex={copy === 1 ? -1 : 0}>{message.includes("MOVE10") ? <>{message.split("MOVE10")[0]}<strong>MOVE10</strong></> : message}<i /></button>)}</div>)}</div></div></div>
      <header className="commerce-header">
        <button className="commerce-brand" onClick={() => scrollTo("top")} aria-label="Nike home"><span className="commerce-mark"><img src={ASSETS.mark} alt="" /></span><span>NIKE<small>SPORT / MOTION</small></span></button>
        <nav className="commerce-nav" aria-label="Main navigation"><button onClick={() => scrollTo("products")}>New in</button><button onClick={() => scrollTo("products")}>Men</button><button onClick={() => scrollTo("products")}>Women</button><button onClick={() => scrollTo("categories")}>Kids</button><button onClick={() => scrollTo("products")}>Brands</button><button onClick={() => scrollTo("products")}>Accessories</button><button onClick={() => scrollTo("promos")}>Sale</button></nav>
        <div className="commerce-actions"><button aria-label="Search" onClick={() => setSearchOpen((open) => !open)}><Search size={19} /></button><button aria-label="Account" onClick={() => scrollTo("newsletter")}><span className="account-glyph">○</span></button><button aria-label="Saved products" onClick={() => scrollTo("products")}><Heart size={19} /></button><button className="commerce-bag" aria-label="Shopping bag" onClick={() => scrollTo("products")}><ShoppingBag size={19} /><b>{cartCount}</b></button><button className="commerce-menu" onClick={() => setMenuOpen((open) => !open)} aria-label={menuOpen ? "Close menu" : "Open menu"}>{menuOpen ? <X size={21} /> : <Menu size={21} />}</button></div>
      </header>
      {searchOpen && <div className="search-drawer"><Search size={18} /><input autoFocus placeholder="Search shoes, running, apparel" /><button onClick={() => setSearchOpen(false)}><X size={18} /></button></div>}
      {menuOpen && <nav className="mobile-commerce-nav"><button onClick={() => scrollTo("products")}>New in <ArrowRight size={16} /></button><button onClick={() => scrollTo("products")}>Men <ArrowRight size={16} /></button><button onClick={() => scrollTo("products")}>Women <ArrowRight size={16} /></button><button onClick={() => scrollTo("categories")}>Kids <ArrowRight size={16} /></button><button onClick={() => scrollTo("promos")}>Sale <ArrowRight size={16} /></button></nav>}

      <section id="top" ref={heroRef} className="commerce-hero"><div className="commerce-hero-media"><img src={ASSETS.hero} alt="White and silver performance Nike shoe on a dark studio floor" /></div><div className="commerce-hero-overlay" /><div className="commerce-hero-content"><span className="commerce-kicker">New collection / 001</span><h1>Move different.<br /><em>Step up.</em></h1><p>Premium sneakers for every move you make. Comfortable. Style-forward. You.</p><div className="hero-actions"><button className="lime-button" onClick={() => scrollTo("products")}>Shop new in <ArrowRight size={16} /></button><button className="hero-outline" onClick={() => scrollTo("categories")}>Explore collection <ArrowRight size={16} /></button></div></div></section>

      <section className="benefit-strip">{benefits.map(({ title, text, icon: Icon }) => <div className="benefit-item" key={title}><Icon size={22} strokeWidth={1.35} /><div><strong>{title}</strong><span>{text}</span></div></div>)}</section>

      <section id="categories" className="commerce-section category-section"><div className="commerce-section-heading"><div><span className="section-label">Shop by category</span><h2>Find your lane.</h2></div><button onClick={() => scrollTo("products")}>View all <ArrowRight size={15} /></button></div><div className="category-grid">{categories.map((category) => <button className="category-tile" key={category.name} onClick={() => scrollTo("products")}><img src={category.image} alt={`${category.name} Nike footwear`} /><span className="category-shade" /><div><strong>{category.name}</strong><small>{category.note}</small></div></button>)}</div></section>

      <section id="products" ref={productSectionRef} className="commerce-section product-section"><div className="commerce-section-heading"><div><span className="section-label">Featured / 006</span><h2>Best sellers.</h2></div><div className="product-filters">{["All", "Running", "Everyday", "Sale"].map((filter) => <button key={filter} className={productFilter === filter ? "active" : ""} onClick={() => setProductFilter(filter)}>{filter}</button>)}<ChevronDown size={15} /></div></div><div className="commerce-product-grid">{filteredProducts.map((product, index) => { const colorwayIndex = activeColorways[product.name] ?? 0; const colorwayImages = [product.image, ASSETS.volt, ASSETS.red]; return <article className="commerce-product-card" key={product.name}><div className="commerce-product-image"><img className="colorway-morph" src={colorwayImages[colorwayIndex % colorwayImages.length]} alt={`${product.name}, ${product.color}`} /><button className={saved.includes(product.name) ? "product-heart saved" : "product-heart"} onClick={() => toggleSaved(product.name)} aria-label={`Save ${product.name}`}><Heart size={17} fill={saved.includes(product.name) ? "currentColor" : "none"} /></button>{index === 1 && <span className="product-tag">New</span>}</div><div className="commerce-product-meta"><div><span>{product.code}</span><h3>{product.name}</h3></div><strong>{product.price}</strong></div><p>{product.color}</p><div className="product-swatches">{product.swatches.map((swatch, swatchIndex) => <button className={`product-swatch ${colorwayIndex === swatchIndex ? "active" : ""}`} key={swatch} style={{ background: swatch }} onClick={() => setActiveColorways((current) => ({ ...current, [product.name]: swatchIndex }))} aria-label={`Show ${product.name} colorway ${swatchIndex + 1}`} />)}<MagneticCartButton onAdd={addToCart} /></div></article>; })}</div><div className="product-feature-story"><div className="product-feature-media"><img src={ASSETS.silver} alt="Silver performance shoe with material detail hotspots" />{hotspots.map((spot) => <button key={spot.label} className={`material-hotspot ${activeHotspot === spot.label ? "active" : ""}`} style={{ left: spot.left, top: spot.top }} onClick={() => setActiveHotspot(activeHotspot === spot.label ? null : spot.label)} aria-label={`Explore ${spot.label}`}><span>+</span>{activeHotspot === spot.label && <strong><b>{spot.label}</b>{spot.detail}</strong>}</button>)}</div><div className="product-feature-copy"><span className="section-label">Inside the motion / 003</span><h3>Every layer<br /><em>has a job.</em></h3><p>Tap the markers to explore the materials that keep the run light, responsive, and ready for more.</p></div></div></section>

      <section id="promos" className="commerce-section promo-grid"><article className="promo-card promo-lime"><div><span className="section-label">Limited drop</span><h3>Exclusive styles.<br />Limited quantities.</h3><button onClick={() => scrollTo("products")}>Shop now <ArrowRight size={15} /></button></div><img src={ASSETS.volt} alt="Black and volt performance shoe" /></article><article className="promo-card promo-dark"><div><span className="section-label">Join the movement</span><h3>Get rewards.<br />Early access.<br />Exclusive perks.</h3><button onClick={() => scrollTo("newsletter")}>Join now <ArrowRight size={15} /></button></div><div className="promo-box"><img src={ASSETS.mark} alt="" /><span>NIKE</span></div></article></section>

      <section id="newsletter" className="newsletter-bar"><div><span className="newsletter-icon">✉</span><div><strong>Stay in the loop</strong><span>Sign up for exclusive offers, new drops and more.</span></div></div>{subscribed ? <strong className="subscribed-state">You’re on the list.</strong> : <form onSubmit={(event) => { event.preventDefault(); if (email) setSubscribed(true); }}><input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Enter your email address" required /><button type="submit">Subscribe</button></form>}</section>

      <footer className="commerce-footer"><div className="footer-main"><div className="footer-brand-block"><div className="commerce-brand footer-brand"><span className="commerce-mark"><img src={ASSETS.mark} alt="" /></span><span>NIKE<small>SPORT / MOTION</small></span></div><p>Move in your own direction.<br />Every day, every mile.</p><div className="social-row"><button aria-label="Instagram" onClick={() => scrollTo("top")}><Instagram size={15} /></button><button aria-label="Facebook" onClick={() => scrollTo("categories")}><Facebook size={15} /></button><button aria-label="YouTube" onClick={() => scrollTo("products")}><Youtube size={15} /></button></div></div><div><strong>Shop</strong><button onClick={() => scrollTo("products")}>New in</button><button onClick={() => scrollTo("products")}>Men</button><button onClick={() => scrollTo("products")}>Women</button><button onClick={() => scrollTo("categories")}>Kids</button><button onClick={() => scrollTo("products")}>Running</button></div><div><strong>Customer care</strong><button onClick={() => scrollTo("newsletter")}>Contact us</button><button onClick={() => scrollTo("newsletter")}>Shipping & delivery</button><button onClick={() => scrollTo("newsletter")}>Returns & exchanges</button><button onClick={() => scrollTo("categories")}>Size guide</button><button onClick={() => scrollTo("newsletter")}>FAQ</button></div><div><strong>Company</strong><button onClick={() => scrollTo("top")}>About us</button><button onClick={() => scrollTo("categories")}>Our stories</button><button onClick={() => scrollTo("newsletter")}>Careers</button><button onClick={() => scrollTo("promos")}>Sustainability</button><button onClick={() => scrollTo("newsletter")}>Press</button></div><div><strong>Help</strong><button onClick={() => scrollTo("newsletter")}>Help & FAQ</button><button onClick={() => scrollTo("products")}>Track order</button><button onClick={() => scrollTo("newsletter")}>Payment options</button><button onClick={() => scrollTo("promos")}>Gift cards</button></div><img className="footer-shoe" src={ASSETS.volt} alt="Nike performance shoe" /></div><div className="footer-bottom"><span>© 2026 Nike, Inc. All rights reserved.</span><span><button onClick={() => scrollTo("newsletter")}>Privacy</button> &nbsp; <button onClick={() => scrollTo("newsletter")}>Terms</button> &nbsp; <button onClick={() => scrollTo("top")}>Accessibility</button></span></div></footer>
    </main>
  );
}
