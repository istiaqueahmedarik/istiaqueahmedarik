import { Project } from "@/types";

export async function getPinnedProjects(): Promise<Project[]> {
  if (!process.env.GITHUB_TOKEN) {
    console.warn("GITHUB_TOKEN not set");
    return [];
  }

  const query = `
    query {
      user(login: "istiaqueahmedarik") {
        pinnedItems(first: 6, types: REPOSITORY) {
          nodes {
            ... on Repository {
              name
              description
              url
              homepageUrl
              repositoryTopics(first: 3) {
                nodes {
                  name
                }
              }
              primaryLanguage {
                name
                color
              }
            }
          }
        }
      }
    }
  `;

  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `bearer ${process.env.GITHUB_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      console.error("GitHub API error:", res.status);
      return [];
    }

    const json = await res.json();
    if (json.errors) {
      console.error("GitHub GraphQL errors:", json.errors);
      return [];
    }

    return json.data?.user?.pinnedItems?.nodes ?? [];
  } catch (error) {
    console.error("Failed to fetch GitHub projects:", error);
    return [];
  }
}
