"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { toISODateString } from "@/lib/formatters";

export interface CalendarProps {
  checkIn?: string;
  checkOut?: string;
  blockedDates?: string[];
  onSelectRange?: (checkIn: string, checkOut: string) => void;
  className?: string;
}

export function Calendar({
  checkIn,
  checkOut,
  blockedDates = [],
  onSelectRange,
  className,
}: CalendarProps) {
  const [currentDate, setCurrentDate] = React.useState(new Date());

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayIndex = new Date(year, month, 1).getDay();

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const handleDateClick = (dateStr: string) => {
    if (blockedDates.includes(dateStr)) return;
    if (!checkIn || (checkIn && checkOut)) {
      onSelectRange?.(dateStr, "");
    } else if (checkIn && !checkOut) {
      if (dateStr <= checkIn) {
        onSelectRange?.(dateStr, "");
      } else {
        // Ensure no blocked dates in between
        const hasBlocked = blockedDates.some((d) => d > checkIn && d < dateStr);
        if (hasBlocked) {
          onSelectRange?.(dateStr, "");
        } else {
          onSelectRange?.(checkIn, dateStr);
        }
      }
    }
  };

  const days = [];
  for (let i = 0; i < firstDayIndex; i++) {
    days.push(<div key={`empty-${i}`} className="h-9 w-9" />);
  }

  const todayStr = toISODateString(new Date());

  for (let day = 1; day <= daysInMonth; day++) {
    const d = new Date(year, month, day);
    const dateStr = toISODateString(d);
    const isPast = dateStr < todayStr;
    const isBlocked = blockedDates.includes(dateStr) || isPast;
    const isStart = checkIn === dateStr;
    const isEnd = checkOut === dateStr;
    const isInRange = checkIn && checkOut && dateStr > checkIn && dateStr < checkOut;

    days.push(
      <button
        key={dateStr}
        type="button"
        disabled={isBlocked}
        onClick={() => handleDateClick(dateStr)}
        className={cn(
          "h-9 w-9 text-xs font-medium rounded-full flex items-center justify-center transition-all cursor-pointer",
          isBlocked && "text-stone-soft/40 line-through cursor-not-allowed hover:bg-transparent",
          !isBlocked && !isStart && !isEnd && !isInRange && "hover:bg-sand text-charcoal",
          isInRange && "bg-sand text-charcoal rounded-none",
          isStart && "bg-cypress text-ivory font-bold rounded-l-full shadow-sm",
          isEnd && "bg-cypress text-ivory font-bold rounded-r-full shadow-sm"
        )}
      >
        {day}
      </button>
    );
  }

  return (
    <div className={cn("bg-white/90 p-4 rounded-xl border border-stone-soft/30 max-w-sm", className)}>
      <div className="flex items-center justify-between mb-4">
        <h4 className="font-serif font-semibold text-charcoal text-base">
          {monthNames[month]} {year}
        </h4>
        <div className="flex gap-1">
          <button
            type="button"
            onClick={prevMonth}
            className="p-1.5 rounded-lg hover:bg-sand text-stone-soft hover:text-charcoal"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={nextMonth}
            className="p-1.5 rounded-lg hover:bg-sand text-stone-soft hover:text-charcoal"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center mb-2">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((weekday) => (
          <div key={weekday} className="h-6 text-[10px] uppercase font-bold text-stone-soft">
            {weekday}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1 text-center">{days}</div>
    </div>
  );
}
