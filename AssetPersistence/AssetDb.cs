using Microsoft.EntityFrameworkCore;

namespace AssetPersistenceApi
{
    public class AssetDb : DbContext
    {
        public AssetDb(DbContextOptions<AssetDb> options)
       : base(options) { }

        public DbSet<Asset> Assets => Set<Asset>();
    }
}
