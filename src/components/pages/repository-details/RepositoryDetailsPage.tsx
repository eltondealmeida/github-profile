import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import {
  RepositoryInfo,
  Issues,
  LinkBack,
  CardContainer,
  SpinnerContainer,
  ErrorText,
} from "./styles";
import { PageHeader } from "../../page-header/PageHeader";
import { useFormContext } from "react-hook-form";
import { User } from "../../../types/User";
import { useEffect, useState } from "react";
import { RepositoryDetails } from "../../../types/RepositoryDetails";
import { RepositoryIssues } from "../../../types/RepositoryIssues";
import { Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function RepositoryDetailsPage() {
  const { watch, setValue } = useFormContext<User>();
  const navigate = useNavigate();

  const [repositoryData, setRepositoryData] = useState<RepositoryDetails>();
  const [issuesData, setIssuesData] = useState<RepositoryIssues[]>();

  const isRepositoryCurrentPage = watch("repository.details.isCurrentPage");
  const searchStatus = watch("repository.details.searchStatus");
  const isLoading = watch("repository.details.isLoading");
  const owner = isRepositoryCurrentPage
    ? watch("repository.details.owner")
    : watch("starred.details.owner");
  const repository = isRepositoryCurrentPage
    ? watch("repository.details.repository")
    : watch("starred.details.repository");

  useEffect(() => {
    const fetchRepositories = async () => {
      setValue("repository.details.isLoading", true);
      try {
        const response = await axios.get(
          `https://api.github.com/repos/${owner}/${repository}`
        );
        const data = response.data;

        if (response.data.message) {
          setValue("repository.details.searchStatus", response.data.message);
        } else {
          const mappedRepository: RepositoryDetails = {
            owner: data.owner,
            repository: data.name,
            ownerAvatar: data.owner.avatar_url,
            fullName: data.full_name,
            description: data.description,
            stargazersCount: data.stargazers_count,
            forksCount: data.forks_count,
            openIssuesCount: data.open_issues_count,
          };

          setRepositoryData(mappedRepository);
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setValue("repository.details.isLoading", false);
      }
    };
    const fetchIssues = async () => {
      setValue("repository.details.isLoading", true);
      try {
        const response = await axios.get(
          `https://api.github.com/repos/${owner}/${repository}/issues`
        );
        const data = response.data;

        if (response.data.message) {
          setValue("repository.details.searchStatus", response.data.message);
        } else {
          const mappedIssues: RepositoryIssues[] = data.map((issue: any) => ({
            id: issue.id,
            title: issue.title,
            htmlUrl: issue.html_url,
            user: {
              login: issue.user.login,
            },
          }));

          setIssuesData(mappedIssues);
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setValue("repository.details.isLoading", false);
      }
    };
    if (owner && repository) {
      fetchRepositories();
      fetchIssues();
    }
  }, [owner, repository, setValue]);

  return (
    <PageHeader hideSearchUser backgroundColor="#ebebeb">
      <LinkBack onClick={() => navigate("/")}>
        <FiChevronLeft size={15} />
        Voltar
      </LinkBack>

      {isLoading ? (
        <SpinnerContainer>
          <Spinner animation="border" />
        </SpinnerContainer>
      ) : searchStatus ? (
        <ErrorText>{searchStatus}</ErrorText>
      ) : (
        <>
          {repositoryData && (
            <RepositoryInfo>
              <header>
                <img
                  src={repositoryData.ownerAvatar}
                  alt={repositoryData.owner}
                />
                <div>
                  <strong>{repositoryData.fullName}</strong>
                  <p>{repositoryData.description}</p>
                </div>
              </header>
              <ul>
                <li>
                  <strong>{repositoryData.stargazersCount}</strong>
                  <span>Stars</span>
                </li>
                <li>
                  <strong>{repositoryData.forksCount}</strong>
                  <span>Forks</span>
                </li>
                <li>
                  <strong>{repositoryData.openIssuesCount}</strong>
                  <span>Issues Abertas</span>
                </li>
              </ul>
            </RepositoryInfo>
          )}
          <CardContainer>
            <Issues>
              {issuesData?.map((issue) => (
                <a key={issue.id} href={issue.htmlUrl}>
                  <div>
                    <strong>{issue.title}</strong>
                    <p>{issue.user.login}</p>
                  </div>

                  <FiChevronRight size={20} />
                </a>
              ))}
            </Issues>
          </CardContainer>
        </>
      )}
    </PageHeader>
  );
}
