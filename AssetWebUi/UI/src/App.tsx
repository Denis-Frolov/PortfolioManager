import { lazy } from "react";
import "./App.css";
import { Container, Header } from "semantic-ui-react";

const AssetDetails = lazy(() => import("assetDetails/App"));
const AssetPersistence = lazy(() => import("assetPersistence/App"));

function App() {
  return (
    <>
      <Container>
        <Header
          as="h1"
          color="blue"
          dividing
          style={{ marginTop: "1em", marginBottom: "1.5em" }}
        >
          Portfolio Manager
        </Header>
        <AssetDetails />
        <AssetPersistence />
      </Container>
    </>
  );
}

export default App;
