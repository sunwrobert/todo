import { Result, useAtomValue } from "@effect-atom/atom-react";
import { HydrationBoundary } from "@effect-atom/atom-react/ReactHydration";
import { createFileRoute } from "@tanstack/react-router";

import { getHealthCheck } from "@/functions/get-health-check";
import { healthCheckAtom } from "@/hooks/use-rpc";

export const Route = createFileRoute("/")({
  component: HomeComponent,
  loader: () => getHealthCheck(),
});

const TITLE_TEXT = `
 ██████╗ ███████╗████████╗████████╗███████╗██████╗
 ██╔══██╗██╔════╝╚══██╔══╝╚══██╔══╝██╔════╝██╔══██╗
 ██████╔╝█████╗     ██║      ██║   █████╗  ██████╔╝
 ██╔══██╗██╔══╝     ██║      ██║   ██╔══╝  ██╔══██╗
 ██████╔╝███████╗   ██║      ██║   ███████╗██║  ██║
 ╚═════╝ ╚══════╝   ╚═╝      ╚═╝   ╚══════╝╚═╝  ╚═╝

 ████████╗    ███████╗████████╗ █████╗  ██████╗██╗  ██╗
 ╚══██╔══╝    ██╔════╝╚══██╔══╝██╔══██╗██╔════╝██║ ██╔╝
    ██║       ███████╗   ██║   ███████║██║     █████╔╝
    ██║       ╚════██║   ██║   ██╔══██║██║     ██╔═██╗
    ██║       ███████║   ██║   ██║  ██║╚██████╗██║  ██╗
    ╚═╝       ╚══════╝   ╚═╝   ╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝
 `;

function HomeComponent() {
  const { dehydratedState } = Route.useLoaderData();

  return (
    <HydrationBoundary state={[dehydratedState]}>
      <HomeContent />
    </HydrationBoundary>
  );
}

function HomeContent() {
  const healthCheck = useAtomValue(healthCheckAtom);

  const status = Result.match(healthCheck, {
    onInitial: () => ({ color: "bg-yellow-500", text: "Checking..." }),
    onFailure: () => ({ color: "bg-red-500", text: "Error" }),
    onSuccess: () => ({ color: "bg-green-500", text: "Connected" }),
  });

  return (
    <div className="container mx-auto max-w-3xl px-4 py-2">
      <pre className="overflow-x-auto font-mono text-sm">{TITLE_TEXT}</pre>
      <div className="grid gap-6">
        <section className="rounded-lg border p-4">
          <h2 className="mb-2 font-medium">API Status</h2>
          <div className="flex items-center gap-2">
            <div className={`h-2 w-2 rounded-full ${status.color}`} />
            <span className="text-muted-foreground text-sm">{status.text}</span>
          </div>
        </section>
      </div>
    </div>
  );
}
