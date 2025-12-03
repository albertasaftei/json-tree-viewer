# JSON Tree Viewer & Editor

A powerful and intuitive JSON visualization and editing tool built with Next.js, React, TypeScript, and shadcn/ui components. This application allows users to view, navigate, and edit JSON data in a tree-like structure with an accordion interface.

## Features

✨ **Tree View Visualization**: Display JSON data in an expandable/collapsible tree structure
📝 **Live Editing**: Edit values directly in the interface with real-time updates
➕ **Add New Properties**: Add new key-value pairs to objects or items to arrays
🗑️ **Delete Nodes**: Remove unwanted properties or array items
📂 **File Import**: Import JSON files directly from your computer
💾 **Export Functionality**: Save your edited JSON to a new file
🎨 **Beautiful UI**: Modern interface with shadcn/ui components and Tailwind CSS
🌓 **Dark Mode Support**: Automatic dark mode based on system preferences
📱 **Responsive Design**: Works on desktop and mobile devices

## Prerequisites

- Node.js >= 20.9.0
- npm or yarn

**Note**: If you're currently using Node.js 18.12.1, you'll need to upgrade to version 20.9.0 or higher to run this application.

### Upgrading Node.js

You can upgrade Node.js using:

- **nvm (Node Version Manager)**:

  ```bash
  nvm install 20
  nvm use 20
  ```

- **Download from official website**: https://nodejs.org/

## Getting Started

1. **Install Dependencies**:

   ```bash
   npm install
   ```

2. **Run Development Server**:

   ```bash
   npm run dev
   ```

3. **Open Browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## Usage

### Importing JSON

1. **Manual Input**: Paste your JSON data into the text area on the left
2. **File Import**: Click the "Import" button to load a JSON file from your computer

### Viewing JSON

- The JSON structure is displayed as a tree on the right side
- Click on accordion items to expand/collapse nested objects and arrays
- Objects show the number of properties
- Arrays show the number of items

### Editing JSON

#### Edit a Value:

1. Click the "Edit" button next to any primitive value
2. Modify the value in the input field
3. Click "Save" to apply changes or "Cancel" to discard

#### Add New Properties (Objects):

1. Click the "+" button next to an object
2. Enter the key name and value
3. Click "Add" to create the new property

#### Add New Items (Arrays):

1. Click the "+" button next to an array
2. Enter the value for the new item
3. Click "Add" to append to the array

#### Delete Properties/Items:

- Click the trash icon next to any property or item to remove it

### Exporting JSON

Click the "Export" button at the top of the tree view to download your edited JSON as a file (`edited-data.json`).

## Project Structure

```
json-tree/
├── src/
│   ├── app/
│   │   ├── globals.css          # Global styles and theme
│   │   ├── layout.tsx           # Root layout
│   │   └── page.tsx             # Main page
│   ├── components/
│   │   ├── ui/                  # shadcn/ui components
│   │   │   ├── accordion.tsx
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   └── textarea.tsx
│   │   ├── json-node.tsx        # Recursive JSON node component
│   │   └── json-tree-viewer.tsx # Main application component
│   └── lib/
│       └── utils.ts             # Utility functions
├── package.json
├── tsconfig.json
└── README.md
```

## Technologies Used

- **Next.js 16**: React framework with App Router
- **React 19**: UI library
- **TypeScript**: Type-safe development
- **Tailwind CSS v4**: Utility-first CSS framework
- **shadcn/ui**: Beautiful and accessible component library
- **Radix UI**: Unstyled, accessible components
- **react-hook-form**: Form management
- **lucide-react**: Icon library

## Key Components

### JsonTreeViewer

The main component that handles:

- JSON input/parsing
- File import/export
- State management
- Layout and UI

### JsonNode

A recursive component that:

- Renders different JSON types (objects, arrays, primitives)
- Handles editing functionality
- Manages nested structures
- Provides add/delete operations

## Example JSON

Try pasting this sample JSON to explore the features:

```json
{
  "name": "John Doe",
  "age": 30,
  "email": "john.doe@example.com",
  "address": {
    "street": "123 Main St",
    "city": "New York",
    "country": "USA",
    "zipCode": "10001"
  },
  "hobbies": ["reading", "gaming", "photography"],
  "employment": {
    "company": "Tech Corp",
    "position": "Software Engineer",
    "skills": ["JavaScript", "TypeScript", "React", "Node.js"]
  },
  "active": true,
  "projects": [
    {
      "name": "Project Alpha",
      "status": "completed",
      "year": 2023
    },
    {
      "name": "Project Beta",
      "status": "in-progress",
      "year": 2024
    }
  ]
}
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Troubleshooting

### Node.js Version Error

If you see "Node.js version >=20.9.0 is required":

- Upgrade your Node.js version to 20.9.0 or higher
- Use nvm to switch versions: `nvm use 20`

### Module Not Found Errors

- Run `npm install` to ensure all dependencies are installed
- Delete `node_modules` and `package-lock.json`, then run `npm install` again

### Build Errors

- Ensure all TypeScript errors are resolved
- Check that all imports are correct
- Verify that all required dependencies are installed

## License

MIT

## Contributing

Feel free to submit issues and pull requests!

---

Built with ❤️ using Next.js and shadcn/ui
