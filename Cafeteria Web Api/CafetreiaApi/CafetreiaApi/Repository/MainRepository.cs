using CafetreiaApi.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace CafetreiaApi.Repository
{
    public class MainRepository<T> : IMainRepository<T> where T : class
    {
        private readonly ApplicationDbContext context;
        private readonly DbSet<T> dbSet;

        public MainRepository(ApplicationDbContext context)
        {
            this.context = context;
            dbSet = this.context.Set<T>();
        }

        public async Task<IEnumerable<T>> GetAll()
        {
            return await dbSet.ToListAsync();
        }

        public async Task Commit()
        {
            await context.SaveChangesAsync();
        }

        public T Add(T Entity)
        {
            return dbSet.Add(Entity);
        }

        public async Task<T> FindById(int id)
        {
            return await dbSet.FindAsync(id);
        }

        public async Task Delete(T Entity)
        {
            dbSet.Remove(Entity);
            context.Entry(Entity).State = EntityState.Deleted;
            await Commit();
        }

        public async Task Edit(T Entity)
        {
            context.Entry(Entity).State = EntityState.Modified;
            await Commit();
        }

    }
}