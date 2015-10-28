﻿<%@ WebHandler Language="C#" Class="Handler" %>

using System;
using System.Web;

public class Handler : IHttpHandler {
    
    public void ProcessRequest (HttpContext context) {

        var sartRaw = HttpContext.Current.Request.Form["start"];
        var lengthRaw = HttpContext.Current.Request.Form["length"];
        int start = 0;
        int length = 5;
        int.TryParse(sartRaw, out start);
        int.TryParse(lengthRaw, out length);

        var count = length;
        var total = 53;
        string resultTemplate = "\"draw\":{0},\"recordsTotal\":{1},\"recordsFiltered\":{2},\"data\":[{3}]";
        var data = "";
        for (var i = start; i < start + length; i++)
        {
            if (i < total) 
            {
                data += String.Format("{1}{{\"id\":{0},\"firstName\":\"firstname{0}\",\"lastName\":\"lastname{0}\"}}", i, data.Length > 0 ? "," : "");
            }
        }
       
        context.Response.ContentType = "text/plain";
        var result = String.Format(resultTemplate, 0, total, total, data);
        context.Response.Write("{"+result+"}");
    }
 
    public bool IsReusable {
        get {
            return false;
        }
    }

}