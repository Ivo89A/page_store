/* ── KINGS PC — Main App ── */

const STORAGE_KEYS = {
  products: 'kingspc_products',
  systems:  'kingspc_systems',
  content:  'kingspc_content'
};

/* ── DEFAULT DATA ── */
const DEFAULT_PRODUCTS = [
  {
    id:1, brand:'NVIDIA', type:'GPU', name:'RTX 4090 SUPRIM LIQUID X',
    desc:'Elite-tier performance featuring closed-loop liquid cooling and a full custom PCB with unlocked power limits.',
    price:1999.00, statLabel:'CUDA Cores', statVal:'16384',
    cat:'gpu', brandKey:'nvidia',
    specs:{VRAM:'24GB GDDR6X', Boost:'2.61 GHz', TDP:'450W', Interface:'PCIe 4.0 x16'}
  },
  {
    id:2, brand:'INTEL', type:'CPU', name:'Core i9-14900KS',
    desc:'Special Edition unlocked desktop processor. Pushing the absolute boundaries of frequency and multi-thread performance.',
    price:689.00, statLabel:'Boost Clock', statVal:'6.2 GHz',
    cat:'cpu', brandKey:'intel',
    specs:{Cores:'24 (8P+16E)', Socket:'LGA1700', TDP:'253W', Cache:'36MB L3'}
  },
  {
    id:3, brand:'CORSAIR', type:'RAM', name:'Dominator Titanium 64GB DDR5',
    desc:'Precision-forged aluminum cooling meets unprecedented DDR5 speeds for extreme overclocking headroom.',
    price:349.99, statLabel:'Transfer Rate', statVal:'8000 MT/s',
    cat:'ram', brandKey:'corsair',
    specs:{Capacity:'64GB (2x32)', Speed:'DDR5-8000', Latency:'CL38', Voltage:'1.45V'}
  },
  {
    id:4, brand:'NOCTUA', type:'Cooling', name:'NH-D15 chromax.black',
    desc:'The legendary flagship air cooler, now in stealth black. Near-silent operation for demanding workloads.',
    price:119.95, statLabel:'TDP Rating', statVal:'300W+',
    cat:'cooling', brandKey:'noctua',
    specs:{Height:'165mm', Fans:'2x NF-A15', Noise:'19.2 dB(A)', Socket:'LGA1700/AM5'}
  },
  {
    id:5, brand:'AMD', type:'GPU', name:'RX 7900 XTX Nitro+',
    desc:'Sapphire-engineered flagship RDNA3 powerhouse with triple-fan Tri-X cooling for sustained peak performance.',
    price:879.00, statLabel:'Stream Proc.', statVal:'6144',
    cat:'gpu', brandKey:'amd',
    specs:{VRAM:'24GB GDDR6', Boost:'2.5 GHz', TDP:'355W', Interface:'PCIe 4.0 x16'}
  },
  {
    id:6, brand:'CORSAIR', type:'RAM', name:'Vengeance 32GB DDR5',
    desc:'Optimized for Intel and AMD platforms. Aggressive overclocking profiles with XMP 3.0 support built-in.',
    price:129.99, statLabel:'Transfer Rate', statVal:'6400 MT/s',
    cat:'ram', brandKey:'corsair',
    specs:{Capacity:'32GB (2x16)', Speed:'DDR5-6400', Latency:'CL36', Voltage:'1.35V'}
  }
];

