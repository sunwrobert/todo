import { createRouter as createTanStackRouter } from "@tanstack/react-router";

import "./index.css";
import Loader from "./components/loader";
import { AtomRegistryProvider } from "./providers/registry-provider";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  const router = createTanStackRouter({
    routeTree,
    scrollRestoration: true,
    defaultPreloadStaleTime: 0,
    defaultPendingComponent: () => <Loader />,
    defaultNotFoundComponent: () => <div>Not Found</div>,
    Wrap: ({ children }) => (
      <AtomRegistryProvider>{children}</AtomRegistryProvider>
    ),
  });
  return router;
};

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof getRouter>;
  }
}
