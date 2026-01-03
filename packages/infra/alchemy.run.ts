import alchemy from "alchemy";
import { D1Database, TanStackStart, Worker } from "alchemy/cloudflare";
import { GitHubComment } from "alchemy/github";
import { CloudflareStateStore } from "alchemy/state";
import { config } from "dotenv";

const envSuffix = process.env.IS_DEV === "true" ? ".dev" : "";

config({ path: `./.env${envSuffix}` });
config({ path: `../../apps/web/.env${envSuffix}` });
config({ path: `../../apps/server/.env${envSuffix}` });

const app = await alchemy(
  "todo",
  process.env.IS_DEV !== "true"
    ? { stateStore: (scope) => new CloudflareStateStore(scope) }
    : {}
);

const db = await D1Database("database", {
  migrationsDir: "../../packages/db/src/migrations",
});

export const web = await TanStackStart("web", {
  cwd: "../../apps/web",
  bindings: {
    VITE_SERVER_URL: alchemy.env.VITE_SERVER_URL!,
    DB: db,
    CORS_ORIGIN: alchemy.env.CORS_ORIGIN!,
    BETTER_AUTH_SECRET: alchemy.secret.env.BETTER_AUTH_SECRET!,
    BETTER_AUTH_URL: alchemy.env.BETTER_AUTH_URL!,
  },
});

export const server = await Worker("server", {
  cwd: "../../apps/server",
  entrypoint: "src/index.ts",
  compatibility: "node",
  bindings: {
    DB: db,
    CORS_ORIGIN: alchemy.env.CORS_ORIGIN!,
    BETTER_AUTH_SECRET: alchemy.secret.env.BETTER_AUTH_SECRET!,
    BETTER_AUTH_URL: alchemy.env.BETTER_AUTH_URL!,
  },
  dev: {
    port: 3000,
  },
});

console.log(`Web    -> ${web.url}`);
console.log(`Server -> ${server.url}`);

if (process.env.PULL_REQUEST) {
  await GitHubComment("preview-comment", {
    owner: "sunwrobert",
    repository: "todo",
    issueNumber: Number(process.env.PULL_REQUEST),
    body: `## Preview Deployed

Your changes have been deployed to a preview environment:

| Service | URL |
|---------|-----|
| Web | ${web.url} |
| Server | ${server.url} |

Built from commit ${process.env.GITHUB_SHA?.slice(0, 7)}

---
<sub>This comment updates automatically with each push.</sub>`,
  });
}

await app.finalize();
