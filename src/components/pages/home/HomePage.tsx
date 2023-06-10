import { Col, Row, Spinner, Tabs, Tab } from "react-bootstrap";
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

export default function HomePage() {
  const { watch } = useFormContext<User>();

  const searchStatus = watch("searchStatus");
  const isLoading = watch("isLoading");
  const searchCompleted = watch("searchCompleted");
  const reposCount = watch("reposCount");

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
            <Tabs defaultActiveKey="repositories">
              <Tab
                eventKey="repositories"
                title={
                  <div className="d-flex align-items-center">
                    <BsBook className="me-2" /> Repositories
                    <StyledBadge bg="lightgray">{reposCount}</StyledBadge>
                  </div>
                }
              >
                <Repositories />
              </Tab>
              <Tab
                eventKey="starred"
                title={
                  <div className="d-flex align-items-center">
                    <BsStar className="me-2" /> Starred
                  </div>
                }
              >
                <div>Starred</div>
              </Tab>
            </Tabs>
          </Col>
        </Row>
      )}
    </PageHeader>
  );
}
