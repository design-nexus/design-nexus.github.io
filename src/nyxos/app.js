// NyxOS webpage interactions: pixel wordmark, live theme switcher, 34-app catalog, clipboard copy, shot isolation.

const THEMES = [
  { id: 'nyx-dark', name: 'Nyx Dark', light: false, bg: '#09090a', panel: '#161617', border: '#2a2a2d', swatches: ['#5b9cff', '#9d7bff', '#ff6fae', '#46d08a', '#4cc9d6'], note: 'Neutral near-black. The suite default.' },
  { id: 'nyx-light', name: 'Nyx Light', light: true, bg: '#f7f7f8', panel: '#ffffff', border: '#dcdce1', swatches: ['#2f6fea', '#6f4de0', '#c93a7b', '#1f9e5c', '#1a8fa0'], note: 'Crisp light counterpart with deeper accents.' },
  { id: 'catppuccin-mocha', name: 'Catppuccin Mocha', light: false, bg: '#1e1e2e', panel: '#262637', border: '#393a50', swatches: ['#89b4fa', '#cba6f7', '#f5c2e7', '#a6e3a1', '#94e2d5'], note: 'Soothing pastels on a warm slate base.' },
  { id: 'tokyo-night', name: 'Tokyo Night', light: false, bg: '#1a1b26', panel: '#1f2335', border: '#2f334d', swatches: ['#7aa2f7', '#bb9af7', '#ff79c6', '#9ece6a', '#73daca'], note: 'Neon accents over deep indigo shadows.' },
  { id: 'dracula', name: 'Dracula', light: false, bg: '#282a36', panel: '#2e303e', border: '#44475a', swatches: ['#8aa4ff', '#bd93f9', '#ff79c6', '#50fa7b', '#8be9fd'], note: 'Classic high-contrast dark palette.' },
];

const CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'productivity', label: 'Productivity' },
  { id: 'communication', label: 'Communication' },
  { id: 'media', label: 'Media' },
  { id: 'files', label: 'Internet & files' },
  { id: 'system', label: 'System & dev' },
];

