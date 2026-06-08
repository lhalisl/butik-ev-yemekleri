# 🚀 UNITHIC Media - Project Guide (CLAUDE.md)
# Claude Assistant Guidelines

This file is the main guide for AI assistants (or developers) who will create the website for the "UNITHIC Media" digital agency. It contains all project details, brand identity, and technical rules.

## Project Overview
This is a Next.js application. Please adhere to the following guidelines when assisting with this project to ensure consistency, performance, and code quality.

## ⚠️ Critical Setup Instructions (Read First)
Before starting any development or taking any actions, you MUST:
1. Run and evaluate the following specific skills/tools before anything else:
    - **Design & UI:** `brandkit`, `design-taste-frontend`, `emil-design-eng`, `gpt-taste`, `high-end-visual-design`, `impeccable`, `industrial-brutalist-ui`, `minimalist-ui`, `redesign-existing-projects`, `stitch-design-taste`, `UI UX Pro Max`
    - **Image Generation:** `image-to-code`, `imagegen-frontend-mobile`, `imagegen-frontend-web`
    - **Code Quality:** `full-output-enforcement`, `simplify`, `fewer-permission-prompts`
2. Analyze ALL files located in the `D:\coding space\UNITHIC\UNITHIC Media` folder. You must understand the visual style and correctly use these exact images and content in appropriate sections of the website.
3. Review the instructions below carefully before proceeding.
## Tech Stack
- **Framework:** Next.js (App Router / Pages Router)
- **Language:** TypeScript / JavaScript
- **Styling:** Tailwind CSS / CSS Modules (adapt to the existing file styling)

## 📌 1. Brand & Business Details
## Coding Standards
- **Components:** Prefer functional components and React Hooks. Keep components modular and single-responsibility.
- **Next.js Features:** 
  - Always utilize built-in Next.js optimizations.
  - Use `<Image />` (`next/image`) for images instead of standard `<img>` tags.
  - Use `<Link />` (`next/link`) for client-side routing instead of standard `<a>` tags.
- **Data Fetching:** Follow Next.js best practices for Server Components, Client Components, and data fetching/caching strategies.
- **Typing:** Provide strict TypeScript types and interfaces wherever possible. Avoid using `any`.
- **Clean Code:** Write DRY (Don't Repeat Yourself) code. Include brief, meaningful comments for complex logic.

*   **Business Name:** UNITHIC Media
*   **Concept:** Digital Agency
*   **Slogans & Keywords:** Innovative, Creative, Tech-Forward

## 🎨 2. Design & Digital Identity (Brand Assets)

The `D:\coding space\UNITHIC\UNITHIC Media` folder contains everything about the agency. When designing the website, the assets, guidelines, and copywriting kit found here must be used as a primary reference and placed in appropriate sections.

*   **Logos:** Look in the `D:\coding space\UNITHIC\UNITHIC Media` folder to find and properly tag the UNITHIC Media logo files.
*   **Brand Assets:** Utilize any provided typography, imagery, and UI kits from the agency folder.

**Design Rules:**
1.  **Color Palette:** Sleek, modern, and striking (adapt to the brand assets provided).
2.  **Vibe:** Professional, innovative, cutting-edge digital agency.
3.  **Animations:** Use subtle micro-animations on buttons and transitions for a dynamic, modern look.
4.  **Typography:** Prefer modern, legible, elegant fonts (e.g., Inter, Outfit, Roboto).

## 📋 3. Content Structure

The website must have the following page/section structure:

1.  **Home Page (Hero Section):** Welcoming message, logo, and a clear Call to Action (e.g., "Get a Quote").
2.  **About Us:** The story of UNITHIC Media, showcasing the team's expertise and mission.
3.  **Services:** Overview of the digital services offered (e.g., UI/UX, Web Dev, Marketing).
4.  **Portfolio:** Highlight previous successful projects and case studies.
5.  **Contact:** Form, location, and social media channels.

## 💻 4. Technical Rules (Web Development)

*   **Technologies:** HTML, CSS, and JavaScript (Or a framework like Vite / Next.js if explicitly requested by the user).
*   **Styling (CSS):** Vanilla CSS must be used. (Do NOT use TailwindCSS unless the user explicitly requests it).
*   **Responsive Design:** The site must be 100% mobile-friendly. Most customers will check the portfolio and services on their phones.
*   **SEO:** Proper `<title>`, `<meta name="description">` tags, and semantic HTML5 elements (header, main, footer, section) must be used for every page.
*   **Dynamic Visuals (No Placeholders):** Wherever an image is required, use the concept photos from the `D:\coding space\UNITHIC\UNITHIC Media` folder. If a required image is missing, you MUST use your image generation skills to create new, relative visuals. **Never leave empty placeholders or use generic stock images.**

## ✨ 5. Final Polish

Once the core implementation is complete, you MUST take time to "polish" the website:
- Review the overall user experience.
- Ensure smooth interactions and seamless transitions.
- Check alignment, padding, and layout consistency across all screen sizes (mobile, tablet, desktop).
- Optimize performance and ensure the aesthetics feel premium.

## 🚀 Startup Commands
*(To be populated if a framework is initialized)*
- Standard Node.js / NPM commands (`npm run dev` etc.) will be used to start the local development server.
## Communication Style
- Provide concise explanations alongside your code snippets.
- Output valid, fully unified code diffs when proposing file changes.
- When making significant architectural decisions, briefly explain the "why".
- If a requested change might introduce performance bottlenecks, security risks, or anti-patterns, warn me and suggest a better alternative.
