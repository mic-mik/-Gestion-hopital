using projetGestionHopital_server.Models;
using MongoDB.Bson;
using MongoDB.Driver;
using System.Threading.Tasks;
using System.Web.Http;

namespace projetGestionHopital_server.Controllers
{
    [RoutePrefix("api/rendezvous")]
    public class RendezVousController : ApiController
    {
        private readonly HopitauxDb _context;

        public RendezVousController()
        {
            _context = new HopitauxDb();
        }

        [HttpGet]
        [Route("")]
        public async Task<IHttpActionResult> Get()
        {
            var rendezVous = await _context.RendezVous.Find(_ => true).ToListAsync();
            return Ok(rendezVous);
        }

        [HttpGet]
        [Route("{id:length(24)}")]
        public async Task<IHttpActionResult> Get(string id)
        {
            var rendezVous = await _context.RendezVous.Find(r => r.Id == new ObjectId(id)).FirstOrDefaultAsync();
            if (rendezVous == null) return NotFound();
            return Ok(rendezVous);
        }

        [HttpPost]
        [Route("")]
        public async Task<IHttpActionResult> Create(RendezVous rendezVous)
        {
            await _context.RendezVous.InsertOneAsync(rendezVous);
            return Ok(rendezVous);
        }

        [HttpPut]
        [Route("{id:length(24)}")]
        public async Task<IHttpActionResult> Update(string id, RendezVous rendezVousIn)
        {
            var result = await _context.RendezVous.ReplaceOneAsync(r => r.Id == new ObjectId(id), rendezVousIn);
            if (result.IsAcknowledged && result.ModifiedCount > 0) return Ok(rendezVousIn);
            return NotFound();
        }

        [HttpDelete]
        [Route("{id:length(24)}")]
        public async Task<IHttpActionResult> Delete(string id)
        {
            var result = await _context.RendezVous.DeleteOneAsync(r => r.Id == new ObjectId(id));
            if (result.IsAcknowledged && result.DeletedCount > 0) return Ok();
            return NotFound();
        }
    }
}
