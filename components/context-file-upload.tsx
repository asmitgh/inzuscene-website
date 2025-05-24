"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Upload, FileText, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface ContextFileUploadProps {
  onFileContent: (content: string) => void
}

export default function ContextFileUpload({ onFileContent }: ContextFileUploadProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [fileName, setFileName] = useState<string | null>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0]
      processFile(file)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      processFile(file)
    }
  }

  const processFile = (file: File) => {
    if (file.type !== "text/plain") {
      alert("Please upload a text file (.txt)")
      return
    }

    setFileName(file.name)

    const reader = new FileReader()
    reader.onload = (e) => {
      const content = e.target?.result as string
      onFileContent(content)
    }
    reader.readAsText(file)
  }

  const clearFile = () => {
    setFileName(null)
    onFileContent("")
  }

  return (
    <div>
      {!fileName ? (
        <div
          className={cn(
            "border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors",
            isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300 hover:border-gray-400",
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center justify-center gap-2">
            <Upload className="h-8 w-8 text-gray-400" />
            <p className="text-sm font-medium">
              Drag and drop your text file here, or{" "}
              <label className="text-blue-600 hover:text-blue-800 cursor-pointer">
                browse
                <Input type="file" accept=".txt" className="hidden" onChange={handleFileChange} />
              </label>
            </p>
            <p className="text-xs text-gray-500">Only .txt files are supported</p>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-between p-3 border rounded-lg bg-gray-50">
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-blue-600" />
            <span className="text-sm font-medium truncate max-w-[200px]">{fileName}</span>
          </div>
          <Button variant="ghost" size="sm" onClick={clearFile} className="h-8 w-8 p-0">
            <X className="h-4 w-4" />
            <span className="sr-only">Remove file</span>
          </Button>
        </div>
      )}
    </div>
  )
}
