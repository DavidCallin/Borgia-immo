"use client";
import { useEffect, useState } from "react";

export default function ScrollBar({ children }) {
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return <header className={solid ? "bar solid" : "bar"}>{children}</header>;
}