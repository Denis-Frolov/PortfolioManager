using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;

namespace AssetPersistence
{
    internal static class AssetPersistenceEndpoints
    {
        internal static void MapAssetPersistenceEndpoints(this WebApplication app)
        {
            var assetItems = app.MapGroup("/portfolio");

            assetItems.MapGet("/", GetAllAssets)
                .WithName("GetAllPortfolioAssets")
                .WithOpenApi(x => new OpenApiOperation(x)
                {
                    Summary = "Get All Portfolio Assets",
                    Description = "Returns all assets available in Portfolio.",
                    Tags = new List<OpenApiTag> { new() { Name = "Portfolio API" } }
                });

            assetItems.MapGet("/{id}", GetAsset)
                .WithName("GetPortfolioAssetById")
                .WithOpenApi(x => new OpenApiOperation(x)
                {
                    Summary = "Get Portfolio Asset By Id",
                    Description = "Returns requested asset information from Portfolio.",
                    Tags = new List<OpenApiTag> { new() { Name = "Portfolio API" } }
                });

            assetItems.MapPost("/", CreateAsset)
                .WithName("CreatePortfolioAsset")
                .WithOpenApi(x => new OpenApiOperation(x)
                {
                    Summary = "Create Portfolio Asset",
                    Description = "Adds new asset to Portfolio.",
                    Tags = new List<OpenApiTag> { new() { Name = "Portfolio API" } }
                });

            assetItems.MapPut("/{id}", UpdateAsset)
                .WithName("UpdatePortfolioAssetById")
                .WithOpenApi(x => new OpenApiOperation(x)
                {
                    Summary = "Update Portfolio Asset By Id",
                    Description = "Updates requested asset information in Portfolio.",
                    Tags = new List<OpenApiTag> { new() { Name = "Portfolio API" } }
                });

            assetItems.MapDelete("/{id}", DeleteAsset)
                .WithName("DeletePortfolioAssetById")
                .WithOpenApi(x => new OpenApiOperation(x)
                {
                    Summary = "Delete Portfolio Asset By Id",
                    Description = "Deletes asset from Portfolio.",
                    Tags = new List<OpenApiTag> { new() { Name = "Portfolio API" } }
                });

            static async Task<IResult> GetAllAssets(AssetDb db)
            {
                return TypedResults.Ok(await db.Assets.ToArrayAsync());
            }

            static async Task<IResult> GetAsset(int id, AssetDb db)
            {
                return await db.Assets.FindAsync(id)
                    is Asset asset
                        ? TypedResults.Ok(asset)
                        : TypedResults.NotFound();
            }

            static async Task<IResult> CreateAsset(Asset asset, AssetDb db)
            {
                db.Assets.Add(asset);
                await db.SaveChangesAsync();

                return TypedResults.Created($"/portfolio/{asset.Id}", asset);
            }

            static async Task<IResult> UpdateAsset(int id, Asset inputAsset, AssetDb db)
            {
                var asset = await db.Assets.FindAsync(id);

                if (asset is null) return TypedResults.NotFound();

                asset.Symbol = inputAsset.Symbol;

                await db.SaveChangesAsync();

                return TypedResults.NoContent();
            }

            static async Task<IResult> DeleteAsset(int id, AssetDb db)
            {
                if (await db.Assets.FindAsync(id) is Asset asset)
                {
                    db.Assets.Remove(asset);
                    await db.SaveChangesAsync();
                    return TypedResults.NoContent();
                }

                return TypedResults.NotFound();
            }
        }

    }
}
