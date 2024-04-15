using DomainObjects.Utils;
using System.Text.Json;
using YahooFinanceApi;

namespace AssetDetailsApi
{
    public interface IYahooService
    {
        Task<string?> GetAssetAsync(string symbol);
        Task<string> GetAssetHistoryAsync(string symbol, DateTime startDate, DateTime endDate);

    }

    public class YahooService : IYahooService
    {
        private readonly JsonSerializerOptions _jsonSerializerOptions;

        public YahooService(JsonSerializerOptionsFactory jsonSerializerOptionsFactory)
        {
            // Sometimes, yahoo returns broken rows for historical calls, you could decide if these invalid rows is ignored or not by the following statement
            Yahoo.IgnoreEmptyRows = true;

            _jsonSerializerOptions = jsonSerializerOptionsFactory.CreateOptions();
        }

        public async Task<string?> GetAssetAsync(string symbol)
        {
            if (string.IsNullOrEmpty(symbol))
            {
                throw new ArgumentException("Symbol parameter is required and cannot be null or empty.", nameof(symbol));
            }

            // You could query multiple symbols with multiple fields through the following steps:
            var assets = await Yahoo.Symbols(symbol.ToUpper()).Fields(Field.Symbol, Field.RegularMarketPrice, Field.FiftyTwoWeekHigh).QueryAsync();
            var asset = assets.Values.FirstOrDefault();

            return asset != null ? JsonSerializer.Serialize(asset.Fields, _jsonSerializerOptions) : null;
        }

        public async Task<string> GetAssetHistoryAsync(string symbol, DateTime startDate = default, DateTime endDate = default)
        {
            if (string.IsNullOrEmpty(symbol))
            {
                throw new ArgumentException("Symbol parameter is required and cannot be null or empty.", nameof(symbol));
            }

            // Use UTC for default dates
            if (startDate == default)
            {
                startDate = DateTime.UtcNow.Date.AddMonths(-3); // Default to 3 months ago
            }

            if (endDate == default)
            {
                endDate = DateTime.UtcNow.Date;
            }

            var history = await Yahoo.GetHistoricalAsync(symbol.ToUpper(), startDate, endDate, Period.Daily);

            return JsonSerializer.Serialize(history, _jsonSerializerOptions);
        }
    }
}
