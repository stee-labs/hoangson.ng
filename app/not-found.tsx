import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="container-x flex min-h-[80svh] flex-col justify-center pt-[var(--nav-h)]">
      <p className="label mb-6">Error 404</p>
      <h1 className="display text-[clamp(3rem,12vw,10rem)]">
        Lost in
        <br />
        <span className="text-accent">the flow.</span>
      </h1>
      <p className="mt-8 max-w-md text-fg-2">This page doesn’t exist — but plenty of other things do.</p>
      <div className="mt-10">
        <Button href="/">Back home</Button>
      </div>
    </section>
  );
}
