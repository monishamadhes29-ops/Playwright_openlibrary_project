📚 Open Library Automation Framework (UI + API)
🔍 Overview
This project is an automation framework built using Playwright + JavaScript + Cucumber (BDD) to validate UI and API functionality of Open Library.
It covers:
•	UI validation
•	API validation
•	API ↔ UI integration validation
________________________________________
🧰 Tech Stack
•	Playwright
•	JavaScript (Node.js)
•	Cucumber (BDD)
•	Axios (via Playwright request context)
•	Custom Utilities (Logger, Waits, Screenshots)
________________________________________
📁 Project Structure
OPENLIBRARY-AUTOMATION
│
├── src
│   ├── config          # Environment config
│   ├── features        # Feature files (BDD)
│   ├── hooks           # Hooks (Before/After)
│   ├── pages           # Page Object Model (POM)
│   ├── utils           # Logger, Waits, Screenshots
│
├── tests
│   └── steps           # Step Definitions
│
├── screenshots         # Failure screenshots
├── reports         # Reports

├── cucumber.js         # Cucumber config
├── playwright.config.js
├── package.json
________________________________________
⚙️ Setup Instructions
1️⃣ Clone Repository
git clone https://github.com/monishamadhes29-ops/Playwright_openlibrary_project.git
cd OPENLIBRARY_AUTOMATION
________________________________________
2️⃣ Install Dependencies
npm install
________________________________________
3️⃣ Install Playwright Browsers
npx playwright install
________________________________________
▶️ Run Tests
Run all tests
npx cucumber-js
Run specific feature
npx cucumber-js src/features/ui.feature
Debug mode (Inspector)
PWDEBUG=1 npx cucumber-js
________________________________________
🧪 Test Coverage
✅ UI Tests
•	Search functionality validation
•	Results list validation
•	Title & author validation
________________________________________
✅ API Tests
•	Search API response validation
•	Status code validation
•	Schema validation
•	Negative test scenarios
________________________________________
✅ Integration Tests
•	API response title validation in UI
•	Data consistency checks
________________________________________
🧠 Framework Highlights
•	Page Object Model (POM)
•	Reusable utilities (Logger, WaitUtils, ScreenshotUtils)
•	Centralized hooks for setup/teardown
•	API + UI integration testing
•	Smart waits (no hard sleeps)
•	Error handling using try-catch
________________________________________
📸 Reporting & Debugging
•	Screenshots captured on failure
•	Logs using custom Logger
•	Debug using Playwright Inspector
________________________________________
👩‍💻 Author
Monisha Madheswaran

