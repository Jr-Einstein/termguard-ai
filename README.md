# TermGuard – AI-Powered Terms & Conditions Analyzer

> Understand what you’re really agreeing to before you click **“I Agree”**.

[![Live Demo](https://img.shields.io/badge/demo-termguard.lovable.app-4F46E5?style=for-the-badge)](https://termguard.lovable.app)
![Status](https://img.shields.io/badge/status-active-success?style=for-the-badge)
![License](https://img.shields.io/badge/license-MIT-informational?style=for-the-badge)

---

## 🚀 What is this project?

**TermGuard** is a SaaS-style web app that uses AI to simplify long and complex **Terms & Conditions / Privacy Policies** into plain language.
You paste any T&C text, and TermGuard:

* Summarizes it into human-readable bullet points
* Highlights **data privacy, financial, legal, and permission risks**
* Gives an overall **risk score (Low / Medium / High)** so you can make an informed decision

Live demo: **[https://termguard.lovable.app](https://termguard.lovable.app)**

Built with a modern stack using **React + TypeScript**, **Python + FastAPI**, **Gemini API**, and **Lovable Cloud** for auth and storage.

---

## 🛡 Problem Statement (Real-World Context)

Most users scroll to the bottom and tap **“Accept”** without reading Terms & Conditions. That blind trust has fueled some of the biggest privacy and security incidents in recent years. Services have legally allowed themselves to:

* **Collect and share detailed behavioral data** with third parties
* **Auto-renew paid subscriptions** with confusing cancellation paths
* **Restrict user rights** with forced arbitration or liability waivers hidden deep in the fine print

In many high-profile data misuse and cybersecurity incidents, companies were able to say:

> “Users agreed to this in our Terms & Conditions.”

The problem isn’t just poor security – it’s that **humans can’t realistically read and understand every legal document** they’re asked to accept. TermGuard tackles this by acting as an **AI-powered T&C co-pilot**: it turns dense legal text into clear, actionable insight so that people can spot red flags *before* they commit.

---

## ✨ Key Features

* **🔐 Authentication Flow**

  * Modern **Login** and **Sign Up** pages
  * Redirects authenticated users to the analysis dashboard
  * Backed by **Lovable Cloud** for user storage and session handling
* **🧠 AI-Driven T&C Analysis**

  * Uses **Gemini API** under the hood (via a Python FastAPI backend)
  * Generates a concise, bullet-point **summary** in plain English
  * Categorizes risks into:

    * `data_privacy`
    * `financial`
    * `permissions`
    * `legal`
    * `other`
  * Assigns an overall **risk_score**: `low`, `medium`, or `high`
* **📊 SaaS-Style Dashboard**

  * Clean, glassmorphism-inspired layout with gradient background
  * Input card for pasting Terms & Conditions
  * Result cards for:

    * Overall Risk badge
    * Summary
    * Detailed Risks (with category, severity, and clause excerpt)
    * Suggestions / recommendations
* **🎨 Modern UI / UX**

  * Looks and feels like a professional SaaS product
  * Glassmorphism cards (blurred, translucent panels, soft shadows)
  * Smooth hover states and micro-interactions on buttons and cards
  * Loading states and subtle animations when analysis runs
* **🛠 Quality of Life**

  * “Use sample text” button for quick testing
  * Inline validation if the textarea is empty
  * Clear error messages on API failure
  * Responsive design – works well on desktop and mobile
* **⚠️ Non-Legal-Advice Disclaimer**

  * TermGuard is a helper tool.
  * It **does not provide legal advice** and should not replace a lawyer.

---

## 🧱 Tech Stack & Logos

### Core Technologies

  <p align="center">
    <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original.svg" alt="React" height="48" />
    <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" alt="TypeScript" height="48" />
    <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg" alt="Python" height="48" />
    <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/fastapi/fastapi-original.svg" alt="FastAPI" height="48" />
  </p>

* **Frontend**

  * React
  * TypeScript
  * Vite (bundler/dev server)
  * Modern CSS with glassmorphism + animations
* **Backend**

  * Python
  * FastAPI
  * Gemini API (Google Generative AI) for T&C understanding and risk scoring
* **Infrastructure & Data**

  * **Lovable Cloud** (auth & user data)
  * Deployed frontend at: [https://termguard.lovable.app](https://termguard.lovable.app)

> 💡 You can add or swap logos easily by editing the `<img>` tags above with your preferred image URLs.

---

## 🖼 Screenshots (add your own)

You can add screenshots of the app to this section. Here are some options you can use in `README.md`:

### Option 1 – Local images in repo

```md
<!-- Place your screenshots in ./docs/screenshots/ -->

### 🔓 Auth Pages

![Login Page](./docs/screenshots/login.png)
![Sign Up Page](./docs/screenshots/signup.png)

### 📊 Dashboard

![Analyzer Dashboard](./docs/screenshots/dashboard.png)
```

### Option 2 – Remote image URLs (e.g., from GitHub Issues or image host)

```md
### 📊 Dashboard

![Analyzer Dashboard](https://your-image-host.com/termguard-dashboard.png)
```

### Option 3 – HTML for more control (size, alignment)

```html
<p align="center">
  <img src="./docs/screenshots/dashboard.png" alt="TermGuard Dashboard" width="800" />
</p>
```

> 📌 Replace the example paths/URLs with your own screenshot files or hosted links.

---

## 🧩 How It Works (High-Level Architecture)

1. **User Interface (React + TypeScript)**

   * User logs in or signs up.
   * User pastes Terms & Conditions text into a textarea and clicks **Analyze**.
   * Frontend calls the FastAPI backend endpoint (`POST /analyze`).
2. **Backend (FastAPI + Python)**

   * Validates the input text.
   * Crafts a structured prompt to the **Gemini API**, asking for:

     * Summary
     * Risk score
     * Structured list of risks
     * Suggestions for the user
   * Parses Gemini’s JSON response into a typed model.
   * Returns the structured result back to the frontend.
3. **AI Engine (Gemini)**

   * Reads the full T&C text.
   * Extracts main points & possible risks.
   * Outputs a JSON object with summary, risk_score, risks, and suggestions.
4. **Result Presentation (Frontend)**

   * Shows an **Overall Risk** badge (Low/Medium/High) with color coding.
   * Renders summary as bullet points.
   * Groups risks by category with severity badges and clause excerpts.
   * Displays suggestions in plain language.

---

## 🏁 Getting Started (Local Development)

> These steps are a template. Adjust based on your actual repo structure if needed.

### 1. Clone the repo

```bash
git clone https://github.com/your-username/termguard.git
cd termguard
```

### 2. Backend setup

```bash
cd backend
python -m venv venv
source venv/bin/activate    # Windows: venv\Scripts\activate
pip install -r requirements.txt

cp .env.example .env        # add your GEMINI_API_KEY in .env

uvicorn main:app --reload --port 8000
```

### 3. Frontend setup

```bash
cd ../frontend
npm install
npm run dev
```

The frontend will usually be available at **[http://localhost:5173](http://localhost:5173)** and will talk to the backend at **[http://localhost:8000](http://localhost:8000)**.

---

## 🛣 Roadmap / Possible Enhancements

* 🔍 **Clause-by-clause highlighting** directly in the original text
* 🌎 Multi-language support for both T&Cs and summaries
* 🧮 Comparison view: compare T&Cs of two products side-by-side
* 🔔 Email or in-app alerts when a service changes its Terms
* 🧑‍⚖️ Exportable reports (PDF) for compliance teams

---

## ⚠️ Disclaimer

TermGuard is designed to **assist** users in understanding complex Terms & Conditions.
It **does not provide legal advice**, and its analysis may not capture every nuance of a legal document.
For legally binding decisions, please consult a qualified legal professional.

---

## © Copyright

**© 2025 Aman Kumar Singh**
All rights reserved.
