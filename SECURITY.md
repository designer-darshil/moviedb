# SECURITY.md — Security & Privacy Policy

## 1. Security Overview
**vue-movies** operates as a client-rendered static web application. It does not run a custom backend server, does not store user credentials, and does not retain personally identifiable information (PII) in databases.

---

## 2. API Keys & Secrets Management
- **Environment Variables**:
  - `API_KEY`: The Movie Database (TMDb) v3 API key.
  - `API_YOUTUBE_KEY`: YouTube Data API key (optional).
  - `FRONTEND_URL`: Canonical public deployment URL.
  - `GA`: Google Analytics tracking ID.
- **Client Visibility**:
  - Because this is an SPA running entirely in the user's browser, network requests to `api.themoviedb.org` naturally include the API key query parameter.
  - Secret keys must **never** be committed to version control. The `.env` and `.env.local` files are strictly included in `.gitignore`.
  - Deployment environments (such as Vercel) inject these variables during the build process via secure project environment variables.

---

## 3. External Content & Third-Party Embeds
- **YouTube Embeds**:
  - Embedded inside sandboxed `<iframe>` tags with restrictive permissions:
    `allow="autoplay; encrypted-media"`.
  - YouTube player URLs are constructed strictly using the standard embed endpoint:
    `https://www.youtube.com/embed/{video_id}?rel=0&showinfo=0&autoplay=1`.
- **External Links**:
  - All external anchor tags (`<a>`) targeting third-party domains (IMDb, Twitter/X, Instagram, Facebook, TMDb) must specify `rel="noopener noreferrer"` and `target="_blank"` to protect against reverse tabnabbing and window manipulation vulnerabilities.

---

## 4. Content Security & Privacy
- **HTML Sanitization**:
  - Content injected via `v-html` (such as genre tags or director links) must be constructed from trusted sanitizing helpers or strictly filtered fields.
- **Cookie Consent**:
  - The application includes an explicit Cookie Consent banner honoring user privacy preferences and local storage opt-outs.

---

## 5. Reporting Security Issues
If you identify any security vulnerability or credential leak in this project, please report it privately via GitHub Security Advisories or direct communication with the repository maintainers rather than opening a public issue.
