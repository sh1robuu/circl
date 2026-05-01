// ===== CIRCL App - Circular Economy Platform =====

const MOCK = {
  user: {
    id: 'u1', name: 'EcoWarrior_23', email: 'eco.warrior@school.edu',
    loop_points: 285, level: 3, levelName: 'Seedling',
    xp: 650, xpMax: 1000, total_co2_saved: 12.4, total_water_saved: 340,
    items_listed: 8, items_claimed: 5
  },
  pointValues: { A: 50, B: 35, C: 20, D: 10 },
  conditionLabels: { A: 'Like New', B: 'Good', C: 'Used', D: 'Worn' },
  categoryEmojis: { Books: '\uD83D\uDCDA', Uniforms: '\uD83D\uDC54', Electronics: '\uD83D\uDD0C', Stationery: '\u270F\uFE0F', Other: '\uD83D\uDCCE' },
  items: [
    { id: 'i1', seller_id: 'u2', title: 'AP Chemistry Textbook', category: 'Books', condition: 'A', point_value: 50, school: 'Greenfield High', status: 'available', emoji: '\uD83D\uDCDA' },
    { id: 'i2', seller_id: 'u3', title: 'TI-84 Calculator', category: 'Electronics', condition: 'B', point_value: 35, school: 'Riverside Academy', status: 'available', emoji: '\uD83D\uDDA9\uFE0F' },
    { id: 'i3', seller_id: 'u4', title: 'School Blazer (M)', category: 'Uniforms', condition: 'A', point_value: 50, school: 'St. Patricks', status: 'available', emoji: '\uD83E\uDDE5' },
    { id: 'i4', seller_id: 'u5', title: 'Geometry Set', category: 'Stationery', condition: 'C', point_value: 20, school: 'Lincoln High', status: 'available', emoji: '\uD83D\uDCD0' },
    { id: 'i5', seller_id: 'u2', title: 'Biology Lab Manual', category: 'Books', condition: 'B', point_value: 35, school: 'Greenfield High', status: 'available', emoji: '\uD83E\uDDEC' },
    { id: 'i6', seller_id: 'u6', title: 'USB Flash Drive 32GB', category: 'Electronics', condition: 'A', point_value: 50, school: 'Oakwood Prep', status: 'available', emoji: '\uD83D\uDCBE' },
    { id: 'i7', seller_id: 'u3', title: 'PE Shorts (L)', category: 'Uniforms', condition: 'D', point_value: 10, school: 'Riverside Academy', status: 'available', emoji: '\uD83E\uDE73' },
    { id: 'i8', seller_id: 'u7', title: 'Colored Pencils 24pk', category: 'Stationery', condition: 'B', point_value: 35, school: 'Maple Leaf School', status: 'available', emoji: '\uD83C\uDF08' },
    { id: 'i9', seller_id: 'u4', title: 'World History Book', category: 'Books', condition: 'C', point_value: 20, school: 'St. Patricks', status: 'available', emoji: '\uD83C\uDF0D' },
    { id: 'i10', seller_id: 'u8', title: 'Scientific Calculator', category: 'Electronics', condition: 'C', point_value: 20, school: 'Central High', status: 'available', emoji: '\uD83E\uDEAC' }
  ],
  leaderboard: [
    { name: 'GreenQueen\uD83C\uDF3F', points: 520, emoji: '\uD83C\uDF3F' },
    { name: 'RecycleKing', points: 445, emoji: '\u267B\uFE0F' },
    { name: 'EcoWarrior_23', points: 285, emoji: '\uD83C\uDF31' },
    { name: 'PlanetSaver', points: 210, emoji: '\uD83C\uDF0D' },
    { name: 'LoopMaster', points: 180, emoji: '\uD83D\uDD04' }
  ],
  achievements: [
    { icon: '\uD83C\uDF31', name: 'First List', unlocked: true },
    { icon: '\uD83C\uDF1F', name: '5 Items', unlocked: true },
    { icon: '\u267B\uFE0F', name: 'Recycler', unlocked: true },
    { icon: '\uD83C\uDFC6', name: 'Top 10', unlocked: false },
    { icon: '\uD83D\uDCA1', name: 'Innovator', unlocked: false },
    { icon: '\uD83C\uDF0D', name: 'Earth Hero', unlocked: false },
    { icon: '\uD83D\uDC8E', name: '1K Points', unlocked: false },
    { icon: '\uD83D\uDE80', name: 'Streak 7d', unlocked: false }
  ],
  handoffs: [
    { id: 'h1', item: 'AP Chemistry Textbook', buyer: 'Sarah M.', status: 'ready', emoji: '\uD83D\uDCDA' },
    { id: 'h2', item: 'TI-84 Calculator', buyer: 'Jake P.', status: 'pending', emoji: '\uD83D\uDDA9\uFE0F' }
  ]
};

