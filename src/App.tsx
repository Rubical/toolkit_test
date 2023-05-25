import { FC } from "react";
import Layout from "./components/layout/Layout";
import AppRouter from "./router/AppRouter";
import { BrowserRouter } from "react-router-dom";

const App: FC = () => {
  return (
    <BrowserRouter>
      <Layout>
        <AppRouter />
      </Layout>
    </BrowserRouter>
  );
};

export default App;
