import * as React from "react";


export function RevenueChart() {
  const data = [
    { month: "Jun", rev: 1420000 },
    { month: "Jul", rev: 1850000 },
    { month: "Aug", rev: 1680000 },
    { month: "Sep", rev: 2190000 },
    { month: "Oct", rev: 2840000 },
    { month: "Nov", rev: 3450000 },
  ];

  const maxVal = 4000000;
  const points = data
    .map((d, i) => {
      const x = 50 + i * 90;
      const y = 180 - (d.rev / maxVal) * 140;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <div className="p-6 rounded-2xl bg-white border border-stone-soft/20 shadow-xs space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-serif text-lg font-bold text-charcoal">Revenue Trajectory</h3>
          <p className="text-xs text-stone-soft">Monthly gross stay receipts (INR)</p>
        </div>
        <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
          +32% QoQ
        </span>
      </div>

      <div className="w-full overflow-x-auto">
        <svg viewBox="0 0 540 220" className="w-full h-48">
          <defs>
            <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#B8975A" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#B8975A" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {[40, 90, 140, 180].map((y, idx) => (
            <line key={idx} x1="40" y1={y} x2="520" y2={y} stroke="#E7E2D8" strokeDasharray="3 3" />
          ))}

          {/* Gradient area */}
          <polygon
            points={`50,180 ${points} ${50 + (data.length - 1) * 90},180`}
            fill="url(#revGrad)"
          />

          {/* Smooth line */}
          <polyline
            fill="none"
            stroke="#2F3E2E"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={points}
          />

          {/* Points */}
          {data.map((d, i) => {
            const x = 50 + i * 90;
            const y = 180 - (d.rev / maxVal) * 140;
            return (
              <g key={i}>
                <circle cx={x} cy={y} r="5" fill="#FAF6EE" stroke="#B8975A" strokeWidth="2.5" />
                <text x={x} y="205" textAnchor="middle" fontSize="11" fill="#8A8378">
                  {d.month}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
