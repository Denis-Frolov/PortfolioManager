using Microsoft.AspNetCore.Mvc;
using Microsoft.OpenApi.Any;
using Microsoft.OpenApi.Models;

namespace AssetDetailsApi
{
    internal static class AssetDetailsEndpoints
    {
        internal static void MapAssetDetailsEndpoints(this WebApplication app)
        {

            // Get Asset current data
            app.MapGet("/asset/{symbol}", async (IYahooService yahooService, string symbol) =>
            {
                var asset = await yahooService.GetAssetAsync(symbol);

                return asset != null
                    ? Results.Content(asset)
                    : Results.NotFound();
            })
            .WithName("GetAssetBySymbol")
            .WithOpenApi(x => new OpenApiOperation(x)
            {
                Summary = "Get Asset Current Data By Symbol",
                Description = "Returns information about selected asset from Yahoo API.",
                Tags = new List<OpenApiTag> { new() { Name = "Yahoo API" } },
                Parameters = new List<OpenApiParameter>
                {
                    new OpenApiParameter
                    {
                        Name = "symbol",
                        In = ParameterLocation.Path,
                        Description = "Asset symbol.",
                        Schema = new OpenApiSchema { Type = "string" },
                        Required = true,
                        Example = new OpenApiString("AAPL")
                    }
                }
            });

            // Get Asset historical data for the period
            app.MapGet("/asset/{symbol}/history", async (
                IYahooService yahooService,
                string symbol,
                [FromQuery] DateTime startDate,
                [FromQuery] DateTime endDate) =>
            {
                var asset = await yahooService.GetAssetHistoryAsync(symbol, startDate, endDate);

                return asset != null
                    ? Results.Content(asset)
                    : Results.NotFound();
            })
            .WithName("GetAssetHistoricalDataForThePeriodBySymbol")
            .WithOpenApi(x => new OpenApiOperation(x)
            {
                Summary = "Get Asset Historical Data For Period",
                Description = "Returns asset historical data for the period by symbol, from Yahoo API.",
                Tags = new List<OpenApiTag> { new() { Name = "Yahoo API" } },
                Parameters = new List<OpenApiParameter>
                {
                    new OpenApiParameter
                    {
                        Name = "symbol",
                        In = ParameterLocation.Path,
                        Description = "Asset symbol.",
                        Schema = new OpenApiSchema { Type = "string" },
                        Required = true,
                        Example = new OpenApiString("AAPL")
                    },
                    new OpenApiParameter
                    {
                        Name = "startDate",
                        In = ParameterLocation.Query,
                        Description = "Start date for the asset historical data.",
                        Schema = new OpenApiSchema { Type = "string", Format = "date-time" },
                        Required = true,
                        Example = new OpenApiString("2022-01-01")
                    },
                    new OpenApiParameter
                    {
                        Name = "endDate",
                        In = ParameterLocation.Query,
                        Description = "End date for the asset historical data.",
                        Schema = new OpenApiSchema { Type = "string", Format = "date-time" },
                        Required = true,
                        Example = new OpenApiString("2022-07-01")
                    }
                }
            });
        }
    }
}
