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
            return await db.Orders.Include("OrderProducts").Include("OrderProducts.Product").ToListAsync();
        }

        public async Task<IEnumerable<Order>> GetDoneOrders()
        {
            return await db.Orders.Include("OrderProducts").Include("OrderProducts.Product").Where(order => order.Status == OrderStatus.Done).ToListAsync();
        }

        public async Task<IEnumerable<Order>> GetProcessingOrders()
        {
            return await db.Orders.Include("OrderProducts").Include("OrderProducts.Product").Where(order => order.Status == OrderStatus.Processing).ToListAsync();
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
    }
}