import Link from 'next/link';
import { siteContent } from '@/lib/content';

interface FooterProps {
  contactEmail: string;
}

export default function Footer({ contactEmail }: FooterProps) {
  const { footer } = siteContent;

  return (
    <footer className="border-t border-divider bg-bg">
      <div className="mx-auto max-w-[1120px] px-5 py-10 md:px-8 md:py-12">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2.5 text-[16px] font-semibold text-ink"
          >
            <span
              aria-hidden="true"
              className="h-3 w-3 shrink-0 rounded-full bg-primary"
            />
            <span>{siteContent.appName}</span>
          </Link>

          <div className="flex flex-wrap items-center gap-6 text-[15px] font-medium text-muted">
            <Link
              href="/privacy"
              className="transition-colors duration-150 hover:text-ink"
            >
              {footer.privacyLabel}
            </Link>
            <a
              href={`mailto:${contactEmail}`}
              className="transition-colors duration-150 hover:text-ink"
            >
              {footer.contactLabel}
            </a>
          </div>
        </div>

        <div className="mt-6 flex flex-col justify-between gap-2 border-t border-divider pt-6 text-[14px] text-muted sm:flex-row sm:items-center">
          <p>{footer.disclaimer}</p>
          <p className="shrink-0 tabular-nums">
            © {footer.year} {siteContent.appName}
          </p>
        </div>
      </div>
    </footer>
  );
}
