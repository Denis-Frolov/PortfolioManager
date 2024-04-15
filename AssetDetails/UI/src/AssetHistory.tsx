import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { HistoryItem } from "./models/asset";

import { LineChart } from "@mui/x-charts/LineChart";
import { Placeholder, PlaceholderImage } from "semantic-ui-react";

export function AssetHistory({ symbol }: { symbol: string }) {
  const [dates, setDates] = useState<Date[]>([]);
  const [prices, setPrices] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const start = useRef("");
  const end = useRef("");

  useEffect(() => {
    if (symbol) {
      handleHistoryLookup();
    }
  }, [symbol]);

  const handleHistoryLookup = async () => {
    if (symbol) {
      // Calculate the start date (3 months ago from today)
      const startDate = new Date(Date.now() - 3 * 30 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0];

      // Format the end date as 'yyyy-MM-dd'
      const endDate = new Date().toISOString().split("T")[0];

      start.current = startDate;
      end.current = endDate;

      setLoading(true); // Set loading state to true before making the request

      axios
        .get<HistoryItem[]>(
          `http://localhost:5000/asset/${symbol}/history?startDate=${startDate}&endDate=${endDate}`
        )
        .then((response: any) => {
          const historyData = response.data;

          // Extract dates and prices from history data
          const extractedDates = historyData.map(
            (item: HistoryItem) => new Date(item.dateTime)
          );

          const extractedPrices = historyData.map(
            (item: HistoryItem) => item.close
          );
          // Update state with extracted dates and prices
          setDates(extractedDates);
          setPrices(extractedPrices);
        })
        .catch((error) => {
          if (error.response && error.response.status === 500) {
            // Resource not found, set dates and prices state to empty arrays
            setDates([]);
            setPrices([]);
          } else {
            // Handle other errors here if needed
            console.error("Error fetching asset:", error);
          }
        })
        .finally(() => {
          setLoading(false); // Set loading state to false after the request completes
        });
    }
  };

  return (
    <>
      {loading ? (
        <Placeholder fluid>
          <PlaceholderImage />
        </Placeholder>
      ) : (
        <div>
          <h2>
            Asset History - {symbol} ({start.current} - {end.current})
          </h2>

          <LineChart
            xAxis={[
              {
                id: "Days",
                data: dates,
                scaleType: "time",
                valueFormatter: (date) => date.getDate().toString(),
              },
            ]}
            series={[
              {
                id: "Price",
                label: "Price",
                data: prices,
                stack: "total",
                area: true,
                showMark: false,
              },
            ]}
            height={400}
            margin={{ left: 70 }}
          />
        </div>
      )}
    </>
  );
}
