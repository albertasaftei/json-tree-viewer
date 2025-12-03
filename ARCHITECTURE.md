# Component Architecture

## Component Hierarchy

```
App (page.tsx)
└── JsonTreeViewer
    ├── Card (Input Section)
    │   ├── CardHeader
    │   ├── CardContent
    │   │   ├── Form (react-hook-form)
    │   │   │   ├── Textarea (JSON input)
    │   │   │   ├── Button (Parse)
    │   │   │   └── Button (Import)
    │   │   └── Input (file upload - hidden)
    │   └── Error Message
    │
    ├── Card (Tree View Section)
    │   ├── CardHeader
    │   │   └── Button (Export)
    │   └── CardContent
    │       └── JsonNode (recursive)
    │           ├── Primitive Values
    │           │   ├── Input (edit mode)
    │           │   ├── Button (Edit)
    │           │   ├── Button (Save/Cancel)
    │           │   └── Button (Delete)
    │           │
    │           ├── Arrays
    │           │   ├── Button (Add item)
    │           │   ├── Button (Delete array)
    │           │   ├── Input (new value)
    │           │   └── Accordion
    │           │       └── AccordionItem (for each item)
    │           │           ├── AccordionTrigger
    │           │           └── AccordionContent
    │           │               └── JsonNode (recursive)
    │           │
    │           └── Objects
    │               ├── Button (Add property)
    │               ├── Button (Delete object)
    │               ├── Input (new key)
    │               ├── Input (new value)
    │               └── Accordion
    │                   └── AccordionItem (for each property)
    │                       ├── AccordionTrigger
    │                       └── AccordionContent
    │                           └── JsonNode (recursive)
    │
    └── Card (Output Preview Section)
        ├── CardHeader
        └── CardContent
            └── <pre> (formatted JSON)
```

## Component Descriptions

### 1. JsonTreeViewer (Main Component)

**File:** `src/components/json-tree-viewer.tsx`

**Responsibilities:**

- Manages application state
- Handles JSON parsing
- Coordinates file import/export
- Renders the layout

**State:**

- `jsonData`: Current JSON data
- `error`: Error messages
- Form state (via react-hook-form)

**Key Functions:**

- `onSubmit()`: Parses JSON input
- `handleFileImport()`: Imports JSON file
- `handleExport()`: Downloads JSON file
- `updateValue()`: Updates a value at path
- `deleteValue()`: Deletes a value at path

### 2. JsonNode (Recursive Component)

**File:** `src/components/json-node.tsx`

**Responsibilities:**

- Renders a single node in the tree
- Handles different data types
- Provides edit/add/delete UI
- Recursively renders children

**Props:**

- `data`: The JSON value to render
- `path`: String path to this node
- `onUpdate()`: Callback for updates
- `onDelete()`: Callback for deletions

**State:**

- `isEditing`: Edit mode flag
- `editValue`: Temporary edit value
- `newKey`: New property key
- `newValue`: New property value
- `addingChild`: Add mode flag

**Rendering Logic:**

```
if (primitive) → Render value with edit button
if (array) → Render accordion with items
if (object) → Render accordion with properties
```

## Data Flow

### Input Flow

```
User Input
  ↓
Textarea/File Import
  ↓
Form Submit
  ↓
JSON.parse()
  ↓
setJsonData()
  ↓
JsonNode Render
```

### Edit Flow

```
User Clicks Edit
  ↓
setIsEditing(true)
  ↓
User Modifies Value
  ↓
User Clicks Save
  ↓
onUpdate(path, newValue)
  ↓
updateValue() in JsonTreeViewer
  ↓
Parse path → Navigate object → Update value
  ↓
setJsonData(newData)
  ↓
Re-render
```

### Add Flow (Object)

```
User Clicks + on Object
  ↓
setAddingChild(true)
  ↓
User Enters Key and Value
  ↓
User Clicks Add
  ↓
onUpdate(path.key, value)
  ↓
updateValue() in JsonTreeViewer
  ↓
Add property to object
  ↓
setJsonData(newData)
  ↓
Re-render
```

### Delete Flow

```
User Clicks Delete
  ↓
onDelete(path)
  ↓
deleteValue() in JsonTreeViewer
  ↓
Parse path → Navigate to parent → Delete child
  ↓
setJsonData(newData)
  ↓
Re-render
```

## Path System

