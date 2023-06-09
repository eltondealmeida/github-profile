import { Spinner } from "react-bootstrap";
import { useFormContext } from "react-hook-form";
import { PageHeader } from "../../common/PageHeader";
import { User } from "../../../types/User";
import { Profile } from "../../common/Profile";
import {
  ErrorText,
  IntroText,
  SpinnerContainer,
} from "../../styled/styledComponents";

export default function HomePage() {
  const { watch } = useFormContext<User>();

  const searchStatus = watch("searchStatus");
  const isLoading = watch("isLoading");
  const searchCompleted = watch("searchCompleted");

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
        <Profile />
      )}
    </PageHeader>
  );
}
