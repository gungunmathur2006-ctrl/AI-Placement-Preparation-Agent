# AI Placement Preparation Agent - Credentials & Setup Guide

This guide provides step-by-step instructions to obtain and configure all required credentials for running the **AI Placement Preparation Agent**.

---

## 1. Google Gemini API Setup

1. Visit **Google AI Studio**: [https://aistudio.google.com/](https://aistudio.google.com/)
2. Log in with your Google account.
3. Click **Get API Key** -> **Create API Key in new project**.
4. Copy your key and add it to your `.env` file:
   ```env
   GEMINI_API_KEY=AIzaSyYourActualGeminiApiKeyHere
   ```

---

## 2. Google Sheets Setup (`PlacementAgent`)

1. Go to **Google Sheets**: [https://sheets.google.com](https://sheets.google.com)
2. Create a new blank spreadsheet titled: **`PlacementAgent`**.
3. In the first tab (Sheet1), create the exact header row in Row 1:

| A | B | C | D | E | F | G | H | I |
|---|---|---|---|---|---|---|---|---|
| **Name** | **Email** | **Date** | **Aptitude** | **Coding** | **Interview Tip** | **Motivational Quote** | **Resume Status** | **ATS Score** |

4. Copy sample student data from [`data/PlacementAgent_sample_data.csv`](file:///c:/Users/SAI%20DINESH/OneDrive/Desktop/AI%20Placement%20Preparation%20Agent/data/PlacementAgent_sample_data.csv) or import the CSV directly (**File -> Import -> Upload**).
5. Copy the Spreadsheet ID from the URL:
   `https://docs.google.com/spreadsheets/d/`**`1AbCdEfGhIjKlMnOpQrStUvWxYz`**`/edit`
6. Add it to your `.env`:
   ```env
   GOOGLE_SHEET_ID=1AbCdEfGhIjKlMnOpQrStUvWxYz
   ```

---

## 3. Google OAuth Setup (For Google Sheets & Gmail Nodes in n8n)

To grant n8n access to read/update Google Sheets and send Gmail messages:

1. Open **Google Cloud Console**: [https://console.cloud.google.com/](https://console.cloud.google.com/)
2. Create a new project named `Placement-Agent-n8n`.
3. Enable APIs:
   - Go to **APIs & Services -> Library**
   - Search for **Google Sheets API** -> Click **Enable**
   - Search for **Gmail API** -> Click **Enable**
4. Configure OAuth Consent Screen:
   - Select **External** user type -> Click **Create**.
   - Fill in App Name (`Placement Agent`), User Support Email, and Developer Email.
   - Add Scopes: `https://www.googleapis.com/auth/spreadsheets`, `https://mail.google.com/`.
   - Add your own email as a **Test User**.
5. Create OAuth 2.0 Client Credentials:
   - Go to **APIs & Services -> Credentials** -> **Create Credentials** -> **OAuth Client ID**.
   - Application Type: **Web application**.
   - Authorized Redirect URI: `http://localhost:5678/rest/oauth2-credential/callback`
6. Copy Client ID & Client Secret to `.env`:
   ```env
   GOOGLE_CLIENT_ID=your_client_id.apps.googleusercontent.com
   GOOGLE_CLIENT_SECRET=GOCSPX-your_client_secret
   ```

---

## 4. n8n Docker Setup & Credential Connection

1. Launch n8n:
   ```bash
   docker compose up -d
   ```
2. Access n8n at: `http://localhost:5678`
3. Create your admin account on first launch.
4. Add Credentials in n8n UI:
   - Go to **Credentials -> New Credential**.
   - Search **Google Sheets OAuth2 API** -> Paste Client ID & Secret -> Click **Connect my account**.
   - Search **Gmail OAuth2 API** -> Paste Client ID & Secret -> Click **Connect my account**.

---

## 5. Importing Workflows

1. In n8n, navigate to **Workflows -> Import from File**.
2. Select [`workflows/daily-placement-agent.json`](file:///c:/Users/SAI%20DINESH/OneDrive/Desktop/AI%20Placement%20Preparation%20Agent/workflows/daily-placement-agent.json).
3. Select [`workflows/resume-feedback-agent.json`](file:///c:/Users/SAI%20DINESH/OneDrive/Desktop/AI%20Placement%20Preparation%20Agent/workflows/resume-feedback-agent.json).
4. Select [`workflows/error-handler-agent.json`](file:///c:/Users/SAI%20DINESH/OneDrive/Desktop/AI%20Placement%20Preparation%20Agent/workflows/error-handler-agent.json).
5. Attach your configured Google Sheets & Gmail credentials to the corresponding nodes.
6. Toggle workflows to **Active**.
