using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Controllers;

namespace CafetreiaApi.AttributeClasses
{
    public class AppAuthorize : AuthorizeAttribute
    {
        protected override bool IsAuthorized(HttpActionContext actionContext)
        {            
            var value = actionContext.Request.Headers.GetValues("role").ToList()[0];
            if(value != null)
            {
                if(this.Roles.Contains(value))
                {
                    return true;
                }
            }
            return false;
        }
    }
}
