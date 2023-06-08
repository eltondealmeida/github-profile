import { Spinner } from "react-bootstrap";
import { useFormContext } from "react-hook-form";
import { PageHeader } from "../../common/PageHeader";
import { User } from "../../../types/User";
import { Profile } from "../../common/Profile";

export default function HomePage() {
  const { watch } = useFormContext<User>();

  return (
    <PageHeader>
      {watch("isLoading") ? (
        <div className="text-center justify-content-center">
          <Spinner animation="border" />
        </div>
      ) : watch("statusSearch")?.length > 0 ? (
        <h5 className="text-center text-danger">{watch("statusSearch")}</h5>
      ) : (
        <Profile />
      )}
    </PageHeader>
  );
}
