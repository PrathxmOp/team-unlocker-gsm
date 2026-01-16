# Team Unlocker GSM - Management Guide

Welcome to the **Team Unlocker GSM** administration guide. This website is data-driven via three JSON files: `db.json`, `legal.json`, and `paymentMethods.json`.

## 🛠 How to Manage the Site

### 1. Website Content (db.json)
Located in the root directory.

*   **Services**: Edit the `"services"` array. Set `"hidden": true` to hide a service.
*   **Firmware**: Edit the `"files"` array to add new download links.
*   **Branding**: Update the `"settings"` object for Telegram links and text.

### 2. Legal Policies (legal.json)
Located in the root directory. This file handles all policy text.

*   **Privacy Policy**: Update the `privacyPolicy` object.
*   **Terms and Conditions**: Update the `termsAndConditions` object.
*   **Refund Policy**: Update the `refundPolicy` object.
*   Each policy has a `"title"` and a `"content"` field. Use `\n` for line breaks.

### 3. Payment Methods (paymentMethods.json)
Located in the root directory.

*   **Global Users**: Edit the `"global"` object.
*   **Indian Users**: Edit the `"india"` object.
*   Use FontAwesome icon classes for the `"icon"` field.

### 4. Quick Tips
*   **Icons**: We use FontAwesome. Find classes at [fontawesome.com](https://fontawesome.com/search?o=r&m=free).
*   **Updates**: Changes to JSON files reflect immediately upon site refresh.
*   **Refunds**: The Refund Policy is now visible in the footer alongside Privacy and Terms.

---

## 💻 Technical Guide (Development & Deployment)

This project uses **React 19** with **Vite** for ultra-fast development.

### 📋 Prerequisites
- **Node.js**: Version 18.0 or higher.
- **npm**: (Included with Node.js) or **yarn**.

---

### 🚀 Running in Development

#### **Windows (PowerShell or CMD)**
1. Open your terminal in the project folder.
2. Install dependencies:
   ```powershell
   npm install
   ```
3. Start the development server:
   ```powershell
   npm run dev
   ```
4. Open `http://localhost:5173` in your browser.

#### **Linux (Ubuntu/Debian/CentOS)**
1. Open your terminal.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Access the site at `http://localhost:5173`.

---

### 🏗️ Building for Production

To create an optimized production-ready bundle:

#### **Windows & Linux**
1. Run the build command:
   ```bash
   npm run build
   ```
2. The optimized files will be generated in the `dist/` folder.

---

### 🌐 Running in Production

Once the build is finished, you can host the `dist/` folder on any web server (Nginx, Apache, or a static host like Vercel/Netlify).

#### **Testing Production locally (Windows & Linux)**
To test the production build locally, use a static server like `serve`:
1. Install serve globally:
   ```bash
   npm install -g serve
   ```
2. Run from project root:
   ```bash
   serve -s dist
   ```

---

Made with ❤️ in India
By TeamUnlockerGSM 2025