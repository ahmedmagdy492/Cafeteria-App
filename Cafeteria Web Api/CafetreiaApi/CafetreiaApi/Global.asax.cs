using CafetreiaApi.Models;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;

namespace CafetreiaApi
{
    public class WebApiApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            Initiate();
            AreaRegistration.RegisterAllAreas();
            GlobalConfiguration.Configure(WebApiConfig.Register);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
        }

        private void Initiate()
        {
            RoleManager<IdentityRole> roleManager = new RoleManager<IdentityRole>(new RoleStore<IdentityRole>(new ApplicationDbContext()));
            UserManager<ApplicationUser> userManager = new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(new ApplicationDbContext()));

            roleManager.CreateAsync(new IdentityRole("Admin"));
            roleManager.CreateAsync(new IdentityRole("Normal User"));
            var user = userManager.FindByName("admin@yahoo.com");
            if(user == null)
            {
                var app = new ApplicationUser
                {
                    Email = "admin@yahoo.com",
                    Name = "Admin",
                    UserName = "admin@yahoo.com",
                    ImgUrl = Path.Combine(HttpContext.Current.Server.MapPath("~/Content/imgs"), "admin.png"),
                    Role = "Admin"

                };
                var result = userManager.CreateAsync(app, "0123429320");
                if(result.IsCompleted)
                {
                    userManager.AddToRole(app.Id, "Admin");
                }
            }
        }

    }
}
