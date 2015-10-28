<%@ WebHandler Language="C#" Class="Handler" %>

using System;
using System.Web;

public class Handler : IHttpHandler {
    
    public void ProcessRequest (HttpContext context) {
        var pageRaw = context.Request.Params["page"];
        var lengthRaw = context.Request.Params["pageSize"];
        var filter1Raw = context.Request.Params["filter1"];
        var filter2Raw = context.Request.Params["filter2"];
    
        int page = 0;
        int length = 5;
        int.TryParse(pageRaw, out page);
        int.TryParse(lengthRaw, out length);
        var start = (page-1) * length;

        var count = length;
        var total = 53;
        var filtered = total;
        string resultTemplate = "{{\"draw\":{0},\"recordsTotal\":{1},\"recordsFiltered\":{2},\"data\":[{3}]}}";
        var data = "";
        System.Collections.Generic.List<String> items = new System.Collections.Generic.List<string>();
        for (var i = 0; i < total; i++)
        {
            
            if ((filter1Raw == "undefined" || filter1Raw == i.ToString()) || (filter2Raw == "undefined" || filter2Raw == i.ToString()))
            {
                var itemData = String.Format("{{\"id\":{0},\"name\":{0},\"gender\":\"gender{0}\",\"company\":\"company{0}\"}}", i);
                items.Add(itemData);
            }
        }
        filtered = items.Count;
        for (var i = start; i < start + length; i++)
        {
            if (i < filtered)
            {
                data += String.Format("{1}{0}", items[i], data.Length > 0 ? "," : "");
            }
        }
       
        context.Response.ContentType = "text/plain";
        var result = String.Format(resultTemplate, 0, total, filtered, data);
        context.Response.Write(result);
    }
 
    public bool IsReusable {
        get {
            return false;
        }
    }

}