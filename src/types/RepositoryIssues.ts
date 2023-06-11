export interface RepositoryIssues {
  id: number;
  title: string;
  htmlUrl: string;
  user: {
    login: string;
  };
}
