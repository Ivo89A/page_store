/* ── KINGS PC ADMIN PANEL ── */

const KEYS = {
  products:    'kingspc_products',
  systems:     'kingspc_systems',
  content:     'kingspc_content',
  users:       'kingspc_users',
  peripherals: 'kingspc_peripherals'
};

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
    { label: 'Periféricos', view: 'peripherals' },
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
  },
  promo: {
    enabled: true,
    text: 'HOT SALE FINALIZA EN',
    deadline: '2024-12-31T23:59:59'
  },
  offerIds: []
};

const DEFAULT_USERS = [
  { id: 1, name: 'Admin Principal', email: 'admin@kingspc.com', role: 'admin', status: 'active' },
  { id: 2, name: 'Juan Pérez', email: 'juan@example.com', role: 'customer', status: 'active' }
];

/* ── STATE ── */
let state = { products: [], systems: [], content: {}, users: [] };
let editingId   = null;
let editingType = null;

/* ── STORAGE ── */
function loadState() {
  try {
    const p = localStorage.getItem(KEYS.products);
    const s = localStorage.getItem(KEYS.systems);
    const c = localStorage.getItem(KEYS.content);
    const u = localStorage.getItem(KEYS.users);
    state.products = p ? JSON.parse(p) : JSON.parse(JSON.stringify(DEFAULT_PRODUCTS));
    state.systems  = s ? JSON.parse(s) : JSON.parse(JSON.stringify(DEFAULT_SYSTEMS));
    state.content  = c ? JSON.parse(c) : JSON.parse(JSON.stringify(DEFAULT_CONTENT));
    state.users    = u ? JSON.parse(u) : JSON.parse(JSON.stringify(DEFAULT_USERS));
  } catch {
    state.products = JSON.parse(JSON.stringify(DEFAULT_PRODUCTS));
    state.systems  = JSON.parse(JSON.stringify(DEFAULT_SYSTEMS));
    state.content  = JSON.parse(JSON.stringify(DEFAULT_CONTENT));
    state.users    = JSON.parse(JSON.stringify(DEFAULT_USERS));
  }
}

function persistState() {
  localStorage.setItem(KEYS.products, JSON.stringify(state.products));
  localStorage.setItem(KEYS.systems,  JSON.stringify(state.systems));
  localStorage.setItem(KEYS.content,  JSON.stringify(state.content));
  localStorage.setItem(KEYS.users,    JSON.stringify(state.users));
}

/* ── PANEL NAVIGATION ── */
const PANEL_TITLES = {
  dashboard: 'Dashboard',
  products:  'Products',
  systems:   'Pre-Built Systems',
  content:   'Sections & Content',
  users:     'User Management',
  offers:    'Ofertas Semanales'
};

function showPanel(name) {
  document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  document.getElementById('panel-' + name)?.classList.add('active');
  document.querySelector(`[data-panel="${name}"]`)?.classList.add('active');
  document.getElementById('panel-title').textContent = PANEL_TITLES[name] || name;

  if (name === 'dashboard') renderDashboard();
  if (name === 'products')  renderProductsTable();
  if (name === 'systems')   renderSystemsTable();
  if (name === 'content')   renderContentForms();
  if (name === 'users')     renderUsersTable();
  if (name === 'offers')    renderOffersPanel();
}

/* ── DASHBOARD ── */
function renderDashboard() {
  document.getElementById('stat-products').textContent = state.products.length;
  document.getElementById('stat-systems').textContent  = state.systems.length;
  const total = [...state.products, ...state.systems].reduce((s, i) => s + (i.price || 0), 0);
  document.getElementById('stat-catalog-value').textContent =
    '$' + total.toLocaleString('en-US', { minimumFractionDigits: 2 });

  const allItems = [
    ...state.products.map(p => ({ ...p, _kind: 'product' })),
    ...state.systems.map(s  => ({ ...s, _kind: 'system'  }))
  ];

  document.getElementById('recent-items').innerHTML = allItems.length
    ? allItems.map(item => `
        <tr>
          <td>
            <div style="display:flex;align-items:center;gap:.8rem">
              ${item.image ? `<img src="${item.image}" class="td-thumb">` : `<div class="td-thumb-placeholder"></div>`}
              <span class="td-tag">${item._kind === 'system' ? item.tier || 'System' : item.type || 'Product'}</span>
            </div>
          </td>
          <td class="td-name">${item.name}</td>
          <td class="td-price">$${item.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
          <td>
            <button class="btn-sm edit" onclick="quickEdit(${item.id},'${item._kind}')">Edit</button>
          </td>
        </tr>
      `).join('')
    : '<tr><td colspan="4" class="empty-state"><p>No items in catalog yet.</p></td></tr>';
}

