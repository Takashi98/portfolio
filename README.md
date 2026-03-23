# Premium Portfolio Website

This project is a high-end, desktop-first, editorial-style personal portfolio built with React + Vite + Tailwind CSS + GSAP and a Node.js + Express backend.

## Table of Contents
1. [How to Run Frontend](#how-to-run-frontend)
2. [How to Run Backend](#how-to-run-backend)
3. [Where to Replace Content](#where-to-replace-content)
4. [Where to Replace Media](#where-to-replace-media)
5. [Customizing the Design System](#customizing-the-design-system)
6. [Extending Portfolio Items](#extending-portfolio-items)
7. [Connecting Real Email Sending](#connecting-real-email-sending)

---

### How to Run Frontend
1. Open up a terminal and navigate to the client folder:
   ```bash
   cd client
   ```
2. Start the Vite development server:
   ```bash
   npm run dev
   ```
3. Open `http://localhost:5173` in your browser.

### How to Run Backend
1. Open up another terminal and navigate to the server folder:
   ```bash
   cd server
   ```
2. Create a `.env` file based on the template:
   ```bash
   cp .env.example .env
   ```
3. Start the Node development server:
   ```bash
   npm run dev
   ```
4. The API will be available at `http://localhost:5000`.

---

### Where to Replace Content
All readable text content is abstracted into clean array maps and objects. You don't need to dig through component UI files.
- **Navigate to**: `client/src/data/siteData.js` and `client/src/data/homeData.js`
- Edit your Name, Role, Social Links, Services, Testimonials, FAQ, and Career Timeline arrays inside these files.

### Where to Replace Media
- **Background Videos/Images**: Place your premium looping videos (e.g., `hero-bg.mp4`) inside `client/public/`. Update the `videoBg` reference in `homeData.js` to match the exact filename.
- **Project Thumbnails**: You can use external URLs (like Unsplash) or drop local images into `client/public/images/` and reference them via `/images/filename.jpg` in your `portfolioData.js`.

### Customizing the Design System
This portfolio uses a strict Design Token setup for premium visuals.
To tweak colors, typography, or spacing without breaking the elegant grid:
- **Navigate to**: `client/tailwind.config.js`
- Here you can edit the `colors` theme (e.g., `background`, `surface`, `accent`), change the `fontFamily` stack (default is Inter and Clash Display), and tweak global `spacing` rules or `transitionDuration`.

### Extending Portfolio Items
- **Navigate to**: `client/src/data/portfolioData.js`
- To add a new project, simply push a new object into the exported array:
  ```json
  {
    "id": 4,
    "title": "Your New App",
    "category": "Web & UI/UX",
    "thumbnail": "/images/app-thumb.jpg",
    "description": "Your editorial description."
  }
  ```
- The `<Portfolio />` gallery page will automatically generate the filter tab and grid item based on this array!

### Connecting Real Email Sending
The contact form is hooked up to send a POST request to `/api/contact`.
- **Navigate to**: `server/src/controllers/contactController.js`
- Look at the commented-out `nodemailer.createTransport` block.
- Uncomment it, install Nodemailer (if not already), and provide your real `SMTP_USER` and `SMTP_PASS` inside your `server/.env` file. You can use platforms like Resend, SendGrid, or Gmail App Passwords.
