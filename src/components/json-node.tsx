"use client";

import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash2, Plus, RotateCcw } from "lucide-react";

type JsonValue = string | number | boolean | null | JsonObject | JsonArray;
type JsonObject = { [key: string]: JsonValue };
type JsonArray = JsonValue[];

interface JsonNodeProps {
  data: JsonValue;
  path: string;
  onUpdate: (path: string, value: JsonValue) => void;
  onDelete: (path: string) => void;
  editedPaths: Set<string>;
  originalData: JsonValue | null;
  searchQuery?: string;
  isTopLevel?: boolean;
}

const JsonNode = ({
  data,
  path,
  onUpdate,
  onDelete,
  editedPaths,
  originalData,
  searchQuery = "",
  isTopLevel = false,
}: JsonNodeProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState("");
  const [newKey, setNewKey] = useState("");
  const [newValue, setNewValue] = useState("");
  const [addingChild, setAddingChild] = useState(false);

  // Check if this path has been edited
  const isEdited = editedPaths.has(path);

  // Check if current key/value matches the search query
  const keyName =
    path
      .split(/\.|\[|\]/)
      .filter(Boolean)
      .pop() || "";
  const keyMatchesSearch =
    searchQuery && keyName.toLowerCase().includes(searchQuery.toLowerCase());
  const valueMatchesSearch =
    searchQuery &&
    typeof data === "string" &&
    data.toLowerCase().includes(searchQuery.toLowerCase());
  const hasDirectMatch = keyMatchesSearch || valueMatchesSearch;

  // Helper function to get the original value at a path
  const getOriginalValue = (
    data: JsonValue | null,
    path: string
  ): JsonValue | undefined => {
    if (!data || !path) return data ?? undefined;
    const pathParts = path.split(/\.|\[|\]/).filter(Boolean);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let current: any = data;
    for (const part of pathParts) {
      if (current === null || current === undefined) return undefined;
      current = current[part];
    }
    return current;
  };

  // Helper function to reset value to original
  const handleReset = () => {
    const originalValue = getOriginalValue(originalData, path);
    if (originalValue !== undefined) {
      onUpdate(path, originalValue);
    }
  };

  // Helper function to check if this node or any of its children match the search
  const hasMatchInTree = (value: JsonValue, currentPath: string): boolean => {
    if (!searchQuery) return true;

    // Check current key name
    const currentKeyName =
      currentPath
        .split(/\.|\[|\]/)
        .filter(Boolean)
        .pop() || "";
    if (currentKeyName.toLowerCase().includes(searchQuery.toLowerCase())) {
      return true;
    }

    // Check if it's a string value that matches
    if (
      typeof value === "string" &&
      value.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return true;
    }

    // Recursively check children
    if (typeof value === "object" && value !== null) {
      if (Array.isArray(value)) {
        return value.some((item, index) =>
          hasMatchInTree(item, `${currentPath}[${index}]`)
        );
      } else {
        return Object.entries(value).some(([key, val]) =>
          hasMatchInTree(val, currentPath ? `${currentPath}.${key}` : key)
        );
      }
    }

    return false;
  };

  // Only filter at the top level - check if this branch has any matches
  const shouldShow = () => {
    // If this is NOT the root object, always show (filtering happens at root's children)
    if (!isTopLevel) return true;
    // If this IS the root and it's an object, don't filter it (filter its children instead)
    if (
      isTopLevel &&
      typeof data === "object" &&
      data !== null &&
      !Array.isArray(data)
    )
      return true;
    // For other top-level items (arrays, primitives), check for matches
    if (!searchQuery) return true;
    return hasMatchInTree(data, path);
  };

  if (!shouldShow()) {
    return null;
  }

  const handleUpdate = () => {
    try {
      const parsed = JSON.parse(editValue);
      onUpdate(path, parsed);
      setIsEditing(false);
    } catch {
      onUpdate(path, editValue);
      setIsEditing(false);
    }
  };

  const handleAddChild = () => {
    if (typeof data === "object" && data !== null && !Array.isArray(data)) {
      try {
        const parsed = JSON.parse(newValue);
        onUpdate(`${path}.${newKey}`, parsed);
      } catch {
        onUpdate(`${path}.${newKey}`, newValue);
      }
      setNewKey("");
      setNewValue("");
      setAddingChild(false);
    }
  };

  const handleAddArrayItem = () => {
    if (Array.isArray(data)) {
      try {
        const parsed = JSON.parse(newValue);
        onUpdate(`${path}[${data.length}]`, parsed);
      } catch {
        onUpdate(`${path}[${data.length}]`, newValue);
      }
      setNewValue("");
      setAddingChild(false);
    }
  };

  // Render primitive values
  if (
    data === null ||
    typeof data === "string" ||
    typeof data === "number" ||
    typeof data === "boolean"
  ) {
    return (
      <div
        className={`flex items-center gap-2 py-2 px-2 rounded transition-colors ${
          isEdited
            ? "bg-amber-100 dark:bg-amber-900/30 border-l-2 border-amber-500"
            : ""
        } ${
          hasDirectMatch
            ? "ring-2 ring-green-500 dark:ring-green-400 bg-green-50 dark:bg-green-900/20"
            : ""
        }`}
      >
        {isEditing ? (
          <div className="flex items-center gap-2 flex-1">
            <Input
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              className="flex-1"
              autoFocus
            />
            <Button size="sm" onClick={handleUpdate}>
              Save
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </Button>
          </div>
        ) : (
          <>
            <code className="flex-1 px-3 py-1.5 bg-muted rounded border border-gray-300 text-sm font-mono">
              {JSON.stringify(data)}
            </code>
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                setEditValue(JSON.stringify(data));
                setIsEditing(true);
              }}
            >
              Edit
            </Button>
            {isEdited && (
              <Button
                size="sm"
                variant="outline"
                onClick={handleReset}
                title="Reset to original value"
              >
                <RotateCcw className="h-4 w-4" />
              </Button>
            )}
            <Button
              size="sm"
              variant="destructive"
              onClick={() => onDelete(path)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </>
        )}
      </div>
    );
  }

  // Render arrays
  if (Array.isArray(data)) {
    return (
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-muted-foreground">
            Array [{data.length} items]
          </span>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setAddingChild(!addingChild)}
          >
            <Plus className="h-4 w-4" />
          </Button>
          {path && (
            <Button
              size="sm"
              variant="destructive"
              onClick={() => onDelete(path)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>

        {addingChild && (
          <div className="flex gap-2 ml-4 p-3 bg-muted/50 rounded">
            <Input
              placeholder="New value"
              value={newValue}
              onChange={(e) => setNewValue(e.target.value)}
            />
            <Button size="sm" onClick={handleAddArrayItem}>
              Add
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setAddingChild(false)}
            >
              Cancel
            </Button>
          </div>
        )}

        <Accordion type="multiple" className="ml-4">
          {data.map((item, index) => {
            const itemPath = `${path}[${index}]`;
            const itemIsEdited = editedPaths.has(itemPath);
            const itemHasEditedChild = Array.from(editedPaths).some(
              (editedPath) =>
                editedPath.startsWith(itemPath + ".") ||
                editedPath.startsWith(itemPath + "[")
            );

            // Check if the index itself matches
            const indexMatches =
              searchQuery && `[${index}]`.includes(searchQuery);

            // Check if the value inside this array item matches
            const itemValueHasMatch =
              searchQuery && !indexMatches && hasMatchInTree(item, itemPath);

            return (
              <AccordionItem key={index} value={itemPath}>
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center gap-2 w-full">
                    <span
                      className={`text-sm font-mono ${
                        indexMatches || itemValueHasMatch
                          ? "bg-green-200 dark:bg-green-900/50 px-1 rounded font-semibold"
                          : ""
                      }`}
                    >
                      [{index}]
                    </span>
                    {(itemIsEdited || itemHasEditedChild) && (
                      <span className="ml-auto mr-4 flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                        <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                          edited
                        </span>
                      </span>
                    )}
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <JsonNode
                    data={item}
                    path={itemPath}
                    onUpdate={onUpdate}
                    onDelete={onDelete}
                    editedPaths={editedPaths}
                    originalData={originalData}
                    searchQuery={searchQuery}
                    isTopLevel={false}
                  />
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>
    );
  }

  // Render objects
  if (typeof data === "object") {
    const entries = Object.entries(data);

    return (
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-muted-foreground">
            Object{" "}
            {entries.length > 0 &&
              `(${entries.length} ${
                entries.length === 1 ? "property" : "properties"
              })`}
          </span>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setAddingChild(!addingChild)}
          >
            <Plus className="h-4 w-4" />
          </Button>
          {path && (
            <Button
              size="sm"
              variant="destructive"
              onClick={() => onDelete(path)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>

        {addingChild && (
          <div className="flex gap-2 ml-4 p-3 bg-muted/50 rounded">
            <Input
              placeholder="Key"
              value={newKey}
              onChange={(e) => setNewKey(e.target.value)}
            />
            <Input
              placeholder="Value"
              value={newValue}
              onChange={(e) => setNewValue(e.target.value)}
            />
            <Button size="sm" onClick={handleAddChild}>
              Add
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setAddingChild(false)}
            >
              Cancel
            </Button>
          </div>
        )}

        <Accordion type="multiple" className="ml-4">
          {entries.map(([key, value]) => {
            const itemPath = path ? `${path}.${key}` : key;
            const itemIsEdited = editedPaths.has(itemPath);
            const itemHasEditedChild = Array.from(editedPaths).some(
              (editedPath) =>
                editedPath.startsWith(itemPath + ".") ||
                editedPath.startsWith(itemPath + "[")
            );

            // If parent is top level (root object), check if this child should be filtered
            const shouldShowItem = () => {
              if (!isTopLevel) return true; // Not filtering at this level
              if (!searchQuery) return true; // No search query
              return hasMatchInTree(value, itemPath); // Check if this branch matches
            };

            if (!shouldShowItem()) {
              return null;
            }

            // Check if the key itself matches
            const keyMatches =
              searchQuery &&
              key.toLowerCase().includes(searchQuery.toLowerCase());

            // Check if the value matches (for primitives or nested strings)
            const valueHasMatch =
              searchQuery && !keyMatches && hasMatchInTree(value, itemPath);

            return (
              <AccordionItem key={key} value={itemPath}>
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center gap-2 w-full">
                    <span
                      className={`text-sm font-mono font-semibold ${
                        keyMatches || valueHasMatch
                          ? "bg-green-200 dark:bg-green-900/50 px-1 rounded"
                          : ""
                      }`}
                    >
                      {key}
                    </span>
                    {(itemIsEdited || itemHasEditedChild) && (
                      <span className="ml-auto mr-4 flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                        <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                          edited
                        </span>
                      </span>
                    )}
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <JsonNode
                    data={value}
                    path={itemPath}
                    onUpdate={onUpdate}
                    onDelete={onDelete}
                    editedPaths={editedPaths}
                    originalData={originalData}
                    searchQuery={searchQuery}
                    isTopLevel={false}
                  />
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>
    );
  }

  return null;
};

export default JsonNode;
