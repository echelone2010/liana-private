"use client"

import { useState } from "react"
import { PropertyList } from "@/components/property-list"
import { PropertyFiltersDrawer } from "@/components/property-filters-drawer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PlusIcon, DownloadIcon, SearchIcon, LayoutGridIcon, LayoutListIcon } from "lucide-react"
import Link from "next/link"
import { exportPropertiesToCSV } from "@/lib/export"
import { toast } from "sonner"

export default function ObjectsPage() {
  const [filters, setFilters] = useState({
    search: "",
    status: "all",
    rooms: "all",
    district: "",
    minPrice: "",
    maxPrice: "",
    minArea: "",
    maxArea: "",
    sortBy: "none",
  })
  const [viewMode, setViewMode] = useState<"standard" | "large">("standard")

  const handleExport = async () => {
    try {
      const response = await fetch("/api/objects")
      const properties = await response.json()
      exportPropertiesToCSV(properties)
      toast.success("Объекты успешно экспортированы")
    } catch (error) {
      console.error("[v0] Export error:", error)
      toast.error("Ошибка при экспорте")
    }
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Объекты недвижимости</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Управление квартирами: добавление, редактирование и контакты владельцев
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleExport} className="glass-card ios-hover bg-transparent">
            <DownloadIcon className="size-4 mr-2" />
            Экспорт CSV
          </Button>
          <Link href="/objects/new">
            <Button className="ios-hover">
              <PlusIcon className="size-4 mr-2" />
              Добавить объект
            </Button>
          </Link>
        </div>
      </div>

      <div className="mb-6 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <Input
            placeholder="Поиск по ID, адресу, району..."
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            className="pl-9 glass-card"
          />
        </div>

        <div className="flex gap-2">
          <div className="flex gap-1 glass-card rounded-lg p-1">
            <Button
              variant={viewMode === "standard" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("standard")}
              className="ios-hover"
            >
              <LayoutListIcon className="size-4" />
            </Button>
            <Button
              variant={viewMode === "large" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("large")}
              className="ios-hover"
            >
              <LayoutGridIcon className="size-4" />
            </Button>
          </div>

          <PropertyFiltersDrawer filters={filters} onFiltersChange={setFilters} />
        </div>
      </div>

      <PropertyList filters={filters} viewMode={viewMode} />
    </div>
  )
}
