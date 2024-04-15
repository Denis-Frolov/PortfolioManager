using Microsoft.EntityFrameworkCore;

namespace AssetPersistence
{
    public class AssetDb : DbContext
    {
        public AssetDb(DbContextOptions<AssetDb> options)
       : base(options) { }

        public DbSet<Asset> Assets => Set<Asset>();
    }
}
