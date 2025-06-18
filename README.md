# 🎵 MakeItWav

**MakeItWav** is a clean, modern frontend for converting YouTube videos to downloadable `.wav` audio files.

Built with:
- [Next.js (App Router, TypeScript)](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Vercel](https://vercel.com/) for hosting

---

## 🚀 Live Demo

👉 [makeitwav.vercel.app](https://makeitwav.vercel.app)

---

## 📦 Features

- 🔗 Paste a YouTube link
- 🎧 Converts and downloads `.wav` audio
- ⬇️ Download link appears after successful conversion
- 🧠 Automatically extracts and displays the track title
- 💅 Responsive, dark-themed UI with smooth UX

---

## 🧠 Backend

MakeItWav uses a **custom Node.js + Express backend** running on Render.

### Backend Stack:
- `express` for routing
- `yt-dlp` for YouTube download and conversion
- `ffmpeg` for audio format conversion
- `uuid` for unique file naming
- `cookies.txt` (manually exported) for authentication with YouTube
- `Dockerfile` based deployment on Render
- Temp `.wav` files are auto-deleted after 5 minutes

> ⚠️ Note: The backend is private due to sensitive content (authentication cookies)

---

## 🛠️ Local Development

1. **Clone the repo:**

```bash
git clone https://github.com/kiliamdev/makeitwav-frontend.git
cd makeitwav-frontend
