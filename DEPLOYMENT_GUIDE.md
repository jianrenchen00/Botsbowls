# Deployment Guide: Bots & Bowls

This guide outlines the steps to deploy the **Bots & Bowls** landing page to production using Vercel and a custom Namecheap domain.

## 1. GitHub Repository Setup

You have already initialized the local repository. To push your code to GitHub:

1.  Open your terminal in the project root.
2.  Run the following commands (copy-paste provided in the chat):
    ```bash
    git branch -M main
    git remote add origin https://github.com/jianrenchen00/Botsbowls.git
    git push -u origin main
    ```

## 2. Vercel Deployment (Recommended)

Vercel is the creators of Next.js and offers the seamless deployment for this stack.

1.  **Sign Up/Login**: Go to [vercel.com](https://vercel.com) and log in with your GitHub account.
2.  **Add New Project**:
    *   Click **"Add New..."** -> **"Project"**.
    *   Select **"Import"** next to the `Botsbowls` repository.
3.  **Configure Project**:
    *   **Framework Preset**: Next.js (should be auto-detected).
    *   **Root Directory**: `./`
    *   **Build Command**: `npm run build`
    *   **Output Directory**: `.next` (default)
    *   **Environment Variables**: None required for this static version.
4.  **Deploy**: Click **"Deploy"**. Vercel will build your site and provide a preview URL (e.g., `botsbowls.vercel.app`).

## 3. Domain Setup (Namecheap)

To connect `botsbowls.com`:

1.  **Vercel Settings**:
    *   Go to your Project Dashboard on Vercel.
    *   Click **Settings** -> **Domains**.
    *   Enter `botsbowls.com` and click **Add**.
    *   Vercel will provide the required DNS records (usually an A Record and a CNAME).

2.  **Namecheap Dashboard**:
    *   Log in to [Namecheap](https://www.namecheap.com).
    *   Go to **Domain List** -> Click **Manage** next to `botsbowls.com`.
    *   Select the **Advanced DNS** tab.
    *   **Delete** any existing parking page records.
    *   **Add New Record**:
        *   **Type**: `A Record`
        *   **Host**: `@`
        *   **Value**: `76.76.21.21` (Vercel's IP)
        *   **TTL**: Automatic
    *   **Add New Record**:
        *   **Type**: `CNAME Record`
        *   **Host**: `www`
        *   **Value**: `cname.vercel-dns.com`
        *   **TTL**: Automatic

3.  **Verification**:
    *   Return to Vercel. It may take a few minutes to verify. Once the indicators turn green, your site is live at `https://botsbowls.com`.

---

**Congratulations! Your AI Robotic Kitchen platform is now global.**
