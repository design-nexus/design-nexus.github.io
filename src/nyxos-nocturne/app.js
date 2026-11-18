// NyxOS webpage interactions: pixel wordmark, live theme switcher, 34-app catalog, clipboard copy, shot isolation.

const THEMES = [
  { id: 'nyx-nocturne', name: 'Nyx Nocturne', light: false, bg: '#060608', panel: '#111217', border: '#2a2c36', swatches: ['#f4f5f8', '#dfd3b4', '#98a6bf', '#84c2a2', '#a8c6cc'], note: 'Obsidian cosmos & eclipsed lunar silver.' },
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

const ICON_PALETTES = {
  'nyx-nocturne': {
    top: '#1c1e25', bot: '#0b0c10', cut: '#101116',
    families: {
      blue: ['#b8c8e2', '#8295b5'], violet: ['#ccc4df', '#968db0'], pink: ['#f2ede2', '#c8bea4'],
      red: ['#dfb8b2', '#b0847e'], coral: ['#dec2b2', '#ae8e7e'], amber: ['#e8dcbe', '#beae84'],
      green: ['#b4d2be', '#82a48e'], teal: ['#bad6da', '#86a6ac'], graphite: ['#ced3dd', '#969dac'],
    },
  },
  'nyx-light': {
    top: '#fbfbfd', bot: '#e7e7ec', cut: '#f4f4f7',
    families: {
      blue: ['#447ff5', '#2154c4'], violet: ['#8362eb', '#5637ba'], pink: ['#df4e8f', '#ae2463'],
      red: ['#e85252', '#ba2727'], coral: ['#e56b47', '#b64120'], amber: ['#dc9528', '#a86910'],
      green: ['#32b470', '#18844c'], teal: ['#2ca5b8', '#157685'], graphite: ['#6e7280', '#484c58'],
    },
  },
  'catppuccin-mocha': {
    top: '#323347', bot: '#202130', cut: '#252638',
    families: {
      blue: ['#a4c6ff', '#89b4fa'], violet: ['#d8befa', '#cba6f7'], pink: ['#fad3ee', '#f5c2e7'],
      red: ['#f7a5bd', '#f38ba8'], coral: ['#fcc5a3', '#fab387'], amber: ['#fbecc3', '#f9e2af'],
      green: ['#bcebb8', '#a6e3a1'], teal: ['#afeae0', '#94e2d5'], graphite: ['#bac2de', '#9399b2'],
    },
  },
  'tokyo-night': {
    top: '#282d42', bot: '#1a1b26', cut: '#202230',
    families: {
      blue: ['#95b5fa', '#7aa2f7'], violet: ['#cbb2fa', '#bb9af7'], pink: ['#ff97d2', '#ff79c6'],
      red: ['#f993a6', '#f7768e'], coral: ['#ffb282', '#ff9e64'], amber: ['#ebc286', '#e0af68'],
      green: ['#b4da8a', '#9ece6a'], teal: ['#93e3d5', '#73daca'], graphite: ['#a9b1d6', '#7882a6'],
    },
  },
  dracula: {
    top: '#3b3e52', bot: '#282a36', cut: '#303242',
    families: {
      blue: ['#a4b9ff', '#8aa4ff'], violet: ['#cfaefa', '#bd93f9'], pink: ['#ff97d2', '#ff79c6'],
      red: ['#ff7b7b', '#ff5555'], coral: ['#ffc88e', '#ffb86c'], amber: ['#f5fcab', '#f1fa8c'],
      green: ['#7cff9d', '#50fa7b'], teal: ['#aaf0ff', '#8be9fd'], graphite: ['#c8cce2', '#8c94bc'],
    },
  },
};

// Glyphs from nyx-design/crates/nyx-icons/app-glyphs.json + tuned swatches for live icon retheming.
const APP_GLYPHS = {
  Files: { fam: 'blue', back: 'M30 46a8 8 0 0 1 8-8h17a6 6 0 0 1 4.2 1.8L64 44h26a8 8 0 0 1 8 8v4H30z', front: 'M30 58a6 6 0 0 1 6-6h56a6 6 0 0 1 6 6v28a8 8 0 0 1-8 8H38a8 8 0 0 1-8-8z', detail: 'M54 72h20' },
  Notes: { fam: 'amber', back: 'M52 28h36a6 6 0 0 1 6 6v52a6 6 0 0 1-6 6H52a6 6 0 0 1-6-6V34a6 6 0 0 1 6-6z', front: 'M40 38h38a6 6 0 0 1 6 6v52a6 6 0 0 1-6 6H40a6 6 0 0 1-6-6V44a6 6 0 0 1 6-6z', detail: 'M46 56h26M46 68h26M46 80h16' },
  Settings: { fam: 'graphite', back: 'M33 45h62a3 3 0 0 1 0 6H33a3 3 0 0 1 0-6zM33 61h62a3 3 0 0 1 0 6H33a3 3 0 0 1 0-6zM33 77h62a3 3 0 0 1 0 6H33a3 3 0 0 1 0-6z', front: 'M49 48a9 9 0 1 0 18 0a9 9 0 1 0-18 0zM71 64a9 9 0 1 0 18 0a9 9 0 1 0-18 0zM39 80a9 9 0 1 0 18 0a9 9 0 1 0-18 0z', detail: '' },
  Photos: { fam: 'coral', back: 'M50 28h40a6 6 0 0 1 6 6v38a6 6 0 0 1-6 6H50a6 6 0 0 1-6-6V34a6 6 0 0 1 6-6z', front: 'M38 42h44a6 6 0 0 1 6 6v44a6 6 0 0 1-6 6H38a6 6 0 0 1-6-6V48a6 6 0 0 1 6-6z', detail: 'M40 88l13-13 9 9 7-7 11 11M68 56h.01' },
  Mail: { fam: 'violet', back: 'M42 30h44a4 4 0 0 1 4 4v24H38V34a4 4 0 0 1 4-4z', front: 'M30 48a6 6 0 0 1 6-6h56a6 6 0 0 1 6 6v36a6 6 0 0 1-6 6H36a6 6 0 0 1-6-6z', detail: 'M34 48l30 21 30-21' },
  Music: { fam: 'pink', back: 'M30 64a34 34 0 1 0 68 0a34 34 0 1 0-68 0z', front: 'M68 36h6v46h-6zM74 36q16 4 16 20q-5-9-16-9zM50 82a12 10 0 1 0 24 0a12 10 0 1 0-24 0z', detail: '' },
  Home: { fam: 'green', back: 'M64 26l42 32-5 6-37-28-37 28-5-6z', front: 'M64 40l30 23v29a6 6 0 0 1-6 6H40a6 6 0 0 1-6-6V63z', detail: 'M57 98V80h14v18' },
  Activity: { fam: 'violet', back: 'M26 48H102V84H26Z', front: 'M28 66H44L54 40L68 88L78 58L84 66H100', detail: '' },
  Archive: { fam: 'amber', back: 'M34 44H94V98H34Z', front: 'M28 30H100V50H28Z M38 50H90V94H38Z', detail: 'M64 38v10m0 8v8m0 8v8m-5 7h10' },
  Calculator: { fam: 'amber', back: 'M46 26H94V96H46Z', front: 'M34 32H86V102H34Z', detail: 'M44 44h32v14H44z M46 72h4m16 0h4m-24 16h4m16 0h4' },
  Calendar: { fam: 'red', back: 'M38 28H94V88H38Z', front: 'M30 38H90V100H30Z', detail: 'M30 56h60M46 32v14m28-14v14M44 70h5m12 0h5m12 0h1M44 84h5m12 0h5' },
  Capture: { fam: 'coral', back: 'M40 28H100V80H40Z', front: 'M30 40H90V92H30Z', detail: 'M40 52h40v28H40zM26 34v-8h10m56 68h10v-10' },
  Chat: { fam: 'violet', back: 'M44 28H100V76H84L72 88V76H44Z', front: 'M28 40H88V88H48L34 100V88H28Z', detail: 'M44 62h.01m14 0h.01m14 0h.01' },
  Contacts: { fam: 'blue', back: 'M46 26H96V94H46Z', front: 'M34 34H86V102H34Z', detail: 'M58 64a10 10 0 1 0 0-20a10 10 0 1 0 0 20M44 86q14-24 28 0M28 48h12m-12 20h12m-12 20h12' },
  Containers: { fam: 'teal', back: 'M64 24L104 46V86L64 108L24 86V46Z', front: 'M64 38L92 54V82L64 98L36 82V54Z', detail: 'M36 54l28 16 28-16M64 70v28' },
  Fonts: { fam: 'violet', back: 'M24 34H76V94H24Z', front: 'M30 92L50 34H62L82 92H68L64 78H46L42 92Z M84 64H100V92H84Z', detail: 'M50 66h10' },
  Git: { fam: 'coral', back: 'M42 28H56V98H42Z M78 30H92V66H78Z', front: 'M34 40a14 14 0 1 0 28 0a14 14 0 1 0-28 0 M34 90a14 14 0 1 0 28 0a14 14 0 1 0-28 0 M72 40a14 14 0 1 0 28 0a14 14 0 1 0-28 0', detail: 'M50 70q36 0 36-18' },
  Glimpse: { fam: 'violet', back: 'M24 58Q64 8 104 58Q64 108 24 58Z', front: 'M38 58a26 26 0 1 0 52 0a26 26 0 1 0-52 0 M82 80L104 102L96 110L74 88Z', detail: 'M54 58a10 10 0 1 0 20 0a10 10 0 1 0-20 0' },
  Maps: { fam: 'blue', back: 'M24 38L52 28L78 38L104 28V94L78 104L52 94L24 104Z', front: 'M52 28L78 38V104L52 94Z M54 48a16 16 0 1 1 32 0Q86 62 70 80Q54 62 54 48Z', detail: 'M70 44v.01' },
  MediaPlayer: { fam: 'blue', back: 'M40 28H100V82H40Z', front: 'M28 40H92V96H28Z', detail: 'M54 54l22 14-22 14z' },
  News: { fam: 'violet', back: 'M44 28H100V90H44Z', front: 'M28 38H88V100H28Z', detail: 'M40 50h36M40 62h12v16H40zM62 62h14m-14 12h14M40 88h36' },
  Notepad: { fam: 'amber', back: 'M44 26H94V92H44Z', front: 'M32 36H82V102H32Z M72 84L94 62L104 72L82 94L68 98Z', detail: 'M44 52h26M44 64h22M44 76h12' },
  Office: { fam: 'amber', back: 'M48 24H100V88H48Z', front: 'M30 38H82V104H30Z', detail: 'M44 54h24M44 68h24M44 82h16' },
  Passwords: { fam: 'green', back: 'M42 54V44A22 22 0 0 1 86 44V64H76V44A12 12 0 0 0 52 44V64H42Z', front: 'M32 54H96V100H32Z', detail: 'M64 70v14' },
  Pdf: { fam: 'red', back: 'M48 24H82L100 42V90H48Z', front: 'M30 34H66L86 54V104H30Z', detail: 'M64 36v20h20M42 72h30M42 86h22' },
  Pulse: { fam: 'teal', back: 'M24 60L106 26L78 108L58 78Z', front: 'M30 58L98 32L62 76Z M62 76L78 98L98 32Z', detail: 'M62 76l36-44' },
  Reminders: { fam: 'violet', back: 'M46 26H98V92H46Z', front: 'M30 36H84V102H30Z', detail: 'M40 54l5 5 9-12M62 54h12M42 74h7m13 0h12M42 90h7m13 0h12' },
  Store: { fam: 'green', back: 'M44 46V36A20 20 0 0 1 84 36V56H74V36A10 10 0 0 0 54 36V56H44Z', front: 'M32 46H96L102 102H26Z', detail: 'M52 72h24M64 60v24' },
  Theater: { fam: 'pink', back: 'M40 24H102V70H40Z', front: 'M26 34H90V78H26Z M30 90H52V104H30Z M76 90H98V104H76Z', detail: 'M50 44l22 12-22 12z' },
  Torrents: { fam: 'green', back: 'M28 72H100V102H28Z', front: 'M56 26H72V62H92L64 90L36 62H56Z', detail: 'M36 94h56' },
  Transfer: { fam: 'teal', back: 'M28 72H100V86H28Z M28 42H100V56H28Z', front: 'M28 42H78V28L104 49L78 70V56H28Z M100 72H50V58L24 79L50 100V86H100Z', detail: '' },
  Weather: { fam: 'teal', back: 'M34 48a20 20 0 1 0 40 0a20 20 0 1 0-40 0', front: 'M30 66Q30 48 50 48Q62 26 80 50Q104 46 104 68Q104 84 86 84H46Q30 84 30 66Z', detail: 'M46 94l-4 8m22-8l-4 8m22-8l-4 8' },
  Assistant: { fam: 'teal', back: 'M24 64a40 40 0 1 0 80 0a40 40 0 1 0-80 0Z M96 18C97 25 99 27 106 28C99 29 97 31 96 38C95 31 93 29 86 28C93 27 95 25 96 18Z', front: 'M64 26C68 50 78 60 102 64C78 68 68 78 64 102C60 78 50 68 26 64C50 60 60 50 64 26Z', detail: 'M64 64h.01' },
};

function iconSvgUri(name, themeId) {
  const g = APP_GLYPHS[name];
  if (!g) return null;
  const pal = ICON_PALETTES[themeId] || ICON_PALETTES['nyx-nocturne'];
  const [light, mid] = pal.families[g.fam] || pal.families.blue;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128"><defs><linearGradient id="tile" x1="0" y1="0" x2="1" y2="1"><stop stop-color="${pal.top}"/><stop offset="1" stop-color="${pal.bot}"/></linearGradient><radialGradient id="glow" cx=".2" cy=".1" r=".9"><stop stop-color="${light}" stop-opacity=".22"/><stop offset="1" stop-color="${light}" stop-opacity="0"/></radialGradient><linearGradient id="ink" x1="0" y1="0" x2="1" y2="1"><stop stop-color="${light}"/><stop offset="1" stop-color="${mid}"/></linearGradient></defs><rect x="8" y="8" width="112" height="112" rx="28" fill="url(#tile)"/><rect x="8" y="8" width="112" height="112" rx="28" fill="url(#glow)"/><rect x="8.5" y="8.5" width="111" height="111" rx="27.5" fill="none" stroke="${light}" stroke-opacity=".32"/>${g.back ? `<path d="${g.back}" fill="${light}" fill-opacity=".35"/>` : ''}${g.front ? `<path d="${g.front}" fill="url(#ink)"/>` : ''}${g.detail ? `<path d="${g.detail}" fill="none" stroke="${pal.cut}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>` : ''}</svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

function syncThemedIcons(themeId) {
  document.querySelectorAll('img').forEach((img) => {
    let name = img.dataset.nyxIcon;
    if (!name) {
      const m = (img.getAttribute('src') || '').match(/io\.github\.design_nexus\.nyx\.([^.]+)\.svg/);
      if (!m) return;
      name = m[1];
      img.dataset.nyxIcon = name;
    }
    const uri = iconSvgUri(name, themeId);
    if (uri) img.src = uri;
  });
}

let activeTheme = THEMES[0].id;

function initialThemeId() {
  const q = new URLSearchParams(location.search).get('theme');
  const map = { dark: 'nyx-nocturne', 'nyx-dark': 'nyx-nocturne', light: 'nyx-light' };
  const resolved = map[q] || q;
  if (THEMES.some((t) => t.id === resolved)) return resolved;
  try {
    const saved = localStorage.getItem('nyxos-nocturne-theme');
    if (THEMES.some((t) => t.id === saved)) return saved;
  } catch {}
  return matchMedia('(prefers-color-scheme: light)').matches ? 'nyx-light' : 'nyx-nocturne';
}

function applyTheme(id, origin) {
  const theme = THEMES.find((t) => t.id === id) || THEMES[0];
  const commit = () => {
    activeTheme = theme.id;
    document.documentElement.dataset.theme = theme.id;
    document.documentElement.style.colorScheme = theme.light ? 'light' : 'dark';
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme.bg);
    document.querySelectorAll('.theme-label, .theme-live-name').forEach((el) => { el.textContent = theme.name; });
    syncThemedIcons(theme.id);
    document.querySelectorAll('.theme-menu button').forEach((btn) => {
      btn.setAttribute('aria-current', btn.dataset.theme === theme.id ? 'true' : 'false');
    });
    document.querySelectorAll('.theme-card').forEach((card) => {
      const isAct = card.dataset.theme === theme.id;
      card.classList.toggle('active', isAct);
      const badge = card.querySelector('.theme-meta small');
      if (badge) badge.textContent = isAct ? 'Active' : 'Try it';
    });
    try { localStorage.setItem('nyxos-nocturne-theme', theme.id); } catch {}
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
        ? `<img data-nyx-icon="${app.icon}" src="${iconSvgUri(app.icon, activeTheme) || ''}" alt="" width="34" height="34" decoding="async">`
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
