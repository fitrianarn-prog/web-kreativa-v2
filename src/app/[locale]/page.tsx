import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { preload } from "react-dom";
import { ArrowRight, CalendarCheck } from "lucide-react";
import { hasLocale } from "@/lib/i18n/config";
import { getDictionary, levelIds, type LevelId } from "@/lib/i18n/dictionaries";
import { getHomeContent } from "@/lib/content";
import { localeHref } from "@/lib/routes";
import { pageMetadata } from "@/lib/seo";
import { site, whatsappLink } from "@/lib/site";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Eyebrow, HeadingDivider, SectionHeading } from "@/components/ui/SectionHeading";
import { HeroVideo } from "@/components/home/HeroVideo";
import { TestimonialCarousel } from "@/components/home/TestimonialCarousel";
import { AchievementsSection } from "@/components/home/AchievementsSection";
import { levelColorClass } from "@/components/layout/nav-types";

export async function generateMetadata({ params }: PageProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(locale)) return {};
  const home = getHomeContent(locale);
  // title.template layout tidak berlaku untuk page di segmen yang sama, jadi nama sekolah ditulis lengkap.
  return pageMetadata({ locale, path: "/", title: `${home.meta.title} | ${site.name}`, description: home.meta.description });
}

const HERO_POSTER = "/images/home/hero-poster.webp";
/** Foto asli kegiatan siswa untuk section Keunggulan & CTA penutup. */
const WHY_IMAGE = "/images/kindergarten/daily-activities.webp";
const CTA_IMAGE = "/images/kindergarten/slide-3.webp";

const levelImages: Record<LevelId, string> = {
  kindergarten: "/images/kindergarten/slide-2.webp",
  primary: "/images/primary/classroom-1.webp",
  secondary: "/images/secondary/student-life-2.webp",
  "high-school": "/images/high-school/internship.webp",
};

