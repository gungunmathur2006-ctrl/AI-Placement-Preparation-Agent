# AI Placement Preparation Agent

> An end-to-end AI-powered placement preparation assistant that automatically generates daily quantitative aptitude questions, coding problems, interview tips, motivational quotes, and automated resume ATS feedback for engineering students using **n8n workflow automation**, **Docker**, **Google Gemini 1.5 Flash API**, **Google Sheets**, and **Gmail**.

---

## 1. Project Introduction

Campus placement preparation requires consistent daily practice in quantitative aptitude, programming logic, soft skills, and resume optimization. However, students often struggle to find structured daily practice material tailored for freshers, while placement cells lack automated tools to track and support student readiness.

The **AI Placement Preparation Agent** solves this problem by automating the entire preparation pipeline. Powered by **n8n** and **Google Gemini AI**, the system reads student records dynamically from **Google Sheets**, generates personalized daily practice content, updates the database, sends formatted daily digests via **Gmail** at 9:00 AM, and analyzes student resumes to generate an actionable ATS score (0-100).

---

## 2. Features

- ⚡ **Daily Automated Digest**: Delivers quantitative aptitude, coding problems, interview tips, and motivational quotes to students' inboxes every morning at 9:00 AM.
- 📄 **Resume Feedback & ATS Evaluator**: Analyzes uploaded PDF resumes using Gemini AI to extract key skills, highlight resume weaknesses, provide actionable improvement tips, and assign an ATS compatibility score out of 100.
- 📊 **Dynamic Google Sheets Database**: Reads and updates student records dynamically without hard-coding names or emails.
- 🐳 **One-Click Docker Deployment**: Completely containerized setup using Docker Compose for simple local execution.
- 🔁 **Workflow Automation Engine**: Uses **n8n** for visually observable, scalable workflow management.
- 🛡️ **Robust Error Handling**: Fault-tolerant execution prevents broken email delivery and logs errors gracefully.
- 💻 **Modern Web Dashboard**: Glassmorphism web UI for visual demonstration, live metrics, and instant resume testing.

---

## 3. Architecture

```
                                [ Student Database ]
                                  (Google Sheets)
                                         │
                                         ▼
                         ┌───────────────────────────────┐
                         │    n8n Automation Engine      │
                         │     (Runs inside Docker)      │
                         └───────────────┬───────────────┘
                                         │
            ┌────────────────────────────┴────────────────────────────┐
            ▼                                                         ▼
 [ Workflow: Daily Placement Agent ]                   [ Workflow: Resume Feedback Agent ]
   ├── Schedule Trigger (9:00 AM)                        ├── Webhook / Drive Trigger
   ├── Read Google Sheets Rows                           ├── Extract Resume PDF Text
   ├── Loop Over Students                                ├── Gemini ATS Analysis
   ├── Gemini 1.5 Flash API Calls                        │     (Skills, Flaws, Suggestions,
   │   ├── Aptitude Question                             │      ATS Score out of 100)
   │   ├── Coding Problem                            ├── Update Google Sheets (Status, ATS Score)
   │   ├── Interview Tip                             └── Send Detailed Gmail Report
   │   └── Motivational Quote
   ├── Merge Results
   ├── Update Google Sheets Row
   └── Send Gmail Digest Email
```

---

## 4. Technology Stack

