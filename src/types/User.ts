export interface User {
  login: string;
  previousLogin: string;
  avatarUrl: string;
  starredUrl: string;
  starredCount: number;
  name: string;
  company: string | null;
  blog: string;
  location: string | null;
  bio: string;
  searchStatus: string;
  isLoading: boolean;
  searchCompleted: boolean;
  publicRepos: number;
  reposUrl: string;
  reposCount: number;
  repositoryName: string;
  previousRepositoryName: string;
  isRepositoryLoading: boolean;
  searchRepositoryStatus: string;
}