const DEFAULT_SYSTEMS = [
  {
    id:10, tier:'Flagship System', name:'SOVEREIGN MK.IV',
    price:4899.00,
    cpu:'Intel Core i9-14900K', gpu:'NVIDIA RTX 4090 24GB', ram:'64GB DDR5-6400', storage:'4TB NVMe Gen4',
    desc:'The apex of custom-loop liquid cooled tower builds. Reserved for those who accept nothing but absolute dominance.',
    specs:{Processor:'Intel Core i9-14900K', Graphics:'NVIDIA RTX 4090', Memory:'64GB DDR5-6400', Storage:'4TB NVMe Gen4'}
  },
  {
    id:11, tier:'Performance System', name:"KING'S CORE i9 EDITION",
    price:4299.00,
    cpu:'Intel Core i9-14900K', gpu:'NVIDIA RTX 4090', ram:'64GB DDR5-6000', storage:'4TB NVMe Gen4',
    desc:"Engineered for absolute dominance. Delivers unparalleled processing power and thermal efficiency for elite creators and professional gamers.",
    specs:{Processor:'Intel Core i9-14900K', Graphics:'NVIDIA RTX 4090', Memory:'64GB DDR5-6000', Storage:'4TB NVMe Gen4'}
  },
  {
    id:12, tier:'Mid-Range Titan', name:'AEGIS RTX 4080 SUPER',
    price:3199.00,
    cpu:'Intel Core i7-14700K', gpu:'NVIDIA RTX 4080 Super 16GB', ram:'32GB DDR5-5600', storage:'2TB NVMe Gen4',
    desc:'Precision-built for competitive gaming and content creation. Maximum frame rates without compromise.',
    specs:{Processor:'Intel Core i7-14700K', Graphics:'NVIDIA RTX 4080 Super', Memory:'32GB DDR5-5600', Storage:'2TB NVMe Gen4'}
  }
];

const DEFAULT_CONTENT = {
  hero: {
    tag: 'Technological Sovereignty Secured',
    titleLine1: 'Build Your',
    titleAccent: 'Throne',
    desc: 'Elite performance systems engineered for uncompromising power. Ascend to the highest tier of computing with meticulously crafted, custom-loop cooled behemoths.',
    btn1: 'Configure Now',
    btn2: 'View Pre-Builts'
  },
  navLinks: [
    { label: 'Systems', view: 'home' },
    { label: 'Components', view: 'components' },
    { label: 'Peripherals', view: 'home' },
    { label: 'Contacto', view: 'contact' }
  ],
  sectors: {
    custom: { name: 'Custom Systems', desc: 'Full-tower mastery. Liquid dominance.' },
    gpu:    { name: 'Graphics Processing' },
    cpu:    { name: 'Compute Units' },
    periph: { name: 'Tactical Peripherals', cta: 'Explore Gear →' }
  },
  footer: {
    links: ['Tech Support', 'RMA Portal', 'Overclocking Guide', 'Privacy', 'Terms'],
    copyright: '© 2024 KINGS PC. TECHNOLOGICAL SOVEREIGNTY SECURED.'
  }
};

/* ── LOAD FROM STORAGE ── */
function loadFromStorage() {
  try {
    const p = localStorage.getItem(STORAGE_KEYS.products);
    const s = localStorage.getItem(STORAGE_KEYS.systems);
    const c = localStorage.getItem(STORAGE_KEYS.content);
    return {
      products: p ? JSON.parse(p) : DEFAULT_PRODUCTS,
      systems:  s ? JSON.parse(s) : DEFAULT_SYSTEMS,
      content:  c ? JSON.parse(c) : DEFAULT_CONTENT
    };
  } catch {
    return { products: DEFAULT_PRODUCTS, systems: DEFAULT_SYSTEMS, content: DEFAULT_CONTENT };
  }
}

const { products: PRODUCTS, systems: SYSTEMS, content: CONTENT } = loadFromStorage();

/* ── CART STATE ── */
let cart = [];
let currentView = 'home';
let EXCHANGE_RATE = 1; // Fallback value
let currentUser = null;

/* ── RENDER HERO ── */
function renderHero() {
  const h = CONTENT.hero || DEFAULT_CONTENT.hero;
  const tag = document.getElementById('hero-tag');
  const title = document.getElementById('hero-title');
  const desc = document.getElementById('hero-desc');
  const btn1 = document.getElementById('hero-btn1');
  const btn2 = document.getElementById('hero-btn2');
  if (tag) tag.textContent = h.tag;
  if (title) title.innerHTML = `${h.titleLine1}<br><span class="acc">${h.titleAccent}</span>`;
  if (desc) desc.textContent = h.desc;
  if (btn1) btn1.textContent = h.btn1;
  if (btn2) btn2.textContent = h.btn2;
}

/* ── RENDER PROMO ── */
function renderPromo() {
  const p = CONTENT.promo || { enabled: false };
  const el = document.getElementById('promo-banner');
  if (!el) return;
  
  if (!p.enabled) {
    el.style.display = 'none';
    document.body.classList.remove('has-promo');
    return;
  }
  
  el.style.display = 'block';
  document.body.classList.add('has-promo');
  document.getElementById('promo-text').textContent = p.text;
  
  updateCountdown();
  if (window._promoInterval) clearInterval(window._promoInterval);
  window._promoInterval = setInterval(updateCountdown, 1000);
}

