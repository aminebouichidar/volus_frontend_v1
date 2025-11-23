import Footer from "../components/Footer";
import { SiteNavbar } from "@/components/navigation/SiteNavbar";
import { InsightsResults } from "./ResultsClient";


interface InsightsPageProps {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}

export default async function InsightsPage({ searchParams }: InsightsPageProps) {
  const params = await searchParams;
  const queryParam = params?.query;
  const query = Array.isArray(queryParam)
    ? queryParam[0] ?? ""
    : queryParam ?? "";

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
          <div className="mx-auto max-w-5xl">
            <header className="mb-10 space-y-4">
              <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs uppercase tracking-[0.35em] text-indigo-200">
                Insights
              </p>
              <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Related products for
                {query ? (
                  <span className="text-indigo-300"> {query}</span>
                ) : (
                  <span className="text-indigo-300"> your product</span>
                )}
              </h1>
              <p className="text-base text-gray-300 sm:text-lg">
                We ping our internal dashboard service and consolidate every related product signal so you can jump straight into research.
              </p>
            </header>

            <InsightsResults initialQuery={query} />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
