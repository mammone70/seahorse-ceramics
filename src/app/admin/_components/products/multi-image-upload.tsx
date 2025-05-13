"use client"

import { Button } from "@/components/ui/button"
import { ImagePlus, X } from "lucide-react"
import Image from "next/image"
import { useCallback, useState } from "react"
import { useDropzone } from "react-dropzone"

interface MultiImageUploadProps {
  onImagesChange: (files: File[]) => void
  maxFiles?: number
  maxSize?: number // in bytes
}

export function MultiImageUpload({ 
  onImagesChange, 
  maxFiles = 5, 
  maxSize = 5 * 1024 * 1024 // 5MB default
}: MultiImageUploadProps) {
  const [previews, setPreviews] = useState<string[]>([])

  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Filter out files that exceed maxSize
    const validFiles = acceptedFiles.filter(file => file.size <= maxSize)
    
    // Create preview URLs
    const newPreviews = validFiles.map(file => URL.createObjectURL(file))
    setPreviews(prev => [...prev, ...newPreviews].slice(0, maxFiles))
    
    // Notify parent component
    onImagesChange(validFiles)
  }, [maxFiles, maxSize, onImagesChange])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif']
    },
    maxFiles,
    maxSize
  })

  const removeImage = (index: number) => {
    setPreviews(prev => {
      const newPreviews = [...prev]
      URL.revokeObjectURL(newPreviews[index])
      newPreviews.splice(index, 1)
      return newPreviews
    })
  }

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
          ${isDragActive ? 'border-primary bg-primary/5' : 'border-muted-foreground/25 hover:border-primary/50'}`}
      >
        <input {...getInputProps()} />
        <ImagePlus className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
        <p className="text-sm text-muted-foreground mb-1">
          {isDragActive
            ? "Drop the files here..."
            : "Drag and drop images here, or click to select files"}
        </p>
        <p className="text-xs text-muted-foreground">
          Max {maxFiles} images, up to {maxSize / 1024 / 1024}MB each
        </p>
      </div>

      {previews.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {previews.map((preview, index) => (
            <div key={preview} className="relative group">
              <Image
                src={preview}
                alt={`Preview ${index + 1}`}
                width={200}
                height={200}
                className="rounded-md object-cover w-full aspect-square"
              />
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => removeImage(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
} 