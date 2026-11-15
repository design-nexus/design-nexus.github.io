<script setup lang="ts">
import { ArrowLeft, Command, Mail } from 'lucide-vue-next'

const updated = '14 November 2026'
</script>

<template>
  <main class="relative isolate min-h-screen overflow-x-clip bg-[#181922] text-[#f8f8f2]">
    <div class="grid-surface absolute inset-0 -z-10 opacity-40" />
    <div class="glow glow-left absolute -left-40 top-24 -z-10 h-72 w-72 rounded-full" />
    <div class="glow glow-right absolute -right-32 bottom-20 -z-10 h-80 w-80 rounded-full" />

    <header class="mx-auto flex w-full max-w-3xl items-center justify-between px-5 py-6 sm:px-8">
      <a
        href="/"
        class="inline-flex items-center gap-2 font-mono text-xs tracking-[0.18em] text-[#bd93f9] transition hover:text-[#ff79c6]"
      >
        <Command class="h-4 w-4" aria-hidden="true" />
        <span>design-nex.us</span>
      </a>
      <a
        href="/"
        class="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-[#8be9fd] transition hover:text-[#ff79c6]"
      >
        <ArrowLeft class="h-3 w-3" aria-hidden="true" />
        Home
      </a>
    </header>

    <article class="mx-auto w-full max-w-3xl px-5 pb-20 sm:px-8">
      <p class="font-mono text-xs uppercase tracking-[0.3em] text-[#8be9fd]">Legal</p>
      <h1 class="mt-3 font-mono text-3xl tracking-tight text-[#f8f8f2] sm:text-4xl">Privacy Policy</h1>
      <p class="mt-3 font-mono text-xs text-[#6272a4]">Last updated {{ updated }}</p>

      <div class="prose-privacy mt-10 space-y-8 text-[0.95rem] leading-relaxed text-[#c8c8d0]">
        <section>
          <h2>Who we are</h2>
          <p>
            This policy covers <strong>Design Nexus</strong> software distributed under
            <strong>design-nex.us</strong>, including the <strong>Nyx</strong> desktop apps and
            services (Mail, Calendar, Contacts, Files, Tasks, Settings / Online Accounts, and related
            components). Contact:
            <a href="mailto:hello@design-nex.us">hello@design-nex.us</a>.
          </p>
        </section>

        <section>
          <h2>Desktop software, not a cloud account</h2>
          <p>
            Nyx runs on your computer. Design Nexus does not operate a central service that receives
            your Google, Microsoft, or other provider mailbox, calendar, contacts, files, or tasks
            when you connect Online Accounts. Sign-in happens between your computer, your browser, and
            the provider.
          </p>
        </section>

        <section>
          <h2>Online Accounts and OAuth</h2>
          <p>
            When you connect Google or Microsoft through Nyx Online Accounts, you authorize access in
            the provider’s browser sign-in flow. Nyx may request only the scopes for the services you
            enable, for example:
          </p>
          <ul>
            <li>Identity (sign-in email / OpenID)</li>
            <li>Mail</li>
            <li>Calendar and tasks</li>
            <li>Contacts</li>
            <li>Files / Drive or OneDrive</li>
          </ul>
          <p>
            Access and refresh tokens (or app passwords for providers that use them) are stored in
            your desktop keyring on this computer. They are used locally so Nyx apps can sync the
            services you turned on. Design Nexus does not receive those tokens on our servers.
          </p>
        </section>

        <section>
          <h2>What stays on your computer</h2>
          <p>
            Account metadata, cached mail, calendars, contacts, tasks, and files that Nyx downloads
            for offline use stay in local application data on your machine (or paths you choose, such
            as a mounted Drive folder). We do not sell this data. We do not use it for advertising.
          </p>
        </section>

        <section>
          <h2>This website</h2>
          <p>
            The design-nex.us site is a static project site. It does not require an account. If the
            host or analytics tools we use later collect standard request logs or similar, that is
            separate from Nyx Online Accounts and is not used to read your Google or Microsoft content.
          </p>
        </section>

        <section>
          <h2>How to revoke access</h2>
          <p>You can disconnect an account at any time:</p>
          <ul>
            <li>In Nyx Settings → Online Accounts, disconnect the account on this computer.</li>
            <li>
              For Google, also review and remove the app under
              <a href="https://myaccount.google.com/permissions" rel="noopener noreferrer" target="_blank"
                >Google Account → Third-party access</a
              >.
            </li>
            <li>
              For Microsoft personal accounts, review
              <a href="https://account.live.com/consent/Manage" rel="noopener noreferrer" target="_blank"
                >Microsoft account app permissions</a
              >.
            </li>
          </ul>
          <p>
            Disconnecting locally stops Nyx from using the grant on this computer. Provider-side
            revocation is what fully ends the authorization at Google or Microsoft.
          </p>
        </section>

        <section>
          <h2>Children</h2>
          <p>Nyx is not directed at children under 13, and we do not knowingly collect their data.</p>
        </section>

        <section>
          <h2>Changes</h2>
          <p>
            We may update this page when the apps or this policy change. The “Last updated” date above
            will change when we do. Continued use of the software after an update means you accept the
            revised policy.
          </p>
        </section>

        <section>
          <h2>Contact</h2>
          <p>
            Questions about this policy:
            <a class="inline-flex items-center gap-1.5" href="mailto:hello@design-nex.us"
              ><Mail class="h-3.5 w-3.5" aria-hidden="true" /> hello@design-nex.us</a
            >.
          </p>
        </section>
      </div>
    </article>

    <footer
      class="mx-auto flex w-full max-w-3xl justify-between px-5 pb-8 font-mono text-[10px] uppercase tracking-[0.16em] text-[#6272a4] sm:px-8"
    >
      <span>© 2026 design-nex.us</span>
      <a href="/nyx/" class="transition hover:text-[#8be9fd]">Nyx</a>
    </footer>
  </main>
</template>

<style scoped>
.prose-privacy h2 {
  margin-bottom: 0.65rem;
  font-family: 'DM Mono', monospace;
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #bd93f9;
}
.prose-privacy p,
.prose-privacy li {
  color: #c8c8d0;
}
.prose-privacy strong {
  color: #f8f8f2;
  font-weight: 500;
}
.prose-privacy ul {
  margin: 0.75rem 0 0;
  list-style: disc;
  padding-left: 1.25rem;
}
.prose-privacy li + li {
  margin-top: 0.35rem;
}
.prose-privacy a {
  color: #8be9fd;
  text-decoration: underline;
  text-decoration-color: #8be9fd55;
  text-underline-offset: 3px;
}
.prose-privacy a:hover {
  color: #ff79c6;
  text-decoration-color: #ff79c655;
}
</style>