const APPS = [
  { id: 'office', icon: 'Office', name: 'Office', category: 'productivity', featured: true, tagline: 'Write, Sheets and Present: documents, spreadsheets and slides.', highlights: ['Opens Word, Excel, PowerPoint and ODF', 'Unified right-hand inspector', 'PDF export and print'] },
  { id: 'notes', icon: 'Notes', name: 'Notes', category: 'productivity', featured: true, tagline: 'A Markdown workspace for plain folders and vaults.', highlights: ['Live preview, source and reading modes', 'Wikilinks, backlinks and nested tags', 'Instant search across your library'] },
  { id: 'calendar', icon: 'Calendar', name: 'Calendar', category: 'productivity', tagline: 'Synced calendars and agenda in one view.', highlights: ['Natural-language quick add', 'Day, week, month and agenda views', 'Offline local cache'] },
  { id: 'reminders', icon: 'Reminders', name: 'Reminders', category: 'productivity', tagline: 'Tasks from Nextcloud, Google, Microsoft, iCloud and local lists.', highlights: ['Subtasks, repeats and due alerts', 'Snooze from notifications', 'Shared with the bar clock'] },
  { id: 'pdf', icon: 'Pdf', name: 'PDF', category: 'productivity', tagline: 'A fast native PDF reader and annotator.', highlights: ['Mark up, fill forms and sign', 'Reorder pages', 'Outline and thumbnail rails'] },
  { id: 'notepad', icon: 'Notepad', name: 'Notepad', category: 'productivity', tagline: 'Plain-text scratchpad that keeps every tab.', highlights: ['Restores unsaved buffers', 'Reopen closed tabs', '80- or 100-column focus view'] },
  { id: 'calculator', icon: 'Calculator', name: 'Calculator', category: 'productivity', tagline: 'Standard, scientific, programmer and graphing modes.', highlights: ['Exact decimal math', 'Switch modes on Alt+1 to Alt+6', 'Searchable history'] },
  { id: 'contacts', icon: 'Contacts', name: 'Contacts', category: 'productivity', tagline: 'Local and CardDAV address book with fast lookup.', highlights: ['vCard and CSV import/export', 'Duplicate detection', 'Syncs with Online Accounts'] },

  { id: 'mail', icon: 'Mail', name: 'Mail', category: 'communication', featured: true, tagline: 'Unified multi-account email, readable offline.', highlights: ['Google, Microsoft 365, Fastmail, IMAP', 'Focused screening and reminders', 'Background sync daemon'] },
  { id: 'chat', icon: 'Chat', name: 'Chat', category: 'communication', tagline: 'Desktop chat client connected to Nyx AI Core.', highlights: ['Uses shared local llama.cpp runtime', 'Tools, web search and formulas', 'Syntax-highlighted responses'] },
  { id: 'pulse', icon: 'Pulse', name: 'Pulse', category: 'communication', tagline: 'Native Telegram client built on TDLib.', highlights: ['Voice and video calls', 'Multi-account support', 'Follows Nyx themes'] },

  { id: 'music', icon: 'Music', name: 'Music', category: 'media', tagline: 'Library, radio and podcasts with live spectrum.', highlights: ['FLAC, Opus and AAC', 'Integrated Control Center controls', 'Dock context card playback'] },
  { id: 'media-player', icon: 'MediaPlayer', name: 'Media Player', category: 'media', tagline: 'Video player powered by mpv with resume support.', highlights: ['Continue watching queue', 'Clean half-tile chrome', 'Hardware-accelerated decode'] },
  { id: 'theater', icon: 'Theater', name: 'Theater', category: 'media', tagline: 'Plex and Jellyfin libraries together.', highlights: ['Unified home library', 'Synced playback progress', 'Tokens stored in keyring'] },
  { id: 'photos', icon: 'Photos', name: 'Photos', category: 'media', tagline: 'Keyboard-first gallery, timeline and Photo Viewer.', highlights: ['Fast date scrubbing', 'Albums and duplicates', 'EXIF inspector drawer'] },
  { id: 'capture', icon: 'Capture', name: 'Capture', category: 'media', tagline: 'Screenshots, annotations, OCR and screen recording.', highlights: ['Region, window or monitor', 'OCR indexed for Glimpse search', 'Live timer pill in Nyx Bar'] },
  { id: 'fonts', icon: 'Fonts', name: 'Fonts', category: 'media', tagline: 'Preview Google Fonts and Nerd Fonts before installing.', highlights: ['Custom sample strings', 'Live desktop font install', 'Zero clutter until chosen'] },

  { id: 'files', icon: 'Files', name: 'Files', category: 'files', featured: true, tagline: 'Fast GTK 4 file manager with mounted cloud storage.', highlights: ['Tabs and Space-bar Quick Look', 'Cloud accounts mounted via Nyx Cloud', 'Async background transfers'] },
  { id: 'cloud', icon: null, name: 'Cloud', category: 'files', tagline: 'Shared rclone storage daemon behind Files and Settings.', highlights: ['User-scoped daemon', 'Mounts on demand or login', 'Cache and bandwidth controls'] },
  { id: 'transfer', icon: 'Transfer', name: 'Transfer', category: 'files', tagline: 'Queued SFTP, FTP, FTPS and WebDAV transfers.', highlights: ['Survives closing the window', 'Imports cloud remotes', 'Collision-safe overwrites'] },
  { id: 'torrents', icon: 'Torrents', name: 'Torrents', category: 'files', tagline: 'Clean BitTorrent client built on libtorrent.', highlights: ['Magnet links and v2 torrents', 'Pieces map and speed graph', 'Tag filtering'] },
  { id: 'archive', icon: 'Archive', name: 'Archive', category: 'files', tagline: '7-Zip archive browser and extractor.', highlights: ['Handles massive archives quickly', 'Drag files in or out', 'Edit entries in place'] },
  { id: 'news', icon: 'News', name: 'News', category: 'files', tagline: 'Offline RSS, Atom and JSON Feed reader.', highlights: ['Readable cached articles', 'Folders and starred items', 'No tracking proxy'] },
  { id: 'weather', icon: 'Weather', name: 'Weather', category: 'files', tagline: 'Forecasts, precipitation radar and bar widgets.', highlights: ['Short-range nowcasts', '48h temperature curves', 'Live pill in Nyx Bar'] },
  { id: 'maps', icon: 'Maps', name: 'Maps', category: 'files', tagline: 'Native vector maps tinted with your active theme.', highlights: ['Topographic and transit layers', 'Turn-by-turn routing', 'Local search'] },

  { id: 'settings', icon: 'Settings', name: 'Settings', category: 'system', featured: true, tagline: 'System home, NixOS generations, displays and hardware.', highlights: ['Build-before-switch updates', 'CPU/RAM/Temp/Battery overview', 'Limine & Btrfs snapshot controls'] },
  { id: 'store', icon: 'Store', name: 'Store', category: 'system', tagline: 'Browse Nyx apps and install declaratively.', highlights: ['Curated suite overview', 'Coordinates system rebuilds', 'No fragmented updaters'] },
  { id: 'glimpse', icon: 'Glimpse', name: 'Glimpse', category: 'system', tagline: 'Super+Space universal launcher with local plugins.', highlights: ['Files, apps, math and OCR text', 'Plugin actions via Ctrl+K', 'Opt-in semantic search'] },
  { id: 'activity', icon: 'Activity', name: 'Activity', category: 'system', tagline: 'Live system telemetry, processes and startup units.', highlights: ['Per-core CPU, GPU and disk charts', 'Tree and process views', 'Filter by unit or PID'] },
  { id: 'git', icon: 'Git', name: 'Git', category: 'system', tagline: 'Native Git client with commit graph and worktrees.', highlights: ['Hunk staging and stashes', 'Merge conflict resolver', 'Repo-wide switch support'] },
  { id: 'containers', icon: 'Containers', name: 'Containers', category: 'system', tagline: 'Docker and Incus stacks, logs and VMs.', highlights: ['Local and SSH remotes', 'Compose lifecycle control', 'Clean live log stream'] },
  { id: 'passwords', icon: 'Passwords', name: 'Passwords', category: 'system', tagline: 'Native Vaultwarden client backed by keyring.', highlights: ['Logins, TOTP codes and SSH keys', 'Locks on screen sleep', 'Clipboard auto-clear'] },
  { id: 'home', icon: 'Home', name: 'Home', category: 'system', tagline: 'Native Home Assistant dashboard for your desktop.', highlights: ['Rooms, scenes and presence', 'Automations from lock/unlock', 'Theme-native cards'] },
  { id: 'assistant', icon: 'Assistant', name: 'Assistant', category: 'system', tagline: 'Hold Alt+Space for local voice commands and replies.', highlights: ['Parakeet / Whisper + Kokoro', 'Controls bar, lighting and power', 'Reloads TOML personas live'] },
];

