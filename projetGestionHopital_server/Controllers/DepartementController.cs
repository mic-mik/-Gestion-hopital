using projetGestionHopital_server.Models;
using MongoDB.Bson;
using MongoDB.Driver;
using System.Threading.Tasks;
using System.Web.Http;

namespace projetGestionHopital_server.Controllers
{
    [RoutePrefix("api/departements")]
    public class DepartementsController : ApiController
    {
        private readonly HopitauxDb _context;

        public DepartementsController()
        {
            _context = new HopitauxDb();
        }

        [HttpGet]
        [Route("")]
        public async Task<IHttpActionResult> Get()
        {
            var departements = await _context.Departements.Find(_ => true).ToListAsync();
            return Ok(departements);
        }

        [HttpGet]
        [Route("{id:length(24)}")]
        public async Task<IHttpActionResult> Get(string id)
        {
            var departement = await _context.Departements.Find(d => d.IdDepartement == new ObjectId(id)).FirstOrDefaultAsync();
            if (departement == null) return NotFound();
            return Ok(departement);
        }

        [HttpPost]
        [Route("")]
        public async Task<IHttpActionResult> Create(Departement departement)
        {
            if (departement == null)
            {
                return BadRequest("Departement data is null");
            }

            await _context.Departements.InsertOneAsync(departement);

            return Ok(departement);
        }

        [HttpPut]
        [Route("{id:length(24)}")]
        public async Task<IHttpActionResult> Update(string id, Departement departementIn)
        {
            var existingDepartement = await _context.Departements.Find(d => d.IdDepartement == new ObjectId(id)).FirstOrDefaultAsync();
            if (existingDepartement == null)
            {
                return NotFound();
            }

            departementIn.IdDepartement = existingDepartement.IdDepartement;

            var result = await _context.Departements.ReplaceOneAsync(d => d.IdDepartement == new ObjectId(id), departementIn);
            if (result.IsAcknowledged && result.ModifiedCount > 0)
            {
                return Ok(departementIn);
            }
            return NotFound();
        }

        [HttpDelete]
        [Route("{id:length(24)}")]
        public async Task<IHttpActionResult> Delete(string id)
        {
            var result = await _context.Departements.DeleteOneAsync(d => d.IdDepartement == new ObjectId(id));
            if (result.IsAcknowledged && result.DeletedCount > 0) return Ok();
            return NotFound();
        }
    }
}
