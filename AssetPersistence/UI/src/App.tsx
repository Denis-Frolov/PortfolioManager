import { useEffect, useState } from "react";
import "./App.css";
import {
  GridRow,
  GridColumn,
  Grid,
  Segment,
  Placeholder,
  PlaceholderImage,
  List,
  ListItem,
  Button,
} from "semantic-ui-react";

function App() {
  const [loading, setLoading] = useState<boolean>(false);
  const [symbol, setSymbol] = useState<string>("");

  useEffect(() => {
    setSymbol("");
    // Check if symbol is truthy before making the API call
    if (symbol) {
      setLoading(false); // Set loading state to true before making the request
    }
  }, []); // Run useEffect whenever the symbol state changes
  return (
    <>
      <Segment>
        <h1>Portfolio</h1>
        <Grid>
          <GridRow>
            <GridColumn>
              {loading ? (
                <Placeholder fluid>
                  <PlaceholderImage />
                </Placeholder>
              ) : (
                <div>
                  <List divided relaxed size="big">
                    <ListItem>
                      1 - AAPL
                      <Button
                        circular
                        icon="trash"
                        basic
                        style={{ marginLeft: "10px" }}
                      />
                    </ListItem>
                    <ListItem>2 MSFT</ListItem>
                  </List>
                </div>
              )}
            </GridColumn>
          </GridRow>
        </Grid>
      </Segment>
    </>
  );
}

export default App;
