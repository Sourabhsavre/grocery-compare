<div align="center">

# 🛒 GroceryCompare AI

### India's Smartest AI-Powered Grocery Price Comparison Platform

**Compare prices across Zepto, BigBasket & Blinkit in real-time — save money every time you shop.**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20App-6C3AE8?style=for-the-badge&logo=vercel)](https://grocery-compare-three.vercel.app)
[![GitHub](https://img.shields.io/badge/GitHub-Sourabhsavre-181717?style=for-the-badge&logo=github)](https://github.com/Sourabhsavre/grocery-compare)
[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript)](https://typescriptlang.org)
[![Supabase](https://img.shields.io/badge/Supabase-Auth-3ECF8E?style=for-the-badge&logo=supabase)](https://supabase.com)

</div>

---

## 📸 Screenshots

| Home Page | Image Scanner | Monthly Planner |
|---|---|---|
| ![Home](https://via.placeholder.com/300x200/0A0E1A/6C3AE8?text=Home+Page) | ![Scanner](https://via.placeholder.com/300x200/0A0E1A/00D4AA?text=Image+Scanner) | ![Planner](https://via.placeholder.com/300x200/0A0E1A/10b981?text=Monthly+Planner) |

> 💡 **Add real screenshots**: Drop your screenshots into a `/screenshots` folder and replace the placeholder URLs above.

---

## 👨‍💻 Developer

| | |
|---|---|
| **Name** | Sourabh Savre |
| **Institution** | Indore Institute of Science and Technology, Indore |
| **Degree** | B.E. in Computer Engineering |
| **Email** | [sourabhsavre8435@gmail.com](mailto:sourabhsavre8435@gmail.com) |
| **GitHub** | [@Sourabhsavre](https://github.com/Sourabhsavre) |

---

## 🚀 About The Project

**GroceryCompare AI** is a modern, mobile-first web application that helps Indian consumers make smarter grocery purchasing decisions. Instead of manually checking multiple quick-commerce apps, users can instantly compare prices across **Zepto**, **BigBasket**, and **Blinkit** — all in one place.

The app combines AI-powered features like voice search, image list scanning, recipe cost estimation, and monthly budget planning to deliver a complete smart shopping experience.

---

## ✨ Features

### 🔍 Smart Search & Comparison
- **Real-time price comparison** across Zepto, BigBasket, and Blinkit
- **AI-powered smart search** — understands natural language queries like *"milk under ₹60"*
- **Category filtering** with instant results

### 🎤 Voice Assistant
- **Voice-activated search** using the Web Speech API
- Beautiful **animated sound waves** while listening
- Supports both **English and Hindi** (en-IN / hi-IN)

### 📷 Image Scanner (AI Vision)
- Upload a **photo of your handwritten or typed grocery list**
- AI extracts items and instantly **matches them to products** with best prices
- Mobile-friendly **camera viewfinder UI** with corner brackets and crosshair

### 📅 Monthly Grocery Planner
- Speak or upload your monthly requirements
- AI generates a **4-week breakdown** with optimal platform selection
- **Share your plan** on WhatsApp with one tap

### 👨‍🍳 Recipe Assistant
- Enter any recipe (e.g., *"Butter Chicken"*) and get a full ingredient list
- Shows the **cheapest platform** for each ingredient
- **Add all ingredients to cart** in one click

### 💰 AI Budget Assistant
- Set your grocery budget (e.g., ₹500)
- AI plans an **optimized basket** that maximizes items within budget
- Visual **budget utilization chart**

### 🔥 Deal of the Day
- Highlights **5 random deals** with real-time countdown timer
- Shows savings percentage vs. original price

### 🔔 Price Alerts
- Set a **target price** for any product
- Notified when the price drops to your desired amount

### 🔐 Authentication
- **Email/Password** and **Google OAuth** login via Supabase Auth
- Persistent sessions across devices

### 🌗 Theme & Language
- **Dark / Light mode** toggle (Light is default)
- Full **Hindi / English** language switching (i18n)
- Premium glassmorphism design system

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | [Next.js 15](https://nextjs.org) (App Router) |
| **Language** | [TypeScript](https://typescriptlang.org) |
| **Styling** | Vanilla CSS with glassmorphism design system |
| **Auth & Database** | [Supabase](https://supabase.com) |
| **AI / LLM** | Google Gemini AI (via API routes) |
| **Icons** | Custom hand-crafted inline SVGs |
| **Voice** | Web Speech API (SpeechRecognition) |
| **Deployment** | [Vercel](https://vercel.com) |
| **Fonts** | [Outfit](https://fonts.google.com/specimen/Outfit) (Google Fonts) |

---

## 📁 Project Structure

```
grocery-compare/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout + metadata
│   │   ├── page.tsx            # Home page
│   │   ├── globals.css         # Global styles & design system
│   │   └── api/
│   │       └── ai/
│   │           ├── search/     # AI smart search endpoint
│   │           ├── budget/     # AI budget planning endpoint
│   │           ├── recipe/     # AI recipe assistant endpoint
│   │           ├── vision/     # AI image scanner endpoint
│   │           └── monthly-plan/ # AI monthly planner endpoint
│   ├── components/
│   │   ├── GroceryApp.tsx      # Main app shell
│   │   ├── AuthModal.tsx       # Login / Sign up
│   │   ├── AboutModal.tsx      # Developer info page
│   │   ├── ImageScannerModal.tsx # Camera viewfinder & AI vision
│   │   ├── MonthlyPlanner.tsx  # 4-week grocery planner
│   │   ├── RecipeAssistant.tsx # Recipe ingredient finder
│   │   ├── DealOfTheDay.tsx    # Daily deals carousel
│   │   ├── PriceAlerts.tsx     # Price drop notifications
│   │   └── BudgetPlanner.tsx   # AI budget assistant
│   ├── providers/
│   │   └── AppProviders.tsx    # Theme + Language context
│   ├── data/
│   │   └── i18n.json           # English / Hindi translations
│   └── utils/
│       └── supabase/           # Supabase client helpers
├── public/
├── package.json
└── README.md
```

---

## ⚙️ Getting Started

### Prerequisites
- Node.js 18+
- A [Supabase](https://supabase.com) project
- A [Google Gemini API key](https://aistudio.google.com)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Sourabhsavre/grocery-compare.git
cd grocery-compare

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local
```

### Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
GEMINI_API_KEY=your_google_gemini_api_key
```

### Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

---

## 🌐 Live Demo

> **[https://grocery-compare-three.vercel.app](https://grocery-compare-three.vercel.app)**

Deployed on [Vercel](https://vercel.com) — automatic deployments on every push to `main`.

---

## 🗺️ Roadmap

- [ ] Push notifications for price alerts
- [ ] Cart persistence with Supabase database
- [ ] PWA (Progressive Web App) support
- [ ] More platforms: Swiggy Instamart, Dunzo
- [ ] Barcode scanner for physical products
- [ ] Social shopping lists (share with family)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">

**Built with ❤️ by [Sourabh Savre](https://github.com/Sourabhsavre)**

*Indore Institute of Science and Technology, Indore*

⭐ **Star this repo if you found it useful!**

</div>
