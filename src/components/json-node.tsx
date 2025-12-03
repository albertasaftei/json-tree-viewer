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
import { Trash2, Plus } from "lucide-react";

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
}

const JsonNode = ({
  data,
  path,
  onUpdate,
  onDelete,
  editedPaths,
  originalData,
}: JsonNodeProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState("");
  const [newKey, setNewKey] = useState("");
  const [newValue, setNewValue] = useState("");
  const [addingChild, setAddingChild] = useState(false);

  // Check if this path has been edited
  const isEdited = editedPaths.has(path);

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

            return (
              <AccordionItem key={index} value={itemPath}>
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center gap-2 w-full">
                    <span className="text-sm font-mono">[{index}]</span>
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

            return (
              <AccordionItem key={key} value={itemPath}>
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center gap-2 w-full">
                    <span className="text-sm font-mono font-semibold">
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
