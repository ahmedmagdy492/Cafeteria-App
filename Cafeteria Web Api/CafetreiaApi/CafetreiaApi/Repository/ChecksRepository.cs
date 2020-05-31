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
    public class ChecksRepository : IChecksRepository
    {
        private readonly ApplicationDbContext dbContext;

        public ChecksRepository(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task<IEnumerable<Order>> GetChecks(string dateTo, string dateFrom, string userId)
        {
            var toDate = Convert.ToDateTime(dateTo);
            var fromDate = Convert.ToDateTime(dateFrom);            
            var orderProdsOfUser = await dbContext.Orders.Include("User").Include("OrderProducts").Include("OrderProducts.Product").Where(o => o.UserId == userId).ToListAsync();
            return orderProdsOfUser;
        }
    }
}