function quickEdit(id, kind) {
  if (kind === 'product') { showPanel('products'); setTimeout(() => openProductModal(id), 60); }
  else                    { showPanel('systems');  setTimeout(() => openSystemModal(id),  60); }
}

/* ── PRODUCTS TABLE ── */
function renderProductsTable() {
  document.getElementById('products-tbody').innerHTML = state.products.length
    ? state.products.map(p => `
        <tr>
          <td>
            <div style="display:flex;align-items:center;gap:.8rem">
              ${p.image ? `<img src="${p.image}" class="td-thumb">` : `<div class="td-thumb-placeholder"></div>`}
              <span class="td-tag">${p.type || '—'}</span>
            </div>
          </td>
          <td class="td-name">${p.name}</td>
          <td>${p.brand}</td>
          <td>${(p.cat || '').toUpperCase()}</td>
          <td class="td-price">$${p.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
          <td>
            <div class="td-actions">
              <button class="btn-sm edit"   onclick="openProductModal(${p.id})">Edit</button>
              <button class="btn-sm danger" onclick="deleteProduct(${p.id})">Delete</button>
            </div>
          </td>
        </tr>
      `).join('')
    : '<tr><td colspan="6" style="text-align:center;color:var(--txt3);padding:2rem">No products yet. Click "Add Product" above.</td></tr>';
}

/* ── PRODUCT MODAL ── */
function openProductModal(id) {
  editingId   = id;
  editingType = 'product';
  const p = id != null ? state.products.find(x => x.id === id) : null;
  document.getElementById('modal-title').textContent = id != null ? 'Edit Product' : 'Add Product';

  const cats   = ['gpu','cpu','mb','ram','storage','cooling'];
  const brands = ['nvidia','amd','intel','corsair','noctua','other'];

  document.getElementById('modal-form').innerHTML = `
    <div class="form-grid">
      <div class="form-group">
        <label>Brand</label>
        <input type="text" id="f-brand" value="${esc(p?.brand)}" placeholder="e.g. NVIDIA">
      </div>
      <div class="form-group">
        <label>Type</label>
        <input type="text" id="f-type" value="${esc(p?.type)}" placeholder="e.g. GPU">
      </div>
      <div class="form-group full">
        <label>Product Name</label>
        <input type="text" id="f-name" value="${esc(p?.name)}" placeholder="e.g. RTX 4090 SUPRIM LIQUID X">
      </div>
      <div class="form-group full">
        <label>Description</label>
        <textarea id="f-desc" rows="3">${esc(p?.desc)}</textarea>
      </div>
      <div class="form-group">
        <label>Price (USD)</label>
        <input type="number" id="f-price" value="${p?.price ?? ''}" placeholder="0.00" step="0.01" min="0">
      </div>
      <div class="form-group">
        <label>Category</label>
        <select id="f-cat">
          ${cats.map(c => `<option value="${c}" ${p?.cat===c?'selected':''}>${c.toUpperCase()}</option>`).join('')}
        </select>
      </div>
      <div class="form-group">
        <label>Brand Key</label>
        <select id="f-brandkey">
          ${brands.map(b => `<option value="${b}" ${p?.brandKey===b?'selected':''}>${cap(b)}</option>`).join('')}
        </select>
      </div>
      <div class="form-group">
        <label>Stat Label</label>
        <input type="text" id="f-statlabel" value="${esc(p?.statLabel)}" placeholder="e.g. CUDA Cores">
      </div>
      <div class="form-group">
        <label>Stat Value</label>
        <input type="text" id="f-statval" value="${esc(p?.statVal)}" placeholder="e.g. 16384">
      </div>
      <div class="form-group full">
        <label>Image URL</label>
        <div style="display:flex;gap:.5rem">
          <input type="text" id="f-image" value="${esc(p?.image)}" placeholder="https://example.com/image.jpg">
          ${p?.image ? `<img src="${p.image}" style="width:40px;height:40px;border-radius:4px;object-fit:cover;border:1px solid var(--border)">` : ''}
        </div>
      </div>
      <div class="form-group full">
        <label>Specifications</label>
        <div class="specs-editor" id="specs-editor">
          ${p?.specs ? Object.entries(p.specs).map(([k,v]) => specRowHTML(k,v)).join('') : ''}
        </div>
        <button type="button" class="add-spec-btn" onclick="addSpecRow()">+ Add Specification</button>
      </div>
    </div>`;
  openModal();
}

