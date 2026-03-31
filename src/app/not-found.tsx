import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
      <div className="text-[6rem] font-black tracking-[-.04em] text-text-3">404</div>
      <h2 className="mt-4 text-[1.5rem] font-bold text-text">Page Not Found</h2>
      <p className="mt-3 max-w-[400px] text-[.95rem] text-text-2">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-lg bg-accent px-7 py-3 text-[.9rem] font-semibold text-white no-underline transition-all hover:bg-accent-2"
      >
        Go Home
      </Link>
    </div>
  );
}
