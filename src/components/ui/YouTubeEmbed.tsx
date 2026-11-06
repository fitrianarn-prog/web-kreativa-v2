"use client";

import Image from "next/image";
import { useState } from "react";
import { Play } from "lucide-react";

type Props = { videoId: string; title: string; poster: string; playLabel: string };

/** Facade YouTube: iframe (youtube-nocookie) baru dimuat setelah pengunjung menekan tombol putar. */
export function YouTubeEmbed({ videoId, title, poster, playLabel }: Props) {
  const [active, setActive] = useState(false);
  return (
    <div className="relative aspect-video overflow-hidden rounded-card bg-brand-900 shadow-float">
      {active ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 size-full"
        />
      ) : (
        <button type="button" onClick={() => setActive(true)} className="group absolute inset-0 size-full">
          <Image src={poster} alt="" fill sizes="(min-width: 1024px) 640px, 100vw" className="object-cover" />
          <span aria-hidden className="absolute inset-0 bg-brand-900/30 transition-colors group-hover:bg-brand-900/20" />
          <span className="absolute top-1/2 left-1/2 inline-flex size-18 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-accent-600 text-white shadow-float transition-transform group-hover:scale-110 motion-reduce:transition-none">
            <Play className="ml-1 size-7 fill-current" aria-hidden />
          </span>
          <span className="sr-only">
            {playLabel}: {title}
          </span>
        </button>
      )}
    </div>
  );
}
