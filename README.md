
# CCM-Hub (Static)

This codebase has been flattened into static HTML + Tailwind pages. No build tools or frameworks are required and all previous React/Vite source files have been removed.

## Running the code

1. Open `index.html` directly in your browser, or serve the folder with any static server (e.g., `python -m http.server 3000`).
2. Login/registration/verification are separate pages (`index.html`, `register.html`, `verification.html`). After verifying, navigate to the app pages (`dashboard.html`, `outlets.html`, `outlet-details.html`, `calculations.html`, `performance.html`, `settings.html`, `help.html`).
3. The shared `app.js` maintains mock state (user/outlets) in `localStorage`, and the create-outlet modal is available on app pages for basic interaction.
  
