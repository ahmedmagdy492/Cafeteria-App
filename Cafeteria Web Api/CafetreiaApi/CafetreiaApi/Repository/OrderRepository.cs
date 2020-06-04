using CafetreiaApi.Models;
using CafetreiaApi.Models.Entities;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Security.Policy;
using System.Threading.Tasks;
using System.Web;

namespace CafetreiaApi.Repository
{
    public class OrderRepository : IOrderRepository
    {
        private readonly ApplicationDbContext db;

        public OrderRepository(ApplicationDbContext db)
        {
            this.db = db;
        }

        public void AddOrder(Order order)
        {
            db.Orders.Add(order);
        }

        public async Task Commit()
        {
            await db.SaveChangesAsync();
        }

        public void AddOrderProduct(OrderProducts orderProducts)
        {
            db.OrderProducts.Add(orderProducts);
        }

        public async Task<IEnumerable<Order>> GetMyOrders(string id)
        {
            return await db.Orders.Include("OrderProducts").Include("OrderProducts.Product").Where(op => op.UserId == id).ToListAsync();
        }

        public async Task<IEnumerable<Order>> GetAllOrders()
        {
            return await db.Orders.Include("User").Include("OrderProducts").Include("OrderProducts.Product").ToListAsync();
        }

        public async Task<IEnumerable<Order>> GetDoneOrders()
        {
            return await db.Orders.Include("User").Include("OrderProducts").Include("OrderProducts.Product").Where(order => order.Status == OrderStatus.Done).ToListAsync();
        }

        public async Task<IEnumerable<Order>> GetProcessingOrders()
        {
            return await db.Orders.Include("User").Include("OrderProducts").Include("OrderProducts.Product").Where(order => order.Status == OrderStatus.Processing).ToListAsync();
        }

        public async Task<Order> FindOrder(int id)
        {
            return await db.Orders.FindAsync(id);
        }

        public async Task FinishOrder(Order order)
        {
            order.Status = OrderStatus.Done;
            db.Entry<Order>(order).State = EntityState.Modified;
            await Commit();
        }

        public async Task<IEnumerable<Order>> FilterbyDate(string fromDate, string toDate, string userId)
        {
            DateTime fromDt = Convert.ToDateTime(fromDate);
            DateTime toDt = Convert.ToDateTime(toDate);
            var allOrders = await db.Orders.Include("OrderProducts").Where(o => o.UserId == userId).ToListAsync();
            List<Order> filteredOrders = new List<Order>();
            foreach(var order in allOrders)
            {
                foreach(var orderProd in order.OrderProducts)
                {
                    if(orderProd.OrderDate >= fromDt && orderProd.OrderDate <= toDt)
                    {
                        filteredOrders.Add(order);
                    }
                }
            }
            return filteredOrders;
        }
    }
}