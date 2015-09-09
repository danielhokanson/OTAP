using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace OTAP.API.Controllers
{
    public class DefinitionController : ApiController
    {
        // GET: api/Definition
        public IEnumerable<string> Get()
        {
            return new List<string>();
            

        }

        // GET: api/Definition/5
        public IHttpActionResult Get(int id)
        {
            return Ok(NLP.ProcessText("This is testing a thing."));
        }

        // POST: api/Definition
        public void Post([FromBody]string value)
        {
        }

        // PUT: api/Definition/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Definition/5
        public void Delete(int id)
        {
        }
    }
}
