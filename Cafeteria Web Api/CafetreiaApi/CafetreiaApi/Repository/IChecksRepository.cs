using CafetreiaApi.Models.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CafetreiaApi.Repository
{
    public interface IChecksRepository
    {
        Task<IEnumerable<Order>> GetChecks(string dateTo, string dateFrom, string userId);
    }
}