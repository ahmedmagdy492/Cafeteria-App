using CafetreiaApi.Repository;
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
    [Authorize(Roles = "Admin")]
    public class ChecksController : ApiController
    {
        private readonly IChecksRepository checksRepository;

        public ChecksController(IChecksRepository checksRepository)
        {
            this.checksRepository = checksRepository;
        }

        // GET api/<controller>
        public async Task<IHttpActionResult> Get(string userId, string fromDate, string toDate)
        {
            return Ok(await checksRepository.GetChecks(toDate, fromDate, userId));
        }

    }
}