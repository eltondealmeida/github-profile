import { Repository } from "./Repository";

export interface User {
  login: string;
  previousLogin: string;
  avatarUrl: string;
  name: string;
  company: string | null;
  bio: string;
  blog: string;
  location: string | null;
  searchStatus: string;
  searchCompleted: boolean;
  repository: Repository;
  starred: Repository;
  starredData: Repository[];
  isLoading: boolean;
}
