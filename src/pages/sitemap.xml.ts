import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { getSortedPosts, getTagCounts, postPath } from "../lib/blog";
import { absoluteUrl } from "../lib/url";

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function latestDate(dates: Date[]) {
  if (dates.length === 0) {
    return undefined;
  }

  return new Date(Math.max(...dates.map((date) => date.valueOf())));
}

function sitemapEntry(url: string, lastmod?: Date) {
  const lines = ["  <url>", `    <loc>${escapeXml(url)}</loc>`];

  if (lastmod) {
    lines.push(`    <lastmod>${lastmod.toISOString()}</lastmod>`);
  }

  lines.push("  </url>");

  return lines.join("\n");
}

export const GET: APIRoute = async ({ site }) => {
  const posts = getSortedPosts(await getCollection("blog"));
  const postDates = posts.map((post) => post.data.updatedDate ?? post.data.publishDate);
  const latestPostDate = latestDate(postDates);
  const staticPages = [
    { path: "/", lastmod: latestPostDate },
    { path: "/posts/", lastmod: latestPostDate },
    { path: "/tags/", lastmod: latestPostDate },
    { path: "/about/" }
  ];
  const tagPages = getTagCounts(posts).map(([tag]) => {
    const taggedPosts = posts.filter((post) => post.data.tags.includes(tag));

    return {
      path: `/tags/${encodeURIComponent(tag)}/`,
      lastmod: latestDate(taggedPosts.map((post) => post.data.updatedDate ?? post.data.publishDate))
    };
  });
  const postPages = posts.map((post) => ({
    path: postPath(post),
    lastmod: post.data.updatedDate ?? post.data.publishDate
  }));
  const entries = [...staticPages, ...tagPages, ...postPages]
    .map(({ path, lastmod }) => sitemapEntry(absoluteUrl(path, site), lastmod))
    .join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</urlset>\n`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8"
    }
  });
};