function saveProductFromModal() {
  const name  = val('f-name');
  const price = parseFloat(document.getElementById('f-price').value);
  if (!name)      { toast('Name is required', 'error'); return; }
  if (isNaN(price)) { toast('Valid price is required', 'error'); return; }

  const data = {
    brand:    val('f-brand'),
    type:     val('f-type'),
    name,
    desc:     val('f-desc'),
    price,
    statLabel: val('f-statlabel'),
    statVal:   val('f-statval'),
    cat:      document.getElementById('f-cat').value,
    brandKey: document.getElementById('f-brandkey').value,
    image:    val('f-image'),
    specs:    readSpecs()
  };

  if (editingId != null) {
    const idx = state.products.findIndex(p => p.id === editingId);
    if (idx !== -1) state.products[idx] = { ...state.products[idx], ...data };
  } else {
    const maxId = state.products.reduce((m, p) => Math.max(m, p.id), 0);
    state.products.push({ id: maxId + 1, ...data });
  }

  persistState();
  closeModal();
  renderProductsTable();
  renderDashboard();
  toast(editingId != null ? 'Product updated' : 'Product added');
}

function deleteProduct(id) {
  if (!confirm('Delete this product? This cannot be undone.')) return;
  state.products = state.products.filter(p => p.id !== id);
  persistState();
  renderProductsTable();
  renderDashboard();
  toast('Product deleted');
}

/* ── SYSTEMS TABLE ── */
function renderSystemsTable() {
  document.getElementById('systems-tbody').innerHTML = state.systems.length
    ? state.systems.map(s => `
        <tr>
          <td>
            <div style="display:flex;align-items:center;gap:.8rem">
              ${s.image ? `<img src="${s.image}" class="td-thumb">` : `<div class="td-thumb-placeholder"></div>`}
              <span class="td-tag">${esc(s.tier)}</span>
            </div>
          </td>
          <td class="td-name">${s.name}</td>
          <td style="font-size:.8rem">${s.cpu}</td>
          <td style="font-size:.8rem">${s.gpu}</td>
          <td class="td-price">$${s.price.toLocaleString('en-US', { minimumFractionDigits: 2 })}</td>
          <td>
            <div class="td-actions">
              <button class="btn-sm edit"   onclick="openSystemModal(${s.id})">Edit</button>
              <button class="btn-sm danger" onclick="deleteSystem(${s.id})">Delete</button>
            </div>
          </td>
        </tr>
      `).join('')
    : '<tr><td colspan="6" style="text-align:center;color:var(--txt3);padding:2rem">No systems yet. Click "Add System" above.</td></tr>';
}

