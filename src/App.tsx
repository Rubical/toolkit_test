import { FC } from "react";
import Layout from "./components/layout/Layout";
import RepositoriesPage from "./pages/repositories/RepositoriesPage";

const App: FC = () => {
  return (
    <Layout>
      <RepositoriesPage />
    </Layout>
  );
};

export default App;
