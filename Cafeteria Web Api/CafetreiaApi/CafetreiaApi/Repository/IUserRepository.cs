using CafetreiaApi.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CafetreiaApi.Repository
{
    public interface IUserRepository
    {
        Task<IEnumerable<ApplicationUser>> GetAllUsersExecptMe(string myId);
    }
}