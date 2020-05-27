using CafetreiaApi.AttributeClasses;
using CafetreiaApi.Models.Entities;
using CafetreiaApi.Repository;
using CafetreiaApi.UtilityClasses;
using Microsoft.Owin.Security.DataHandler.Encoder;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;

namespace CafetreiaApi.Controllers
{    
    [EnableCors("*", "*", "*")]
    public class ProductController : ApiController
    {
        private readonly IProductRepository prodRepo;        

        public ProductController(IProductRepository prodRepo)
        {
            this.prodRepo = prodRepo;            
        }

        [EnableCors("*", "*", "*")]
        [Authorize(Roles = "Admin, Normal User")]
        // GET api/Product
        public async Task<IHttpActionResult> Get()
        {
            try
            {
                var allProducts = await prodRepo.GetAll();
                foreach (var prod in allProducts)
                {
                    prod.ImgUrl = Base64.GetImage(prod.ImgUrl);
                }
                return Ok(allProducts);
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // GET api/Product/
        [Authorize(Roles = "Admin")]
        public async Task<IHttpActionResult> Get(int id)
        {
            var product = await prodRepo.FindById(id);
            if (product == null) return NotFound();

            return Ok(product);
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IHttpActionResult> Post([FromUri]int id)
        {
            var product = await prodRepo.FindById(id);
            if (product == null) return NotFound();
            await prodRepo.Available(product);
            return Ok(product);
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        // POST api/Product
        public async Task<IHttpActionResult> Post([FromBody]Product product)
        {
            product.IsAvailable = true;
            if (!ModelState.IsValid) return BadRequest(ModelState);
            Image img = Base64.Base64Decode(product.ImgUrl);
            var mappedPath = System.Web.Hosting.HostingEnvironment.MapPath("~/Content/imgs");
            string fileName = Guid.NewGuid().ToString() + ".png";
            string fullPath = Path.Combine(mappedPath, fileName);
            img.Save(fullPath);

            product.ImgUrl = fileName;
            product.IsAvailable = true;
            prodRepo.Add(product);
            await prodRepo.Commit();
            return Ok(product);
        }

        [Authorize(Roles = "Admin")]
        // PUT api/Product/5
        public async Task<IHttpActionResult> Put(int id, [FromBody]Product product)
        {
            var oldProduct = await prodRepo.FindById(id);
            if (oldProduct == null) return NotFound();
            if (!ModelState.IsValid) return BadRequest(ModelState);
            oldProduct.Name = product.Name;
            oldProduct.Price = product.Price;
            oldProduct.IsAvailable = product.IsAvailable;
            await prodRepo.Edit(oldProduct);
            return Ok("Modified");
        }

        [Authorize(Roles = "Admin")]
        // DELETE api/Product/5
        public async Task<IHttpActionResult> Delete(int id)
        {
            var product = await prodRepo.FindById(id);
            if (product == null) return NotFound();
            await prodRepo.Delete(product);
            return Ok("Deleted");
        }
    }
}