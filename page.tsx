"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import HeroCanvas from "../components/HeroCanvas";
import InteractiveDroneScene from "../components/InteractiveDroneScene";

const services = [
  {
    title: "Photography",
    description:
      "High-resolution imagery crafted with cinematic lighting, depth, and composition.",
    accent: "Lenscraft Alpha",
  },
  {
    title: "Drone Shots",
    description:
      "Dynamic aerial perspectives that map environments and reveal new dimensions.",
    accent: "Skytrace",
  },
  {
    title: "3D Shots",
    description:
      "Photoreal 3D renders and volumetric visuals for futuristic storytelling.",
    accent: "HoloFrame",
  },
  {
    title: "Cinematic Edits",
    description:
      "Narrative-driven post-production tailored for brand launches and films.",
    accent: "FrameSync",
  },
  {
    title: "Event Coverage",
    description:
      "Stealth teams capturing every detail onsite with multi-angle coverage.",
    accent: "EventSecure",
  },
];

const portfolioImages = [
  "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f",
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
  "https://images.unsplash.com/photo-1516035069371-29a1b244cc32",
  "https://images.pexels.com/photos/3844786/pexels-photo-3844786.jpeg",
  "https://images.unsplash.com/photo-1559679323-4538eccd84d4",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
  "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f",
  "https://cdn.pixabay.com/photo/2016/11/22/19/15/adult-1850181_1280.jpg",
];

const team = [
  {
    name: "Mara Jensen",
    role: "Creative Director",
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1",
  },
  {
    name: "Eli Navarro",
    role: "Lead Aerial Pilot",
    image: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39",
  },
  {
    name: "Quinn Harper",
    role: "3D Visual Architect",
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518",
  },
];

const testimonials = [
  {
    quote:
      "Their lens feels like a classified satellite feed. Every frame is evidence-grade storytelling.",
    client: "Director K. Hall",
    company: "Obsidian Studios",
  },
  {
    quote:
      "SPYMEDIA turned our launch into a cinematic universe. Precision, speed, and style.",
    client: "Leah O'Connor",
    company: "Aether Technologies",
  },
  {
    quote:
      "From scouting to final cut, the team operated like an elite mission unit. Impeccable results.",
    client: "Noah Fernandez",
    company: "Vanguard Events",
  },
];

const pricing = [
  {
    tier: "Basic",
    price: "$2.5K",
    details: [
      "Half-day on location",
      "Photography + drone duo",
      "12 cinematic edits",
      "Secure asset vault (30 days)",
    ],
  },
  {
    tier: "Premium",
    price: "$5.9K",
    highlight: true,
    details: [
      "Full-day multi-crew",
      "Drone + 3D capture",
      "On-site director",
      "Priority grading and delivery",
    ],
  },
  {
    tier: "Enterprise",
    price: "Custom",
    details: [
      "Global multi-day coverage",
      "Live preview command center",
      "Dedicated narrative team",
      "Always-on secured archive",
    ],
  },
];

