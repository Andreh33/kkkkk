import { addMinutes } from "date-fns";
import { describe, expect, it } from "vitest";

import { computeAvailableSlots } from "@/lib/availability";

// 2026-04-29 is a Wednesday — schedule 09:00–20:00
const BASE_DATE = new Date("2026-04-29T08:00:00.000Z");
// 2026-04-26 is a Sunday — closed
const SUNDAY = new Date("2026-04-26T10:00:00.000Z");
// "Now" reference: 24h before BASE_DATE, so 12h advance window already passes
const NOW = new Date("2026-04-28T08:00:00.000Z");

describe("computeAvailableSlots", () => {
  it("returns empty array on closed day (Sunday)", () => {
    const slots = computeAvailableSlots({
      date: SUNDAY,
      durationMin: 60,
      booked: [],
      now: NOW,
    });
    expect(slots).toEqual([]);
  });

  it("returns slots on an open day with no bookings", () => {
    const slots = computeAvailableSlots({
      date: BASE_DATE,
      durationMin: 60,
      booked: [],
      now: NOW,
    });
    expect(slots.length).toBeGreaterThan(0);
    expect(slots[0]).toBe("09:00");
    // Last slot must leave room for 60 min + 15 min buffer before 20:00 close
    expect(slots[slots.length - 1] <= "18:30").toBe(true);
  });

  it("excludes slots that conflict with an existing appointment", () => {
    const apptStart = new Date(BASE_DATE);
    apptStart.setHours(11, 0, 0, 0);
    const apptEnd = addMinutes(apptStart, 60);

    const slots = computeAvailableSlots({
      date: BASE_DATE,
      durationMin: 60,
      booked: [{ startsAt: apptStart, endsAt: apptEnd }],
      now: NOW,
    });
    // 10:30 slot would end at 11:30 (overlaps), 11:00 starts inside, 11:30 starts inside
    expect(slots).not.toContain("10:30");
    expect(slots).not.toContain("11:00");
    expect(slots).not.toContain("11:30");
    // 09:00 finished by 10:00 (with buffer 10:15) — should still be allowed
    expect(slots).toContain("09:00");
  });

  it("respects minimum 12h advance window", () => {
    // Set "now" close enough to the day that even the LAST slot is < 12h away
    const nearNow = new Date("2026-04-29T08:00:00.000Z");
    const slots = computeAvailableSlots({
      date: BASE_DATE,
      durationMin: 60,
      booked: [],
      now: nearNow,
    });
    // Min-advance pushes past the close-of-day → no slots available
    expect(slots.length).toBe(0);
  });

  it("returns empty when date is beyond max advance days", () => {
    const tooFar = new Date(NOW.getTime() + 100 * 24 * 60 * 60 * 1000);
    const slots = computeAvailableSlots({
      date: tooFar,
      durationMin: 60,
      booked: [],
      now: NOW,
    });
    expect(slots).toEqual([]);
  });

  it("uses the slot interval (30 min)", () => {
    const slots = computeAvailableSlots({
      date: BASE_DATE,
      durationMin: 60,
      booked: [],
      now: NOW,
    });
    // First two slots should be 30 minutes apart
    expect(slots[0]).toBe("09:00");
    expect(slots[1]).toBe("09:30");
  });
});
