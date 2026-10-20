"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Villa } from "@/types";
import { villaService } from "@/services/villaService";
import { toISODateString } from "@/lib/formatters";
import { showToast } from "@/hooks/useToast";

interface AvailabilityManagerProps {
  villas: Villa[];
}

export function AvailabilityManager({ villas }: AvailabilityManagerProps) {
  const [selectedVillaId, setSelectedVillaId] = React.useState<string>(villas[0]?.id || "");
  const [currentDate, setCurrentDate] = React.useState(new Date());
  const [villaList, setVillaList] = React.useState<Villa[]>(villas);

  const selectedVilla = villaList.find((v) => v.id === selectedVillaId) || villaList[0];

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();

  const handleToggle = async (dateStr: string) => {
    if (!selectedVilla) return;
    try {
      const updated = await villaService.toggleDateBlock(selectedVilla.id, dateStr);
      setVillaList((prev) => prev.map((v) => (v.id === updated.id ? updated : v)));
      const isNowBlocked = updated.blockedDates.includes(dateStr);
      showToast(
        isNowBlocked ? "Date Blocked" : "Date Unblocked",
        `${dateStr} is now ${isNowBlocked ? "blocked" : "available"} for ${selectedVilla.name}`,
        "info"
      );
    } catch {
      showToast("Error", "Could not update availability", "error");
    }
  };

  const days = [];
  for (let i = 0; i < firstDay; i++) {
    days.push(<div key={`e-${i}`} className="h-10" />);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const d = new Date(year, month, day);
    const dateStr = toISODateString(d);
    const isBlocked = selectedVilla?.blockedDates?.includes(dateStr);

    days.push(
      <button
        key={dateStr}
        type="button"
        onClick={() => handleToggle(dateStr)}
        className={`h-10 text-xs font-semibold rounded-xl flex items-center justify-center transition-all cursor-pointer ${
          isBlocked
            ? "bg-red-50 text-red-700 border border-red-200 hover:bg-red-100"
            : "bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100"
        }`}
      >
        {day}
      </button>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-stone-soft/20 p-6 shadow-xs space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h3 className="font-serif text-xl font-bold text-charcoal">Block & Manage Availability</h3>
          <p className="text-xs text-stone-soft">Click any date to instantly toggle between open & blocked booking slots</p>
        </div>
        <select
          value={selectedVillaId}
          onChange={(e) => setSelectedVillaId(e.target.value)}
          className="border border-stone-soft/30 rounded-lg p-2.5 text-xs font-medium text-charcoal bg-sand/30"
        >
          {villaList.map((v) => (
            <option key={v.id} value={v.id}>{v.name} ({v.destination})</option>
          ))}
        </select>
      </div>

      <div className="max-w-md mx-auto p-4 rounded-2xl bg-sand/30 border border-stone-soft/30">
        <div className="flex justify-between items-center mb-4">
          <h4 className="font-serif font-bold text-base text-charcoal">{monthNames[month]} {year}</h4>
          <div className="flex gap-1">
            <button onClick={() => setCurrentDate(new Date(year, month - 1, 1))} className="p-1 rounded hover:bg-sand text-stone-soft">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button onClick={() => setCurrentDate(new Date(year, month + 1, 1))} className="p-1 rounded hover:bg-sand text-stone-soft">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-1 text-center mb-2">
          {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((w) => (
            <div key={w} className="text-[10px] uppercase font-bold text-stone-soft">{w}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">{days}</div>

        <div className="flex justify-center gap-6 mt-4 pt-4 border-t border-stone-soft/20 text-xs">
          <span className="flex items-center gap-1.5 text-emerald-800"><span className="w-3 h-3 rounded-md bg-emerald-100 border border-emerald-300" /> Available</span>
          <span className="flex items-center gap-1.5 text-red-700"><span className="w-3 h-3 rounded-md bg-red-100 border border-red-300" /> Blocked / Reserved</span>
        </div>
      </div>
    </div>
  );
}
