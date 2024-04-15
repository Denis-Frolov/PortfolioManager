using System.Text.Json;

namespace DomainObjects.Utils
{
    public class JsonSerializerOptionsFactory
    {
        public JsonSerializerOptions CreateOptions()
        {
            var options = new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
                WriteIndented = true
            };
            return options;
        }
    }
}