- **Automation Engine**: [n8n](https://n8n.io/)
- **Containerization**: Docker & Docker Compose
- **Generative AI Model**: Google Gemini 1.5 Flash API (`generativelanguage.googleapis.com`)
- **Database & Storage**: Google Sheets API (Worksheet: `PlacementAgent`)
- **Email Delivery**: Gmail OAuth2 API
- **Frontend Dashboard**: HTML5, Vanilla CSS3 (Glassmorphism), JavaScript ES6+
- **Version Control**: Git & GitHub

---

## 5. Docker Installation

### Prerequisites:
- Install [Docker Desktop](https://www.docker.com/products/docker-desktop/) (Windows/Mac/Linux).

### Steps:
1. Clone or download this project repository.
2. Open terminal in the project root directory:
   ```bash
   cd "AI Placement Preparation Agent"
   ```
3. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
4. Start the n8n container:
   ```bash
   docker compose up -d
   ```
5. Verify n8n is running by accessing: [http://localhost:5678](http://localhost:5678)

---

## 6. n8n Setup

1. Open [http://localhost:5678](http://localhost:5678) in your web browser.
2. Complete the initial admin registration (email and password).
3. Navigate to **Workflows**.

---

## 7. Gemini API Setup

1. Visit [Google AI Studio](https://aistudio.google.com/).
2. Click **Get API Key** -> **Create API Key**.
3. Copy your API key and update your `.env` file:
   ```env
   GEMINI_API_KEY=AIzaSyYourActualGeminiApiKey
   ```
4. In n8n HTTP Request nodes, your API key will be automatically referenced via `{{$env.GEMINI_API_KEY}}`.

---

## 8. Google Sheets Database Setup

1. Open [Google Sheets](https://sheets.google.com/) and create a new sheet named: **`PlacementAgent`**.
2. Add the following exact column headers in **Row 1**:

```
Name | Email | Date | Aptitude | Coding | Interview Tip | Motivational Quote | Resume Status | ATS Score
```

3. Insert sample student data:

| Name | Email | Date | Aptitude | Coding | Interview Tip | Motivational Quote | Resume Status | ATS Score |
|---|---|---|---|---|---|---|---|---|
| Gun Gun | student@example.com | 2026-08-08 | Pending | Pending | Pending | Pending | Pending | 0 |

4. Copy the **Spreadsheet ID** from your browser URL:
   `https://docs.google.com/spreadsheets/d/`**`YOUR_SHEET_ID_HERE`**`/edit`
5. Update your `.env` file with `GOOGLE_SHEET_ID`.

---

## 9. Gmail Setup

1. Open [Google Cloud Console](https://console.cloud.google.com/).
2. Create a project and enable **Google Sheets API** and **Gmail API**.
3. Go to **Credentials** -> **Create OAuth 2.0 Client ID**.
4. Set Redirect URI to: `http://localhost:5678/rest/oauth2-credential/callback`.
5. Copy Client ID and Client Secret into `.env`.

---

## 10. Importing n8n Workflows

1. In n8n, click **Workflows -> Import from File**.
2. Import [`workflows/daily-placement-agent.json`](file:///c:/Users/SAI%20DINESH/OneDrive/Desktop/AI%20Placement%20Preparation%20Agent/workflows/daily-placement-agent.json).
3. Import [`workflows/resume-feedback-agent.json`](file:///c:/Users/SAI%20DINESH/OneDrive/Desktop/AI%20Placement%20Preparation%20Agent/workflows/resume-feedback-agent.json).
4. Import [`workflows/error-handler-agent.json`](file:///c:/Users/SAI%20DINESH/OneDrive/Desktop/AI%20Placement%20Preparation%20Agent/workflows/error-handler-agent.json).

---

## 11. Configuring Credentials in n8n

1. In n8n, click **Credentials -> New Credential**.
2. Select **Google Sheets OAuth2 API**:
   - Enter your Client ID and Client Secret.
   - Click **Connect my account** and approve permissions.
3. Select **Gmail OAuth2 API**:
   - Enter your Client ID and Client Secret.
   - Click **Connect my account** and approve permissions.
4. Link these credentials to the corresponding nodes inside the imported workflows.

---

## 12. Testing the Workflow Manually

1. Open **Daily Placement Agent** workflow in n8n.
2. Click on the **Manual Trigger (Testing)** node.
3. Click **Execute Workflow**.
4. Observe the step-by-step execution:
   - Reading student rows from Google Sheets.
   - Gemini generating Aptitude, Coding, Tips, Quotes.
   - Rows updated in Google Sheets.
   - Gmail sending formatted email to student.

---

## 13. Enabling Daily Schedule

1. Double-click the **Schedule Trigger** node in `Daily Placement Agent`.
2. Confirm interval is set to **Every Day at 09:00 AM** (`0 9 * * *`).
3. Toggle the workflow status switch in top right from **Inactive** to **Active**.

---

## 14. Resume Feedback Workflow

1. Open **Resume Feedback Agent** workflow in n8n.
2. Send a POST request to the Webhook URL `http://localhost:5678/webhook/analyze-resume` with payload:
   ```json
   {
     "Name": "Gun Gun",
     "Email": "student@example.com",
     "resumeText": "Paste student resume content here..."
   }
   ```
3. Gemini AI will analyze the resume, update `Resume Status` to `Reviewed` and `ATS Score` (e.g. 88), and email the detailed breakdown report to the student.

---

## 15. Error Handling

If an API call fails:
- Gemini HTTP Request nodes are set to `continueRegularOutput`, injecting structured fallbacks to prevent workflow crashes.
- Uncaught exceptions trigger the `Placement Agent Error Handler` workflow (`workflows/error-handler-agent.json`), which logs timestamped error tracebacks.

---

## 16. Web Dashboard UI

To launch the web dashboard for demonstrations:
1. Open [`index.html`](file:///c:/Users/SAI%20DINESH/OneDrive/Desktop/AI%20Placement%20Preparation%20Agent/index.html) in any modern web browser.
2. View key metrics: Total Students, Daily Questions, Emails Sent, Resume Reviews, Average ATS Score.
3. Preview today's generated placement content and test the interactive Resume ATS Evaluator.

---

## 17. Project Structure

```
AI Placement Preparation Agent/
├── docker-compose.yml              # n8n Docker service setup
├── .env.example                    # Environment variable template
├── .gitignore                      # Git exclusion rules
├── README.md                       # Project master documentation
├── index.html                      # Web dashboard HTML
├── styles.css                      # Aesthetic styling (Glassmorphism)
├── app.js                          # Dashboard frontend logic
├── workflows/
│   ├── daily-placement-agent.json  # Main daily placement workflow
│   ├── resume-feedback-agent.json # Automated resume analysis workflow
│   └── error-handler-agent.json   # Workflow error handler
├── prompts/
│   ├── aptitude.txt                # Aptitude prompt template
│   ├── coding.txt                  # Coding prompt template
│   ├── interview.txt               # Interview tip prompt template
│   ├── motivational.txt           # Motivational quote prompt template
│   └── resume-feedback.txt         # Resume feedback prompt template
├── data/
│   ├── PlacementAgent_sample_data.csv # Google Sheets CSV template
│   └── PlacementAgent_sample_data.json# Sample JSON dataset
├── docs/
│   ├── SETUP_GUIDE.md              # Detailed step-by-step credentials guide
│   ├── WORKFLOW_EXPLANATION.md    # n8n node & expression documentation
│   └── TESTING_CHECKLIST.md       # Pre-flight and verification checklist
└── screenshots/
    └── README.md                   # Screenshot placeholders guide
```

---

## 18. GitHub Upload Instructions

To upload this complete project to GitHub:

```bash
# 1. Initialize git repository
git init

# 2. Add all files (secrets in .env are ignored by .gitignore)
git add .

# 3. Commit changes
git commit -m "Initial commit: AI Placement Preparation Agent using n8n, Docker, Gemini & Google APIs"

# 4. Create repository on GitHub and link remote
git remote add origin https://github.com/YOUR_USERNAME/AI-Placement-Preparation-Agent.git

# 5. Push code to main branch
git branch -M main
git push -u origin main
```

---

## License & Credits

- Developed for B.Tech Campus Placement Preparation Automation.
- Powered by **Google Gemini AI**, **n8n**, **Docker**, **Google Sheets API**, and **Gmail API**.
