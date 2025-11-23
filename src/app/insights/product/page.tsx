import Footer from "@/app/components/Footer";
import { SiteNavbar } from "@/components/navigation/SiteNavbar";
import { ProductInsightsClient } from "./ProductInsightsClient";


interface ProductInsightsPageProps {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}

export default async function ProductInsightsPage({ searchParams }: ProductInsightsPageProps) {
  const params = await searchParams;
  const payload = params?.payload;
  const encodedPayload = Array.isArray(payload) ? payload[0] : payload ?? "";

  return (
    <div className="relative min-h-screen bg-black text-white">
      <div className="pointer-events-none fixed inset-0 z-0 opacity-70">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-black to-slate-950" />
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[65vw] h-[65vw] bg-purple-600/20 blur-[180px]" />
        <div className="absolute bottom-0 right-0 w-[45vw] h-[45vw] bg-cyan-500/10 blur-[200px]" />
      </div>

      <main className="relative z-10">
        <SiteNavbar variant="marketing" />
        <section className="px-4 pt-28 pb-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <ProductInsightsClient encodedPayload={encodedPayload} />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