/* ── SYSTEM MODAL ── */
function openSystemModal(id) {
  editingId   = id;
  editingType = 'system';
  const s = id != null ? state.systems.find(x => x.id === id) : null;
  document.getElementById('modal-title').textContent = id != null ? 'Edit System' : 'Add Pre-Built System';

  document.getElementById('modal-form').innerHTML = `
    <div class="form-grid">
      <div class="form-group">
        <label>Tier Label</label>
        <input type="text" id="f-tier" value="${esc(s?.tier)}" placeholder="e.g. Flagship System">
      </div>
      <div class="form-group">
        <label>System Name</label>
        <input type="text" id="f-name" value="${esc(s?.name)}" placeholder="e.g. SOVEREIGN MK.IV">
      </div>
      <div class="form-group full">
        <label>Description</label>
        <textarea id="f-desc" rows="3">${esc(s?.desc)}</textarea>
      </div>
      <div class="form-group">
        <label>Price (USD)</label>
        <input type="number" id="f-price" value="${s?.price ?? ''}" step="0.01" min="0">
      </div>
      <div class="form-group">
        <label>Processor (CPU)</label>
        <input type="text" id="f-cpu" value="${esc(s?.cpu)}" placeholder="e.g. Intel Core i9-14900K">
      </div>
      <div class="form-group">
        <label>Graphics Card (GPU)</label>
        <input type="text" id="f-gpu" value="${esc(s?.gpu)}" placeholder="e.g. NVIDIA RTX 4090 24GB">
      </div>
      <div class="form-group">
        <label>Memory (RAM)</label>
        <input type="text" id="f-ram" value="${esc(s?.ram)}" placeholder="e.g. 64GB DDR5-6400">
      </div>
      <div class="form-group">
        <label>Storage</label>
        <input type="text" id="f-storage" value="${esc(s?.storage)}" placeholder="e.g. 4TB NVMe Gen4">
      </div>
      <div class="form-group full">
        <label>Image URL</label>
        <div style="display:flex;gap:.5rem">
          <input type="text" id="f-image" value="${esc(s?.image)}" placeholder="https://example.com/system.jpg">
          ${s?.image ? `<img src="${s.image}" style="width:40px;height:40px;border-radius:4px;object-fit:cover;border:1px solid var(--border)">` : ''}
        </div>
      </div>
      <div class="form-group full">
        <label>Detailed Specifications</label>
        <div class="specs-editor" id="specs-editor">
          ${s?.specs ? Object.entries(s.specs).map(([k,v]) => specRowHTML(k,v)).join('') : ''}
        </div>
        <button type="button" class="add-spec-btn" onclick="addSpecRow()">+ Add Specification</button>
      </div>
    </div>`;
  openModal();
}

function saveSystemFromModal() {
  const name  = val('f-name');
  const price = parseFloat(document.getElementById('f-price').value);
  if (!name)      { toast('Name is required', 'error'); return; }
  if (isNaN(price)) { toast('Valid price is required', 'error'); return; }

  const data = {
    tier:    val('f-tier'),
    name,
    desc:    val('f-desc'),
    price,
    cpu:     val('f-cpu'),
    gpu:     val('f-gpu'),
    ram:     val('f-ram'),
    storage: val('f-storage'),
    image:   val('f-image'),
    specs:   readSpecs()
  };

  if (editingId != null) {
    const idx = state.systems.findIndex(s => s.id === editingId);
    if (idx !== -1) state.systems[idx] = { ...state.systems[idx], ...data };
  } else {
    const maxId = state.systems.reduce((m, s) => Math.max(m, s.id), 0);
    state.systems.push({ id: maxId + 1, ...data });
  }

  persistState();
  closeModal();
  renderSystemsTable();
  renderDashboard();
  toast(editingId != null ? 'System updated' : 'System added');
}

function deleteSystem(id) {
  if (!confirm('Delete this system? This cannot be undone.')) return;
  state.systems = state.systems.filter(s => s.id !== id);
  persistState();
  renderSystemsTable();
  renderDashboard();
  toast('System deleted');
}

/* ── MODAL SHARED ── */
function openModal()  { document.getElementById('modal-overlay').classList.add('open'); }
function closeModal() {
  document.getElementById('modal-overlay').classList.remove('open');
  editingId = editingType = null;
}
function saveModal() {
  if (editingType === 'product') saveProductFromModal();
  else if (editingType === 'system') saveSystemFromModal();
  else if (editingType === 'user') saveUserFromModal();
}

