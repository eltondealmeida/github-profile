import { SetStateAction, useState } from "react";
import { Col, Row, Spinner } from "react-bootstrap";
import { useFormContext } from "react-hook-form";
import { PageHeader } from "../../page-header/PageHeader";
import { User } from "../../../types/User";
import { Profile } from "../../profile/Profile";
import { Repositories } from "../../repositories/Repositories";
import { BsBook, BsStar } from "react-icons/bs";
import {
  ErrorText,
  IntroText,
  SpinnerContainer,
  StyledBadge,
  Tab,
  TabContainer,
  TabIcon,
} from "./styles";
import { StarredRepositories } from "../../repositories/StarredRepositories";

export default function HomePage() {
  const { watch } = useFormContext<User>();
  const [activeTab, setActiveTab] = useState("repositories");

  const searchStatus = watch("searchStatus");
  const isLoading = watch("isLoading");
  const searchCompleted = watch("searchCompleted");
  const reposCount = watch("repository.count") ?? 0;
  const starredCount = watch("starred.count") ?? 0;

  const handleTabChange = (tabKey: SetStateAction<string>) => {
    setActiveTab(tabKey);
  };

  return (
    <PageHeader>
      {isLoading ? (
        <SpinnerContainer>
          <Spinner animation="border" />
        </SpinnerContainer>
      ) : searchStatus?.length > 0 ? (
        <ErrorText>{searchStatus}</ErrorText>
      ) : !searchCompleted ? (
        <IntroText>
          GitHub Profile - Search users to view all their repositories and
          favorite repositories
        </IntroText>
      ) : (
        <Row className="m-4 g-3">
          <Profile />
          <Col md="6">
            <TabContainer>
              <Tab
                isActive={activeTab === "repositories"}
                onClick={() => handleTabChange("repositories")}
              >
                <TabIcon>
                  <BsBook />
                </TabIcon>
                <span>Repositories</span>
                <StyledBadge bg="#f8f8f8" color="#333333">
                  {reposCount}
                </StyledBadge>
              </Tab>
              <Tab
                isActive={activeTab === "starred"}
                onClick={() => handleTabChange("starred")}
              >
                <TabIcon>
                  <BsStar />
                </TabIcon>
                <span>Starred</span>
                <StyledBadge bg="#f8f8f8" color="#333333">
                  {starredCount}
                </StyledBadge>
              </Tab>
            </TabContainer>
            {activeTab === "repositories" && <Repositories />}
            {activeTab === "starred" && <StarredRepositories />}
          </Col>
        </Row>
      )}
    </PageHeader>
  );
}