// ===== CIRCL App Controller =====
const CIRCL = {
  state: { ...MOCK.user, currentView: 'dashboard', claimingItem: null, filters: { category: 'all', condition: 'all', search: '' } },

  init() {
    setTimeout(() => {
      document.getElementById('splash-screen').classList.add('fade-out');
      setTimeout(() => {
        document.getElementById('splash-screen').style.display = 'none';
        document.getElementById('app').classList.remove('hidden');
        this.renderDashboard();
        this.renderMarketplace();
        this.renderStation();
        this.renderProfile();
        this.setupEvents();
        this.animateCounters();
      }, 600);
    }, 2500);
  },

  navigate(view) {
    document.querySelectorAll('.page-view').forEach(p => p.classList.remove('active'));
    document.getElementById('view-' + view).classList.add('active');
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    const navBtn = document.querySelector('.nav-item[data-view="' + view + '"]');
    if (navBtn) navBtn.classList.add('active');
    this.state.currentView = view;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  animateCounters() {
    this.animateValue('header-points', 0, this.state.loop_points, 1200);
    this.animateValue('hero-points', 0, this.state.loop_points, 1500);
    this.animateValue('co2-saved', 0, this.state.total_co2_saved, 1800, 1);
    this.animateValue('water-saved', 0, this.state.total_water_saved, 1800, 0);
    setTimeout(() => {
      document.getElementById('co2-bar').style.width = Math.min((this.state.total_co2_saved / 50) * 100, 100) + '%';
      document.getElementById('water-bar').style.width = Math.min((this.state.total_water_saved / 1000) * 100, 100) + '%';
    }, 300);
  },

  animateValue(id, start, end, duration, decimals = 0) {
    const el = document.getElementById(id);
    if (!el) return;
    const range = end - start;
    const startTime = performance.now();
    const step = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = (start + range * eased).toFixed(decimals);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  },

  renderDashboard() {
    const grid = document.getElementById('feed-grid');
    grid.innerHTML = MOCK.items.slice(0, 6).map(item => this.renderItemCard(item)).join('');
    const lb = document.getElementById('leaderboard-list');
    lb.innerHTML = MOCK.leaderboard.map((u, i) => '<div class="lb-row"><span class="lb-rank">#' + (i+1) + '</span><div class="lb-avatar">' + u.emoji + '</div><div class="lb-info"><div class="lb-name">' + u.name + '</div></div><span class="lb-pts">\u25C6 ' + u.points + '</span></div>').join('');
  },

  renderItemCard(item) {
    return '<div class="item-card" onclick="CIRCL.openClaim(\'' + item.id + '\')">' +
      '<div class="item-card-img">' + item.emoji + '</div>' +
      '<div class="item-card-body">' +
        '<div class="item-card-title">' + item.title + '</div>' +
        '<div class="item-card-meta">' +
          '<span class="item-condition condition-' + item.condition + '">Grade ' + item.condition + '</span>' +
          '<span class="item-price"><span class="price-coin">\u25C6</span><span class="price-val">' + item.point_value + '</span></span>' +
        '</div>' +
        '<div class="item-school">' + item.school + '</div>' +
      '</div></div>';
  },

  renderMarketplace() {
    const grid = document.getElementById('marketplace-grid');
    let items = MOCK.items.filter(i => i.status === 'available');
    if (this.state.filters.category !== 'all') items = items.filter(i => i.category === this.state.filters.category);
    if (this.state.filters.condition !== 'all') items = items.filter(i => i.condition === this.state.filters.condition);
    if (this.state.filters.search) items = items.filter(i => i.title.toLowerCase().includes(this.state.filters.search.toLowerCase()));
    grid.innerHTML = items.length ? items.map(i => this.renderItemCard(i)).join('') : '<div style="grid-column:1/-1;text-align:center;padding:40px;color:var(--text-muted)">No items found</div>';
  },

  renderStation() {
    const list = document.getElementById('handoffs-list');
    list.innerHTML = MOCK.handoffs.map(h => '<div class="handoff-card"><div class="handoff-icon">' + h.emoji + '</div><div class="handoff-info"><div class="handoff-title">' + h.item + '</div><div style="font-size:.7rem;color:var(--text-muted)">Buyer: ' + h.buyer + '</div></div><span class="handoff-status status-' + h.status + '">' + h.status + '</span>' + (h.status === 'ready' ? '<button class="handoff-btn" onclick="CIRCL.completeHandoff(\'' + h.id + '\')">Confirm</button>' : '') + '</div>').join('');
  },

  renderProfile() {
    document.getElementById('profile-points').textContent = this.state.loop_points;
    document.getElementById('profile-listed').textContent = this.state.items_listed;
    document.getElementById('profile-claimed').textContent = this.state.items_claimed;
    const ag = document.getElementById('achievements-grid');
    ag.innerHTML = MOCK.achievements.map(a => '<div class="achievement ' + (a.unlocked ? '' : 'locked') + '"><span class="achievement-icon">' + a.icon + '</span><span class="achievement-name">' + a.name + '</span></div>').join('');
  },

  setupEvents() {
    // Filters
    document.querySelectorAll('.filter-chip').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-chip').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.state.filters.category = btn.dataset.filter;
        this.renderMarketplace();
      });
    });
    document.querySelectorAll('.condition-chip').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.condition-chip').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.state.filters.condition = btn.dataset.condition;
        this.renderMarketplace();
      });
    });
    document.getElementById('search-input').addEventListener('input', (e) => {
      this.state.filters.search = e.target.value;
      this.renderMarketplace();
    });

    // Upload area
    const uploadArea = document.getElementById('upload-area');
    const fileInput = document.getElementById('file-input');
    uploadArea.addEventListener('click', () => fileInput.click());
    uploadArea.addEventListener('dragover', (e) => { e.preventDefault(); uploadArea.classList.add('dragover'); });
    uploadArea.addEventListener('dragleave', () => uploadArea.classList.remove('dragover'));
    uploadArea.addEventListener('drop', (e) => { e.preventDefault(); uploadArea.classList.remove('dragover'); if (e.dataTransfer.files[0]) this.previewImage(e.dataTransfer.files[0]); });
    fileInput.addEventListener('change', (e) => { if (e.target.files[0]) this.previewImage(e.target.files[0]); });

    // Condition select => points preview
    document.getElementById('item-condition').addEventListener('change', (e) => {
      const pts = MOCK.pointValues[e.target.value] || 0;
      document.getElementById('preview-points-value').textContent = pts;
    });

    // List form submit
    document.getElementById('list-form').addEventListener('submit', (e) => {
      e.preventDefault();
      this.submitListing();
    });
  },

  previewImage(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const preview = document.getElementById('upload-preview');
      preview.src = e.target.result;
      preview.classList.remove('hidden');
      document.getElementById('upload-placeholder').classList.add('hidden');
    };
    reader.readAsDataURL(file);
  },

  submitListing() {
    const title = document.getElementById('item-title').value;
    const category = document.getElementById('item-category').value;
    const condition = document.getElementById('item-condition').value;
    const school = document.getElementById('item-school').value;
    if (!title || !category || !condition) return;
    const points = MOCK.pointValues[condition];
    this.state.loop_points += points;
    this.state.items_listed++;
    this.state.total_co2_saved += 0.5;
    this.state.total_water_saved += 15;
    const newItem = { id: 'i' + Date.now(), seller_id: 'u1', title, category, condition, point_value: points, school: school || 'My School', status: 'available', emoji: MOCK.categoryEmojis[category] || '\uD83D\uDCE6' };
    MOCK.items.unshift(newItem);
    document.getElementById('modal-earned-points').textContent = points;
    this.openModal('success-modal');
    this.updatePointsDisplay();
    document.getElementById('list-form').reset();
    document.getElementById('preview-points-value').textContent = '0';
    document.getElementById('upload-preview').classList.add('hidden');
    document.getElementById('upload-placeholder').classList.remove('hidden');
    this.renderDashboard();
    this.renderMarketplace();
    this.renderProfile();
  },

  openClaim(itemId) {
    const item = MOCK.items.find(i => i.id === itemId);
    if (!item) return;
    this.state.claimingItem = item;
    document.getElementById('claim-item-image').textContent = item.emoji;
    document.getElementById('claim-item-title').textContent = item.title;
    document.getElementById('claim-item-condition').textContent = 'Grade ' + item.condition + ' \u2014 ' + MOCK.conditionLabels[item.condition];
    document.getElementById('claim-item-condition').className = 'claim-item-condition condition-' + item.condition;
    document.getElementById('claim-item-school').textContent = item.school;
    document.getElementById('claim-item-cost').textContent = item.point_value;
    document.getElementById('claim-balance').textContent = this.state.loop_points;
    const btn = document.getElementById('claim-confirm-btn');
    btn.disabled = this.state.loop_points < item.point_value;
    btn.querySelector('span').textContent = this.state.loop_points < item.point_value ? 'NOT ENOUGH POINTS' : 'CLAIM ITEM';
    this.openModal('claim-modal');
  },

  confirmClaim() {
    const item = this.state.claimingItem;
    if (!item || this.state.loop_points < item.point_value) return;
    this.state.loop_points -= item.point_value;
    this.state.items_claimed++;
    item.status = 'claimed';
    const code = 'CIRCL-' + Math.random().toString(36).substr(2, 6).toUpperCase();
    this.closeModal('claim-modal');
    document.getElementById('qr-item-name').textContent = item.title;
    document.getElementById('qr-pickup-code').textContent = code;
    this.drawQR(code);
    MOCK.handoffs.push({ id: 'h' + Date.now(), item: item.title, buyer: 'You', status: 'pending', emoji: item.emoji });
    this.openModal('qr-modal');
    this.updatePointsDisplay();
    this.renderMarketplace();
    this.renderDashboard();
    this.renderStation();
    this.renderProfile();
  },

  drawQR(code) {
    const canvas = document.getElementById('qr-canvas');
    const ctx = canvas.getContext('2d');
    const s = 180; ctx.clearRect(0, 0, s, s);
    ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, s, s);
    // Draw pixel pattern as mock QR
    const grid = 18; const cell = s / grid;
    ctx.fillStyle = '#212529';
    // Corner squares
    for (let i = 0; i < 7; i++) for (let j = 0; j < 7; j++) {
      if (i === 0 || i === 6 || j === 0 || j === 6 || (i >= 2 && i <= 4 && j >= 2 && j <= 4))
        { ctx.fillRect(i * cell, j * cell, cell, cell); ctx.fillRect((grid - 7 + i) * cell, j * cell, cell, cell); ctx.fillRect(i * cell, (grid - 7 + j) * cell, cell, cell); }
    }
    // Data pixels from code hash
    for (let i = 0; i < code.length; i++) {
      const ch = code.charCodeAt(i);
      for (let b = 0; b < 4; b++) {
        if ((ch >> b) & 1) {
          const x = 8 + ((i * 4 + b) % 9);
          const y = 8 + Math.floor((i * 4 + b) / 9);
          if (x < grid && y < grid) ctx.fillRect(x * cell, y * cell, cell, cell);
        }
      }
    }
  },

  simulateScan() {
    const handoff = MOCK.handoffs.find(h => h.status === 'ready') || MOCK.handoffs[0];
    if (!handoff) return;
    document.getElementById('scan-result-text').textContent = 'Item: ' + handoff.item;
    document.getElementById('scan-item-details').innerHTML = '<div style="font-size:.8rem;margin:8px 0">Buyer: ' + handoff.buyer + '</div>';
    this.state.scanningHandoff = handoff;
    this.openModal('scan-modal');
  },

  confirmHandoff() {
    if (this.state.scanningHandoff) {
      this.state.scanningHandoff.status = 'completed';
      MOCK.handoffs = MOCK.handoffs.filter(h => h.id !== this.state.scanningHandoff.id);
    }
    this.closeModal('scan-modal');
    this.renderStation();
  },

  completeHandoff(id) {
    MOCK.handoffs = MOCK.handoffs.filter(h => h.id !== id);
    this.renderStation();
  },

  updatePointsDisplay() {
    document.getElementById('header-points').textContent = this.state.loop_points;
    document.getElementById('hero-points').textContent = this.state.loop_points;
    document.getElementById('profile-points').textContent = this.state.loop_points;
  },

  openModal(id) { document.getElementById(id).classList.remove('hidden'); },
  closeModal(id) { document.getElementById(id).classList.add('hidden'); }
};

// Boot
document.addEventListener('DOMContentLoaded', () => CIRCL.init());
