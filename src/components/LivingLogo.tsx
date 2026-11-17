import { PaythonicMark } from "@/components/PaythonicMark";

/** The living logo's states (round 3): loader (O1, the mark draws and undraws), success (U2, the frame's cut
 *  closes and a check appears) and idle (E1, the P lifts into place) for 404 and coming-soon pages. */
export function LivingLogo({ state, size = 96 }: { state: "loader" | "success" | "idle"; size?: number }) {
  return (
    <span className={`living ${state}`} aria-hidden="true">
      <PaythonicMark size={size} cut={state === "success"} />
      {state === "success" && <span className="tick">✓</span>}
    </span>
  );
}
