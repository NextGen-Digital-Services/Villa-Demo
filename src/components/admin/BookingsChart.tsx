import * as React from "react";

export function BookingsChart() {
  const data = [
    { dest: "Goa", count: 48 },
    { dest: "Alibaug", count: 36 },
    { dest: "Lonavala", count: 42 },
    { dest: "Udaipur", count: 28 },
    { dest: "Manali", count: 22 },
    { dest: "Kasauli", count: 19 },
    { dest: "Jaipur", count: 24 },
  ];

  const maxCount = 55;

  return (
    <div className="p-6 rounded-2xl bg-white border border-stone-soft/20 shadow-xs space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-serif text-lg font-bold text-charcoal">Bookings by Destination</h3>
          <p className="text-xs text-stone-soft">Distribution of verified stays this season</p>
        </div>
        <span className="text-xs font-semibold text-cypress bg-sand px-2.5 py-1 rounded-full">
          219 Bookings Total
        </span>
      </div>

      <div className="w-full overflow-x-auto">
        <svg viewBox="0 0 480 200" className="w-full h-48">
          {data.map((d, i) => {
            const barWidth = 36;
            const x = 30 + i * 62;
            const barHeight = (d.count / maxCount) * 130;
            const y = 160 - barHeight;

            return (
              <g key={d.dest} className="group cursor-pointer">
                <rect
                  x={x}
                  y={y}
                  width={barWidth}
                  height={barHeight}
                  rx="6"
                  fill="#B5654A"
                  className="transition-all hover:fill-terracotta-dark"
                />
                <text
                  x={x + barWidth / 2}
                  y={y - 6}
                  textAnchor="middle"
                  fontSize="10"
                  fontWeight="bold"
                  fill="#1F1D1A"
                >
                  {d.count}
                </text>
                <text
                  x={x + barWidth / 2}
                  y="180"
                  textAnchor="middle"
                  fontSize="11"
                  fill="#8A8378"
                >
                  {d.dest}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