/* ── USERS TABLE ── */
function renderUsersTable() {
  document.getElementById('users-tbody').innerHTML = state.users.length
    ? state.users.map(u => `
        <tr>
          <td class="td-name">${esc(u.name)}</td>
          <td>${esc(u.email)}</td>
          <td><span class="td-tag" style="background:${u.role==='admin'?'rgba(239,68,68,.1)':'var(--acc-glow)'}">${u.role.toUpperCase()}</span></td>
          <td><span style="color:${u.status==='active'?'var(--success)':'var(--danger)'}">${cap(u.status)}</span></td>
          <td>
            <div class="td-actions">
              <button class="btn-sm edit"   onclick="openUserModal(${u.id})">Edit</button>
              <button class="btn-sm danger" onclick="deleteUser(${u.id})">Delete</button>
            </div>
          </td>
        </tr>
      `).join('')
    : '<tr><td colspan="5" style="text-align:center;color:var(--txt3);padding:2rem">No users yet. Click "Add Person" above.</td></tr>';
}

function openUserModal(id) {
  editingId   = id;
  editingType = 'user';
  const u = id != null ? state.users.find(x => x.id === id) : null;
  document.getElementById('modal-title').textContent = id != null ? 'Edit Person' : 'Register New Person';

  document.getElementById('modal-form').innerHTML = `
    <div class="form-grid">
      <div class="form-group full">
        <label>Full Name</label>
        <input type="text" id="f-u-name" value="${esc(u?.name)}" placeholder="e.g. Juan Pérez">
      </div>
      <div class="form-group full">
        <label>Email Address</label>
        <input type="email" id="f-u-email" value="${esc(u?.email)}" placeholder="juan@example.com">
      </div>
      <div class="form-group">
        <label>Role</label>
        <select id="f-u-role">
          <option value="customer" ${u?.role==='customer'?'selected':''}>Customer</option>
          <option value="admin" ${u?.role==='admin'?'selected':''}>Administrator</option>
        </select>
      </div>
      <div class="form-group">
        <label>Status</label>
        <select id="f-u-status">
          <option value="active" ${u?.status==='active'?'selected':''}>Active</option>
          <option value="inactive" ${u?.status==='inactive'?'selected':''}>Inactive</option>
        </select>
      </div>
      ${id == null ? `
      <div class="form-group full">
        <label>Password</label>
        <input type="password" id="f-u-pass" placeholder="••••••••">
      </div>` : ''}
    </div>`;
  openModal();
}

function saveUserFromModal() {
  const name  = val('f-u-name');
  const email = val('f-u-email');
  if (!name || !email) { toast('Name and Email are required', 'error'); return; }

  const data = {
    name,
    email,
    role:   document.getElementById('f-u-role').value,
    status: document.getElementById('f-u-status').value
  };

  if (editingId != null) {
    const idx = state.users.findIndex(u => u.id === editingId);
    if (idx !== -1) state.users[idx] = { ...state.users[idx], ...data };
  } else {
    const maxId = state.users.reduce((m, u) => Math.max(m, u.id), 0);
    state.users.push({ id: maxId + 1, ...data, password: val('f-u-pass') || '123456' });
  }

  persistState();
  closeModal();
  renderUsersTable();
  toast(editingId != null ? 'User updated' : 'User registered');
}

function deleteUser(id) {
  if (!confirm('Delete this user?')) return;
  state.users = state.users.filter(u => u.id !== id);
  persistState();
  renderUsersTable();
  toast('User deleted');
}

/* ── SPECS EDITOR ── */
function specRowHTML(key = '', specVal = '') {
  return `<div class="spec-row">
    <input type="text" class="spec-key" value="${esc(key)}" placeholder="Key (e.g. VRAM)">
    <input type="text" class="spec-val-inp" value="${esc(specVal)}" placeholder="Value (e.g. 24GB)">
    <button type="button" class="spec-row-del" onclick="this.closest('.spec-row').remove()">✕</button>
  </div>`;
}
function addSpecRow() {
  const editor = document.getElementById('specs-editor');
  const div = document.createElement('div');
  div.innerHTML = specRowHTML();
  editor.appendChild(div.firstElementChild);
}
function readSpecs() {
  const out = {};
  document.querySelectorAll('#specs-editor .spec-row').forEach(row => {
    const k = row.querySelector('.spec-key')?.value?.trim();
    const v = row.querySelector('.spec-val-inp')?.value?.trim();
    if (k && v) out[k] = v;
  });
  return out;
}

