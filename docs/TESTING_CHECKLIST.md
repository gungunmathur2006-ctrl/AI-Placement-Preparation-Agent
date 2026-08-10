# Verification & Testing Checklist

Use this checklist to systematically verify your **AI Placement Preparation Agent** installation.

---

## Pre-Flight Verification Checklist

- [x] **Project Files Present**:
  - `docker-compose.yml`
  - `.env.example`
  - `.gitignore`
  - `README.md`
  - `index.html`, `styles.css`, `app.js`
  - `workflows/daily-placement-agent.json`
  - `workflows/resume-feedback-agent.json`
  - `workflows/error-handler-agent.json`
  - `prompts/aptitude.txt`
  - `prompts/coding.txt`
  - `prompts/interview.txt`
  - `prompts/motivational.txt`
  - `prompts/resume-feedback.txt`
  - `data/PlacementAgent_sample_data.csv`

---

## Runtime Verification Checklist

- [ ] **Docker Engine**:
  ```bash
  docker compose up -d
  ```
  - Verify container status: `docker ps` (Container `placement_agent_n8n` running).

- [ ] **n8n Access**:
  - Web browser opens: `http://localhost:5678`
  - Login / Admin setup successful.

- [ ] **Gemini API Connectivity**:
  - Test curl request:
    ```bash
    curl -X POST "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=YOUR_GEMINI_API_KEY" \
    -H "Content-Type: application/json" \
    -d "{\"contents\":[{\"parts\":[{\"text\":\"Hello\"}]}]}"
    ```
  - API returns HTTP 200 with generated text.

- [ ] **Google Sheets Connection**:
  - `PlacementAgent` sheet created with 9 columns: `Name`, `Email`, `Date`, `Aptitude`, `Coding`, `Interview Tip`, `Motivational Quote`, `Resume Status`, `ATS Score`.
  - Sample student row added (`Gun Gun`, `student@example.com`).

- [ ] **n8n Workflow Executions**:
  - `Daily Placement Agent`: Execute manually in n8n.
  - Verify Aptitude question generated.
  - Verify Coding question generated.
  - Verify Interview tip generated.
  - Verify Motivational quote generated.
  - Verify Google Sheets updated with current date and generated content.
  - Verify Gmail email delivered to recipient address.

- [ ] **Schedule Trigger**:
  - Daily cron `0 9 * * *` configured and active.

- [ ] **Resume Feedback Agent**:
  - Execute resume evaluation workflow.
  - ATS score calculated out of 100.
  - Detailed skills/flaws email delivered to student.

- [ ] **Error Handling**:
  - Invalid API key test: Verify error logger catches failure gracefully without breaking loop.
