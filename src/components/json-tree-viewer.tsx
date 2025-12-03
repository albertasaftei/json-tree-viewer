"use client";

import { useState } from "react";
import { useForm, FieldValues } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import JsonNode from "@/components/json-node";
import { Upload, Download, FileJson, Search, X } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

type JsonValue = string | number | boolean | null | JsonObject | JsonArray;
type JsonObject = { [key: string]: JsonValue };
type JsonArray = JsonValue[];

export default function JsonTreeViewer() {
  const [jsonData, setJsonData] = useState<JsonValue | null>(null);
  const [originalJsonData, setOriginalJsonData] = useState<JsonValue | null>(
    null
  );
  const [error, setError] = useState<string>("");
  const [editedPaths, setEditedPaths] = useState<Set<string>>(new Set());
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { register, handleSubmit, setValue } = useForm();

  const onSubmit = (data: FieldValues) => {
    try {
      const parsed = JSON.parse(data.jsonInput as string);
      setJsonData(parsed);
      setOriginalJsonData(JSON.parse(JSON.stringify(parsed))); // Deep copy for comparison
      setError("");
      setEditedPaths(new Set()); // Reset edited paths when loading new JSON
    } catch {
      setError("Invalid JSON format. Please check your input.");
    }
  };

  const handleFileImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target?.result as string);
          setJsonData(parsed);
          setOriginalJsonData(JSON.parse(JSON.stringify(parsed))); // Deep copy for comparison
          setValue("jsonInput", JSON.stringify(parsed, null, 2));
          setError("");
          setEditedPaths(new Set()); // Reset edited paths when loading new JSON
        } catch {
          setError("Invalid JSON file. Please check the file content.");
        }
      };
      reader.readAsText(file);
    }
  };

  const handleExport = () => {
    if (!jsonData) return;

    const dataStr = JSON.stringify(jsonData, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "edited-data.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const getValueAtPath = (
    data: JsonValue,
    path: string
  ): JsonValue | undefined => {
    if (!path) return data;
    const pathParts = path.split(/\.|\[|\]/).filter(Boolean);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let current: any = data;
    for (const part of pathParts) {
      if (current === null || current === undefined) return undefined;
      current = current[part];
    }
    return current;
  };

  const updateValue = (path: string, value: JsonValue) => {
    if (!jsonData) return;

    const pathParts = path.split(/\.|\[|\]/).filter(Boolean);
    const newData = JSON.parse(JSON.stringify(jsonData)) as
      | JsonObject
      | JsonArray;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let current: any = newData;
    for (let i = 0; i < pathParts.length - 1; i++) {
      current = current[pathParts[i]];
    }

    const lastKey = pathParts[pathParts.length - 1];
    current[lastKey] = value;

    setJsonData(newData);

    // Check if the new value matches the original
    const originalValue = originalJsonData
      ? getValueAtPath(originalJsonData, path)
      : undefined;
    const valuesMatch = JSON.stringify(value) === JSON.stringify(originalValue);

    const newEditedPaths = new Set(editedPaths);

    if (valuesMatch) {
      // Remove this path from edited paths if it matches the original
      newEditedPaths.delete(path);
    } else {
      // Mark this path as edited
      newEditedPaths.add(path);
    }

    // Update parent paths - add or remove based on whether they have any edited children
    let parentPath = "";
    for (let i = 0; i < pathParts.length - 1; i++) {
      if (i === 0) {
        parentPath = pathParts[i];
      } else {
        if (/^\d+$/.test(pathParts[i])) {
          parentPath += `[${pathParts[i]}]`;
        } else {
          parentPath += `.${pathParts[i]}`;
        }
      }

      // Check if this parent has any edited children
      const hasEditedChildren = Array.from(newEditedPaths).some(
        (editedPath) =>
          editedPath.startsWith(parentPath + ".") ||
          editedPath.startsWith(parentPath + "[")
      );

      if (hasEditedChildren) {
        newEditedPaths.add(parentPath);
      } else {
        newEditedPaths.delete(parentPath);
      }
    }

    setEditedPaths(newEditedPaths);
  };

  const deleteValue = (path: string) => {
    if (!jsonData) return;

    const pathParts = path.split(/\.|\[|\]/).filter(Boolean);
    const newData = JSON.parse(JSON.stringify(jsonData)) as
      | JsonObject
      | JsonArray;

    if (pathParts.length === 0) {
      setJsonData(null);
      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let current: any = newData;
    for (let i = 0; i < pathParts.length - 1; i++) {
      current = current[pathParts[i]];
    }

    const lastKey = pathParts[pathParts.length - 1];
    if (Array.isArray(current)) {
      current.splice(parseInt(lastKey), 1);
    } else {
      delete current[lastKey];
    }

    setJsonData(newData);
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2 relative">
            <FileJson className="h-10 w-10 text-primary" />
            <h1 className="text-4xl font-bold tracking-tight">
              JSON Tree Viewer
            </h1>
            <div className="absolute right-0">
              <ThemeToggle />
            </div>
          </div>
          <p className="text-muted-foreground text-lg">
            Visualize, edit, and manage your JSON data with ease
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Input JSON</CardTitle>
              <CardDescription>
                Paste your JSON or import from a file
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <Textarea
                  {...register("jsonInput")}
                  placeholder='{"name": "John", "age": 30, "hobbies": ["reading", "gaming"]}'
                  className="font-mono min-h-[300px]"
                />

                {error && (
                  <div className="text-sm text-destructive bg-destructive/10 p-3 rounded">
                    {error}
                  </div>
                )}

                <div className="flex gap-2">
                  <Button type="submit" className="flex-1">
                    Parse JSON
                  </Button>

                  <label htmlFor="file-upload">
                    <Button type="button" variant="outline" asChild>
                      <span className="cursor-pointer">
                        <Upload className="h-4 w-4 mr-2" />
                        Import
                      </span>
                    </Button>
                  </label>
                  <Input
                    id="file-upload"
                    type="file"
                    accept=".json"
                    className="hidden"
                    onChange={handleFileImport}
                  />
                </div>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>JSON Tree View</CardTitle>
                  <CardDescription>
                    Explore and edit your JSON structure
                  </CardDescription>
                </div>
                {jsonData && (
                  <Button onClick={handleExport} variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                )}
              </div>
              {jsonData && (
                <div className="relative mt-4">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search keys..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 pr-9"
                  />
                  {searchQuery && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 p-0"
                      onClick={() => setSearchQuery("")}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              )}
              {jsonData && editedPaths.size > 0 && (
                <div className="flex items-center gap-4 text-xs mt-2 pt-2 border-t">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded bg-amber-100 dark:bg-amber-900/30 border border-amber-500"></div>
                    <span className="text-muted-foreground">Edited value</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                    <span className="text-muted-foreground">
                      Contains edits
                    </span>
                  </div>
                </div>
              )}
            </CardHeader>
            <CardContent>
              {jsonData ? (
                <div className="space-y-4 max-h-[500px] overflow-y-auto">
                  <JsonNode
                    data={jsonData}
                    path=""
                    onUpdate={updateValue}
                    onDelete={deleteValue}
                    editedPaths={editedPaths}
                    originalData={originalJsonData}
                    searchQuery={searchQuery}
                    isTopLevel={true}
                  />
                </div>
              ) : (
                <div className="flex items-center justify-center h-[300px] text-muted-foreground border-2 border-dashed rounded-lg">
                  <div className="text-center space-y-2">
                    <FileJson className="h-12 w-12 mx-auto opacity-50" />
                    <p>No JSON data loaded</p>
                    <p className="text-sm">
                      Parse or import JSON to get started
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {jsonData && (
          <Card>
            <CardHeader>
              <CardTitle>Current JSON Output</CardTitle>
              <CardDescription>
                Preview your edited JSON structure
              </CardDescription>
            </CardHeader>
            <CardContent>
              <pre className="bg-muted p-4 rounded-lg overflow-x-auto text-sm font-mono">
                {JSON.stringify(jsonData, null, 2)}
              </pre>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