const WORDMARK_GLYPHS = {
  N: ['1001', '1101', '1101', '1011', '1011', '1001', '1001'],
  Y: ['1001', '1001', '1001', '0110', '0110', '0110', '0110'],
  X: ['1001', '1001', '0110', '0110', '0110', '1001', '1001'],
  O: ['0110', '1001', '1001', '1001', '1001', '1001', '0110'],
  S: ['0111', '1000', '1000', '0110', '0001', '0001', '1110'],
};

function buildWordmark(el) {
  const label = el.dataset.wordmark || 'NYXOS';
  const chars = [...label];
  const cols = chars.reduce((w, ch) => w + WORDMARK_GLYPHS[ch][0].length + 1, -1);
  el.style.setProperty('--columns', cols);
  el.textContent = '';
  let cursor = 0;
  let idx = 0;
  for (const ch of chars) {
    const rows = WORDMARK_GLYPHS[ch];
    rows.forEach((row, y) => {
      [...row].forEach((bit, x) => {
        if (bit !== '1') return;
        const pix = document.createElement('i');
        pix.className = 'nyx-pixel';
        pix.style.setProperty('--x', cursor + x);
        pix.style.setProperty('--y', y);
        pix.style.setProperty('--delay', `${160 + idx++ * 22}ms`);
        el.appendChild(pix);
      });
    });
    cursor += rows[0].length + 1;
  }
  return {
    redraw() {
      const pixels = el.querySelectorAll('.nyx-pixel');
      pixels.forEach((p) => p.classList.remove('is-drawing'));
      void el.offsetWidth;
      requestAnimationFrame(() => pixels.forEach((p) => p.classList.add('is-drawing')));
    },
  };
}

let activeTheme = THEMES[0].id;

function initialThemeId() {
  const q = new URLSearchParams(location.search).get('theme');
  const map = { dark: 'nyx-dark', light: 'nyx-light' };
  const resolved = map[q] || q;
  if (THEMES.some((t) => t.id === resolved)) return resolved;
  try {
    const saved = localStorage.getItem('nyxos-web-theme');
    if (THEMES.some((t) => t.id === saved)) return saved;
  } catch {}
  return matchMedia('(prefers-color-scheme: light)').matches ? 'nyx-light' : 'nyx-dark';
}

