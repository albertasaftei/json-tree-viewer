# Troubleshooting Guide

## Common Issues and Solutions

### 1. Node.js Version Error

**Error:**

```
You are using Node.js 18.12.1. For Next.js, Node.js version ">=20.9.0" is required.
```

**Solution:**

**Option A - Using nvm (Recommended):**

```bash
# Install nvm if you don't have it
# Visit: https://github.com/nvm-sh/nvm

# Install Node.js 20
nvm install 20

# Use Node.js 20
nvm use 20

# Set as default (optional)
nvm alias default 20

# Verify version
node --version  # Should show v20.x.x
```

**Option B - Direct Installation:**

1. Visit https://nodejs.org/
2. Download Node.js 20 LTS or higher
3. Install it
4. Restart your terminal
5. Verify: `node --version`

---

### 2. Module Not Found Errors

**Error:**

```
Cannot find module '@radix-ui/react-accordion'
```

**Solutions:**

**Step 1 - Clean Install:**

```bash
# Delete node_modules and package-lock
rm -rf node_modules package-lock.json

# Reinstall
npm install
```

**Step 2 - Verify Installation:**

```bash
# Check if packages are listed
npm list @radix-ui/react-accordion
npm list react-hook-form
```

**Step 3 - Manual Install (if needed):**

```bash
npm install @radix-ui/react-accordion @radix-ui/react-slot react-hook-form class-variance-authority clsx tailwind-merge lucide-react
```

---

### 3. TypeScript Errors

**Error:**

```
Cannot find name 'JsonValue'
```

**Solution:**

- These types are defined in the component files
- Make sure you haven't modified the type definitions
- Restart your TypeScript server in VS Code: `Cmd+Shift+P` → "TypeScript: Restart TS Server"

---

### 4. Import/Export Not Working

**Issue:** JSON file import button doesn't work

**Solutions:**

1. Check browser console for errors (F12 → Console)
2. Ensure file is valid JSON format
3. Try a smaller JSON file first
4. Check browser permissions for file access

**Issue:** Export button doesn't download file

**Solutions:**

1. Check browser's download settings
2. Ensure pop-ups are not blocked
3. Try a different browser
4. Check browser console for errors

---

### 5. Styling Issues

**Issue:** Components look unstyled or broken

**Solutions:**

**Step 1 - Check Tailwind:**

```bash
# Verify Tailwind is installed
npm list tailwindcss
```

**Step 2 - Clear Next.js Cache:**

```bash
rm -rf .next
npm run dev
```

**Step 3 - Verify CSS Import:**
Check that `src/app/globals.css` exists and is imported in `src/app/layout.tsx`

---

### 6. Accordion Not Expanding

**Issue:** Clicking accordion items doesn't expand them

**Solutions:**

1. Check browser console for JavaScript errors
2. Ensure `@radix-ui/react-accordion` is installed
3. Verify animations are defined in `globals.css`
4. Try clearing browser cache

---

### 7. Dev Server Won't Start

**Error:**

```
Port 3000 is already in use
```

**Solution:**

```bash
# Option 1: Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Option 2: Use different port
npm run dev -- -p 3001
```

**Error:**

```
EACCES: permission denied
```

**Solution:**

```bash
# Fix npm permissions
sudo chown -R $USER ~/.npm
sudo chown -R $USER node_modules
```

---

### 8. JSON Parsing Errors

**Error:**

```
Invalid JSON format. Please check your input.
```

**Common Causes:**

1. **Trailing commas**: Not allowed in JSON

   ```json
   {"name": "test",}  ❌
   {"name": "test"}   ✅
   ```

2. **Single quotes**: Must use double quotes

   ```json
   {'name': 'test'}   ❌
   {"name": "test"}   ✅
   ```

3. **Unquoted keys**: Keys must be quoted

   ```json
   {name: "test"}     ❌
   {"name": "test"}   ✅
   ```

4. **Comments**: Not allowed in JSON
   ```json
   {"name": "test"} // comment  ❌
   {"name": "test"}             ✅
   ```

**Solution:**

- Use a JSON validator: https://jsonlint.com/
- Check your JSON syntax carefully
- Copy from a working example

---

### 9. Build Errors

**Error:**

```
Failed to compile
```

**Solutions:**

**Step 1 - Check for TypeScript errors:**

```bash
npm run lint
```

**Step 2 - Clean and rebuild:**

```bash
rm -rf .next
rm -rf node_modules package-lock.json
npm install
npm run build
```

**Step 3 - Check specific files:**
Look at the error message to see which file has the issue

---

### 10. Performance Issues

**Issue:** App is slow with large JSON files

**Solutions:**

1. **Reduce JSON size**: Split large files
2. **Close unused accordions**: Only expand what you need
3. **Use browser dev tools**: Check for memory leaks (F12 → Performance)
4. **Simplify structure**: Flatten deeply nested objects if possible

**Optimization tips:**

- Don't expand all nodes at once
- Work with smaller sections
- Export and reload for fresh state

---

### 11. Dark Mode Not Working

**Issue:** Dark mode doesn't activate

**Solutions:**

1. Check system preferences (macOS: System Settings → Appearance)
2. Verify CSS variables in `globals.css`
3. Clear browser cache
4. Try hard refresh: `Cmd+Shift+R` (Mac) or `Ctrl+Shift+R` (Windows)

---

### 12. Buttons Not Responding

**Issue:** Edit/Add/Delete buttons don't work

**Solutions:**

1. Check browser console for errors
2. Ensure React state is updating (check React DevTools)
3. Verify all imports in component files
4. Try refreshing the page
5. Clear browser cache and reload

---

## Getting More Help

### Check These Files:

1. **README.md** - Full documentation
2. **QUICK-START.md** - Quick setup guide
3. **FEATURES.md** - Feature documentation

### Still Having Issues?

1. **Check browser console**: F12 → Console tab
2. **Check terminal output**: Look for error messages
3. **Verify file structure**: Ensure all files are in correct locations
4. **Test with sample data**: Use `sample-data.json` to test
5. **Try a fresh install**:
   ```bash
   cd ..
   rm -rf json-tree
   # Clone or recreate project
   cd json-tree
   npm install
   npm run dev
   ```

### System Requirements

✅ **Minimum:**

- Node.js >= 20.9.0
- npm >= 9.0.0
- Modern browser (Chrome, Firefox, Safari, Edge)
- 4GB RAM
- Internet connection (for initial install)

✅ **Recommended:**

- Node.js >= 20.10.0
- npm >= 10.0.0
- 8GB RAM
- SSD storage

---

## Useful Commands

```bash
# Check versions
node --version
npm --version

# Clean everything
rm -rf node_modules package-lock.json .next

# Fresh install
npm install

# Run dev server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

---

**Last Updated:** December 2, 2024
