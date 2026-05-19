# 🍽️ Butik Ev Yemekleri (Hazal Chef) - Project Guide (CLAUDE.md)

This file is the main guide for AI assistants (or developers) who will create the website for the "Butik Ev Yemekleri" restaurant. It contains all project details, brand identity, and technical rules.

## ⚠️ Critical Setup Instructions (Read First)
Before starting any development or taking any actions, you MUST:
1. Run and evaluate the following specific skills/tools before anything else:
    - **Design & UI:** `brandkit`, `design-taste-frontend`, `emil-design-eng`, `gpt-taste`, `high-end-visual-design`, `impeccable`, `industrial-brutalist-ui`, `minimalist-ui`, `redesign-existing-projects`, `stitch-design-taste`
    - **Image Generation:** `image-to-code`, `imagegen-frontend-mobile`, `imagegen-frontend-web`
    - **Code Quality:** `full-output-enforcement`, `simplify`, `fewer-permission-prompts`
2. Analyze ALL files located in the `/brand_assets` folder. You must understand the visual style and correctly use these exact images in appropriate sections of the website.
3. Review the instructions below carefully before proceeding.

## 📌 1. Brand & Business Details

*   **Business Name:** Butik Ev Yemekleri
*   **Chef:** Hazal Demir (Hazal Chef)
*   **Concept:** Meat Restaurant & Boutique Home-Cooked Meals
*   **Slogans & Keywords:** 
    *   "Signature of Chef Hazal Demir" (Şef Hazal Demir İmzalı)
    *   "Daily Fresh & Home Flavors" (Günlük Taze & Ev Lezzetleri)
    *   "Tastes like mother's touch" (Anne eli değmiş gibi)
    *   "At your service until 24:00 at midnight with unbeatable prices." (Rakipsiz fiyatlarla gece 24:00'e kadar hizmetinizdeyiz.)
*   **Address:** Barbaros Hayrettin Paşa, 2300. Sk. No:34522, 34440 Esenyurt/İstanbul (2JFR+59 Esenyurt, İstanbul)
*   **Working Hours:** Open until 24:00 (Midnight).
*   **Service Options:** Dine-in, Drive-through, No-contact delivery, Takeaway.
*   **Price Range:** ₺100–200 per person
*   **Customer Rating:** 4.1 / 5 (9 Google Reviews)

## 🎨 2. Design & Digital Identity (Brand Assets)

The `/brand_assets` folder contains concept visuals for the business. When designing the website, these visuals must be used as a primary reference and placed in appropriate sections (About Us, Home Page, Menu):

*   **Logos:** `hazal_chef_logo_...png` (Primary choice) and `butik_ev_yemekleri_logo_...png`
*   **Interior Visuals:** `restaurant_interior_hazal_...png` (Primary choice; cozy, warm, boutique tradesmen restaurant feel)
*   **Food Visuals:** `kuzu_tandir_hazal_...png` (Signature dish: Roasted Lamb / Kuzu Tandır)

**Design Rules:**
1.  **Color Palette:** Warm earth tones, gold, dark green, and wooden textures. A fusion of traditional and modern.
2.  **Vibe:** Cozy, clean, professional, the warmth of a "mother's house" but with a luxurious chef's touch (Premium & Modern).
3.  **Animations:** Use subtle micro-animations on buttons and transitions for a dynamic, modern look.
4.  **Typography:** Prefer modern, legible, elegant fonts (e.g., Inter, Outfit, Roboto).

## 📋 3. Menu & Content Structure

The website must have the following page/section structure:

1.  **Home Page (Hero Section):** Welcoming message, logo, "Hazal Chef Signature" emphasis, and an "Order Now" or "Reservation" button.
2.  **About Us:** The story of Chef Hazal Demir, the boutique and warm concept of the restaurant, supported by interior visuals.
3.  **Menu (Highlights):** Specially highlighted with the "Kuzu Tandır" visual. Emphasize that meat dishes and home-cooked meals are prepared fresh daily.
4.  **Reviews:** Display the "4.1 Rating" from Google and positive customer feedback.
5.  **Contact & Location:** Map integration (Google Maps redirect), full address, "Open until 24:00" info, and contact channels.

## 💻 4. Technical Rules (Web Development)

*   **Technologies:** HTML, CSS, and JavaScript (Or a framework like Vite / Next.js if explicitly requested by the user).
*   **Styling (CSS):** Vanilla CSS must be used. (Do NOT use TailwindCSS unless the user explicitly requests it).
*   **Responsive Design:** The site must be 100% mobile-friendly. Most customers will check the location and menu on their phones.
*   **SEO:** Proper `<title>`, `<meta name="description">` tags, and semantic HTML5 elements (header, main, footer, section) must be used for every page.
*   **Dynamic Visuals (No Placeholders):** Wherever an image is required, use the concept photos from the `/brand_assets` folder. If a required image is missing, you MUST use your image generation skills to create new, relative visuals. **Never leave empty placeholders or use generic stock images.**

## ✨ 5. Final Polish

Once the core implementation is complete, you MUST take time to "polish" the website:
- Review the overall user experience.
- Ensure smooth interactions and seamless transitions.
- Check alignment, padding, and layout consistency across all screen sizes (mobile, tablet, desktop).
- Optimize performance and ensure the aesthetics feel premium.

## 🚀 Startup Commands
*(To be populated if a framework is initialized)*
- Standard Node.js / NPM commands (`npm run dev` etc.) will be used to start the local development server.
