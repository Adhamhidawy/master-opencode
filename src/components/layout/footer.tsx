import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-border px-6 py-12 text-center text-[.82rem] text-text-3">
      <p>
        Built for the community &mdash; Not affiliated with{" "}
        <Link href="https://anoma.ly" target="_blank" className="text-accent-2 no-underline hover:underline">
          Anomaly
        </Link>{" "}
        /{" "}
        <Link href="https://opencode.ai" target="_blank" className="text-accent-2 no-underline hover:underline">
          OpenCode
        </Link>
      </p>
      <p className="mt-2">
        <Link href="https://github.com/anomalyco/opencode" target="_blank" className="text-accent-2 no-underline hover:underline">
          GitHub
        </Link>{" "}
        &middot;{" "}
        <Link href="https://opencode.ai/docs" target="_blank" className="text-accent-2 no-underline hover:underline">
          Docs
        </Link>{" "}
        &middot;{" "}
        <Link href="https://discord.gg/opencode" target="_blank" className="text-accent-2 no-underline hover:underline">
          Discord
        </Link>
      </p>
    </footer>
  );
}
