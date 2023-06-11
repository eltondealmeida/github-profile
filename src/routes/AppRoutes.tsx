import { Routes, Route } from "react-router-dom";
import HomePage from "../components/pages/home/HomePage";
import RepositoryDetailsPage from "../components/pages/repository-details/RepositoryDetailsPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path={"/" || "*" || "/home"} element={<HomePage />} />
      <Route path="/repository" element={<RepositoryDetailsPage />} />
    </Routes>
  );
}