function updateCountdown() {
  const p = CONTENT.promo;
  if (!p || !p.deadline) return;
  
  const end = new Date(p.deadline).getTime();
  const now = new Date().getTime();
  const diff = end - now;
  
  if (diff <= 0) {
    document.getElementById('promo-timer').innerHTML = "<span class='expired'>OFERTA FINALIZADA</span>";
    return;
  }
  
  const d = Math.floor(diff / (1000 * 60 * 60 * 24));
  const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const s = Math.floor((diff % (1000 * 60)) / 1000);
  
  const pad = (n) => String(n).padStart(2, '0');
  document.getElementById('t-days').textContent  = pad(d);
  document.getElementById('t-hours').textContent = pad(h);
  document.getElementById('t-mins').textContent  = pad(m);
  document.getElementById('t-secs').textContent  = pad(s);
}

/* ── RENDER NAV ── */
function renderNav() {
  const links = CONTENT.navLinks || DEFAULT_CONTENT.navLinks;
  const el = document.getElementById('nav-links');
  const mob = document.getElementById('mob-nav-links');
  if (el) {
    el.innerHTML = links.map((l, i) => `
      <li><a onclick="goView('${l.view}')" id="nl-${i}">${l.label}</a></li>
    `).join('');
  }
  if (mob) {
    mob.innerHTML = links.map(l => `
      <a onclick="goView('${l.view}');toggleMobNav()">${l.label}</a>
    `).join('');
  }
}

/* ── RENDER SECTORS ── */
function renderSectors() {
  const s = CONTENT.sectors || DEFAULT_CONTENT.sectors;
  const set = (id, val) => { const el = document.getElementById(id); if (el && val) el.textContent = val; };
  set('sector-custom-name', s.custom?.name);
  set('sector-custom-desc', s.custom?.desc);
  set('sector-gpu-name',    s.gpu?.name);
  set('sector-cpu-name',    s.cpu?.name);
  set('sector-periph-name', s.periph?.name);
  set('sector-periph-cta',  s.periph?.cta);
}

/* ── RENDER FOOTER ── */
function renderFooter() {
  const f = CONTENT.footer || DEFAULT_CONTENT.footer;
  const linksEl = document.getElementById('f-links');
  const copyEl  = document.getElementById('f-copy');
  if (linksEl) {
    linksEl.innerHTML = (f.links || []).map(l => `<li><a>${l}</a></li>`).join('');
  }
  if (copyEl) copyEl.textContent = f.copyright;
}

