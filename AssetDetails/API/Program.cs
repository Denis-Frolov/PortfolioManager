using DomainObjects.Middleware;
using DomainObjects.Utils;

namespace AssetDetailsApi
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            builder.Services.AddAuthorization();

            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            builder.Services.AddCors(opt =>
            {
                opt.AddPolicy("CorsPolicy", policy =>
                {
                    policy.AllowAnyHeader().AllowAnyMethod()
                    .WithOrigins("http://localhost:3000", "http://localhost:3100");
                });
            });

            builder.Services.AddSingleton<JsonSerializerOptionsFactory>();
            builder.Services.AddSingleton<IYahooService, YahooService>();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            app.UseMiddleware<ExceptionMiddleware>();
            app.UseCors("CorsPolicy");

            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseAuthorization();
            app.MapAssetDetailsEndpoints();

            app.Run();
        }
    }
}
