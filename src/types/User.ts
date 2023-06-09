export interface User {
  login: string;
  previousLogin: string;
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
  searchStatus: string;
  isLoading: boolean;
  searchCompleted: boolean;
}