/* ── VIEW ROUTING ── */
function goView(name) {
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  const el = document.getElementById('v-' + name);
  if (el) el.classList.add('active');
  currentView = name;

  document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
  const navLinks = document.querySelectorAll('.nav-links a');
  if (name === 'home' && navLinks[0]) navLinks[0].classList.add('active');
  if (name === 'components' && navLinks[1]) navLinks[1].classList.add('active');

  if (name === 'components') renderProducts();
  if (name === 'cart') renderCart();

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function scrollToSystems() {
  const el = document.getElementById('featured-systems');
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/* ── SVG IMAGES ── */
function gpuSVG(color = '#8b5cf6') {
  return `<svg width="120" height="120" viewBox="0 0 160 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="5" y="22" width="150" height="55" rx="5" fill="${color}" fill-opacity=".1" stroke="${color}" stroke-width="1.5"/>
    <circle cx="55" cy="49" r="17" fill="none" stroke="${color}" stroke-width="1.4" stroke-opacity=".7"/>
    <circle cx="55" cy="49" r="10" fill="none" stroke="${color}" stroke-width="1" stroke-opacity=".5"/>
    <circle cx="55" cy="49" r="4" fill="${color}" fill-opacity=".4"/>
    <circle cx="105" cy="49" r="17" fill="none" stroke="${color}" stroke-width="1.4" stroke-opacity=".7"/>
    <circle cx="105" cy="49" r="10" fill="none" stroke="${color}" stroke-width="1" stroke-opacity=".5"/>
    <circle cx="105" cy="49" r="4" fill="${color}" fill-opacity=".4"/>
    <rect x="5" y="23" width="150" height="3" rx="1" fill="${color}" fill-opacity=".8"/>
    <rect x="5" y="72" width="14" height="9" rx="1" fill="${color}" fill-opacity=".3"/>
  </svg>`;
}
function cpuSVG(color = '#7c3aed') {
  const pins = [28,40,52,64].map(y =>
    `<line x1="22" y1="${y}" x2="12" y2="${y}" stroke="${color}" stroke-width="1.5" stroke-opacity=".7"/>
     <line x1="78" y1="${y}" x2="88" y2="${y}" stroke="${color}" stroke-width="1.5" stroke-opacity=".7"/>
     <line x1="${y-4}" y1="22" x2="${y-4}" y2="12" stroke="${color}" stroke-width="1.5" stroke-opacity=".7"/>
     <line x1="${y-4}" y1="78" x2="${y-4}" y2="88" stroke="${color}" stroke-width="1.5" stroke-opacity=".7"/>`
  ).join('');
  return `<svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="22" y="22" width="56" height="56" rx="4" fill="${color}" fill-opacity=".12" stroke="${color}" stroke-width="1.5"/>
    <rect x="32" y="32" width="36" height="36" rx="2" fill="${color}" fill-opacity=".25"/>
    ${pins}
  </svg>`;
}
function ramSVG(color = '#a78bfa') {
  const sticks = [18,42,66,90].map(x => `
    <rect x="${x}" y="10" width="16" height="60" rx="2" fill="${color}" fill-opacity=".12" stroke="${color}" stroke-width="1.2"/>
    <rect x="${x+2}" y="10" width="12" height="4" rx="1" fill="${color}" fill-opacity=".6"/>
    ${[20,28,36,44,52].map(y=>`<rect x="${x+3}" y="${y}" width="10" height="2" rx="1" fill="${color}" fill-opacity=".25"/>`).join('')}
  `).join('');
  return `<svg width="110" height="80" viewBox="0 0 130 80" fill="none" xmlns="http://www.w3.org/2000/svg">${sticks}</svg>`;
}
function fanSVG(color = '#8b5cf6') {
  const blades = [0,60,120,180,240,300].map(a => {
    const r = a * Math.PI / 180;
    const x1 = 50 + 12 * Math.cos(r), y1 = 50 + 12 * Math.sin(r);
    const x2 = 50 + 36 * Math.cos(r + 0.6), y2 = 50 + 36 * Math.sin(r + 0.6);
    return `<path d="M50 50 Q${x1} ${y1} ${x2} ${y2}" stroke="${color}" stroke-width="8" stroke-opacity=".18" fill="none" stroke-linecap="round"/>`;
  }).join('');
  return `<svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="50" cy="50" r="44" fill="${color}" fill-opacity=".06" stroke="${color}" stroke-width="1.5"/>
    <circle cx="50" cy="50" r="32" fill="none" stroke="${color}" stroke-width="1" stroke-opacity=".5"/>
    <circle cx="50" cy="50" r="6" fill="${color}" fill-opacity=".6"/>
    ${blades}
  </svg>`;
}
function sysSVG(color = '#8b5cf6') {
  return `<svg width="130" height="160" viewBox="0 0 120 180" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="20" y="8" width="80" height="164" rx="6" fill="${color}" fill-opacity=".08" stroke="${color}" stroke-width="1.4"/>
    <rect x="30" y="20" width="60" height="38" rx="3" fill="${color}" fill-opacity=".18"/>
    <circle cx="60" cy="100" r="26" fill="none" stroke="${color}" stroke-width="1.4" stroke-opacity=".7"/>
    <circle cx="60" cy="100" r="16" fill="none" stroke="${color}" stroke-width="1" stroke-opacity=".5"/>
    <circle cx="60" cy="100" r="5" fill="${color}" fill-opacity=".6"/>
    <rect x="30" y="148" width="60" height="8" rx="2" fill="${color}" fill-opacity=".3"/>
    <rect x="30" y="162" width="28" height="6" rx="1" fill="${color}" fill-opacity=".5"/>
    <rect x="20" y="8" width="80" height="3" rx="1" fill="${color}" fill-opacity=".6"/>
  </svg>`;
}

function getProductSVG(p) {
  if (p.cat === 'gpu')     return gpuSVG(p.brandKey === 'amd' ? '#ef4444' : '#8b5cf6');
  if (p.cat === 'cpu')     return cpuSVG('#7c3aed');
  if (p.cat === 'ram')     return ramSVG('#a78bfa');
  if (p.cat === 'cooling') return fanSVG('#8b5cf6');
  return gpuSVG();
}

/* ── RENDER SYSTEMS GRID ── */
function renderSystems() {
  const grid = document.getElementById('sys-grid');
  if (!grid) return;
  grid.innerHTML = SYSTEMS.map(s => `
    <div class="sys-card" onclick="showSystem(${s.id})">
      <div class="sys-img" style="background:var(--card2)">
        ${s.image ? `<img src="${s.image}" style="width:100%;height:100%;object-fit:cover;border-radius:4px">` : sysSVG()}
        <div style="position:absolute;inset:0;background:radial-gradient(circle at 50% 50%,rgba(124,58,237,.1),transparent 70%)"></div>
      </div>
      <div class="sys-info">
        <div class="sys-tier">${s.tier}</div>
        <div class="sys-name">${s.name}</div>
        <div class="sys-specs">
          <div class="sys-spec-row"><strong>CPU:</strong>${s.cpu}</div>
          <div class="sys-spec-row"><strong>GPU:</strong>${s.gpu}</div>
          <div class="sys-spec-row"><strong>RAM:</strong>${s.ram}</div>
        </div>
        <div class="sys-foot">
          <div class="sys-price-container">
            <div class="sys-price-usd">$${s.price.toLocaleString('en-US', {minimumFractionDigits:2})}</div>
            <div class="sys-price-ars">${formatARS(s.price)}</div>
          </div>
          <button class="btn-add" onclick="event.stopPropagation();addToCart(${s.id},'system')">
            ADD
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

/* ── RENDER PRODUCTS GRID ── */
function renderProducts() {
  const grid = document.getElementById('prod-grid');
  if (!grid) return;
  grid.innerHTML = PRODUCTS.map(p => `
    <div class="prod-card" onclick="showProduct(${p.id})">
      <div class="prod-img" style="background:var(--card2);padding:${p.image?'0':'1.5rem'}">
        ${p.image ? `<img src="${p.image}" style="width:100%;height:100%;object-fit:cover;border-radius:4px">` : getProductSVG(p)}
        <div style="position:absolute;inset:0;background:radial-gradient(circle at 50% 50%,rgba(124,58,237,.08),transparent 70%)"></div>
      </div>
      <div class="prod-stat">
        <span class="stat-lbl">${p.statLabel}</span>
        <span class="stat-val">${p.statVal}</span>
      </div>
      <div class="prod-info">
        <div class="prod-brand">${p.brand} / ${p.type}</div>
        <div class="prod-name">${p.name}</div>
        <div class="prod-desc">${p.desc}</div>
        <div class="prod-foot">
          <div class="prod-price-container">
            <div class="prod-price-usd">$${p.price.toLocaleString('en-US', {minimumFractionDigits:2})}</div>
            <div class="prod-price-ars">${formatARS(p.price)}</div>
          </div>
          <button class="btn-add" onclick="event.stopPropagation();addToCart(${p.id},'product')">
            ADD
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

/* ── RENDER WEEKLY OFFERS ── */
function renderWeeklyOffers() {
  const grid = document.getElementById('offers-grid');
  if (!grid) return;
  // Use a subset of products as "offers"
  const offers = PRODUCTS.slice(0, 4);
  grid.innerHTML = offers.map(p => `
    <div class="offer-card" onclick="showProduct(${p.id})">
      <div class="offer-badge">OFERTA</div>
      <div class="offer-img">
        ${p.image ? `<img src="${p.image}">` : getProductSVG(p)}
      </div>
      <div class="offer-info">
        <div class="offer-name">${p.name}</div>
        <div class="offer-price">
          <div class="op-usd">$${p.price.toLocaleString('en-US', {minimumFractionDigits:2})}</div>
          <div class="op-ars">${formatARS(p.price)}</div>
        </div>
        <button class="btn-add-offer" onclick="event.stopPropagation();addToCart(${p.id},'product')">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 5v14M5 12h14"/></svg>
        </button>
      </div>
    </div>
  `).join('');
}

/* ── PRODUCT DETAIL ── */
function showProduct(id) {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return;
  const el = document.getElementById('detail-inner');
  el.innerHTML = `
    <button class="back-btn" onclick="goView('components')">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
      Back to Components
    </button>
    <div class="detail-grid">
      <div class="detail-img" style="background:var(--card2);padding:${p.image?'0':'3rem'}">
        ${p.image ? `<img src="${p.image}" style="width:100%;height:100%;object-fit:contain;border-radius:6px">` : getProductSVG(p)}
      </div>
      <div>
        <div class="detail-brand">${p.brand} / ${p.type}</div>
        <h1 class="detail-name">${p.name}</h1>
        <p class="detail-desc">${p.desc}</p>
        <div class="detail-price-container">
          <div class="detail-price-usd">$${p.price.toLocaleString('en-US', {minimumFractionDigits:2})}</div>
          <div class="detail-price-ars">${formatARS(p.price)}</div>
        </div>
        <div class="detail-actions">
          <button class="btn-add-lg" onclick="addToCart(${p.id},'product');goView('cart')">Add to Cart</button>
          <button class="btn-wish" title="Wishlist">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          </button>
        </div>
        <div class="specs-grid">
          ${Object.entries(p.specs).map(([k,v]) => `
            <div class="spec-item"><div class="spec-lbl">${k}</div><div class="spec-val">${v}</div></div>
          `).join('')}
        </div>
      </div>
    </div>`;
  goView('detail');
}

/* ── SYSTEM DETAIL ── */
function showSystem(id) {
  const s = SYSTEMS.find(x => x.id === id);
  if (!s) return;
  const el = document.getElementById('detail-inner');
  el.innerHTML = `
    <button class="back-btn" onclick="goView('home')">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
      Back to Systems
    </button>
    <div class="detail-grid">
      <div class="detail-img" style="background:var(--card2);padding:${s.image?'0':'3rem'}">
        ${s.image ? `<img src="${s.image}" style="width:100%;height:100%;object-fit:contain;border-radius:6px">` : sysSVG('#a78bfa')}
      </div>
      <div>
        <div class="detail-brand">${s.tier}</div>
        <h1 class="detail-name">${s.name}</h1>
        <p class="detail-desc">${s.desc}</p>
        <div class="detail-price-container">
          <div class="detail-price-usd">$${s.price.toLocaleString('en-US', {minimumFractionDigits:2})}</div>
          <div class="detail-price-ars">${formatARS(s.price)}</div>
        </div>
        <div class="detail-actions">
          <button class="btn-add-lg" onclick="addToCart(${s.id},'system');goView('cart')">Add to Cart</button>
          <button class="btn-wish" title="Wishlist">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          </button>
        </div>
        <div class="specs-grid">
          ${Object.entries(s.specs).map(([k,v]) => `
            <div class="spec-item"><div class="spec-lbl">${k}</div><div class="spec-val">${v}</div></div>
          `).join('')}
        </div>
      </div>
    </div>`;
  goView('detail');
}

/* ── CART ── */
function addToCart(id, type) {
  const item = type === 'product' ? PRODUCTS.find(x => x.id === id) : SYSTEMS.find(x => x.id === id);
  if (!item) return;
  const existing = cart.find(c => c.id === id && c.type === type);
  if (existing) { existing.qty++; }
  else { cart.push({ ...item, type, qty: 1 }); }
  updateBadge();
  showToast(`${item.name.length > 30 ? item.name.slice(0, 30) + '…' : item.name} added to cart`);
}

function removeFromCart(id, type) {
  cart = cart.filter(c => !(c.id === id && c.type === type));
  updateBadge();
  renderCart();
}

function changeQty(id, type, delta) {
  const item = cart.find(c => c.id === id && c.type === type);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) cart = cart.filter(c => !(c.id === id && c.type === type));
  updateBadge();
  renderCart();
}

function updateBadge() {
  const total = cart.reduce((s, c) => s + c.qty, 0);
  const badge = document.getElementById('cart-badge');
  badge.textContent = total;
  badge.style.display = total > 0 ? 'flex' : 'none';
}

function renderCart() {
  const el = document.getElementById('cart-items');
  if (cart.length === 0) {
    el.innerHTML = `
      <div class="empty-cart">
        <div class="empty-cart-icon">🛒</div>
        <h3>Your requisition is empty</h3>
        <p style="font-size:.82rem;color:var(--txt3);margin-top:.4rem">Add systems or components to initialize.</p>
        <button class="btn-fill" style="margin-top:1.5rem" onclick="goView('components')">Browse Components</button>
      </div>`;
  } else {
    el.innerHTML = cart.map(c => {
      const imgHTML = c.image 
        ? `<img src="${c.image}" style="width:100%;height:100%;object-fit:cover;border-radius:3px">`
        : (c.type === 'system' ? sysSVG('#a78bfa') : getProductSVG(c));
      const specs = c.type === 'system'
        ? `<div class="ci-spec"><strong>CPU:</strong>${c.cpu}<br><strong>GPU:</strong>${c.gpu}<br><strong>RAM:</strong>${c.ram}</div>`
        : `<div class="ci-spec">${Object.entries(c.specs).slice(0, 2).map(([k, v]) => `<strong>${k}:</strong>${v}`).join('<br>')}</div>`;
      return `
        <div class="cart-item">
          <div class="ci-img">${imgHTML}</div>
          <div>
            <div class="ci-type">${c.type === 'system' ? 'Pre-Configured System' : 'Component Upgrade'}</div>
            <div class="ci-name">${c.name}</div>
            ${specs}
          </div>
          <div class="ci-right">
            <button class="ci-rm" onclick="removeFromCart(${c.id},'${c.type}')">✕</button>
            <div class="ci-price-container">
              <div class="ci-price-usd">$${(c.price * c.qty).toLocaleString('en-US', {minimumFractionDigits:2})}</div>
              <div class="ci-price-ars">${formatARS(c.price * c.qty)}</div>
            </div>
            <div class="ci-qty">
              <button class="qty-btn" onclick="changeQty(${c.id},'${c.type}',-1)">−</button>
              <span class="qty-n">${c.qty}</span>
              <button class="qty-btn" onclick="changeQty(${c.id},'${c.type}',1)">+</button>
            </div>
          </div>
        </div>`;
    }).join('');
  }

  const subtotal = cart.reduce((s, c) => s + c.price * c.qty, 0);
  const count    = cart.reduce((s, c) => s + c.qty, 0);
  document.getElementById('cart-item-count').textContent = `Subtotal (${count} item${count !== 1 ? 's' : ''})`;
  
  document.getElementById('cart-subtotal').innerHTML = `
    <span class="sum-usd">$${subtotal.toLocaleString('en-US', {minimumFractionDigits:2})}</span>
    <span class="sum-ars">${formatARS(subtotal)}</span>
  `;
  document.getElementById('cart-total').innerHTML = `
    <span class="sum-total-usd">$${subtotal.toLocaleString('en-US', {minimumFractionDigits:2})}</span>
    <span class="sum-total-ars">${formatARS(subtotal)}</span>
  `;
}

/* ── TOAST ── */
function showToast(msg) {
  const t = document.getElementById('toast');
  document.getElementById('toast-msg').textContent = msg;
  t.classList.add('show');
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.remove('show'), 2800);
}

/* ── MOBILE NAV ── */
function toggleMobNav() {
  document.getElementById('mob-nav').classList.toggle('open');
}

/* ── PRICE FILTER (visual only) ── */
function setPriceFilter(key, btn) {
  btn.classList.toggle('on');
}

/* ── COTIZACIÓN DÓLAR ── */
const DOLAR_TIPOS = [
  { casa: 'oficial', label: 'Oficial' },
  { casa: 'blue',    label: 'Blue'    },
  { casa: 'mep',     label: 'MEP'     },
];

async function fetchDolar() {
  const container = document.getElementById('ticker-items');
  const updEl     = document.getElementById('ticker-updated');
  try {
    const results = await Promise.all(
      DOLAR_TIPOS.map(t =>
        fetch(`https://dolarapi.com/v1/dolares/${t.casa}`)
          .then(r => r.ok ? r.json() : null)
      )
    );
    const items = results
      .map((data, i) => {
        if (!data) return null;
        const fmt = v => v != null ? `$${Number(v).toLocaleString('es-AR')}` : '—';
        return `<span class="ticker-item">
          <span class="ticker-casa">${DOLAR_TIPOS[i].label}</span>
          <span class="ticker-buy">${fmt(data.compra)}</span>
          <span class="ticker-sep">/</span>
          <span class="ticker-sell">${fmt(data.venta)}</span>
        </span>`;
      })
      .filter(Boolean)
      .join('');

    const blue = results.find(r => r?.casa === 'blue');
    if (blue && blue.venta) {
      EXCHANGE_RATE = blue.venta;
      // Refresh views if they are currently visible to update ARS prices
      if (currentView === 'home') renderSystems();
      if (currentView === 'components') renderProducts();
      if (currentView === 'cart') renderCart();
    }

    container.innerHTML = items || '<span class="ticker-item loading">sin datos</span>';
    updEl.textContent = 'act. ' + new Date().toLocaleTimeString('es-AR', {hour:'2-digit', minute:'2-digit'});
  } catch {
    container.innerHTML = '<span class="ticker-item loading">no disponible</span>';
  }
}

function formatARS(usd) {
  const ars = usd * EXCHANGE_RATE;
  return `ARS ${ars.toLocaleString('es-AR', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
}

fetchDolar();
setInterval(fetchDolar, 5 * 60 * 1000);

/* ── AUTHENTICATION ── */
function toggleAuthModal() {
  const modal = document.getElementById('auth-overlay');
  modal.classList.toggle('open');
  if (modal.classList.contains('open')) updateAuthState();
}

function setAuthTab(tab) {
  document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.auth-form').forEach(f => f.classList.remove('active'));
  document.getElementById('tab-' + tab).classList.add('active');
  document.getElementById('form-' + tab).classList.add('active');
}

function signup() {
  const name = document.getElementById('s-name').value.trim();
  const email = document.getElementById('s-email').value.trim();
  const pass = document.getElementById('s-pass').value.trim();

  if (!name || !email || !pass) { showToast('Please complete all fields'); return; }

  const users = JSON.parse(localStorage.getItem('kingspc_users') || '[]');
  if (users.find(u => u.email === email)) { showToast('Email already registered'); return; }

  const newUser = { id: Date.now(), name, email, password: pass, role: 'customer', status: 'active' };
  users.push(newUser);
  localStorage.setItem('kingspc_users', JSON.stringify(users));

  showToast('Registration successful! Accessing system...');
  login(email, pass);
}

function login(emailInp, passInp) {
  const email = emailInp || document.getElementById('l-email').value.trim();
  const pass  = passInp  || document.getElementById('l-pass').value.trim();

  if (!email || !pass) { showToast('Please enter credentials'); return; }

  const users = JSON.parse(localStorage.getItem('kingspc_users') || '[]');
  const user  = users.find(u => u.email === email && u.password === pass);

  if (!user) { showToast('Invalid credentials'); return; }
  if (user.status !== 'active') { showToast('Account is inactive'); return; }

  currentUser = user;
  localStorage.setItem('kingspc_session', JSON.stringify(user));
  updateAuthState();
  showToast(`Welcome back, ${user.name.split(' ')[0]}`);
  setTimeout(toggleAuthModal, 1000);
}

function logout() {
  currentUser = null;
  localStorage.removeItem('kingspc_session');
  updateAuthState();
  toggleAuthModal();
  showToast('Session terminated');
}

function updateAuthState() {
  const loggedIn = document.getElementById('auth-logged-in');
  const loggedOut = document.getElementById('auth-logged-out');
  const statusDot = document.getElementById('user-status-dot');

  if (currentUser) {
    loggedIn.style.display = 'block';
    loggedOut.style.display = 'none';
    statusDot.classList.add('online');
    
    document.getElementById('p-name').textContent = currentUser.name;
    document.getElementById('p-email').textContent = currentUser.email;
    document.getElementById('p-avatar').textContent = currentUser.name.charAt(0).toUpperCase();
  } else {
    loggedIn.style.display = 'none';
    loggedOut.style.display = 'block';
    statusDot.classList.remove('online');
  }
}

/* ── INIT ── */
function init() {
  const session = localStorage.getItem('kingspc_session');
  if (session) {
    currentUser = JSON.parse(session);
  }
  updateAuthState();
  
  renderNav();
  renderHero();
  renderPromo();
  renderSectors();
  renderFooter();
  renderSystems();
  renderWeeklyOffers();
  updateBadge();
  document.getElementById('cart-badge').style.display = 'none';
}

init();
