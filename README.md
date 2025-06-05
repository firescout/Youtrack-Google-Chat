# 🛠️ YouTrack Workflow: Google Chat Notifications

This YouTrack workflow module automatically **sends a message to a Google Chat room** when an issue changes state (e.g., created, resolved, or reopened). It is designed to improve team awareness and response time by providing real-time updates on issue status changes.

---

## 📦 Features

- Sends a message to Google Chat when:
  - An issue is **created**
  - An issue is **resolved**
  - An issue is **reopened**
- Includes:
  - The action performed (`Created`, `Resolved`, `Reopened`)
  - The user who made the change
  - The issue summary
  - A direct link to the issue

---

## 🔧 Prerequisites

- YouTrack instance with scripting support
- A Google Chat webhook URL

---

## 🧩 Setup Instructions

### 1. **Create a Webhook in Google Chat**
- Go to your Google Chat space
- Click the three dots `⋮` → **Apps & integrations**
- Add a webhook and copy the generated URL

### 2. **Add the Webhook to YouTrack**
In your **YouTrack Workflow**, go to **Settings** and add the webhook URL under the constant name `GOOGLE_CHAT_URL`.

---

## 🔍 How It Works

- This script is triggered **on issue change**.
- The `guard` function checks if the issue's state has changed to **Reported**, **Resolved**, or **Unresolved**.
- The `action` function builds a message with:
  - The **action type**
  - The **email** of the user who triggered the change
  - The **summary** of the issue
  - A **link** to the issue
- This message is sent to Google Chat using a webhook via an HTTP POST request.

---

## ✅ Example Output in Google Chat

```
Issue Resolved
By alice@example.com
Task Fix login bug
https://youtrack.example.com/issue/PROJECT-123
```

---

## 🛡️ Notes

- Ensure your YouTrack has permission to send external HTTP requests.
- You can expand the script to handle more transitions or include additional fields.
- You may configure multiple rules for different Chat rooms if needed.
