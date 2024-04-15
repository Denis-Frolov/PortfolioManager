
using DomainObjects.Middleware;
using DomainObjects.Utils;
using Microsoft.EntityFrameworkCore;

namespace AssetPersistence
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            builder.Services.AddDbContext<AssetDb>(opt => opt.UseInMemoryDatabase("Porfolio"));
            builder.Services.AddDatabaseDeveloperPageExceptionFilter();

            // Add services to the container.
            builder.Services.AddAuthorization();

            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddOpenApiDocument(config =>
            {
                config.DocumentName = "PortfolioAPI";
                config.Title = "PortfolioAPI v1";
                config.Version = "v1";
            });


            builder.Services.AddSingleton<JsonSerializerOptionsFactory>();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            app.UseMiddleware<ExceptionMiddleware>();

            if (app.Environment.IsDevelopment())
            {
                app.UseOpenApi();
                app.UseSwaggerUi(config =>
                {
                    config.DocumentTitle = "PortfolioAPI";
                    config.Path = "/swagger";
                    config.DocumentPath = "/swagger/{documentName}/swagger.json";
                    config.DocExpansion = "list";
                });
            }
            
            app.UseAuthorization();
            app.MapAssetPersistenceEndpoints();

            app.Run();

        }
    }
}
