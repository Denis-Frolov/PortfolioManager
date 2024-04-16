import { useEffect, useState } from "react";
import "./App.css";
import {
  GridRow,
  GridColumn,
  Grid,
  Segment,
  List,
  ListItem,
  Button,
  ListContent,
  ListHeader,
} from "semantic-ui-react";
import { Observable } from "windowed-observable";
import axios from "axios";
import { PortfolioAsset } from "./models/portfolioAsset";

const assetSymbolObservable = new Observable("assetSymbol");

function App() {
  const [symbol, setSymbol] = useState<string>("");
  const [portfolio, setPortfolio] = useState<PortfolioAsset[]>([]);

  const handleNewMessage = (symbol: string) => {
    setSymbol(symbol);
  };

  // Loading portfolio from the database for the first time
  // And setting symbol observable
  useEffect(() => {
    axios
      .get<PortfolioAsset[]>("http://localhost:5050/portfolio")
      .then((response: any) => {
        setPortfolio(response.data);
      });

    assetSymbolObservable.subscribe(handleNewMessage);

    return () => {
      assetSymbolObservable.unsubscribe(handleNewMessage);
    };
  }, []);

  // Add new asset to portfolio
  useEffect(() => {
    if (symbol) {
      axios
        .post("http://localhost:5050/portfolio", { symbol })
        .then((response: any) => {
          // Update the portfolio state based on the previous state
          setPortfolio((prevPortfolio) => [...prevPortfolio, response.data]);
        })
        .catch((error) => {
          console.error("Error fetching asset:", error);
        });
    }
  }, [symbol]);

  // Delete asset from portfolio
  function handleDeletePortfolioAsset(id: number) {
    axios
      .delete(`http://localhost:5050/portfolio/${id}`)
      .then(() => {
        setPortfolio([...portfolio.filter((x) => x.id !== id)]);
      })
      .catch((error) => {
        console.error("Error deleting asset:", error);
      });
  }

  return (
    <>
      <Segment>
        <h1>Portfolio</h1>
        <Grid>
          <GridRow>
            <GridColumn>
              <div>
                <List divided relaxed size="big">
                  {portfolio.map((asset, i) => (
                    <ListItem key={asset.id}>
                      <ListContent>
                        <ListHeader>
                          <span style={{ paddingRight: "10px" }}>
                            <Button
                              circular
                              icon="trash"
                              basic
                              size="tiny"
                              onClick={() =>
                                handleDeletePortfolioAsset(asset.id)
                              }
                            />
                          </span>
                          {i + 1} - {asset.symbol}
                        </ListHeader>
                      </ListContent>
                    </ListItem>
                  ))}
                </List>
              </div>
            </GridColumn>
          </GridRow>
        </Grid>
      </Segment>
    </>
  );
}

export default App;