/* ── CONTENT FORMS ── */
function renderContentForms() {
  const c = state.content;
  const h = c.hero || {};
  setVal('f-hero-tag',    h.tag);
  setVal('f-hero-line1',  h.titleLine1);
  setVal('f-hero-accent', h.titleAccent);
  setVal('f-hero-desc',   h.desc);
  setVal('f-hero-btn1',   h.btn1);
  setVal('f-hero-btn2',   h.btn2);

  renderNavLinksEditor();

  const s = c.sectors || {};
  setVal('f-sector-custom-name', s.custom?.name);
  setVal('f-sector-custom-desc', s.custom?.desc);
  setVal('f-sector-gpu-name',    s.gpu?.name);
  setVal('f-sector-cpu-name',    s.cpu?.name);
  setVal('f-sector-periph-name', s.periph?.name);
  setVal('f-sector-periph-cta',  s.periph?.cta);

  const f = c.footer || {};
  setVal('f-footer-copyright', f.copyright);
  renderFooterLinksEditor();

  const p = c.promo || {};
  document.getElementById('f-promo-enabled').checked = !!p.enabled;
  setVal('f-promo-text', p.text);
  setVal('f-promo-deadline', p.deadline);
}

/* ── NAV LINKS EDITOR ── */
function renderNavLinksEditor() {
  const links = state.content.navLinks || [];
  document.getElementById('nav-links-editor').innerHTML = links.map((l, i) => `
    <div class="link-row nav-row" data-idx="${i}">
      <input type="text" class="nl-label" value="${esc(l.label)}" placeholder="Label">
      <select class="nl-view">
        <option value="home"       ${l.view==='home'      ?'selected':''}>Home / Systems</option>
        <option value="components" ${l.view==='components'?'selected':''}>Components</option>
        <option value="cart"       ${l.view==='cart'      ?'selected':''}>Cart</option>
      </select>
      <button type="button" class="link-row-del" onclick="removeNavLink(${i})">✕</button>
    </div>
  `).join('');
}
function addNavLink() {
  if (!state.content.navLinks) state.content.navLinks = [];
  state.content.navLinks.push({ label: 'New Link', view: 'home' });
  renderNavLinksEditor();
}
function removeNavLink(idx) {
  state.content.navLinks.splice(idx, 1);
  renderNavLinksEditor();
}

/* ── FOOTER LINKS EDITOR ── */
function renderFooterLinksEditor() {
  const links = state.content.footer?.links || [];
  document.getElementById('footer-links-editor').innerHTML = links.map((l, i) => `
    <div class="link-row footer-row">
      <input type="text" class="fl-label" value="${esc(l)}" placeholder="Link label">
      <button type="button" class="link-row-del" onclick="removeFooterLink(${i})">✕</button>
    </div>
  `).join('');
}
function addFooterLink() {
  if (!state.content.footer) state.content.footer = { links: [], copyright: '' };
  if (!state.content.footer.links) state.content.footer.links = [];
  state.content.footer.links.push('New Link');
  renderFooterLinksEditor();
}
function removeFooterLink(idx) {
  if (state.content.footer?.links) {
    state.content.footer.links.splice(idx, 1);
    renderFooterLinksEditor();
  }
}

/* ── SAVE CONTENT ── */
function saveContent() {
  state.content.hero = {
    tag:        getVal('f-hero-tag'),
    titleLine1: getVal('f-hero-line1'),
    titleAccent: getVal('f-hero-accent'),
    desc:       getVal('f-hero-desc'),
    btn1:       getVal('f-hero-btn1'),
    btn2:       getVal('f-hero-btn2')
  };

  state.content.navLinks = Array.from(
    document.querySelectorAll('#nav-links-editor .nav-row')
  ).map(row => ({
    label: row.querySelector('.nl-label')?.value?.trim() || '',
    view:  row.querySelector('.nl-view')?.value || 'home'
  }));

  if (!state.content.sectors) state.content.sectors = {};
  state.content.sectors.custom = { name: getVal('f-sector-custom-name'), desc: getVal('f-sector-custom-desc') };
  state.content.sectors.gpu    = { name: getVal('f-sector-gpu-name') };
  state.content.sectors.cpu    = { name: getVal('f-sector-cpu-name') };
  state.content.sectors.periph = { name: getVal('f-sector-periph-name'), cta: getVal('f-sector-periph-cta') };

  if (!state.content.footer) state.content.footer = {};
  state.content.footer.links = Array.from(
    document.querySelectorAll('#footer-links-editor .footer-row')
  ).map(row => row.querySelector('.fl-label')?.value?.trim() || '').filter(Boolean);
  state.content.footer.copyright = getVal('f-footer-copyright');

  state.content.promo = {
    enabled:  document.getElementById('f-promo-enabled').checked,
    text:     getVal('f-promo-text'),
    deadline: getVal('f-promo-deadline')
  };

  persistState();
  toast('Content saved — reload the main site to see updates');
}

