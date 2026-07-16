export interface Project {
  name: string;
  description: string;
  url: string;
  homepageUrl: string | null;
  repositoryTopics: { nodes: { name: string }[] };
  primaryLanguage: {
    name: string;
    color: string;
  } | null;
}