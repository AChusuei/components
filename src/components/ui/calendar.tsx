import { DayPicker, type DayPickerProps } from "react-day-picker";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type CalendarProps = DayPickerProps;

function Calendar({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row gap-4",
        month: "flex flex-col gap-4",
        month_caption: "flex justify-center pt-1 relative items-center w-full",
        caption_label: "text-sm font-medium",
        nav: "flex items-center",
        button_previous: cn(
          "absolute left-1 size-7 bg-transparent p-0 opacity-50 hover:opacity-100",
          "inline-flex items-center justify-center rounded-md text-sm font-medium",
          "hover:bg-accent hover:text-accent-foreground",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          "disabled:pointer-events-none disabled:opacity-30 transition-opacity"
        ),
        button_next: cn(
          "absolute right-1 size-7 bg-transparent p-0 opacity-50 hover:opacity-100",
          "inline-flex items-center justify-center rounded-md text-sm font-medium",
          "hover:bg-accent hover:text-accent-foreground",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          "disabled:pointer-events-none disabled:opacity-30 transition-opacity"
        ),
        month_grid: "w-full border-collapse",
        weekdays: "flex",
        weekday: "text-muted-foreground w-9 font-normal text-[0.8rem] text-center",
        weeks: "w-full",
        week: "flex w-full mt-2",
        day: "relative p-0 text-center text-sm h-9 w-9 flex items-center justify-center",
        day_button: cn(
          "h-9 w-9 p-0 font-normal text-sm rounded-md",
          "hover:bg-accent hover:text-accent-foreground",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          "transition-colors"
        ),
        selected:
          "[&>button]:bg-primary [&>button]:text-primary-foreground [&>button]:hover:bg-primary [&>button]:hover:text-primary-foreground",
        today: "[&>button]:bg-accent [&>button]:text-accent-foreground",
        outside:
          "opacity-50 [&>button]:text-muted-foreground [&>button]:aria-selected:bg-transparent",
        disabled: "opacity-50 [&>button]:cursor-not-allowed",
        range_start: "[&>button]:bg-primary [&>button]:text-primary-foreground bg-accent rounded-l-md",
        range_end: "[&>button]:bg-primary [&>button]:text-primary-foreground bg-accent rounded-r-md",
        range_middle: "bg-accent [&>button]:text-accent-foreground [&>button]:hover:bg-transparent rounded-none",
        hidden: "invisible",
        dropdowns: "flex items-center justify-center gap-1 w-full px-6",
        dropdown_root: "relative",
        dropdown: cn(
          "absolute inset-0 w-full opacity-0 cursor-pointer z-10",
          "[&+span]:pointer-events-none"
        ),
        months_dropdown: "relative inline-flex items-center gap-1 text-sm font-medium cursor-pointer",
        years_dropdown: "relative inline-flex items-center gap-1 text-sm font-medium cursor-pointer",
        chevron: "h-4 w-4 text-muted-foreground",
        ...classNames,
      }}
      components={{
        Chevron: ({ orientation, ...rest }) =>
          orientation === "left" ? (
            <ChevronLeft {...rest} className="h-4 w-4" />
          ) : (
            <ChevronRight {...rest} className="h-4 w-4" />
          ),
      }}
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
