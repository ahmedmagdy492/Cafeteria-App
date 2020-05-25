using CafetreiaApi.Models;
using CafetreiaApi.Models.Entities;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace CafetreiaApi.Repository
{
    public class ProductRepository : IProductRepository
    {
        private readonly ApplicationDbContext db;

        public ProductRepository(ApplicationDbContext _db)
        {
            this.db = _db;
        }

        public Product Add(Product Entity)
        {
            return db.Products.Add(Entity);
        }

        public async Task Available(Product product)
        {
            product.IsAvailable = !product.IsAvailable.Value;
            db.Entry(product).State = EntityState.Modified;
            await db.SaveChangesAsync();
        }

        public async Task Commit()
        {
            await db.SaveChangesAsync();
        }

        public async Task Delete(Product Entity)
        {
            db.Products.Remove(Entity);
            db.Entry(Entity).State = EntityState.Deleted;
            await db.SaveChangesAsync();
        }

        public async Task Edit(Product Entity)
        {
            db.Entry(Entity).State = EntityState.Modified;
            await db.SaveChangesAsync();
        }

        public async Task<Product> FindById(int id)
        {
            return await db.Products.FindAsync(id);
        }

        public async Task<IEnumerable<Product>> GetAll()
        {
            return await db.Products.ToListAsync();
        }       
    }
}