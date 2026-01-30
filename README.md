# Growth Video Lab (GVL) 🚀

Growth Video Lab is a modern, high-performance creative agency landing page built with React, Vite, and GSAP. 


## ✨ Features

- **Dynamic Animations:** Immersive scroll-based animations powered by **GSAP** (ScrollTrigger) and **Framer Motion**.
- **Responsive Design:** Fully optimized for all devices using **Tailwind CSS**.
- **Interactive Service Grid:** Unique "Split Services" accordion component for browsing offerings.
- **Lead Generation:** Optimized landing pages for ebooks, portfolio showcases, and a multi-step contact flow.
- **Performance Optimized:** Extremely fast load times and smooth transitions thanks to **Vite** and a custom **Preloader**.
- **Social Proof:** Infinite moving cards showcasing testimonials or work highlights.
- **Contact Overlay:** Seamless modal-based contact system that preserves the user's scroll context.

## 🛠️ Tech Stack

- **Framework:** [React 18](https://reactjs.org/)
- **Build Tool:** [Vite 6](https://vitejs.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Animations:** [GSAP](https://greensock.com/gsap/) & [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Routing:** [React Router DOM v6](https://reactrouter.com/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Security:** [Cloudflare Turnstile](https://www.cloudflare.com/products/turnstile/) integration for forms.

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/jxhnmcclain/gvlwebreact.git
   cd gvlwebreact
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

## 📂 Project Structure

```text
├── components/          # Reusable UI components (Hero, Header, Footer, etc.)
├── pages/               # Page-level components and landing pages
├── lib/                 # Utility functions and shared logic
├── public/              # Static assets (images, icons, etc.)
├── App.tsx              # Main application entry and routing
├── index.tsx            # React DOM mounting
└── vite.config.ts       # Vite configuration
```

## 🐳 Deployment

The project includes a `Dockerfile` and `nginx.conf` for easy containerized deployment.

To build and run the Docker container:
```bash
docker build -t gvl-web .
docker run -p 80:80 gvl-web
```

## 📄 License

This project is private and intended for the internal use of **Growth Video Lab**.

---

Developed by [GVL Team](https://github.com/jxhnmcclain).