export default function Home() {
  useEffect(() => {
    let ctx: { revert: () => void } | undefined;
    let cancelled = false;

    const initGsap = async () => {
      if (cancelled) return;
      const { default: gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      if (cancelled) return;
      ctx = gsap.context(() => {
        gsap.fromTo(
          "[data-animate='hero-text']",
          { autoAlpha: 0, y: 80 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 1.6,
            ease: "power3.out",
          }
        );

        gsap.utils
          .toArray<HTMLElement>("[data-animate='fade-up']")
          .forEach((element, index) => {
            gsap.fromTo(
              element,
              { autoAlpha: 0, y: 48 },
              {
                autoAlpha: 1,
                y: 0,
                duration: 1.05,
                ease: "power3.out",
                delay: index * 0.08,
                scrollTrigger: {
                  trigger: element,
                  start: "top 80%",
                },
              }
            );
          });
      });
    };

    initGsap();

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, []);

  const currentYear = new Date().getFullYear();

  return (
    <main className="relative overflow-hidden">
      <section
        id="hero"
        className="relative flex min-h-screen flex-col justify-between overflow-hidden"
      >
        <div className="absolute inset-0 hero-gradient" />
        <div className="fog-layer" />
        <HeroCanvas />

        <header className="relative z-10 flex items-center justify-between px-6 py-6 md:px-12">
          <span className="flex items-center gap-2 text-sm uppercase tracking-[0.4em] text-white/70">
            <span className="h-2 w-2 rounded-full bg-accent shadow-glow" />
            SPYMEDIA.NET
          </span>
          <nav className="hidden items-center gap-10 text-xs tracking-[0.25em] text-white/60 md:flex">
            <Link href="#about" className="transition hover:text-white">
              ABOUT
            </Link>
            <Link href="#services" className="transition hover:text-white">
              SERVICES
            </Link>
            <Link href="#portfolio" className="transition hover:text-white">
              WORK
            </Link>
            <Link href="#contact" className="transition hover:text-white">
              CONTACT
            </Link>
          </nav>
          <Link
            href="#contact"
            className="rounded-full border border-white/20 px-6 py-2 text-xs uppercase tracking-[0.35em] text-white/80 transition hover:border-accent/60 hover:text-accent"
          >
            Brief Us
          </Link>
        </header>

        <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 pb-20 pt-12 text-center md:px-12 md:pb-32">
          <p
            data-animate="hero-text"
            className="font-orbitron text-sm uppercase tracking-[0.65em] text-accent/90"
          >
            Capturing Reality Beyond Sight
          </p>
          <h1
            data-animate="hero-text"
            className="mt-6 max-w-4xl font-orbitron text-4xl uppercase tracking-[0.25em] text-white drop-shadow-2xl sm:text-5xl md:text-6xl"
          >
            SPYMEDIA — Cinematic Intelligence Services
          </h1>
          <p
            data-animate="hero-text"
            className="mt-6 max-w-2xl text-balance text-sm text-white/75 md:text-base"
          >
            Elite photographers, drone pilots, and 3D artists deploying stealth
            visuals for brands, films, and immersive experiences worldwide.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="#portfolio"
              className="rounded-full bg-white/10 px-8 py-3 text-xs uppercase tracking-[0.3em] text-white transition hover:bg-accent/80 hover:text-charcoal"
            >
              View Portfolio
            </Link>
            <Link
              href="#services"
              className="rounded-full border border-white/25 px-8 py-3 text-xs uppercase tracking-[0.3em] text-white/70 transition hover:border-accent/70 hover:text-accent"
            >
              Explore Services
            </Link>
          </div>
        </div>

        <div className="relative z-10 flex justify-between px-6 pb-12 text-[11px] uppercase tracking-[0.35em] text-white/55 md:px-12">
          <span>Mission: Vision Recon</span>
          <span>Global Coverage</span>
        </div>
      </section>

      <section
        id="about"
        className="section-padding relative"
        data-animate="fade-up"
      >
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 md:grid-cols-[1.2fr_1fr] md:px-12">
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-10 shadow-glass backdrop-blur-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/10 opacity-60" />
            <div className="relative space-y-6">
              <p className="font-orbitron text-xs uppercase tracking-[0.35em] text-accent">
                About Us
              </p>
              <h2 className="text-3xl font-semibold text-white md:text-4xl">
                We operate in shadows to architect unforgettable visuals.
              </h2>
              <p className="text-sm text-white/70 md:text-base">
                SPYMEDIA is a collective of visual operatives blending
                photography, drone reconnaissance, and volumetric cinematography.
                We travel light, capture fast, and deliver immersive stories that
                feel coded in light. Every project is treated like a classified
                mission—strategic, precise, and quietly bold.
              </p>
              <p className="text-sm text-white/60">
                Our team has embedded with award-winning studios, high-security
                events, and visionary brands seeking a vantage point beyond the
                obvious. We move with discretion and leave behind cinematic
                intelligence assets ready for broadcast, social or immersive XR.
              </p>
            </div>
          </div>
          <div className="glass-panel relative overflow-hidden rounded-3xl p-10">
            <div className="absolute inset-0 bg-lens-glow opacity-60" />
            <div className="relative space-y-5 text-sm text-white/70">
              <h3 className="font-orbitron text-sm uppercase tracking-[0.4em] text-white/80">
                Mission Protocol
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-accent shadow-glow" />
                  <span>Strategic reconnaissance of every narrative possibility.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-accent shadow-glow" />
                  <span>Modular crews deploying globally within 72 hours.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-accent shadow-glow" />
                  <span>Encrypted delivery pipelines & on-demand editing war-room.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section
        id="services"
        className="section-padding relative bg-black/40"
        data-animate="fade-up"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(107,242,255,0.12),transparent_55%)]" />
        <div className="mx-auto max-w-6xl px-6 md:px-12">
          <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="font-orbitron text-xs uppercase tracking-[0.4em] text-accent">
                Our Services
              </p>
              <h2 className="mt-4 text-3xl font-semibold md:text-4xl">
                Tactically crafted experiences
              </h2>
            </div>
            <p className="max-w-md text-sm text-white/60">
              Tailored strike teams align to your brief—deploying photographers,
              drone pilots, 3D artists and editors in sync.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map(({ title, description, accent }) => (
              <div
                key={title}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-7 shadow-glass transition hover:-translate-y-1 hover:border-accent/70 hover:shadow-glow"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-accent/5 opacity-0 transition group-hover:opacity-100" />
                <div className="relative space-y-4">
                  <span className="font-orbitron text-[10px] uppercase tracking-[0.45em] text-accent/90">
                    {accent}
                  </span>
                  <h3 className="text-2xl font-semibold">{title}</h3>
                  <p className="text-sm text-white/65">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="portfolio"
        className="section-padding relative"
        data-animate="fade-up"
      >
        <div className="mx-auto max-w-6xl px-6 md:px-12">
          <div className="mb-10 space-y-4 text-center">
            <p className="font-orbitron text-xs uppercase tracking-[0.4em] text-accent">
              Portfolio
            </p>
            <h2 className="text-3xl font-semibold md:text-4xl">
              Evidence from the field
            </h2>
            <p className="mx-auto max-w-2xl text-sm text-white/60">
              A curated dossier of operations—from nocturnal city flyovers to
              immersive product narratives.
            </p>
          </div>
          <div className="columns-1 gap-4 space-y-4 md:columns-2 lg:columns-3">
            {portfolioImages.map((src, index) => (
              <div
                key={src}
                className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-glass"
              >
                <Image
                  src={`${src}?auto=format&fit=crop&w=1200&q=80`}
                  alt={`SPYMEDIA Mission ${index + 1}`}
                  width={1200}
                  height={1600}
                  sizes="(min-width: 1280px) 33vw, (min-width: 768px) 48vw, 100vw"
                  className="h-full w-full object-cover transition duration-[2500ms] hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="experience"
        className="section-padding relative bg-black/50"
        data-animate="fade-up"
      >
        <div className="mx-auto flex max-w-5xl flex-col gap-12 px-6 md:flex-row md:items-center md:px-12">
          <div className="flex-1 space-y-6">
            <p className="font-orbitron text-xs uppercase tracking-[0.4em] text-accent">
              Interactive 3D Experience
            </p>
            <h2 className="text-3xl font-semibold md:text-4xl">
              Rotate our recon drone in real-time
            </h2>
            <p className="text-sm text-white/65">
              Built with Three.js and tuned for turbopack performance, this
              live-rendered drone shows the modular craft we deploy on missions.
              Spin, pinch, and observe the floating mechanical choreography.
            </p>
            <div className="spy-divider" />
            <ul className="grid gap-3 text-sm text-white/60 md:grid-cols-2">
              <li>Adaptive flight stabilization</li>
              <li>Integrated cinematic lens mount</li>
              <li>Encrypted telemetry uplink</li>
              <li>Low-light heat signature tracking</li>
            </ul>
          </div>
          <div className="flex-1">
            <InteractiveDroneScene />
          </div>
        </div>
      </section>

      <section
        id="team"
        className="section-padding relative"
        data-animate="fade-up"
      >
        <div className="mx-auto max-w-6xl px-6 md:px-12">
          <div className="mb-10 space-y-4 text-center">
            <p className="font-orbitron text-xs uppercase tracking-[0.4em] text-accent">
              Behind the Lens
            </p>
            <h2 className="text-3xl font-semibold md:text-4xl">
              Operatives in the field
            </h2>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {team.map(({ name, role, image }) => (
              <div
                key={name}
                className="group overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-glass transition hover:-translate-y-1 hover:border-accent/60"
              >
                <div className="relative h-80 overflow-hidden grayscale transition duration-700 group-hover:grayscale-0">
                  <Image
                    src={`${image}?auto=format&fit=crop&w=900&q=80`}
                    alt={name}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 45vw, 100vw"
                    className="object-cover transition duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90" />
                </div>
                <div className="relative space-y-2 p-8">
                  <h3 className="font-orbitron text-lg uppercase tracking-[0.3em] text-white">
                    {name}
                  </h3>
                  <p className="text-sm uppercase tracking-[0.25em] text-white/50">
                    {role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="testimonials"
        className="section-padding relative bg-black/45"
        data-animate="fade-up"
      >
        <div className="mx-auto max-w-6xl px-6 md:px-12">
          <div className="mb-10 space-y-3 text-center">
            <p className="font-orbitron text-xs uppercase tracking-[0.4em] text-accent">
              Client Testimonials
            </p>
            <h2 className="text-3xl font-semibold md:text-4xl">
              Field reports from allies
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map(({ quote, client, company }) => (
              <figure
                key={client}
                className="group relative h-full overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 shadow-glass transition hover:-translate-y-1 hover:border-accent/70"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-accent/5 opacity-0 transition group-hover:opacity-100" />
                <blockquote className="relative text-sm text-white/70">
                  “{quote}”
                </blockquote>
                <figcaption className="relative mt-6 text-xs uppercase tracking-[0.35em] text-white/50">
                  {client} — {company}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section
        id="pricing"
        className="section-padding relative"
        data-animate="fade-up"
      >
        <div className="mx-auto max-w-6xl px-6 md:px-12">
          <div className="mb-10 space-y-3 text-center">
            <p className="font-orbitron text-xs uppercase tracking-[0.4em] text-accent">
              Pricing Packages
            </p>
            <h2 className="text-3xl font-semibold md:text-4xl">
              Mission-ready tiers
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {pricing.map(({ tier, price, details, highlight }) => (
              <div
                key={tier}
                className={`relative overflow-hidden rounded-3xl border bg-white/5 p-8 shadow-glass transition hover:-translate-y-1 ${
                  highlight
                    ? "border-accent/80 bg-accent/10"
                    : "border-white/10 hover:border-accent/50"
                }`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-accent/5 opacity-50" />
                <div className="relative space-y-6">
                  <div>
                    <p className="font-orbitron text-xs uppercase tracking-[0.4em] text-white/60">
                      {tier}
                    </p>
                    <p className="mt-4 text-4xl font-semibold">{price}</p>
                  </div>
                  <ul className="space-y-3 text-sm text-white/70">
                    {details.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-accent" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="#contact"
                    className="inline-flex items-center rounded-full border border-white/20 px-5 py-2 text-xs uppercase tracking-[0.3em] text-white/70 transition hover:border-accent/70 hover:text-accent"
                  >
                    Engage
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="contact"
        className="section-padding relative bg-black/55"
        data-animate="fade-up"
      >
        <div className="mx-auto grid max-w-5xl gap-10 px-6 md:grid-cols-2 md:px-12">
          <div className="space-y-6">
            <p className="font-orbitron text-xs uppercase tracking-[0.4em] text-accent">
              Contact
            </p>
            <h2 className="text-3xl font-semibold md:text-4xl">
              Ready for mission briefing?
            </h2>
            <p className="text-sm text-white/65">
              Share your objectives and timelines. Our response team returns
              transmission within 24 hours with deployment details.
            </p>
            <div className="space-y-3 text-sm text-white/60">
              <p>Direct line: <a className="hover:text-accent" href="tel:+13335559999">+1 (333) 555-9999</a></p>
              <p>Encrypted channel: <a className="hover:text-accent" href="mailto:intel@spymedia.net">intel@spymedia.net</a></p>
              <div className="flex gap-4 text-xs uppercase tracking-[0.3em] text-white/50">
                <Link href="https://instagram.com" target="_blank" className="transition hover:text-accent">IG</Link>
                <Link href="https://vimeo.com" target="_blank" className="transition hover:text-accent">Vimeo</Link>
                <Link href="https://behance.net" target="_blank" className="transition hover:text-accent">Behance</Link>
                <Link href="https://dribbble.com" target="_blank" className="transition hover:text-accent">Dribbble</Link>
              </div>
            </div>
          </div>
          <form className="glass-panel relative overflow-hidden rounded-3xl p-8 space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <label className="text-xs uppercase tracking-[0.3em] text-white/60">
                Name
                <input
                  type="text"
                  placeholder="Agent Alias"
                  className="mt-2 w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-accent focus:outline-none focus:ring-0"
                  required
                />
              </label>
              <label className="text-xs uppercase tracking-[0.3em] text-white/60">
                Email
                <input
                  type="email"
                  placeholder="encrypted@signal.com"
                  className="mt-2 w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-accent focus:outline-none focus:ring-0"
                  required
                />
              </label>
            </div>
            <label className="text-xs uppercase tracking-[0.3em] text-white/60">
              Project Type
              <select
                className="mt-2 w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white focus:border-accent focus:outline-none focus:ring-0"
                defaultValue="mission"
              >
                <option value="mission" disabled>
                  Select mission profile
                </option>
                <option value="photography">Photography</option>
                <option value="drone">Drone Recon</option>
                <option value="3d">3D / XR</option>
                <option value="cinematic">Cinematic Campaign</option>
                <option value="event">Event Coverage</option>
              </select>
            </label>
            <label className="text-xs uppercase tracking-[0.3em] text-white/60">
              Mission Details
              <textarea
                rows={5}
                placeholder="Outline objectives, timelines, access codes…"
                className="mt-2 w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-accent focus:outline-none focus:ring-0"
                required
              />
            </label>
            <button
              type="submit"
              className="w-full rounded-full bg-accent/80 py-3 text-xs uppercase tracking-[0.32em] text-black transition hover:bg-accent"
            >
              Transmit Brief
            </button>
          </form>
        </div>
      </section>

      <footer className="relative bg-black/70 py-12 text-center text-xs uppercase tracking-[0.3em] text-white/50">
        <div className="mx-auto max-w-6xl px-6 md:px-12">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <span>© {currentYear} SPYMEDIA.net</span>
            <div className="flex gap-6">
              <Link href="#hero" className="transition hover:text-accent">
                Top
              </Link>
              <Link href="#services" className="transition hover:text-accent">
                Services
              </Link>
              <Link href="#portfolio" className="transition hover:text-accent">
                Portfolio
              </Link>
              <Link href="#contact" className="transition hover:text-accent">
                Contact
              </Link>
            </div>
            <span>Crafted with Next.js + Three.js</span>
          </div>
        </div>
      </footer>
    </main>
  );
}

