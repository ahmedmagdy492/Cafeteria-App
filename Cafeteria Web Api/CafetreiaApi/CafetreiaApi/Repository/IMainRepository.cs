using System.Collections.Generic;
using System.Threading.Tasks;

namespace CafetreiaApi.Repository
{
    public interface IMainRepository<T> where T : class
    {
        T Add(T Entity);
        Task Commit();
        Task Delete(T Entity);
        Task Edit(T Entity);
        Task<T> FindById(int id);
        Task<IEnumerable<T>> GetAll();
    }
}