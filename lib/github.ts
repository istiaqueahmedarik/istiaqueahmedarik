import { Project } from "@/types";

export async function getPinnedProjects(): Promise<Project[]> {
  if (!process.env.GITHUB_TOKEN) {
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

  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `bearer ${process.env.GITHUB_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
    next: { revalidate: 3600 },
  });

  const json = await res.json();
  return json.data.user.pinnedItems.nodes;
}