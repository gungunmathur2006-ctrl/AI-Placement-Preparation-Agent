# n8n Workflow & Expression Reference

This document explains the internal mechanics, expressions, and node architecture powering the **AI Placement Preparation Agent**.

---

## 1. Dynamic n8n Expressions

n8n uses Javascript expressions wrapped in double curly braces `{{ ... }}` to inject dynamic data at runtime.

### Key Expressions Used:

| Purpose | n8n Expression Syntax | Source Node |
|---|---|---|
| **Student Name** | `{{$json.Name}}` | Google Sheets Read |
| **Student Email** | `{{$json.Email}}` | Google Sheets Read |
| **Current Date** | `{{$now.format('yyyy-MM-dd')}}` | Built-in `$now` global object |
| **Gemini API Key** | `{{$env.GEMINI_API_KEY}}` | Docker Environment Variable |
| **Spreadsheet ID** | `{{$env.GOOGLE_SHEET_ID}}` | Docker Environment Variable |
| **Parent Item Ref** | `{{$('Loop Over Students').item.json.Name}}` | Referencing loop context |

---

## 2. Dynamic Gemini Prompt Injections

### Aptitude Prompt Expression:
```text
You are an AI placement preparation assistant.

Student name:
{{$json.Name}}

Generate ONE easy aptitude question suitable for a B.Tech fresher.
The question should test basic quantitative aptitude.

Return exactly:
Question:
<question>

Answer:
<answer>

Do not add unnecessary explanation.
```

### Gmail Dynamic Subject & Body Injection:
```text
Subject: Today's Placement Preparation - {{$json.Name}}

Body:
Hello {{$json.Name}},

Here is your placement preparation for today.

========================
APTITUDE
========================

{{$json.Aptitude}}

========================
CODING
========================

{{$json.Coding}}

========================
INTERVIEW TIP
========================

{{$json["Interview Tip"]}}

========================
MOTIVATIONAL QUOTE
========================

{{$json["Motivational Quote"]}}

Keep preparing consistently.

Best Wishes,
AI Placement Preparation Agent
```

---

## 3. Node-by-Node Pipeline

### Workflow: `Daily Placement Agent`
1. **Schedule Trigger**: Fires automatically every morning at 9:00 AM (`cron: 0 9 * * *`).
2. **Manual Trigger**: Allows instant manual execution during mini-project demonstrations.
3. **Google Sheets Read**: Fetches rows dynamically. No student names or emails are hard-coded.
4. **Loop Over Students**: Iterates through each student batch individually.
5. **Gemini HTTP Request Nodes**: Calls Google Gemini 1.5 Flash API asynchronously to fetch 4 specialized preparation assets.
6. **Merge Code Node**: Consolidates responses into a unified JSON object with guaranteed schema preservation.
7. **Google Sheets Update Node**: Updates columns `Date`, `Aptitude`, `Coding`, `Interview Tip`, `Motivational Quote` by matching the student's `Email`.
8. **Gmail Send Email Node**: Delivers personalized study digest.

### Workflow: `Resume Feedback Agent`
1. **Webhook / Drive Trigger**: Receives student resume submission.
2. **Text Extraction Node**: Extracts plain text from PDF file.
3. **Gemini ATS Analysis Node**: Evaluates resume text against technical placement benchmarks.
4. **Parse Feedback Code Node**: Extracts ATS Score out of 100 via regular expressions.
5. **Google Sheets Update**: Sets `Resume Status` to `Reviewed` and records `ATS Score`.
6. **Gmail Send Node**: Emails full PDF feedback critique to the student.

---

## 4. Error Handling Mechanics

- **Gemini API Failures**: `onError: continueRegularOutput` is configured on HTTP nodes. If Gemini fails, default structured fallbacks are inserted so broken emails are never sent.
- **Google Sheets / Gmail Failures**: Exceptions trigger the `Placement Agent Error Handler` workflow (`workflows/error-handler-agent.json`), logging node details and preventing silent failures.
