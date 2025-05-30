"use client"

import * as React from "react"
import CalendarLib from "react-calendar"
import "react-calendar/dist/Calendar.css"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

export type CalendarProps = React.ComponentProps<typeof CalendarLib>

function Calendar({
  className,
  ...props
}: CalendarProps) {
  return (
    <div className={cn("p-3", className)}>
      <CalendarLib
        prevLabel={
          <span className="flex items-center justify-center">
            <ChevronLeft className="h-4 w-4" />
          </span>
        }
        nextLabel={
          <span className="flex items-center justify-center">
            <ChevronRight className="h-4 w-4" />
          </span>
        }
        navigationLabel={({ date, label, locale, view }) => (
          <span className="text-sm font-medium">{label}</span>
        )}
        tileClassName={({ date, view }) =>
          cn(
            buttonVariants({ variant: "ghost" }),
            "h-9 w-9 p-0 font-normal aria-selected:opacity-100",
            view === "month" && "text-sm",
          )
        }
        {...props}
      />
    </div>
  )
}
Calendar.displayName = "Calendar"

export { Calendar }
