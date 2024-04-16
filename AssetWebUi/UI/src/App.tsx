import { lazy } from "react";
import "./App.css";
import { Container, Header } from "semantic-ui-react";

const AssetPersistence = lazy(() => import("assetPersistence/App"));

function App() {
  return (
    <>
      <Container>
        <Header as="h1" color="blue" dividing>
          Portfolio Manager
        </Header>
        <AssetPersistence />
      </Container>
    </>
  );
}

export default App;
