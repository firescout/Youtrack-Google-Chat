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
- Valid configuration of the [YouTrack Workflow API](https://www.jetbrains.com/help/youtrack/devportal/YouTrack-Workflow-Reference.html)

---

## 🧩 Setup Instructions

### 1. **Create a Webhook in Google Chat**
- Go to your Google Chat space
- Click the three dots `⋮` → **Apps & integrations**
- Add a webhook and copy the generated URL

### 2. **Add the Webhook to YouTrack**
In your **YouTrack Workflow**, go to **Settings** and add the webhook URL under the constant name `GOOGLE_CHAT_URL`.

---

## 📜 Workflow Script

```js
const entities = require('@jetbrains/youtrack-scripting-api/entities');
const http = require('@jetbrains/youtrack-scripting-api/http');

exports.rule = entities.Issue.onChange({
  title: 'Sends message when issues enter specific states',
  guard: (ctx) => {
    return ctx.issue.becomesReported || ctx.issue.becomesResolved || ctx.issue.becomesUnresolved;
  },
  action: (ctx) => {
    const issue = ctx.issue;
    const updatedBy = 'By ' + issue.updatedBy.email;
    const summary = 'Task ' + issue.summary;
    let action;

    const connection = new http.Connection('GOOGLE_CHAT_URL', null, 2000);
    connection.addHeader('Content-Type', 'application/json');

    if (issue.becomesReported) {
      action = 'Issue Created';
    } else if (issue.becomesResolved) {
      action = 'Issue Resolved';
    } else if (issue.becomesUnresolved) {
      action = 'Issue Reopened';
    }

    const message = `${action}\n${updatedBy}\n${summary}\n${issue.url}`;
    connection.postSync('', null, JSON.stringify({ text: message }));
  },
  requirements: {
    // Add required custom fields, projects, etc. here if needed
  }
});
```

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

---

## 📄 License

MIT License (or your preferred license)
