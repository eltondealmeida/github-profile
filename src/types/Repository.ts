export interface Repository {
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
