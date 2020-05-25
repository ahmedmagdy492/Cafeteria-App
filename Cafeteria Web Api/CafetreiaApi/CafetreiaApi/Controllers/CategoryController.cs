using CafetreiaApi.Models.Entities;
using CafetreiaApi.Repository;
using System;
using System.Collections.Generic;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Mvc;

namespace CafetreiaApi.Controllers
{    
        
    [EnableCors("*", "*", "*")]
    [System.Web.Http.Authorize(Roles = "Admin")]
    public class CategoryController : ApiController
    {
        private readonly IMainRepository<Category> cateRepo;

        public CategoryController(IMainRepository<Category> cateRepo)
        {
            this.cateRepo = cateRepo;
        }

        // GET api/Category
        public async Task<IHttpActionResult> Get()
        {
            return Ok(await cateRepo.GetAll());
        }

        // GET api/Category/5
        public async Task<IHttpActionResult> Get(int id)
        {
            var category = await cateRepo.FindById(id);
            if (category == null) return NotFound();
            return Ok(category);
        }
        
        // POST api/Category
        public async Task<IHttpActionResult> Post([FromBody]Category category)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);
            cateRepo.Add(category);
            await cateRepo.Commit();
            return Created("Category", category);
        }

        // PUT api/Category/5
        public async Task<IHttpActionResult> Put(int id, [FromBody]Category category)
        {
            var oldCate = await cateRepo.FindById(id);
            if (oldCate == null) return NotFound();
            if (!ModelState.IsValid) return BadRequest(ModelState);
            oldCate.Name = category.Name;
            await cateRepo.Edit(oldCate);
            return Ok("Done");
        }

        // DELETE api/Category/5
        public async Task<IHttpActionResult> Delete(int id)
        {
            var category = await cateRepo.FindById(id);
            if (category == null) return NotFound();
            await cateRepo.Delete(category);
            return Ok("Deleted");
        }
    }
}