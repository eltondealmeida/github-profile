export interface Repository {
  type: string;
  name: string;
  previousName: string;
  fullName: string;
  description: string;
  url: string;
  count: number;
  stargazersCount: number;
  language: string;
  commitsCount: number;
  searchStatus: string;
  isLoading: boolean;
}
