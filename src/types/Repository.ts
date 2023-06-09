export interface Repository {
  forks: number;
  stars: number;
  type: string;
  archived: unknown;
  id: number;
  name: string;
  fullName: string;
  description: string;
  stargazersCount: number;
  language: string;
  forked: boolean;
  source: boolean;
  commitsCount: number;
}
