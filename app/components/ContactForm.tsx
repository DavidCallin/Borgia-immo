"use client";
import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import { WHATSAPP } from "@/lib/contact";

export default function ContactForm() {
  const t = useTranslations("contactForm");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Modèle : « Bonjour, je suis [Nom prénom] » puis le message à la ligne
    const text = `${t("greeting", { name: name.trim() })}\n${message.trim()}`;
    const href = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`;
    window.open(href, "_blank", "noopener,noreferrer");
  };

  return (
    <form className="cform" onSubmit={onSubmit}>
      <div className="cform-head">
        <h3>{t("title")}</h3>
        <p>{t("intro")}</p>
      </div>

      <div className="cform-field">
        <label htmlFor="cf-name">{t("nameLabel")}</label>
        <input
          id="cf-name"
          name="name"
          type="text"
          autoComplete="name"
          required
          maxLength={80}
          placeholder={t("namePlaceholder")}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="cform-field">
        <label htmlFor="cf-message">{t("messageLabel")}</label>
        <textarea
          id="cf-message"
          name="message"
          required
          maxLength={1000}
          rows={5}
          placeholder={t("messagePlaceholder")}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>

      <button type="submit" className="btn" aria-describedby="cf-note">
        {t("submit")}
      </button>
      <p id="cf-note" className="cform-note">
        {t("note")}
      </p>
    </form>
  );
}