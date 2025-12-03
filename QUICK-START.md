# Quick Start Guide

## ⚠️ Important: Node.js Version

You're currently using **Node.js 18.12.1**, but this project requires **Node.js >= 20.9.0**.

### Upgrade Node.js (Choose one method):

#### Option 1: Using nvm (Recommended)

```bash
# Install Node 20
nvm install 20

# Use Node 20
nvm use 20

# Verify version
node --version
```

#### Option 2: Download from nodejs.org

Visit https://nodejs.org/ and download Node.js 20 LTS or higher.

---

## 🚀 Running the Project

Once you have Node.js 20+ installed:

```bash
# Install dependencies (if not already done)
npm install

# Start development server
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📖 How to Use

### 1. **Input JSON**

- Paste JSON in the left textarea
- OR click "Import" to load a .json file

### 2. **View the Tree**

- JSON appears as expandable tree on the right
- Click items to expand/collapse

### 3. **Edit Values**

- Click "Edit" next to any value
- Modify and click "Save"

### 4. **Add Properties/Items**

- Click "+" button next to objects or arrays
- Enter key/value and click "Add"

### 5. **Delete Items**

- Click trash icon to remove properties or array items

### 6. **Export**

- Click "Export" to download edited JSON

---

## 🎯 Sample JSON to Try

```json
{
  "user": {
    "name": "Alice",
    "age": 28,
    "hobbies": ["coding", "music"]
  },
  "active": true
}
```

---

## 🛠️ Technologies Used

- **Next.js 16** (React framework)
- **TypeScript** (Type safety)
- **Tailwind CSS v4** (Styling)
- **shadcn/ui** (UI components)
- **react-hook-form** (Form handling)
- **Radix UI** (Accessible components)

---

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx              # Main page
│   ├── layout.tsx            # Layout wrapper
│   └── globals.css           # Global styles
├── components/
│   ├── json-tree-viewer.tsx  # Main component
│   ├── json-node.tsx         # Recursive tree node
│   └── ui/                   # UI components
└── lib/
    └── utils.ts              # Utility functions
```

---

## ❓ Need Help?

- Check the main [README.md](./README.md) for detailed documentation
- Ensure Node.js version is 20.9.0 or higher
- Run `npm install` if you see module errors