function applyTheme(id, origin) {
  const theme = THEMES.find((t) => t.id === id) || THEMES[0];
  const commit = () => {
    activeTheme = theme.id;
    document.documentElement.dataset.theme = theme.id;
    document.documentElement.style.colorScheme = theme.light ? 'light' : 'dark';
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme.bg);
    document.querySelectorAll('.theme-label, .theme-live-name').forEach((el) => { el.textContent = theme.name; });
    document.querySelectorAll('.theme-menu button').forEach((btn) => {
      btn.setAttribute('aria-current', btn.dataset.theme === theme.id ? 'true' : 'false');
    });
    document.querySelectorAll('.theme-card').forEach((card) => {
      const isAct = card.dataset.theme === theme.id;
      card.classList.toggle('active', isAct);
      const badge = card.querySelector('.theme-meta small');
      if (badge) badge.textContent = isAct ? 'Active' : 'Try it';
    });
    try { localStorage.setItem('nyxos-web-theme', theme.id); } catch {}
  };

  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!origin || !document.startViewTransition || reduce) {
    commit();
    return;
  }
  const { x, y } = origin;
  const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
  const tr = document.startViewTransition(commit);
  tr.ready.then(() => {
    document.documentElement.animate(
      { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
      { duration: 520, easing: 'cubic-bezier(.4, 0, .2, 1)', pseudoElement: '::view-transition-new(root)' },
    );
  }).catch(() => {});
}

function renderThemesUI() {
  const menu = document.getElementById('theme-menu');
  const cards = document.getElementById('theme-cards');
  const pills = document.getElementById('hero-theme-pills');
  THEMES.forEach((t, i) => {
    if (menu) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.dataset.theme = t.id;
      btn.innerHTML = `<span>${t.name}</span><span class="theme-swatches">${t.swatches.slice(0, 3).map((c) => `<i style="background:${c}"></i>`).join('')}</span>`;
      btn.addEventListener('click', (e) => {
        applyTheme(t.id, { x: e.clientX, y: e.clientY });
        document.getElementById('theme-switch').open = false;
      });
      menu.appendChild(btn);
    }
    if (cards) {
      const card = document.createElement('button');
      card.type = 'button';
      card.className = `theme-card${i === 0 ? ' wide' : ''}`;
      card.dataset.theme = t.id;
      card.style.background = t.bg;
      card.style.borderColor = t.border;
      card.style.color = t.light ? '#18181b' : '#e8e8ea';
      card.innerHTML = `
        <div class="theme-preview" style="background:${t.panel};border-color:${t.border}">
          ${t.swatches.map((c) => `<i style="background:${c}"></i>`).join('')}
        </div>
        <div class="theme-meta"><span>${t.name}</span><small style="color:${t.light ? '#5a5a64' : '#9a9aa1'}">Try it</small></div>
        <p style="color:${t.light ? '#5a5a64' : '#9a9aa1'}">${t.note}</p>
      `;
      card.addEventListener('click', (e) => applyTheme(t.id, { x: e.clientX, y: e.clientY }));
      cards.appendChild(card);
    }
    if (pills) {
      const pill = document.createElement('button');
      pill.type = 'button';
      pill.textContent = t.name;
      pill.dataset.theme = t.id;
      pill.addEventListener('click', (e) => applyTheme(t.id, { x: e.clientX, y: e.clientY }));
      pills.appendChild(pill);
    }
  });
}

