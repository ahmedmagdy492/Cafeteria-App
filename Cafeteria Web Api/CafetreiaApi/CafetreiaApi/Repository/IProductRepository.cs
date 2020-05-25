using CafetreiaApi.Models.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CafetreiaApi.Repository
{
    public interface IProductRepository : IMainRepository<Product>
    {
        Task Available(Product product);        
    }

}