import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search } from "lucide-react"

interface ProductsToolbarProps {
  onSearchChange?: (value: string) => void
  onCategoryChange?: (value: string) => void
  onStatusChange?: (value: string) => void
}

export function ProductsToolbar({ onSearchChange, onCategoryChange, onStatusChange }: ProductsToolbarProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search products..."
          className="pl-8"
          onChange={(e) => onSearchChange?.(e.target.value)}
        />
      </div>
      <Select onValueChange={onCategoryChange}>
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="All">All Categories</SelectItem>
          <SelectItem value="Vases">Vases</SelectItem>
          <SelectItem value="Bowls">Bowls</SelectItem>
          <SelectItem value="Mugs">Mugs</SelectItem>
          <SelectItem value="Plates">Plates</SelectItem>
        </SelectContent>
      </Select>
      <Select onValueChange={onStatusChange}>
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="All">All Status</SelectItem>
          <SelectItem value="Active">Active</SelectItem>
          <SelectItem value="Draft">Draft</SelectItem>
          <SelectItem value="Archived">Archived</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
} 