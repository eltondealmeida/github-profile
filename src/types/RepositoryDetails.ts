export interface RepositoryDetails {
  owner: string;
  ownerAvatar: string;
  repository: string;
  fullName: string;
  description: string;
  stargazersCount: number;
  forksCount: number;
  openIssuesCount: number;
  isCurrentPage?: boolean;
  searchStatus?: string;
}
