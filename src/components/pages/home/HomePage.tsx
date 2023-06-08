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

  return (
    <PageHeader>
      {watch("isLoading") ? (
        <SpinnerContainer>
          <Spinner animation="border" />
        </SpinnerContainer>
      ) : watch("statusSearch")?.length > 0 ? (
        <ErrorText>{watch("statusSearch")}</ErrorText>
      ) : !watch("searchCompleted") ? (
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
