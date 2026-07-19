export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr]">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5">
                <div className="h-2.5 w-2.5 rounded-full bg-primary" />
              </div>
              <span className="font-space text-lg font-medium tracking-tight text-on-surface">
                Hidden Corners
              </span>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-on-surface/50">
              A 48-hour buildathon held in a forgotten library. No sponsors,
              no stages — just two hundred people building the impossible.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-3">
            <span className="font-feature-code text-xs uppercase tracking-[0.2em] text-on-surface/40">
              Explore
            </span>
            {[
              ['The Mission', '#mission'],
              ['The Build', '#build'],
              ['Architects', '#architects'],
              ['Reserve a spot', '#register'],
            ].map(([label, href]) => (
              <a
                key={href}
                href={href}
                className="text-sm text-on-surface/70 transition-colors hover:text-primary"
              >
                {label}
              </a>
            ))}
          </div>

          {/* Details */}
          <div className="flex flex-col gap-3">
            <span className="font-feature-code text-xs uppercase tracking-[0.2em] text-on-surface/40">
              The where
            </span>
            <p className="text-sm leading-relaxed text-on-surface/70">
              The Old Library<br />
              14 Hawthorn Lane<br />
              Doors open 17:00, Friday
            </p>
            <a
              href="mailto:hello@hiddencorners.build"
              className="text-sm text-primary transition-colors hover:text-primary/80"
            >
              hello@hiddencorners.build
            </a>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 sm:flex-row">
          <p className="font-feature-code text-xs text-on-surface/40">
            © {new Date().getFullYear()} Hidden Corners — Edition 04
          </p>
          <p className="font-feature-code text-xs text-on-surface/40">
            Built in a hidden corner.
          </p>
        </div>
      </div>
    </footer>
  );
}
