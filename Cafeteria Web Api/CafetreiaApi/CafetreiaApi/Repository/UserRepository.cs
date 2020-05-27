using CafetreiaApi.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace CafetreiaApi.Repository
{
    public class UserRepository : IUserRepository
    {
        private readonly ApplicationDbContext dbContext;

        public UserRepository(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task<IEnumerable<ApplicationUser>> GetAllUsersExecptMe(string myId)
        {
            return await dbContext.Users.Where(u => u.Id != myId).ToListAsync();
        }
    }
}