"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { WHATSAPP } from "@/lib/contact";



export default function HeroReservation() {
  const lang = useLocale() === "en" ? "en" : "fr";
  const t = useTranslations("hero");
  
  return (
    <section className="stats">
      
      <div className="hero wrap">
        <span className="eyebrow up d1">{t("heroReservation")}</span>
        
      </div>

      {/* <span className="slide-cap">{slides[i].label[lang]}</span> */}

      
    </section>
  );
}