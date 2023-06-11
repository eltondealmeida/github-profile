import { Routes, Route } from "react-router-dom";
import HomePage from "../components/pages/home/HomePage";
import RepositoryPage from "../components/pages/repository/RepositoryPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path={"/" || "*" || "/home"} element={<HomePage />} />
      <Route path="/repository" element={<RepositoryPage />} />
    </Routes>
  );
}
