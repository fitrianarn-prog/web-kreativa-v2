import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ChevronDown, MapPin, Quote } from "lucide-react";
import { hasLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { aboutContent, blocksContent, getHomeContent } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { SectionNav } from "@/components/ui/SectionNav";
import { YouTubeEmbed } from "@/components/ui/YouTubeEmbed";
import { CurriculumFramework, VisionMission } from "@/components/blocks/SchoolBlocks";
import { CtaBand } from "@/components/blocks/CtaBand";
import { JsonLd } from "@/components/seo/JsonLd";

const PATH = "/about";
const HERO_IMAGE = "/images/campus/school-community.webp";

export async function generateMetadata({ params }: PageProps<"/[locale]/about">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(locale)) return {};
  const meta = aboutContent(locale)("meta");
  return pageMetadata({ locale, path: PATH, title: meta.title, description: meta.description });
}

/** Jawaban FAQ lokasi diambil dari site.json (satu sumber kebenaran alamat kampus). */
function campusLines(locale: Locale) {
  return site.campuses.map((c) => {
    const status = c.status ? ` (${c.status[locale]})` : "";
    return `${c.name[locale]}: ${c.address}${status}`;
  });
}

export default async function AboutPage({ params }: PageProps<"/[locale]/about">) {
  const { locale } = await params;
  if (!hasLocale(locale)) notFound();
  const c = aboutContent(locale);
  const dict = getDictionary(locale);
  const hero = c("hero");
  const founder = c("founderMessage");
  const story = c("story");
  const brand = c("brand");
  const facilities = c("facilities");
  const faq = c("faq");
  const labels = blocksContent(locale)("sections");
  const navLabels = dict.nav.find((n) => n.id === "about")?.children ?? [];
  const campuses = campusLines(locale);

  const nav = navLabels.map((n) => ({ id: n.href.split("#")[1], label: n.label }));

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: faq.lang ?? locale,
    mainEntity: faq.items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a === "{campuses}" ? campuses.join("; ") : item.a },
    })),
  };

  return (
    <>
      <PageHero title={hero.title} image={HERO_IMAGE} tone="brand" lang={hero.lang} />
      <SectionNav items={nav} label={labels.onThisPage} />

      <section className="py-16 lg:py-20">
        <div className="container-page grid items-center gap-10 lg:grid-cols-2">
          <p lang={hero.lang} className="text-xl leading-relaxed text-ink/85">
            {hero.intro}
          </p>
          <YouTubeEmbed
            videoId={site.links.aboutVideoYoutubeId}
            title={hero.videoTitle}
            poster="/images/about/founder-video-poster.webp"
            playLabel={dict.ui.playVideo}
          />
        </div>
      </section>

      <Section id="founder-message" title={founder.title} titleLang={founder.lang} lang={founder.lang} tone="surface">
        <div className="grid gap-10 lg:grid-cols-[16rem_1fr]">
          <figure>
            <div className="relative aspect-square overflow-hidden rounded-card bg-white">
              <Image src="/images/people/syauqi-robbani.webp" alt={founder.name} fill sizes="(min-width: 1024px) 256px, 100vw" className="object-cover object-top" />
            </div>
            <figcaption className="mt-4">
              <span className="block text-lg font-bold text-ink">{founder.name}</span>
              <span className="block text-sm font-semibold text-accent-600">{founder.role}</span>
              <span className="block text-sm text-muted">{founder.credential}</span>
            </figcaption>
          </figure>
          <blockquote className="rounded-card bg-white p-7 shadow-card sm:p-10">
            <Quote className="size-9 text-accent-500" aria-hidden />
            <div className="mt-4 space-y-4 text-lg leading-relaxed text-ink/85">
              {founder.paragraphs.map((p, i) => (
                <p key={i}>{i === 0 ? `“${p}` : p}{i === founder.paragraphs.length - 1 ? "”" : ""}</p>
              ))}
            </div>
          </blockquote>
        </div>
      </Section>

      <VisionMission locale={locale} id="vision-mission" title={labels.visionMission} />
      <CurriculumFramework locale={locale} id="curriculum-framework" />

      <Section id="our-story" title={story.title} titleLang={story.lang} lang={story.lang}>
        <div className="grid gap-10 lg:grid-cols-2">
          {story.parts.map((part, i) => (
            <article key={part.heading} className={i === 1 ? "rounded-card bg-brand-700 p-8 text-white sm:p-10" : ""}>
              <h3 className={`text-2xl font-bold ${i === 1 ? "text-white" : "text-ink"}`}>{part.heading}</h3>
              <div className={`mt-4 space-y-4 leading-relaxed ${i === 1 ? "text-white/90" : "text-ink/85"}`}>
                {part.paragraphs.map((p, pi) => (
                  <p key={pi}>{p}</p>
                ))}
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section id="our-brand" title={brand.title} titleLang={brand.lang} lang={brand.lang} tone="surface">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <p className="text-sm font-semibold tracking-wide text-accent-600 uppercase">{brand.taglineLabel}</p>
            <p className="mt-2 text-3xl font-bold text-ink">“{brand.tagline}”</p>
            <div className="mt-6 space-y-4 leading-relaxed text-ink/85">
              {brand.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-ink">{brand.logoTitle}</h3>
            <ul className="mt-6 space-y-4">
              {brand.elements.map((el) => (
                <li key={el.id} className="flex gap-5 rounded-card bg-white p-5 shadow-card">
                  <Image src={`/images/brand/element-${el.id}.png`} alt="" width={64} height={64} className="size-16 shrink-0 object-contain" />
                  <div>
                    <h4 className="font-semibold text-ink">{el.title}</h4>
                    <p className="mt-1 text-sm leading-relaxed text-muted">{el.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section id="facilities" title={facilities.title} intro={facilities.badge} titleLang={facilities.lang} lang={facilities.lang}>
        <ul className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {facilities.items.map((f) => (
            <li key={f.image}>
              <figure className="group overflow-hidden rounded-card bg-surface">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image src={f.image} alt="" fill sizes="(min-width: 1024px) 300px, (min-width: 768px) 33vw, 50vw" className="object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none" />
                </div>
                <figcaption className="px-4 py-3 text-sm font-semibold text-ink">{f.label}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="faq" title={faq.title} titleLang={faq.lang} lang={faq.lang} tone="surface">
        <div className="mx-auto max-w-3xl divide-y divide-line overflow-hidden rounded-card bg-white shadow-card">
          {faq.items.map((item) => (
            <details key={item.q} className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 font-semibold text-ink hover:bg-surface [&::-webkit-details-marker]:hidden">
                {item.q}
                <ChevronDown className="size-5 shrink-0 text-muted transition-transform group-open:rotate-180" aria-hidden />
              </summary>
              <div className="px-5 pb-5 leading-relaxed text-ink/80">
                {item.a === "{campuses}" ? (
                  <ul className="space-y-2">
                    {campuses.map((line) => (
                      <li key={line} className="flex gap-2">
                        <MapPin className="mt-1 size-4 shrink-0 text-accent-600" aria-hidden />
                        {line}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>{item.a}</p>
                )}
              </div>
            </details>
          ))}
        </div>
      </Section>

      <CtaBand locale={locale} text={getHomeContent(locale).cta.title} />
      <JsonLd data={faqJsonLd} />
    </>
  );
}
