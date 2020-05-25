using CafetreiaApi.Models.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CafetreiaApi.Repository
{
    public interface IOrderRepository
    {
        void AddOrder(Order order);
        Task Commit();
        void AddOrderProduct(OrderProducts orderProducts);
        Task<IEnumerable<Order>> GetMyOrders(string id);
        Task<IEnumerable<Order>> GetAllOrders();
        Task<IEnumerable<Order>> GetDoneOrders();
        Task<IEnumerable<Order>> GetProcessingOrders();
        Task<Order> FindOrder(int id);
        Task FinishOrder(Order order);
    }
}
