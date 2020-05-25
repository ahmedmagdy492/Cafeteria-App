using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Web;

namespace CafetreiaApi.UtilityClasses
{
    public static class Base64
    {
        public static string Base64Encode(Image img)
        {
            MemoryStream ms = new MemoryStream();
            img.Save(ms, img.RawFormat);            
            return System.Convert.ToBase64String(ms.ToArray());
        }
        public static Image Base64Decode(string base64EncodedData)
        {
            var base64EncodedBytes = Convert.FromBase64String(base64EncodedData);
            MemoryStream ms = new MemoryStream(base64EncodedBytes);
            return Image.FromStream(ms);            
        }

        public static string GetImage(string image)
        {
            Uri uri = System.Web.HttpContext.Current.Request.Url;
            return $"{uri.Scheme}://{uri.Host}:{uri.Port}/Content/imgs/{image}";
        }
    }
}