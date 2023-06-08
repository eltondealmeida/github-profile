import { useFormContext } from "react-hook-form";
import { PageHeader } from "../../common/PageHeader";
import { User } from "../../../types/User";
import { Spinner } from "react-bootstrap";

export default function HomePage() {
  const { watch } = useFormContext<User>();

  return (
    <PageHeader>
      <div className="text-center justify-content-center">
        {watch("isLoading") ? (
          <Spinner animation="border" />
        ) : watch("statusSearch")?.length > 0 ? (
          <h5>{watch("statusSearch")}</h5>
        ) : (
          <p>{watch("name")}</p>
        )}
      </div>
    </PageHeader>
  );
}