The path system identifies nodes in the JSON tree:

### Examples:

```javascript
// Root object
path = "";

// Top-level property
path = "name";

// Nested property
path = "user.address.city";

// Array item
path = "hobbies[0]";

// Nested array item in object
path = "users[2].hobbies[1]";

// Complex path
path = "data.users[0].profile.settings.notifications";
```

### Path Parsing:

```javascript
const pathParts = path.split(/\.|\[|\]/).filter(Boolean);
// "users[0].name" → ["users", "0", "name"]
```

### Path Navigation:

```javascript
let current = jsonData;
for (let i = 0; i < pathParts.length - 1; i++) {
  current = current[pathParts[i]];
}
// Navigate to parent node
```

## State Management

### Local State (JsonNode)

```typescript
const [isEditing, setIsEditing] = useState(false);
const [editValue, setEditValue] = useState("");
const [newKey, setNewKey] = useState("");
const [newValue, setNewValue] = useState("");
const [addingChild, setAddingChild] = useState(false);
```

### Global State (JsonTreeViewer)

```typescript
const [jsonData, setJsonData] = useState<JsonValue | null>(null);
const [error, setError] = useState<string>("");
```

### Form State (react-hook-form)

```typescript
const { register, handleSubmit, setValue } = useForm();
```

## Type System

### Core Types:

```typescript
type JsonValue = string | number | boolean | null | JsonObject | JsonArray;
type JsonObject = { [key: string]: JsonValue };
type JsonArray = JsonValue[];
```

### Component Props:

```typescript
interface JsonNodeProps {
  data: JsonValue;
  path: string;
  onUpdate: (path: string, value: JsonValue) => void;
  onDelete: (path: string) => void;
}
```

## UI Components Used

### From shadcn/ui:

- **Accordion** - Tree structure
- **Button** - All actions
- **Card** - Layout sections
- **Input** - Text editing
- **Textarea** - JSON input

### From lucide-react:

- **FileJson** - JSON icon
- **Upload** - Import icon
- **Download** - Export icon
- **Plus** - Add icon
- **Trash2** - Delete icon
- **ChevronDown** - Accordion chevron

## Styling System

### Tailwind Classes:

- **Layout**: `flex`, `grid`, `space-y-*`
- **Sizing**: `w-full`, `h-*`, `max-w-*`
- **Colors**: `bg-*`, `text-*`, `border-*`
- **Spacing**: `p-*`, `m-*`, `gap-*`
- **Effects**: `rounded-*`, `shadow-*`

### CSS Variables:

```css
--background
--foreground
--primary
--secondary
--muted
--accent
--destructive
--border
--input
--ring
```

### Dark Mode:

Automatically applied via `.dark` class with CSS variables.

## Performance Considerations

### Optimization Strategies:

1. **Recursive rendering** - Only visible nodes rendered
2. **Accordion closed by default** - Lazy expansion
3. **Deep cloning** - Immutable updates
4. **Controlled inputs** - Minimal re-renders
5. **Path-based updates** - Direct navigation

### Potential Improvements:

- Virtual scrolling for large arrays
- Memoization of JsonNode
- Debounced editing
- Lazy loading of deep structures

## Extension Points

Want to add features? Here's where to add them:

### Add Search:

- Add search state to JsonTreeViewer
- Filter nodes in JsonNode based on search
- Highlight matching text

### Add Validation:

- Add schema prop to JsonTreeViewer
- Validate on parse and edit
- Show validation errors inline

### Add History:

- Add history array to JsonTreeViewer
- Push state on each change
- Add undo/redo buttons

### Add Copy/Paste:

- Add clipboard functions
- Add copy button to each node
- Add paste into objects/arrays

### Add Drag and Drop:

- Use @dnd-kit library
- Make nodes draggable
- Allow reordering and moving

## Testing Approach

### Unit Tests (Recommended):

```typescript
// Test JSON parsing
describe("JsonTreeViewer", () => {
  it("should parse valid JSON", () => {
    // Test implementation
  });
});

// Test node rendering
describe("JsonNode", () => {
  it("should render primitive values", () => {
    // Test implementation
  });
});
```

### Integration Tests:

- Test full edit flow
- Test add/delete operations
- Test import/export

### E2E Tests:

- Test user interactions
- Test file operations
- Test error handling

---

This architecture provides a solid foundation for a JSON tree viewer with full editing capabilities!
