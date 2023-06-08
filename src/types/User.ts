export interface User {
  login: string;
  avatarUrl: string;
  starredUrl: string;
  reposUrl: string;
  name: string;
  company: string | null;
  blog: string;
  location: string | null;
  email: string | null;
  bio: string;
  publicRepos: number;
  statusSearch: string;
  isLoading: boolean;
  searchCompleted: boolean;
}
