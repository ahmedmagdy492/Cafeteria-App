using CafetreiaApi.Repository;
using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace CafetreiaApi.Controllers
{
    public class UsersController : ApiController
    {
        private readonly IUserRepository userRepository;

        public UsersController(IUserRepository userRepository)
        {
            this.userRepository = userRepository;
        }

        // GET api/<controller>
        public async Task<IHttpActionResult> Get()
        {
            string curUserId = User.Identity.GetUserId();
            return Ok(await userRepository.GetAllUsersExecptMe(curUserId));
        }
        
    }
}