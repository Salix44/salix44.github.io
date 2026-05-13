import type { CollectionEntry } from "astro:content";

export type BlogPost = CollectionEntry<"blog">;

export function isVisiblePost(post: BlogPost) {
  return !post.data.draft || import.meta.env.DEV;
}

export function getSortedPosts(posts: BlogPost[]) {
  return posts
    .filter(isVisiblePost)
    .sort((a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf());
}

export function postSlug(post: BlogPost) {
  if (post.data.slug) {
    return post.data.slug.replace(/^\/+|\/+$/g, "");
  }

  return post.id.replace(/\.(md|mdx)$/, "").replace(/\/index$/, "");
}

export function postPath(post: BlogPost) {
  return `/posts/${postSlug(post)}/`;
}

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric"
  }).format(date);
}

export function getTagCounts(posts: BlogPost[]) {
  const tagCounts = new Map<string, number>();

  for (const post of posts) {
    for (const tag of post.data.tags) {
      tagCounts.set(tag, (tagCounts.get(tag) ?? 0) + 1);
    }
  }

  return [...tagCounts.entries()].sort((a, b) => {
    const countDiff = b[1] - a[1];
    return countDiff === 0 ? a[0].localeCompare(b[0], "ko-KR") : countDiff;
  });
}

export function getCategories(posts: BlogPost[]) {
  return [...new Set(posts.map((post) => post.data.category))].sort((a, b) =>
    a.localeCompare(b, "ko-KR")
  );
}
