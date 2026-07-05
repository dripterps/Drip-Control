import { C } from "../lib/constants";

export default function BackdropDecor() {
  return (
    <div
      className="absolute inset-0"
      style={{ background: `radial-gradient(60% 60% at 20% 20%, ${C.violet}22, transparent 60%), radial-gradient(50% 50% at 85% 80%, ${C.mint}18, transparent 60%), ${C.inkSoft}` }}
    />
  );
}
