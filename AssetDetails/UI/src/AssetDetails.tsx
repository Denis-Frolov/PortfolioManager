import axios from "axios";
import { useEffect, useState } from "react";
import { Asset } from "./models/asset";

import {
  Container,
  TableRow,
  TableHeaderCell,
  TableHeader,
  TableCell,
  TableBody,
  Table,
  GridRow,
  GridColumn,
  Grid,
  Segment,
  Input,
  Button,
  Placeholder,
  PlaceholderParagraph,
  PlaceholderLine,
} from "semantic-ui-react";
import { AssetHistory } from "./AssetHistory";

export function AssetDetails() {
  const [asset, setAsset] = useState<Asset | null>(null);
  const [symbol, setSymbol] = useState<string>("");
  const [lookupSymbol, setLookupSymbol] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check if symbol is truthy before making the API call
    if (symbol) {
      setLoading(true); // Set loading state to true before making the request

      axios
        .get<Asset>(`http://localhost:5000/asset/${symbol}`)
        .then((response: any) => {
          setAsset(response.data);
        })
        .catch((error) => {
          if (error.response && error.response.status === 404) {
            // Resource not found, set asset state to null
            setAsset(null);
          } else {
            // Handle other errors here if needed
            console.error("Error fetching asset:", error);
          }
        })
        .finally(() => {
          setLoading(false); // Set loading state to false after the request completes
        });
    }
  }, [symbol]); // Run useEffect whenever the symbol state changes

  function handleAddToPortfolio(): void {
    throw new Error("Function not implemented.");
  }

  return (
    <>
      <div>
        <Container>
          <Segment>
            <h1>Asset Details</h1>
            <Grid columns={2} divided>
              <GridRow>
                <GridColumn width={5}>
                  <div style={{ marginBottom: "10px" }}>
                    <Input
                      size="big"
                      fluid
                      placeholder="Search..."
                      onChange={(e) => setSymbol(e.target.value.toUpperCase())} // Update symbol state on input change
                      value={symbol} // Bind value to symbol state
                    />
                  </div>
                  <div>
                    <Button
                      primary
                      floated="left"
                      onClick={() => setLookupSymbol(symbol)}
                    >
                      History Lookup
                    </Button>
                    <Button
                      positive
                      floated="right"
                      onClick={() => handleAddToPortfolio()}
                    >
                      Add to Portfolio
                    </Button>
                  </div>
                </GridColumn>
                <GridColumn width={11}>
                  {loading ? (
                    <Placeholder fluid>
                      <PlaceholderParagraph>
                        <PlaceholderLine />
                        <PlaceholderLine />
                        <PlaceholderLine />
                        <PlaceholderLine />
                        <PlaceholderLine />
                      </PlaceholderParagraph>
                    </Placeholder>
                  ) : (
                    <div>
                      <Table celled>
                        <TableHeader>
                          <TableRow>
                            <TableHeaderCell>Symbol</TableHeaderCell>
                            <TableHeaderCell>Quote Type</TableHeaderCell>
                            <TableHeaderCell>Exchange Name</TableHeaderCell>
                            <TableHeaderCell>Market State</TableHeaderCell>
                            <TableHeaderCell>Price</TableHeaderCell>
                          </TableRow>
                        </TableHeader>

                        <TableBody>
                          <TableRow>
                            <TableCell>{asset?.Symbol}</TableCell>
                            <TableCell>{asset?.QuoteType}</TableCell>
                            <TableCell>{asset?.FullExchangeName}</TableCell>
                            <TableCell>{asset?.MarketState}</TableCell>
                            <TableCell>{asset?.RegularMarketPrice}</TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </GridColumn>
              </GridRow>
            </Grid>
          </Segment>
          <Segment>
            <AssetHistory symbol={lookupSymbol} />
          </Segment>
        </Container>
      </div>
    </>
  );
}
