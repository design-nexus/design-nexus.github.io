export type Swatch = 'blue' | 'violet' | 'pink' | 'red' | 'coral' | 'amber' | 'green' | 'teal'

export type CategoryId = 'productivity' | 'communication' | 'media' | 'files' | 'system'

export interface NyxApp {
  id: string
  name: string
  tagline: string
  category: CategoryId
  accent: Swatch
  highlights: string[]
  /** Path under `public/`; apps without one get a Lucide glyph on the shared tile. */
  icon?: string
  /** The icon has no background of its own. */
  tile?: boolean
  repo: string
  featured?: boolean
  optional?: boolean
  note?: string
}

export const categories: { id: CategoryId | 'all'; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'productivity', label: 'Productivity' },
  { id: 'communication', label: 'Communication' },
  { id: 'media', label: 'Media' },
  { id: 'files', label: 'Internet & files' },
  { id: 'system', label: 'System & dev' },
]

const withoutAppIcon = new Set(['assistant', 'cloud'])

const entries: Omit<NyxApp, 'repo' | 'icon'>[] = [
  // Productivity
  {
    id: 'office', name: 'Office', category: 'productivity', accent: 'blue', featured: true,
    tagline: 'Write, Sheets and Present: documents, spreadsheets and slides.',
    highlights: ['Opens and saves Word, Excel, PowerPoint and OpenDocument', 'Inspector for everything selected', 'PDF export and printing'],
  },
  {
    id: 'notes', name: 'Notes', category: 'productivity', accent: 'amber', featured: true,
    tagline: 'A Markdown workspace for plain folders and Obsidian vaults.',
    highlights: ['Live preview, source and reading modes', 'Wikilinks, backlinks and nested tags', 'Full-text search with filters'],
  },
  {
    id: 'calendar', name: 'Calendar', category: 'productivity', accent: 'red',
    tagline: 'Every calendar from your accounts and this computer in one place.',
    highlights: ['Type “Lunch with Sam tomorrow at 1”', 'Day, week, month and agenda views', 'Works offline'],
  },
  {
    id: 'reminders', name: 'Reminders', category: 'productivity', accent: 'coral',
    tagline: 'Google Tasks, Microsoft To Do, Nextcloud, iCloud and local lists together.',
    highlights: ['Natural-language quick add', 'Subtasks, tags, repeats and alerts', 'Snooze from the notification'],
  },
  {
    id: 'pdf', name: 'PDF', category: 'productivity', accent: 'red',
    tagline: 'A PDF viewer and editor that remembers where you were.',
    highlights: ['Mark up, fill in and sign', 'Rearrange pages', 'Tabs, outline and thumbnails'],
  },
  {
    id: 'notepad', name: 'Notepad', category: 'productivity', accent: 'amber',
    tagline: 'A plain-text notepad with tabs, and nothing to lose.',
    highlights: ['Unsaved text comes back next time', 'Reopen closed tabs', 'Centered 80- or 100-column mode'],
  },
  {
    id: 'calculator', name: 'Calculator', category: 'productivity', accent: 'teal',
    tagline: 'Standard, scientific, scratchpad and graphing in one native app.',
    highlights: ['Exact decimal arithmetic', 'Six modes on Alt+1 to Alt+6', 'Searchable, pinnable history'],
  },
  {
    id: 'contacts', name: 'Contacts', category: 'productivity', accent: 'green',
    tagline: 'A local address book with favorites, lists and birthdays.',
    highlights: ['vCard and CSV import and export', 'Duplicate finder', 'Reads online address books too'],
  },

  // Communication
  {
    id: 'mail', name: 'Mail', category: 'communication', accent: 'violet', featured: true,
    tagline: 'All your accounts in one inbox, readable offline.',
    highlights: ['Google, Microsoft 365, Fastmail, iCloud and IMAP', 'Imbox, The Feed, Paper Trail and the Screener', 'Snooze, send later and follow-up reminders'],
  },
  {
    id: 'chat', name: 'Chat', category: 'communication', accent: 'teal',
    tagline: 'A desktop chat client for your local Ollama models.',
    highlights: ['Tools such as web search', 'Model marketplace for Hugging Face and Ollama', 'Markdown, code and formulas'],
  },
  {
    id: 'pulse', name: 'Pulse', category: 'communication', accent: 'blue',
    tagline: 'A native Telegram client built on TDLib.',
    highlights: ['Voice and video calls', 'Multiple accounts', 'Stickers, albums and Mini Apps'],
  },

  // Media
  {
    id: 'music', name: 'Music', category: 'media', accent: 'pink',
    tagline: 'Your library, radio and podcasts, with a live spectrum.',
    highlights: ['FLAC, Opus, AAC and more', 'Sortable songs, albums and artists', 'Equalizer'],
  },
  {
    id: 'media-player', name: 'Media Player', category: 'media', accent: 'coral',
    tagline: 'A video player for your movies and TV shows, powered by mpv.',
    highlights: ['Continue watching and next episode', 'Poster grids with metadata', 'Library updates within a minute'],
  },
  {
    id: 'theater', name: 'Theater', category: 'media', accent: 'amber',
    tagline: 'Your Plex and Jellyfin movies and shows, together.',
    highlights: ['Browse both servers in one window', 'Pick up where you left off', 'Tokens stay in the keyring'],
  },
  {
    id: 'photos', name: 'Photos', category: 'media', accent: 'coral',
    tagline: 'A keyboard-first photo gallery and editor, with Photo Viewer.',
    highlights: ['Timeline with a date scrubber', 'Albums, favorites and duplicates', 'EXIF details drawer'],
  },
  {
    id: 'capture', name: 'Capture', category: 'media', accent: 'pink',
    tagline: 'Screenshots, annotation, OCR and screen recording.',
    highlights: ['Region, window or screen', 'Read the text in any shot', 'Searchable history in Glimpse'],
  },
  {
    id: 'fonts', name: 'Fonts', category: 'media', accent: 'violet',
    tagline: 'Every Google Font and Nerd Font, previewed and installed in one click.',
    highlights: ['About 1,950 Google families', 'Your own sample text', 'Nothing installed to preview'],
  },

  // Internet & files
  {
    id: 'files', name: 'Files', category: 'files', accent: 'blue', featured: true,
    tagline: 'A file manager with cloud storage built in.',
    highlights: ['Tabs and a Space-bar preview window', 'Cloud accounts mount on demand', 'Async copy and move'],
  },
  {
    id: 'cloud', name: 'Cloud', category: 'files', accent: 'teal',
    tagline: 'The shared rclone storage service behind Files and Settings.',
    highlights: ['User-scoped, no root needed', 'Mount on select or at login', 'Cache and bandwidth limits'],
  },
  {
    id: 'transfer', name: 'Transfer', category: 'files', accent: 'blue',
    tagline: 'Copy between this computer and SFTP, FTP, FTPS and WebDAV.',
    highlights: ['Jobs keep running when you close the window', 'Imports rclone remotes', 'Never silently replaces files'],
  },
  {
    id: 'torrents', name: 'Torrents', category: 'files', accent: 'green',
    tagline: 'A BitTorrent client on a proven libtorrent engine.',
    highlights: ['v1, v2, hybrid and magnet links', 'Pieces map, peers and speed graph', 'Categories and tags'],
  },
  {
    id: 'archive', name: 'Archive', category: 'files', accent: 'amber',
    tagline: 'An archive manager built on 7-Zip.',
    highlights: ['Fast with tens of thousands of files', 'Edit files in place', 'Drag files out'],
  },
  {
    id: 'news', name: 'News', category: 'files', accent: 'coral',
    tagline: 'A local RSS, Atom and JSON Feed reader.',
    highlights: ['Reads offline once fetched', 'Folders, stars and saved', 'No news service in between'],
  },
  {
    id: 'weather', name: 'Weather', category: 'files', accent: 'teal',
    tagline: 'Forecasts, radar, air quality and severe-weather alerts.',
    highlights: ['“Rain in 15 min” nowcasts', '48-hour graphs and 10-day outlook', 'NEXRAD radar mosaic'],
  },
  {
    id: 'maps', name: 'Maps', category: 'files', accent: 'green',
    tagline: 'A native map app drawn in your theme’s colors.',
    highlights: ['Standard, topographic and satellite', 'Driving, walking and cycling directions', 'Address and place search'],
  },

  // System & dev
  {
    id: 'settings', name: 'Settings', category: 'system', accent: 'violet', featured: true,
    tagline: 'A native control panel for Omarchy.',
    highlights: ['Searchable, no Lua editing', 'Live system overview and updates', 'Device extensions'],
    note: 'Extensions for ASUS, Logitech, Razer, Corsair, RGB, headsets, controllers, tablets, monitors, NVIDIA, webcams and Stream Decks.',
  },
  {
    id: 'store', name: 'Store', category: 'system', accent: 'blue',
    tagline: 'Discover, install and update apps from Omarchy, Arch and the AUR.',
    highlights: ['Curated Arch favorites', 'Coordinated system updates', 'Guards protected packages'],
  },
  {
    id: 'glimpse', name: 'Glimpse', category: 'system', accent: 'violet',
    tagline: 'A local universal search panel with plugins.',
    highlights: ['Apps, files, math and conversions', 'Semantic document and media search', 'Super+Space from anywhere'],
  },
  {
    id: 'activity', name: 'Activity', category: 'system', accent: 'green',
    tagline: 'Processes, usage and startup apps at a glance.',
    highlights: ['Live CPU, GPU, memory and disk graphs', 'Apps, tree and all-process views', 'Filter by name, PID or user'],
  },
  {
    id: 'git', name: 'Git', category: 'system', accent: 'coral',
    tagline: 'A native Git client with a visual commit graph.',
    highlights: ['Diffs, staging and stashes', 'Conflict resolution', 'Worktrees and workspaces'],
  },
  {
    id: 'containers', name: 'Containers', category: 'system', accent: 'teal',
    tagline: 'Incus and Docker: containers, VMs, Compose, images and volumes.',
    highlights: ['Local and one remote host', 'Compose stacks and logs', 'No agent, no web UI'],
  },
  {
    id: 'passwords', name: 'Passwords', category: 'system', accent: 'amber',
    tagline: 'A password manager for your Vaultwarden server.',
    highlights: ['Logins, one-time codes and SSH keys', 'Works with Bitwarden apps', 'Secrets hidden until shown'],
  },
  {
    id: 'home', name: 'Home', category: 'system', accent: 'green', tile: true,
    tagline: 'A desktop frontend for Home Assistant, with desktop automations.',
    highlights: ['Rooms, scenes and favorites', 'Who’s home and what’s open', 'Cameras and energy'],
  },
  {
    id: 'assistant', name: 'Assistant', category: 'system', accent: 'pink', optional: true,
    tagline: 'A local voice assistant: push-to-talk, wake word and desktop commands.',
    highlights: ['Hold Alt+Space and speak', 'Local speech and models', 'Uses CUDA when present'],
  },
]

export const apps: NyxApp[] = entries.map(app => ({
  ...app,
  repo: `https://github.com/design-nexus/nyx-${app.id}`,
  icon: withoutAppIcon.has(app.id) ? undefined : `/nyx/icons/${app.id}.svg`,
}))
