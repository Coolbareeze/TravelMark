"use client";

import { useEffect, useState } from "react";

function getTimeLeft(target: string) {
  const diff = Math.max(0, new Date(target).getTime() - Date.now());
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

/** Live countdown used on limited-time offer cards. */
export function OfferCountdown({ endsAt }: { endsAt: string }) {
  const [time, setTime] = useState(() => getTimeLeft(endsAt));

  useEffect(() => {
    const interval = setInterval(() => setTime(getTimeLeft(endsAt)), 1000);
    return () => clearInterval(interval);
  }, [endsAt]);

  const units = [
    { label: "D", value: time.days },
    { label: "H", value: time.hours },
    { label: "M", value: time.minutes },
    { label: "S", value: time.seconds },
  ];

  return (
    <div className="flex items-center gap-1.5" role="timer" aria-label="Offer ends in">
      {units.map((u) => (
        <span
          key={u.label}
          className="flex h-8 min-w-[2.25rem] items-center justify-center rounded-lg bg-navy-900 px-1.5 font-heading text-xs font-bold text-white"
        >
          {String(u.value).padStart(2, "0")}
          <span className="ml-0.5 text-[9px] font-normal text-white/50">{u.label}</span>
        </span>
      ))}
    </div>
  );
}
