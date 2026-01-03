import type { ReactNode } from "react";

import { RegistryProvider } from "@effect-atom/atom-react";

export function AtomRegistryProvider({ children }: { children: ReactNode }) {
  return <RegistryProvider defaultIdleTTL={400}>{children}</RegistryProvider>;
}
