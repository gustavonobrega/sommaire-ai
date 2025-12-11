<h1 align="center">📄 Sommaire — AI-Powered PDF Summarization </h1>

<p align="center">Transform PDFs into concise summaries using the power of AI!</p>

## 🚀 Tech Stack

**Core Technologies:**
- ⚡️ Next.js 15 (App Router) — server-side rendering, routing, and API endpoints with Server Components and Server Actions
- ⚛️ React 19 — building interactive user interfaces with reusable components
- 🔑 Clerk — secure authentication with Passkeys, Github, and Google Sign-in
- 🧠 Gemini — contextual summarization with emoji-enhanced output
- 🦜 Langchain — PDF parsing, text extraction and document chunking
- 🧱 ShadCN UI — beautiful, accessible UI components
- 🧵 TailwindCSS 4 — utility-first styling
- 🧠 TypeScript — type safety and enhanced development experience
- 🐘 NeonDB (PostgreSQL) — serverless database storage for storing summaries
- ☁️ UploadThing — secure file uploads (up to 32MB) and file management
- 💳 Stripe — subscription management, cancellations and secure payment processing

---

## ✨ Features

- 📝 Clear, structured summaries with key points and insights  
- 🎨 Beautiful, interactive summary viewer with progress tracking  
- 🔒 Secure file handling & route protection  
- 💰 Flexible pricing (Basic & Pro plans) with Stripe webhooks  
- 📊 User dashboard for summary management  
- 📱 Responsive design (mobile & desktop)  
- 🔄 Real-time updates and path revalidation  
- 🔔 Toast notifications for upload status, processing updates, and error handling  

---

## 🛠 Getting Started

To run the project locally:

1. **Clone** this repo
2. Copy `.env.example` to `.env`
3. Set up the following credentials:
   - 🔑 Gemini Key
   - 👥 Clerk Secret & Public Keys
   - ☁️ UploadThing Keys
   - 💳 Stripe Webhook & Keys
   - 🐘 NeonDB Database URL
4. Install dependencies:
   ```bash
   npm install
5. Start the dev server:
   ```bash
   npm run dev
   
---

<p align="center">Made with ♥ by Gustavo Nóbrega<p/>