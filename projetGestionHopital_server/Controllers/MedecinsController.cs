using projetGestionHopital_server.Models;
using MongoDB.Bson;
using MongoDB.Driver;
using System.Threading.Tasks;
using System.Web.Http;

namespace projetGestionHopital_server.Controllers
{
    [RoutePrefix("api/medecins")]
    public class MedecinsController : ApiController
    {
        private readonly HopitauxDb _context;

        public MedecinsController()
        {
            _context = new HopitauxDb();
        }

        [HttpGet]
        [Route("")]
        public async Task<IHttpActionResult> Get()
        {
            var medecins = await _context.Medecins.Find(_ => true).ToListAsync();
            return Ok(medecins);
        }

        [HttpGet]
        [Route("{id:length(24)}")]
        public async Task<IHttpActionResult> Get(string id)
        {
            var medecin = await _context.Medecins.Find(m => m.Id == new ObjectId(id)).FirstOrDefaultAsync();
            if (medecin == null) return NotFound();
            return Ok(medecin);
        }

        [HttpPost]
        [Route("")]
        public async Task<IHttpActionResult> Create(Medecin medecin)
        {
            await _context.Medecins.InsertOneAsync(medecin);
            return Ok(medecin);
        }

        [HttpPut]
        [Route("{id:length(24)}")]
        public async Task<IHttpActionResult> Update(string id, Medecin medecinIn)
        {
            var result = await _context.Medecins.ReplaceOneAsync(m => m.Id == new ObjectId(id), medecinIn);
            if (result.IsAcknowledged && result.ModifiedCount > 0) return Ok(medecinIn);
            return NotFound();
        }

        [HttpDelete]
        [Route("{id:length(24)}")]
        public async Task<IHttpActionResult> Delete(string id)
        {
            var result = await _context.Medecins.DeleteOneAsync(m => m.Id == new ObjectId(id));
            if (result.IsAcknowledged && result.DeletedCount > 0) return Ok();
            return NotFound();
        }
    }
}
