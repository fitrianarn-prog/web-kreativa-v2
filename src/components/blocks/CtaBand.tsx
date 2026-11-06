import { ArrowRight, CalendarCheck } from "lucide-react";
import type { Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { localeHref } from "@/lib/routes";
import { whatsappLink } from "@/lib/site";
import { ButtonLink } from "@/components/ui/ButtonLink";

type Props = { locale: Locale; text: string; lang?: string; id?: string };

/** Penutup halaman: kalimat penutup resmi + tombol Daftar & Jadwalkan Tur (WhatsApp). */
export function CtaBand({ locale, text, lang, id }: Props) {
  const dict = getDictionary(locale);
  return (
    <section id={id} className="py-16 lg:py-20">
      <div className="container-page">
        <div className="flex flex-col items-start gap-8 rounded-card bg-linear-to-br from-brand-600 to-brand-800 px-6 py-12 text-white sm:px-12 lg:flex-row lg:items-center lg:justify-between">
          <p lang={lang} className="max-w-2xl font-heading text-xl leading-snug font-semibold text-balance md:text-2xl">
            {text}
          </p>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <ButtonLink href={localeHref(locale, "/admission")} size="lg">
              {dict.ui.enrollNow}
              <ArrowRight className="size-4" aria-hidden />
            </ButtonLink>
            <ButtonLink href={whatsappLink(dict.whatsapp.tour)} external variant="light" size="lg">
              <CalendarCheck className="size-4" aria-hidden />
              {dict.ui.scheduleTour}
              <span className="sr-only">(WhatsApp, {dict.ui.opensInNewTab})</span>
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
