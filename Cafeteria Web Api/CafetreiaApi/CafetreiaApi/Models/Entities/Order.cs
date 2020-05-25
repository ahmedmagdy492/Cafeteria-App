using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace CafetreiaApi.Models.Entities
{
    public enum OrderStatus
    {
        Processing = 1,
        Done = 2
    }

    public class Order
    {
        [Key]
        public int Id { get; set; }
        public string Notes { get; set; }
        public OrderStatus Status { get; set; }

        [ForeignKey(nameof(User))]
        public string UserId { get; set; }
        public ApplicationUser User { get; set; }
        public virtual List<OrderProducts> OrderProducts { get; set; }
    }
}