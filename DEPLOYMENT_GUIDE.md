# Deployment Guide

## 1. Vercel Deployment (Frontend)
1.  Push code to GitHub.
2.  Import project into Vercel.
3.  Framework Preset: Next.js.
4.  Deploy.

## 2. Google Apps Script Setup (Backend)
This project uses Google Sheets as a database and mailer.

### Step A: Prepare Google Sheet
Create a new Google Sheet with the following headers in Row 1:
-   Column A: Timestamp
-   Column B: Role
-   Column C: Region
-   Column D: Name
-   Column E: Email
-   Column F: **Message** (Crucial: New field)

### Step B: Google Apps Script
1.  Extensions > Apps Script.
2.  Paste the `doPost(e)` code provided in the project notes.
3.  **Important:** Identify the file ID of the PDF you want to send and replace `var fileId = "..."`.

### Step C: Deploy Script
1.  Click **Deploy** > **New Deployment**.
2.  Select type: **Web app**.
3.  Description: "v1".
4.  Execute as: **Me**.
5.  Who has access: **Anyone** (Crucial for the form to work without login).
6.  Click **Deploy** and copy the **Web App URL**.

### Step D: Connect Frontend
1.  Open `src/components/landing/ContactSection.tsx`.
2.  Replace the `fetch` URL with your new Web App URL.
3.  Commit and Push to Vercel.

## ⚠️ Common Pitfalls
-   **CORS Error:** Always use `mode: 'no-cors'` in the fetch request.
-   **Message Not Saving:** If you update the script code, you MUST click **Deploy > Manage Deployments > Edit > New Version** for changes to take effect. Just saving the file is not enough.
