import { Result, useAtomValue } from "@effect-atom/atom-react";
import { createFileRoute, redirect } from "@tanstack/react-router";

import { getUser } from "@/functions/get-user";
import { privateDataAtom } from "@/hooks/use-rpc";

export const Route = createFileRoute("/dashboard")({
  component: RouteComponent,
  beforeLoad: async () => {
    const session = await getUser();
    return { session };
  },
  loader: async ({ context }) => {
    if (!context.session) {
      throw redirect({
        to: "/login",
      });
    }
  },
});

function RouteComponent() {
  const { session } = Route.useRouteContext();
  const privateData = useAtomValue(privateDataAtom);

  const apiMessage = Result.match(privateData, {
    onInitial: () => "Loading...",
    onFailure: () => "Error",
    onSuccess: (result) => result.value.message,
  });

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome {session?.user.name}</p>
      <p>API: {apiMessage}</p>
    </div>
  );
}