const levelPaths: Record<LevelId, string> = {
  kindergarten: "/schools/kindergarten",
  primary: "/schools/primary",
  secondary: "/schools/secondary",
  "high-school": "/schools/high-school",
};

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const home = getHomeContent(locale);
  const enrollHref = localeHref(locale, "/admission");
  const tourHref = whatsappLink(dict.whatsapp.tour);
  // Poster video = elemen LCP Beranda: unduh lebih awal.
  preload(HERO_POSTER, { as: "image", fetchPriority: "high" });

  return (
    <>
      {/* ===== Hero: video/foto penuh dari tepi ke tepi, tanpa elemen yang menumpuk di tepi bawahnya ===== */}
      {/* Ditarik ke atas, di bawah top bar + header (header transparan di atasnya). */}
      <section
        aria-labelledby="hero-title"
        data-header-overlay=""
        className="relative isolate -mt-[calc(7rem+2px)] flex min-h-[44rem] flex-col overflow-hidden bg-brand-900 text-white sm:min-h-[48rem] lg:-mt-[calc(7.5rem+2px)] lg:max-h-[60rem] lg:min-h-svh"
      >
        <HeroVideo
          src="/videos/home-hero.mp4"
          poster={HERO_POSTER}
          pauseLabel={home.hero.pauseVideo}
          playLabel={home.hero.playVideo}
        />
        {/* Gradien hanya di sisi teks (kiri) dan bawah (baris jenjang) */}
        <div aria-hidden className="absolute inset-0 bg-linear-to-r from-brand-900/80 via-brand-900/35 to-transparent" />
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-2/3 bg-linear-to-t from-brand-900/85 via-brand-900/30 to-transparent" />
        {/* Gradien atas tipis agar menu transparan tetap terbaca */}
        <div aria-hidden className="absolute inset-x-0 top-0 h-48 bg-linear-to-b from-brand-900/70 to-transparent" />

        <div className="relative container-page flex flex-1 flex-col justify-end pt-44 pb-12 lg:pt-48 lg:pb-16">
          <p className="mb-5 text-xs font-semibold tracking-[0.2em] text-white/80 uppercase">{home.hero.eyebrow}</p>
          <h1 id="hero-title" className="max-w-3xl text-4xl leading-[1.1] font-bold text-balance md:text-5xl lg:text-6xl">
            {home.hero.title}
          </h1>
          <p className="mt-5 max-w-xl text-base font-light text-pretty text-white/90 md:text-lg">{home.hero.subtitle}</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href={enrollHref} size="lg">
              {dict.ui.enrollNow}
              <ArrowRight className="size-4" aria-hidden />
            </ButtonLink>
            <ButtonLink href={tourHref} external variant="ghost" size="lg">
              <CalendarCheck className="size-4" aria-hidden />
              {dict.ui.scheduleTour}
              <span className="sr-only">(WhatsApp, {dict.ui.opensInNewTab})</span>
            </ButtonLink>
          </div>
        </div>

        {/* Baris jenjang di dasar hero: identitas TK–SMA sekaligus navigasi cepat */}
        {/* Hanya desktop: di HP section Jenjang langsung menyusul di bawah hero. */}
        <nav aria-label={home.heroExtra.exploreLabel} className="relative hidden border-t border-white/15 lg:block">
          <ul className="container-page grid grid-cols-4">
            {levelIds.map((id, i) => (
              <li key={id} className={i > 0 ? "border-l border-white/15" : ""}>
                <Link
                  href={localeHref(locale, levelPaths[id])}
                  className={`group flex items-center justify-between gap-3 py-5 text-sm font-semibold ${i === 0 ? "pr-5" : "px-5"}`}
                >
                  <span>
                    <span className="block">{dict.levels[id].name}</span>
                    <span className="block text-xs font-normal text-white/75">{dict.levels[id].grades}</span>
                  </span>
                  <ArrowRight
                    className="size-4 shrink-0 text-white/60 transition-transform group-hover:translate-x-1 group-hover:text-white"
                    aria-hidden
                  />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </section>

      {/* ===== Keunggulan: tata letak editorial (foto + daftar bernomor, tanpa kartu) ===== */}
      <section aria-labelledby="why-title" className="py-20 lg:py-32">
        <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Eyebrow>{home.why.eyebrow}</Eyebrow>
            <h2 id="why-title" className="text-2xl leading-tight font-bold text-balance text-ink md:text-4xl">
              {home.why.title}
            </h2>
            <HeadingDivider center={false} />
            <div className="relative mt-10 aspect-4/3 overflow-hidden rounded-2xl">
              <Image src={WHY_IMAGE} alt="" fill sizes="(min-width: 1024px) 480px, 100vw" className="object-cover" />
            </div>
          </div>
          <ol className="lg:col-span-7 lg:pt-2">
            {home.why.items.map((item, i) => (
              <li
                key={item.icon}
                className="reveal grid grid-cols-[3rem_1fr] gap-4 border-t border-line py-8 first:border-t-0 first:pt-0 md:grid-cols-[4.5rem_1fr]"
              >
                <span aria-hidden className="text-2xl font-light text-accent-600 tabular-nums md:text-3xl">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-ink md:text-xl">{item.title}</h3>
                  <p className="mt-2 leading-relaxed text-muted">{item.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ===== Jenjang ===== */}
      <section aria-labelledby="levels-title" className="bg-surface py-20 lg:py-28">
        <div className="container-page">
          <SectionHeading id="levels-title" title={home.levels.title} subtitle={home.levels.subtitle} align="left" />
          <ul className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {levelIds.map((id) => (
              <li key={id} className="reveal">
                <Link href={localeHref(locale, levelPaths[id])} className="group block">
                  <div className="relative aspect-4/5 overflow-hidden rounded-2xl">
                    <Image
                      src={levelImages[id]}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 300px, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.03] motion-reduce:transition-none"
                    />
                  </div>
                  <span aria-hidden className={`mt-5 block h-0.5 w-10 ${levelColorClass[id]}`} />
                  <p className="mt-4 text-xs font-semibold tracking-wider text-muted uppercase">{dict.levels[id].grades}</p>
                  <h3 className="mt-1 text-xl font-semibold text-ink group-hover:text-brand-600">{home.levels.titles[id]}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{dict.levels[id].summary}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-600">
                    {dict.ui.learnMore}
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ===== Program unggulan: baris foto/teks bergantian (bukan grid kartu) ===== */}
      <section aria-labelledby="programs-title" className="bg-brand-900 py-20 text-white lg:py-28">
        <div className="container-page">
          <SectionHeading id="programs-title" title={home.programs.title} subtitle={home.programs.subtitle} tone="light" align="left" />
          <ol className="mt-14 space-y-14 lg:space-y-20">
            {home.programs.items.map((p, i) => (
              <li key={p.id} className="reveal grid items-center gap-8 lg:grid-cols-2 lg:gap-16">
                <div className={`relative aspect-5/4 overflow-hidden rounded-2xl ${i % 2 === 1 ? "lg:order-2" : ""}`}>
                  <Image src={p.image} alt="" fill sizes="(min-width: 1024px) 560px, 100vw" className="object-cover" />
                </div>
                <div className="max-w-lg">
                  <span aria-hidden className="text-sm font-semibold tracking-[0.2em] text-accent-200">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 text-2xl font-semibold md:text-3xl">{p.title}</h3>
                  <p className="mt-4 leading-relaxed text-white/75">{p.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ===== Prestasi siswa (tampil di situs live hanya bila ada data terverifikasi) ===== */}
      <AchievementsSection
        locale={locale}
        copy={home.achievements}
        levelNames={Object.fromEntries(levelIds.map((id) => [id, dict.levels[id].name])) as Record<LevelId, string>}
        opensInNewTab={dict.ui.opensInNewTab}
      />

      {/* ===== Pendiri & pimpinan ===== */}
      <section aria-labelledby="visionaries-title" className="border-t border-line py-20 lg:py-28">
        <div className="container-page">
          <SectionHeading id="visionaries-title" title={home.visionaries.title} subtitle={home.visionaries.subtitle} />
          <ul className="mx-auto mt-14 grid max-w-5xl gap-12 md:grid-cols-2 md:gap-0 md:divide-x md:divide-line">
            {home.visionaries.people.map((p) => (
              <li key={p.id} className="reveal md:px-10 lg:px-14">
                <figure>
                  <blockquote className="text-lg leading-relaxed font-light text-ink italic md:text-xl">
                    <p>“{p.quote}”</p>
                  </blockquote>
                  <figcaption className="mt-7 flex items-center gap-4">
                    <span className="relative size-16 shrink-0 overflow-hidden rounded-full bg-brand-50">
                      <Image src={p.image} alt={p.name} fill sizes="64px" className="object-cover object-top" />
                    </span>
                    <span>
                      <span className="block font-semibold text-ink">{p.name}</span>
                      <span className="block text-sm text-accent-600">{p.role}</span>
                    </span>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
          <p className="mt-12 text-center">
            <Link
              href={localeHref(locale, "/about#founder-message")}
              className="inline-flex items-center gap-2 font-semibold text-brand-600 hover:text-brand-800"
            >
              {home.visionaries.moreLabel}
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </p>
        </div>
      </section>

      {/* ===== Testimoni ===== */}
      <section aria-labelledby="testimonials-title" className="overflow-hidden bg-surface py-20 lg:py-28">
        <div className="container-page">
          <SectionHeading id="testimonials-title" title={home.testimonials.title} subtitle={home.testimonials.subtitle} />
          <div className="mt-12">
            <TestimonialCarousel
              items={home.testimonials.items}
              labels={{
                previous: home.testimonials.previous,
                next: home.testimonials.next,
                slideLabel: home.testimonials.slideLabel,
                region: home.testimonials.title,
              }}
            />
          </div>
        </div>
      </section>

      {/* ===== CTA penutup: foto penuh dari tepi ke tepi ===== */}
      <section id="ready" aria-labelledby="ready-title" className="relative isolate overflow-hidden bg-brand-900 text-white">
        <Image src={CTA_IMAGE} alt="" fill sizes="100vw" className="-z-10 object-cover" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-brand-900/75" />
        <div className="container-page py-24 text-center lg:py-32">
          <h2 id="ready-title" className="mx-auto max-w-2xl text-3xl leading-tight font-bold text-balance md:text-5xl">
            {home.cta.title}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-white/85 md:text-lg">{home.cta.body}</p>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonLink href={enrollHref} size="lg">
              {dict.ui.enrollNow}
              <ArrowRight className="size-4" aria-hidden />
            </ButtonLink>
            <ButtonLink href={tourHref} external variant="light" size="lg">
              <CalendarCheck className="size-4" aria-hidden />
              {dict.ui.scheduleTour}
              <span className="sr-only">(WhatsApp, {dict.ui.opensInNewTab})</span>
            </ButtonLink>
          </div>
          <p className="mt-6 text-sm text-white/75">WhatsApp {site.contact.phoneDisplay}</p>
        </div>
      </section>
    </>
  );
}