/* ── HELPERS ── */
function getVal(id) { return (document.getElementById(id)?.value || '').trim(); }
function val(id) { return getVal(id); }
function setVal(id, v) { const el = document.getElementById(id); if (el && v != null) el.value = v; }
function esc(s) { return s == null ? '' : String(s).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
function cap(s) { return s ? s.charAt(0).toUpperCase() + s.slice(1) : ''; }

/* ── TOAST ── */
function toast(msg, type = 'success') {
  const t   = document.getElementById('admin-toast');
  const dot = document.getElementById('toast-dot');
  document.getElementById('admin-toast-msg').textContent = msg;
  dot.className = 'toast-dot ' + type;
  t.classList.add('show');
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.remove('show'), 3200);
}

/* ── CLOSE MODAL ON OVERLAY CLICK ── */
document.getElementById('modal-overlay').addEventListener('click', e => {
  if (e.target === e.currentTarget) closeModal();
});

/* ── OFFERS MANAGEMENT ── */
function getPeripherals() {
  try {
    const ph = localStorage.getItem(KEYS.peripherals);
    return ph ? JSON.parse(ph) : [];
  } catch { return []; }
}

function renderOffersPanel() {
  const panel = document.getElementById('offers-body');
  if (!panel) return;
  const selectedIds = state.content.offerIds || [];
  const allProducts = state.products || [];
  const peripherals = getPeripherals();

  const renderItem = (item, source) => {
    const checked = selectedIds.includes(item.id) ? 'checked' : '';
    return `
      <label class="offer-select-card ${checked ? 'selected' : ''}">
        <input type="checkbox" class="offer-check" value="${item.id}" ${checked}
               onchange="toggleOfferCard(this)">
        <div class="offer-card-inner">
          <div class="offer-card-thumb">
            ${item.image ? `<img src="${item.image}">` : `<div class="offer-thumb-placeholder">${esc(item.type?.[0] || '?')}</div>`}
          </div>
          <div class="offer-card-details">
            <div class="offer-card-name">${esc(item.name)}</div>
            <div class="offer-card-meta">${esc(item.brand)} · $${item.price.toFixed(2)}</div>
            <div class="offer-card-source">${source}</div>
          </div>
        </div>
      </label>`;
  };

  let html = '<div class="offer-cards-grid">';
  if (allProducts.length) {
    html += `<div class="offer-section-label">Componentes</div>`;
    html += allProducts.map(p => renderItem(p, 'Componente')).join('');
  }
  if (peripherals.length) {
    html += `<div class="offer-section-label">Periféricos</div>`;
    html += peripherals.map(p => renderItem(p, 'Periférico')).join('');
  }
  html += '</div>';

  panel.innerHTML = html;
}

function toggleOfferCard(checkbox) {
  const card = checkbox.closest('.offer-select-card');
  if (checkbox.checked) card.classList.add('selected');
  else card.classList.remove('selected');
}

function saveOffers() {
  const checks = document.querySelectorAll('#offers-body .offer-check:checked');
  const ids = Array.from(checks).map(c => parseInt(c.value));
  if (!state.content.offerIds) state.content.offerIds = [];
  state.content.offerIds = ids;
  persistState();
  toast(`${ids.length} producto(s) marcados como oferta semanal`);
}


/* ── INIT ── */
loadState();
showPanel('dashboard');
