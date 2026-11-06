"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import { Clock, MessageCircle, Phone, Send, X } from "lucide-react";
import { BrandIcon } from "@/components/icons/BrandIcon";
import { site, whatsappLink } from "@/lib/site";

export type WhatsAppFloatLabels = {
  open: string;
  close: string;
  title: string;
  subtitle: string;
  destination: string;
  message: string;
  reset: string;
  send: string;
  opensInNewTab: string;
};

type Props = {
  /** Pesan bawaan sesuai bahasa aktif. */
  defaultMessage: string;
  /** Hari & jam layanan, mis. "Senin – Jumat, 08.00 – 16.00 WIB". */
  hours: string;
  labels: WhatsAppFloatLabels;
};

/**
 * Tombol WhatsApp mengambang dengan panel pesan (gaya mengikuti web Talenta Juara).
 * Pengunjung dapat mengubah pesan bawaan, lalu "Kirim" membuka WhatsApp di tab baru (wa.me).
 * Tidak ada data yang dikirim ke server situs.
 */
export function WhatsAppFloat({ defaultMessage, hours, labels }: Props) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState(defaultMessage);
  const containerRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const panelId = useId();
  const titleId = useId();
  const messageId = useId();

  const edited = message !== defaultMessage;

  // Tutup dengan Esc (fokus kembali ke tombol) atau klik di luar panel.
  useEffect(() => {
    if (!open) return;
    // Fokus ke kolom pesan setelah panel benar-benar tampil (frame berikutnya).
    const raf = requestAnimationFrame(() => textareaRef.current?.focus({ preventScroll: true }));
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const onPointer = (e: PointerEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  const href = whatsappLink(message.trim() || defaultMessage);

  return (
    <div ref={containerRef} className="pointer-events-none fixed right-4 bottom-4 z-50 flex flex-col items-end sm:right-6 sm:bottom-6">
      {/* Panel pesan */}
      <div
        id={panelId}
        role="dialog"
        aria-labelledby={titleId}
        inert={!open}
        className={`mb-3 flex max-h-[calc(100dvh-7rem)] w-[calc(100vw-2rem)] max-w-[360px] origin-bottom-right flex-col gap-3.5 overflow-y-auto rounded-2xl border border-gray-100 bg-white p-4 text-ink shadow-2xl duration-300 sm:p-5 ${
          // Saat dibuka, visibility langsung "visible" (agar kolom pesan bisa difokus); saat ditutup ikut transisi.
          open
            ? "pointer-events-auto visible translate-y-0 scale-100 opacity-100 transition-[opacity,transform]"
            : "invisible translate-y-4 scale-95 opacity-0 transition-[opacity,transform,visibility]"
        }`}
      >
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <div className="flex items-center gap-3">
            <span aria-hidden className="flex size-10 items-center justify-center rounded-full bg-[#25D366] text-white shadow-md">
              <BrandIcon id="whatsapp" className="size-5" />
            </span>
            <div>
              <p id={titleId} className="text-sm leading-tight font-bold text-gray-900">
                {labels.title}
              </p>
              <p className="text-[11px] font-medium text-gray-500">{labels.subtitle}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              toggleRef.current?.focus();
            }}
            className="rounded-full p-1.5 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
          >
            <X className="size-4.5" aria-hidden />
            <span className="sr-only">{labels.close}</span>
          </button>
        </div>

        {/* Tujuan: satu nomor resmi sekolah (site.json) */}
        <div className="flex flex-col gap-1.5">
          <p className="flex items-center gap-1.5 text-xs font-semibold text-gray-700">
            <MessageCircle className="size-3.5 text-[#25D366]" aria-hidden />
            {labels.destination}
          </p>
          <div className="flex items-center gap-2.5 rounded-xl border border-gray-200 bg-gray-50/80 px-3.5 py-2.5">
            <span className="flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-gray-200 bg-white">
              <Image src="/images/brand/logo-kreativa-shield.png" alt="" width={32} height={32} className="size-7 object-contain" />
            </span>
            <span className="flex min-w-0 flex-col">
              <span className="truncate text-sm leading-snug font-bold text-gray-900">{site.name}</span>
              <span className="flex flex-wrap items-center gap-x-2.5 gap-y-0.5 text-[11px] font-medium text-gray-600">
                <span className="inline-flex items-center gap-1">
                  <Phone className="size-3 text-gray-400" aria-hidden />
                  {site.contact.phoneDisplay}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Clock className="size-3 text-gray-400" aria-hidden />
                  {hours}
                </span>
              </span>
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <label htmlFor={messageId} className="text-xs font-semibold text-gray-700">
              {labels.message}
            </label>
            {edited && (
              <button type="button" onClick={() => setMessage(defaultMessage)} className="text-[11px] font-medium text-[#15803d] hover:underline">
                {labels.reset}
              </button>
            )}
          </div>
          <textarea
            ref={textareaRef}
            id={messageId}
            rows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="min-h-[90px] w-full resize-none rounded-xl border border-gray-200 bg-gray-50 p-3 text-sm text-gray-800 outline-none transition-[border-color,box-shadow] focus:border-[#25D366] focus:ring-2 focus:ring-[#25D366]/20"
          />
        </div>

        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setOpen(false)}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#15803d] px-4 py-3 text-sm font-semibold text-white shadow-md transition-[background-color,box-shadow,transform] hover:bg-[#166534] hover:shadow-lg active:scale-[0.98]"
        >
          {labels.send}
          <Send className="size-4" aria-hidden />
          <span className="sr-only">({labels.opensInNewTab})</span>
        </a>
      </div>

      {/* Tombol utama */}
      <div className="group/wa pointer-events-none relative flex items-center">
        {!open && (
          <span
            aria-hidden
            className="pointer-events-none absolute top-1/2 right-full mr-3 hidden -translate-x-2 -translate-y-1/2 rounded-lg border border-gray-100 bg-white px-3 py-1.5 text-xs font-semibold whitespace-nowrap text-ink opacity-0 shadow-md transition-all duration-300 group-hover/wa:translate-x-0 group-hover/wa:opacity-100 sm:block"
          >
            {labels.open}
          </span>
        )}
        <button
          ref={toggleRef}
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((v) => !v)}
          className={`pointer-events-auto relative flex size-14 items-center justify-center rounded-full text-white transition-all duration-300 hover:scale-110 active:scale-95 ${
            open
              ? "bg-gray-800 shadow-[0_4px_20px_rgba(0,0,0,0.2)]"
              : "bg-[#25D366] shadow-[0_4px_20px_rgba(37,211,102,0.4)] hover:shadow-[0_6px_24px_rgba(37,211,102,0.6)]"
          }`}
        >
          <span className="relative flex size-8 items-center justify-center">
            <span className={`absolute transition-all duration-300 ${open ? "scale-0 rotate-90 opacity-0" : "scale-100 rotate-0 opacity-100"}`}>
              <BrandIcon id="whatsapp" className="size-8" />
            </span>
            <span className={`absolute transition-all duration-300 ${open ? "scale-100 rotate-0 opacity-100" : "scale-0 -rotate-90 opacity-0"}`}>
              <X className="size-7" strokeWidth={2.5} aria-hidden />
            </span>
          </span>
          <span className="sr-only">{open ? labels.close : labels.open}</span>
        </button>
      </div>
    </div>
  );
}
