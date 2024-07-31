using projetGestionHopital_server.Models;
using MongoDB.Bson;
using MongoDB.Driver;
using System.Threading.Tasks;
using System.Web.Http;
using System;
using System.Linq;

namespace projetGestionHopital_server.Controllers
{
    [RoutePrefix("api/lits")]
    public class LitsController : ApiController
    {
        private readonly HopitauxDb _context;

        public LitsController()
        {
            _context = new HopitauxDb();
        }
        [HttpGet]
        [Route("")]
        public async Task<IHttpActionResult> Get()
        {
            var lits = await _context.Lits.Find(_ => true).ToListAsync();

            var litsWithDepartments = from lit in lits
                                      let department = _context.Departements.Find(d => d.IdDepartement == lit.IdDepartement).FirstOrDefault()
                                      select new
                                      {
                                          lit.IdLit,
                                          lit.NumeroLit,
                                          lit.EstOccupe,
                                          lit.Chambre,
                                          DepartmentName = department != null ? department.Nom : "Unknown",
                                          lit.IdDepartement
                                      };

            return Ok(litsWithDepartments);
        }



        [HttpGet]
        [Route("{id:length(24)}")]
        public async Task<IHttpActionResult> Get(string id)
        {
            var lit = await _context.Lits.Find(l => l.IdLit == new ObjectId(id)).FirstOrDefaultAsync();
            if (lit == null) return NotFound();

            var department = await _context.Departements.Find(d => d.IdDepartement == lit.IdDepartement).FirstOrDefaultAsync();
            var litWithDepartment = new
            {
                lit.IdLit,
                lit.NumeroLit,
                lit.EstOccupe,
                lit.Chambre,
                DepartmentName = department != null ? department.Nom : "Unknown"
            };

            return Ok(litWithDepartment);
        }

        [HttpGet]
        [Route("departments")]
        public async Task<IHttpActionResult> GetDepartments()
        {
            var departments = await _context.Departements.Find(_ => true).ToListAsync();
            return Ok(departments);
        }

        public class CreateLitRequest
        {
            public Lit Lit { get; set; }
            public string IdDepartement { get; set; }
        }

        [HttpPost]
        [Route("")]
        public async Task<IHttpActionResult> Create(CreateLitRequest request)
        {
            if (request == null || request.Lit == null)
            {
                return BadRequest("Lit data is null");
            }
            if (!ObjectId.TryParse(request.IdDepartement, out ObjectId departmentId))
            {
                return BadRequest("Invalid department ID format");
            }

            var department = await _context.Departements.Find(d => d.IdDepartement == departmentId).FirstOrDefaultAsync();
            if (department == null)
            {
                return BadRequest("Invalid department ID");
            }

            request.Lit.IdLit = ObjectId.GenerateNewId();
            request.Lit.IdDepartement = departmentId; 
            await _context.Lits.InsertOneAsync(request.Lit);

            return Ok(request.Lit);
        }

        public class UpdateLitRequest
        {
            public Lit Lit { get; set; }
            public string IdDepartement { get; set; }
        }



        [HttpPut]
        [Route("{id:length(24)}")]
        public async Task<IHttpActionResult> Update(string id, UpdateLitRequest request)
        {
            if (request == null || request.Lit == null)
            {
                return BadRequest("Lit data is null");
            }

            Console.WriteLine($"Updating lit with ID: {id}");

            if (!ObjectId.TryParse(request.IdDepartement, out ObjectId departmentId))
            {
                return BadRequest("Invalid department ID format");
            }

            var department = await _context.Departements.Find(d => d.IdDepartement == departmentId).FirstOrDefaultAsync();
            if (department == null)
            {
                return BadRequest("Invalid department ID");
            }

            var existingLit = await _context.Lits.Find(l => l.IdLit == new ObjectId(id)).FirstOrDefaultAsync();
            if (existingLit == null)
            {
                return NotFound();
            }

            request.Lit.IdLit = existingLit.IdLit;
            request.Lit.IdDepartement = departmentId;

            var result = await _context.Lits.ReplaceOneAsync(l => l.IdLit == new ObjectId(id), request.Lit);
            if (result.IsAcknowledged && result.ModifiedCount > 0)
            {
                return Ok(request.Lit);
            }

            return NotFound();
        }


        [HttpDelete]
        [Route("{id:length(24)}")]
        public async Task<IHttpActionResult> Delete(string id)
        {
            var result = await _context.Lits.DeleteOneAsync(l => l.IdLit == new ObjectId(id));
            if (result.IsAcknowledged && result.DeletedCount > 0) return Ok();
            return NotFound();
        }
    }
}