function setupApps() {
  const tabsEl = document.getElementById('cat-tabs');
  const gridEl = document.getElementById('app-grid');
  const emptyEl = document.getElementById('apps-empty');
  const queryEl = document.getElementById('apps-query');
  const resetBtn = document.getElementById('apps-reset');
  if (!tabsEl || !gridEl) return;

  let currentCat = 'all';

  function renderTabs() {
    tabsEl.textContent = '';
    CATEGORIES.forEach((cat) => {
      const count = cat.id === 'all' ? APPS.length : APPS.filter((a) => a.category === cat.id).length;
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.role = 'tab';
      btn.setAttribute('aria-selected', currentCat === cat.id ? 'true' : 'false');
      btn.innerHTML = `${cat.label} <span class="n">${count}</span>`;
      btn.addEventListener('click', () => {
        currentCat = cat.id;
        renderTabs();
        renderGrid();
      });
      tabsEl.appendChild(btn);
    });
  }

  function renderGrid() {
    const needle = (queryEl?.value || '').trim().toLowerCase();
    const list = APPS.filter((app) => {
      if (currentCat !== 'all' && app.category !== currentCat) return false;
      if (!needle) return true;
      return [app.name, app.tagline, ...app.highlights].join(' ').toLowerCase().includes(needle);
    });

    gridEl.textContent = '';
    if (emptyEl) emptyEl.hidden = list.length > 0;
    const showFeatured = currentCat === 'all' && !needle;

    list.forEach((app) => {
      const card = document.createElement('article');
      card.className = `nyx-card app-card${showFeatured && app.featured ? ' wide' : ''}`;
      const icoHtml = app.icon
        ? `<img src="/nyxos/icons/io.github.design_nexus.nyx.${app.icon}.svg" alt="" width="34" height="34" decoding="async">`
        : `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgb(var(--nyx-teal))" stroke-width="2" aria-hidden="true"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/></svg>`;
      card.innerHTML = `
        <div class="app-top">
          <div class="app-ico">${icoHtml}</div>
          <div>
            <h3>${app.name}</h3>
            <p>${app.tagline}</p>
          </div>
        </div>
        <ul class="app-hl">${app.highlights.map((h) => `<li>${h}</li>`).join('')}</ul>
      `;
      gridEl.appendChild(card);
    });
  }

  queryEl?.addEventListener('input', renderGrid);
  resetBtn?.addEventListener('click', () => {
    currentCat = 'all';
    if (queryEl) queryEl.value = '';
    renderTabs();
    renderGrid();
  });

  window.addEventListener('keydown', (e) => {
    const typing = e.target instanceof HTMLElement && e.target.closest('input, textarea');
    if ((e.key.toLowerCase() === 'k' && (e.ctrlKey || e.metaKey)) || (e.key === '/' && !typing)) {
      e.preventDefault();
      queryEl?.scrollIntoView({ block: 'center' });
      queryEl?.focus({ preventScroll: true });
    }
  });

  renderTabs();
  renderGrid();
}

function setupHeaderAndCopy() {
  const header = document.getElementById('header');
  const onScroll = () => header?.classList.toggle('is-scrolled', window.scrollY > 12);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const menuBtn = document.getElementById('menu-btn');
  const mobileNav = document.getElementById('mobile-nav');
  menuBtn?.addEventListener('click', () => {
    const open = mobileNav?.classList.toggle('is-open');
    menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  mobileNav?.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', () => {
      mobileNav.classList.remove('is-open');
      menuBtn?.setAttribute('aria-expanded', 'false');
    });
  });

  document.addEventListener('click', (e) => {
    const sw = document.getElementById('theme-switch');
    if (sw?.open && !sw.contains(e.target)) sw.open = false;
  });

  const copyBtn = document.getElementById('install-copy');
  copyBtn?.addEventListener('click', async () => {
    try {
      await navigator.clipboard?.writeText('sudo dd if=nyxos-0.1.0.iso of=/dev/sda bs=4M status=progress oflag=sync');
    } catch {}
    copyBtn.textContent = 'Copied';
    setTimeout(() => { copyBtn.textContent = 'Copy'; }, 1500);
  });
}

function setupRevealAndShots() {
  const shot = new URLSearchParams(location.search).get('shot') === '1';
  if (shot || !('IntersectionObserver' in window)) {
    document.querySelectorAll('.nyx-reveal').forEach((el) => el.classList.add('is-visible'));
    document.querySelectorAll('.nyx-pixel').forEach((p) => { p.style.opacity = '1'; p.style.transform = 'none'; });
  } else {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    document.querySelectorAll('.nyx-reveal').forEach((el) => io.observe(el));
  }

  const section = new URLSearchParams(location.search).get('section');
  if (!section) return;
  const keep = document.getElementById(section);
  if (!keep) return;
  document.querySelectorAll('main > section').forEach((el) => {
    if (el !== keep) el.style.display = 'none';
  });
  document.getElementById('header')?.style.setProperty('display', 'none');
  document.querySelector('.site-footer')?.style.setProperty('display', 'none');
  keep.style.paddingTop = '3rem';
  window.scrollTo(0, 0);
}

renderThemesUI();
applyTheme(initialThemeId());

const marks = [...document.querySelectorAll('.nyx-wordmark')].map((el) => {
  const api = buildWordmark(el);
  if (!el.hasAttribute('data-small')) {
    requestAnimationFrame(() => requestAnimationFrame(() => {
      el.querySelectorAll('.nyx-pixel').forEach((p) => p.classList.add('is-drawing'));
    }));
  }
  return { el, api };
});

document.getElementById('wordmark-btn')?.addEventListener('click', () => {
  marks.find((m) => !m.el.hasAttribute('data-small'))?.api.redraw();
});

setupApps();
setupHeaderAndCopy();
setupRevealAndShots();
