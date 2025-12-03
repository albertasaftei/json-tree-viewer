# Features Documentation

## 🌳 Tree View Visualization

The JSON Tree Viewer displays your JSON data in a hierarchical, expandable tree structure:

- **Objects**: Shown with property count and expandable accordion
- **Arrays**: Shown with item count and expandable accordion
- **Primitives**: Strings, numbers, booleans, and null displayed inline
- **Nested Structures**: Unlimited nesting depth supported

## 📝 Editing Capabilities

### Edit Existing Values

1. **Strings**: Edit text values directly
2. **Numbers**: Modify numeric values
3. **Booleans**: Change true/false values
4. **Null**: Can be changed to any other type

**How to Edit:**

- Click the "Edit" button next to any primitive value
- Modify the value in the input field
- Click "Save" to apply or "Cancel" to discard

### Add New Properties (Objects)

Add new key-value pairs to any JSON object:

**Steps:**

1. Click the "+" button next to an object
2. Enter the property name in the "Key" field
3. Enter the value in the "Value" field
4. Click "Add"

**Value Types:**

- Enter plain text for strings
- Enter numbers directly (e.g., 42, 3.14)
- Enter JSON for complex values (e.g., `{"nested": "object"}` or `[1,2,3]`)
- Enter `true`, `false`, or `null` for those types

### Add New Items (Arrays)

Add new items to any JSON array:

**Steps:**

1. Click the "+" button next to an array
2. Enter the value in the "Value" field
3. Click "Add"

The item will be appended to the end of the array.

### Delete Properties/Items

Remove any property from an object or item from an array:

**Steps:**

- Click the trash icon (🗑️) next to the item you want to delete
- The item is immediately removed

## 📂 File Operations

### Import JSON

Two ways to import JSON data:

1. **Manual Input:**

   - Paste JSON directly into the text area
   - Click "Parse JSON"

2. **File Import:**
   - Click the "Import" button
   - Select a `.json` file from your computer
   - The JSON is automatically parsed and displayed

**Supported:**

- Any valid JSON format
- Files of any size (large files may take time to load)
- Nested and complex structures

### Export JSON

Save your edited JSON to a new file:

**Steps:**

1. Make your edits to the JSON
2. Click the "Export" button
3. A file named `edited-data.json` will be downloaded

**Format:**

- Pretty-printed with 2-space indentation
- Standard JSON format compatible with any JSON parser

## 🎨 User Interface

### Layout

The interface is divided into two main sections:

**Left Panel - Input:**

- Text area for pasting JSON
- Import button for loading files
- Parse button to process JSON
- Error messages for invalid JSON

**Right Panel - Tree View:**

- Expandable/collapsible tree structure
- Edit buttons for primitive values
- Add buttons for objects and arrays
- Delete buttons for all items
- Export button at the top

### Visual Indicators

- **Objects**: Show property count in parentheses
- **Arrays**: Show item count in brackets
- **Keys**: Displayed in monospace font for clarity
- **Values**: Color-coded by type (via Tailwind)
- **Buttons**: Icon-based for clarity (Edit, Add, Delete, Export)

### Accordion Behavior

- Click any accordion trigger to expand/collapse
- Multiple sections can be open simultaneously
- Chevron icon indicates expand/collapse state
- Smooth animation on expand/collapse

## 🎯 JSON Output Preview

A live preview section shows:

- The current state of your JSON
- Pretty-printed format
- Syntax highlighting via `<pre>` tag
- Scrollable for large JSON structures

## ⚡ Real-time Updates

- Changes are immediately reflected in the tree view
- The output preview updates automatically
- No need to re-parse after each edit

## 🔍 Type Handling

### Automatic Type Detection

When adding or editing values, the app tries to parse JSON:

- `"hello"` or `hello` → String
- `42` → Number
- `3.14` → Number
- `true` → Boolean
- `false` → Boolean
- `null` → Null
- `{"key": "value"}` → Object
- `[1, 2, 3]` → Array

### Type Preservation

When editing existing values:

- Numbers remain numbers
- Booleans remain booleans
- Objects and arrays are preserved as-is

## 🎨 Theme Support

- Automatically detects system theme preference
- Dark mode with optimized colors
- Light mode with high contrast
- Smooth transitions between modes

## 📱 Responsive Design

- Works on desktop computers
- Tablet-friendly layout
- Mobile-responsive (stacks vertically on small screens)
- Touch-friendly buttons and controls

## ⚠️ Error Handling

### Invalid JSON

If you enter invalid JSON:

- Clear error message displayed
- Highlights the issue
- Preserves your input for correction

### Type Errors

If you enter an invalid value type:

- Falls back to string type
- No data loss

### Edge Cases

The app handles:

- Empty objects `{}`
- Empty arrays `[]`
- Deeply nested structures
- Large JSON files
- Special characters in keys
- Unicode characters in values

## 🚀 Performance

- Efficient rendering of large JSON structures
- Virtual scrolling for better performance (on large datasets)
- Minimal re-renders on edits
- Fast import/export operations

## 💡 Use Cases

Perfect for:

- **Developers**: Debugging API responses
- **Data Analysts**: Exploring JSON datasets
- **QA Engineers**: Testing JSON configurations
- **Students**: Learning JSON structure
- **Anyone**: Viewing and editing JSON files

## 🔐 Privacy

- All data processing happens locally in your browser
- No data is sent to any server
- No tracking or analytics
- Your JSON stays private

## 🛠️ Technical Details

### Components Used

- **Accordion**: Radix UI Accordion primitive
- **Buttons**: Custom Button component with variants
- **Inputs**: Controlled input components
- **Forms**: react-hook-form for form management
- **Icons**: lucide-react icon library

### State Management

- React useState for component state
- Controlled form inputs
- Deep cloning for immutable updates
- Efficient path-based updates

### Styling

- Tailwind CSS v4 utility classes
- Custom theme with CSS variables
- Responsive breakpoints
- Dark mode support via Tailwind
