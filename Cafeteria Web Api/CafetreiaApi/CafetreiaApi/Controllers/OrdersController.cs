using CafetreiaApi.Models.Entities;
using CafetreiaApi.Repository;
using CafetreiaApi.UtilityClasses;
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
    [EnableCors("*", "*", "*")]
    [Authorize(Roles = "Normal User")]
    public class OrdersController : ApiController
    {
        private readonly IOrderRepository orderRepository;

        public OrdersController(IOrderRepository orderRepository)
        {
            this.orderRepository = orderRepository;
        }

        [HttpPost]
        public async Task<IHttpActionResult> Order([FromBody]List<OrderProducts> products, [FromUri]string Notes)
        {
            var order = new Order
            {
                UserId = User.Identity.GetUserId(),
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

        [HttpGet]
        public async Task<IHttpActionResult> GetMyOrders()
        {
            string userId = User.Identity.GetUserId();
            var myOrders = await orderRepository.GetMyOrders(userId);
            foreach(var order in myOrders)
            {
                foreach(var op in order.OrderProducts)
                {
                    if(op.Product.ImgUrl.Length == 40)
                    {
                        op.Product.ImgUrl = Base64.GetImage(op.Product.ImgUrl);
                    }
                }
            }
            return Ok(myOrders);
        }

        [HttpGet]
        public async Task<IHttpActionResult> FilterByDate([FromUri]string fromDate, [FromUri]string toDate)
        {
            if (fromDate == null || toDate == null) return BadRequest("Invalid Date");
            var currentUserId = User.Identity.GetUserId();
            var filteredOrders = await orderRepository.FilterbyDate(fromDate, toDate, currentUserId);
            foreach (var order in filteredOrders)
            {
                foreach (var op in order.OrderProducts)
                {
                    if (op.Product.ImgUrl.Length == 40)
                    {
                        op.Product.ImgUrl = Base64.GetImage(op.Product.ImgUrl);
                    }
                }
            }
            return Ok(filteredOrders);
        }
    }
}