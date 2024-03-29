﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using Microsoft.Owin.Security.OAuth;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace CafetreiaApi
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API configuration and services      
            config.EnableCors(new EnableCorsAttribute("*", "*", "*"));
            // Configure Web API to use only bearer token authentication.
            config.SuppressDefaultHostAuthentication();            
            config.Filters.Add(new HostAuthenticationFilter(OAuthDefaults.AuthenticationType)); GlobalConfiguration.Configuration.Formatters
                    .JsonFormatter.SerializerSettings.Re‌​ferenceLoopHandling
                    = ReferenceLoopHandling.Ignore;
            // Web API routes
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
        }
    }
}
