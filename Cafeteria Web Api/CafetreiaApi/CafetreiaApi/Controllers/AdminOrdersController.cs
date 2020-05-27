using CafetreiaApi.Models.Entities;
using CafetreiaApi.Repository;
using CafetreiaApi.UtilityClasses;
using CafetreiaApi.ViewModels;
using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Cors;

namespace CafetreiaApi.Controllers
{
    [EnableCors("*","*","*")]
    [Authorize(Roles = "Admin")]
    public class AdminOrdersController : ApiController
    {
        private readonly OrderRepository orderRepository;

        public AdminOrdersController(OrderRepository orderRepository)
        {
            this.orderRepository = orderRepository;
        }

        [HttpGet]
        public async Task<IHttpActionResult> GetAll()
        {
            var allOrders = await orderRepository.GetAllOrders();
            foreach (var order in allOrders)
            {
                foreach (var op in order.OrderProducts)
                {
                    if (op.Product.ImgUrl.Length == 40)
                    {
                        op.Product.ImgUrl = Base64.GetImage(op.Product.ImgUrl);
                    }
                }
            }
            return Ok(allOrders);
        }

        [HttpGet]
        public async Task<IHttpActionResult> FinishOrder([FromUri]int id)
        {
            var order = await orderRepository.FindOrder(id);
            if (order == null) return NotFound();
            await orderRepository.FinishOrder(order);
            return Ok("Done");
        }

        [HttpPost]
        public async Task<IHttpActionResult> Filter([FromBody]Filter filter)
        {
            IEnumerable<Order> orders = null;
            if (filter.filter == "Done")
            {
                orders = await orderRepository.GetDoneOrders();
            }
            else if(filter.filter == "AllOrders")
            {
                orders = await orderRepository.GetAllOrders();
            }
            else
            {
                orders = await orderRepository.GetProcessingOrders();
            }
            foreach (var order in orders)
            {
                foreach (var op in order.OrderProducts)
                {
                    if (op.Product.ImgUrl.Length == 40)
                    {
                        op.Product.ImgUrl = Base64.GetImage(op.Product.ImgUrl);
                    }
                }
            }
            return Ok(orders);
        }

        [HttpPost]
        public async Task<IHttpActionResult> SubmitOrder([FromBody]List<OrderProducts> products,[FromUri] string Notes, [FromUri]string userId)
        {
            var order = new Order
            {
                UserId = userId,
                Status = OrderStatus.Processing,
                Notes = Notes
            };

            orderRepository.AddOrder(order);
            await orderRepository.Commit();
            foreach (OrderProducts product in products)
            {
                product.ProductId = product.Product.Id;
                product.Product = null;
                product.OrderId = order.Id;
                product.OrderDate = DateTime.Now;                
                orderRepository.AddOrderProduct(product);
            }
            await orderRepository.Commit();
            return Ok("Added Successfully");
        }

    }
}