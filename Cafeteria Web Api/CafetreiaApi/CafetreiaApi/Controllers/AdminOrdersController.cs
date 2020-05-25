using CafetreiaApi.Models.Entities;
using CafetreiaApi.Repository;
using CafetreiaApi.UtilityClasses;
using CafetreiaApi.ViewModels;
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

    }
}