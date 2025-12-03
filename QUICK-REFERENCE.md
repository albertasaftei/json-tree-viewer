# Quick Reference Card

## 🚀 Commands

```bash
# Development
npm run dev              # Start dev server (localhost:3000)
npm run build            # Build for production
npm start                # Run production build
npm run lint             # Run ESLint

# Maintenance
npm install              # Install dependencies
npm update               # Update packages
rm -rf node_modules      # Clean install
```

## 📋 Keyboard Shortcuts

| Action        | Shortcut                       |
| ------------- | ------------------------------ |
| Submit form   | `Enter`                        |
| Cancel edit   | `Escape`                       |
| Refresh page  | `Cmd+R` / `Ctrl+R`             |
| Hard refresh  | `Cmd+Shift+R` / `Ctrl+Shift+R` |
| Open DevTools | `F12` or `Cmd+Option+I`        |

## 🎯 File Locations

| File                                  | Purpose          |
| ------------------------------------- | ---------------- |
| `src/app/page.tsx`                    | Main page entry  |
| `src/components/json-tree-viewer.tsx` | Main logic       |
| `src/components/json-node.tsx`        | Tree rendering   |
| `src/app/globals.css`                 | Styles & theme   |
| `src/lib/utils.ts`                    | Helper functions |
| `sample-data.json`                    | Test data        |

## 🎨 UI Components

| Component | Import From                 | Use For    |
| --------- | --------------------------- | ---------- |
| Button    | `@/components/ui/button`    | Actions    |
| Input     | `@/components/ui/input`     | Text input |
| Textarea  | `@/components/ui/textarea`  | Large text |
| Card      | `@/components/ui/card`      | Containers |
| Accordion | `@/components/ui/accordion` | Tree view  |

## 💡 Common Tasks

### Import JSON

```typescript
// From file
<input type="file" onChange={handleFileImport} />;

// From text
const parsed = JSON.parse(jsonString);
setJsonData(parsed);
```

### Export JSON

```typescript
const dataStr = JSON.stringify(jsonData, null, 2);
const blob = new Blob([dataStr], { type: "application/json" });
// Download blob
```

### Update Value

```typescript
onUpdate(path, newValue);
// path: "user.name" or "items[0]"
// newValue: any JSON value
```

### Delete Node

```typescript
onDelete(path);
// Removes node at path
```

## 🎨 Color Variables

### Light Mode

```css
--background: white
--foreground: dark gray
--primary: black
--secondary: light gray
--muted: very light gray
--accent: light gray
--destructive: red
```

### Dark Mode

```css
--background: dark gray
--foreground: white
--primary: light gray
--secondary: gray
--muted: dark gray
--accent: gray
--destructive: light red
```

## 🔧 Utility Functions

### cn() - Class Name Merger

```typescript
import { cn } from "@/lib/utils";

cn("base-class", condition && "conditional-class");
// Merges Tailwind classes intelligently
```

## 📊 JSON Types

| Type    | Example            | Edit As |
| ------- | ------------------ | ------- |
| String  | `"hello"`          | Text    |
| Number  | `42`, `3.14`       | Number  |
| Boolean | `true`, `false`    | Boolean |
| Null    | `null`             | Null    |
| Array   | `[1, 2, 3]`        | JSON    |
| Object  | `{"key": "value"}` | JSON    |

## 🎯 Path Syntax

| JSON                           | Path              |
| ------------------------------ | ----------------- |
| `{ "name": "John" }`           | `"name"`          |
| `{ "user": { "age": 30 } }`    | `"user.age"`      |
| `{ "items": [1, 2, 3] }`       | `"items[0]"`      |
| `{ "users": [{"name": "A"}] }` | `"users[0].name"` |

## 🐛 Quick Debug

```typescript
// Check JSON validity
JSON.parse(jsonString); // Throws if invalid

// Check current state
console.log(jsonData);

// Check path navigation
console.log(path.split(/\.|\[|\]/).filter(Boolean));

// Check component props
console.log({ data, path, onUpdate, onDelete });
```

## ⚡ Performance Tips

1. **Don't expand all nodes** - Only open what you need
2. **Use smaller files** - Split large JSON files
3. **Close unused accordions** - Reduces rendered elements
4. **Clear console** - Removes old logs
5. **Hard refresh** - Clears cache

## 🎨 Tailwind Quick Reference

### Layout

```
flex flex-col items-center justify-between gap-4
grid grid-cols-2 space-y-4
```

### Sizing

```
w-full h-full max-w-7xl min-h-screen
p-4 px-8 py-2 m-4 mx-auto
```

### Colors

```
bg-background text-foreground
bg-primary text-primary-foreground
bg-muted text-muted-foreground
```

### Effects

```
rounded-lg shadow-sm border
hover:bg-accent focus:ring-2
transition-colors duration-200
```

## 📝 Common Patterns

### Conditional Rendering

```typescript
{
  condition && <Component />;
}
{
  condition ? <ComponentA /> : <ComponentB />;
}
```

### Array Mapping

```typescript
{
  items.map((item, index) => <Component key={index} data={item} />);
}
```

### State Updates

```typescript
const [state, setState] = useState(initial);
setState(newValue); // Replace
setState((prev) => [...prev, newItem]); // Add
```

### Form Handling

```typescript
const { register, handleSubmit } = useForm()
<input {...register("fieldName")} />
<form onSubmit={handleSubmit(onSubmit)}>
```

## 🔍 Troubleshooting Quick Checks

| Issue            | Quick Fix                                      |
| ---------------- | ---------------------------------------------- |
| Won't start      | Check Node.js version (must be 20+)            |
| Module error     | Run `npm install`                              |
| Styling broken   | Delete `.next`, restart                        |
| Can't parse JSON | Validate at jsonlint.com                       |
| Port in use      | Kill process: `lsof -ti:3000 \| xargs kill -9` |
| Import fails     | Check file is valid JSON                       |
| Export fails     | Check browser download settings                |

## 📚 Documentation Index

- **README.md** - Full documentation
- **QUICK-START.md** - Setup guide
- **FEATURES.md** - Feature list
- **TROUBLESHOOTING.md** - Problem solving
- **ARCHITECTURE.md** - Code structure
- **PROJECT-SUMMARY.md** - Overview

## 🌐 Useful Links

- **Next.js Docs**: https://nextjs.org/docs
- **React Docs**: https://react.dev
- **Tailwind Docs**: https://tailwindcss.com/docs
- **shadcn/ui**: https://ui.shadcn.com
- **TypeScript**: https://typescriptlang.org/docs
- **JSON Validator**: https://jsonlint.com

## 🎯 Project Info

- **Name**: JSON Tree Viewer
- **Version**: 1.0.0
- **Framework**: Next.js 16
- **React**: 19.2.0
- **Node Required**: ≥20.9.0
- **Package Manager**: npm
- **License**: MIT

---

**Keep this card handy for quick reference!** 📌
