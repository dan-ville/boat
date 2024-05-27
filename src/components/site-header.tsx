import React from "react"
import { ModeToggle } from "./ui/mode-toggle"
import { Sailboat } from "lucide-react"

export default function SiteHeader() {
  return (
    <div className="flex items-center justify-between py-2 px-8">
      <span className="text-2xl font-semibold">
        <Sailboat className="inline relative top-[-2px]" height={20} width={20} /> Boat
      </span>
      <ModeToggle />
    </div>
  )
}
