<%@ WebHandler Language="C#" Class="Handler" %>

using System;
using System.Web;

public class Handler : IHttpHandler {
    
    public void ProcessRequest (HttpContext context) {
        context.Response.ContentType = "text/plain";
        var result = "{\"update\":[{\"id\":3,\"name\":3,\"gender\":\"gender3\",\"company\":\"" + DateTime.Now.Millisecond.ToString() + "\"}],\"add\":[{\"id\":" + DateTime.Now.Millisecond.ToString() + ",\"name\":\"added\",\"gender\":\"genderNew\",\"company\":\"" + DateTime.Now.Millisecond.ToString() + "\"}],\"delete\":[{\"id\":7},{\"id\":9},{\"id\":11}]}";
        context.Response.Write(result);
    }
 
    public bool IsReusable {
        get {
            return false;
        }
    }

}