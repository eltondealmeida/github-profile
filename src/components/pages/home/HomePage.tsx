import { SetStateAction, useState } from "react";
import { Col, Row, Spinner } from "react-bootstrap";
import { useFormContext } from "react-hook-form";
import { PageHeader } from "../../common/PageHeader";
import { User } from "../../../types/User";
import { Profile } from "../../common/Profile";
import {
  ErrorText,
  IntroText,
  SpinnerContainer,
  StyledBadge,
} from "../../styled/styledComponents";
import { Repositories } from "../../common/connected-components/Repositories";
import { BsBook, BsStar } from "react-icons/bs";
import styled from "styled-components";
import { StarredRepositories } from "../../common/connected-components/StarredRepositories";

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

  const TabContainer = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 10px;

    @media (max-width: 768px) {
      flex-direction: row;
      justify-content: space-between;
    }
  `;

  const TabIcon = styled.div`
    margin-right: 8px;
  `;

  const Tab = styled.div<{ isActive: boolean }>`
    cursor: pointer;
    padding: 8px 16px;
    border-bottom: 2px solid transparent;
    display: flex;
    align-items: center;
    color: ${(props) => (props.isActive ? "black" : "gray")};
    font-weight: ${(props) => (props.isActive ? "bold" : "normal")};
    ${(props) =>
      props.isActive &&
      `
      border-bottom-color: #fd8c73;
    `}

    @media (max-width: 992px) {
      flex: 1;
    }
  `;

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
