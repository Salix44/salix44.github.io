import { defineConfig } from "astro/config";

const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1];
const owner = process.env.GITHUB_REPOSITORY_OWNER;
const isUserOrOrgPage = repositoryName?.endsWith(".github.io");

const base =
  process.env.BASE_PATH ??
  (process.env.GITHUB_ACTIONS && repositoryName && !isUserOrOrgPage
    ? `/${repositoryName}`
    : "");

const site =
  process.env.SITE ?? (owner ? `https://${owner}.github.io` : "http://localhost:4321");

export default defineConfig({
  site,
  base,
  trailingSlash: "always"
});
