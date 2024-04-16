import { lazy } from "react";
import "./App.css";

const AssetPersistence = lazy(() => import("assetPersistence/App"));

function App() {
  return (
    <>
      <h1>WEB_UI</h1>
      <AssetPersistence />
    </>
  );
}

export default App;
