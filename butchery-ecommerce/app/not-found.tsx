import Link from "next/link";

export default function NotFound() {
  return (
    <div className="section-pad flex flex-col items-center gap-4 py-24 text-center">
      <h1 className="brand-heading text-3xl text-smoke">404 — Cut not found</h1>
      <p className="text-sm text-smoke/60">
        That page isn't on the menu. Head back and try again.
      </p>
      <Link href="/" className="btn-ember">
        Back to home
      </Link>
    </div>
  );
}
