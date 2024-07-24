using projetGestionHopital_server.Models;
using MongoDB.Bson;
using MongoDB.Driver;
using System.Threading.Tasks;
using System.Web.Http;
using System;

namespace projetGestionHopital_server.Controllers
{
    [RoutePrefix("api/patients")]
    public class PatientsController : ApiController
    {
        private readonly HopitauxDb _context;

        public PatientsController()
        {
            _context = new HopitauxDb();
        }

        [HttpGet]
        [Route("")]
        public async Task<IHttpActionResult> Get()
        {
            var patients = await _context.Patients.Find(_ => true).ToListAsync();
            return Ok(patients);
        }

        [HttpGet]
        [Route("{id:length(24)}")]
        public async Task<IHttpActionResult> Get(string id)
        {
            var patient = await _context.Patients.Find(p => p.Id == new ObjectId(id)).FirstOrDefaultAsync();
            if (patient == null) return NotFound();
            return Ok(patient);
        }

        [HttpPost]
        [Route("")]

        public async Task<IHttpActionResult> Create(Patient patient)
        {
            if (patient == null)
            {
                return BadRequest("Patient data is null");
            }

            if (patient.Adresse == null)
            {
                return BadRequest("Address data is null");
            }

            // Insérer l'adresse et obtenir l'IdAdresse
            await _context.Adresses.InsertOneAsync(patient.Adresse);
            patient.IdAdresse = patient.Adresse.IdAdresse;

            // Insérer le patient
            await _context.Patients.InsertOneAsync(patient);

            return Ok(patient);
        }
        [HttpPut]
        [Route("{id:length(24)}")]
        public async Task<IHttpActionResult> Update(string id, Patient patientIn)
        {
            try
            {
                Console.WriteLine($"Updating patient with ID: {id}");

                // Récupérer le document existant
                var existingPatient = await _context.Patients.Find(p => p.Id == new ObjectId(id)).FirstOrDefaultAsync();
                if (existingPatient == null)
                {
                    return NotFound();
                }

                // Conserver l'ID existant et mettre à jour les autres champs
                patientIn.Id = existingPatient.Id;

                var result = await _context.Patients.ReplaceOneAsync(p => p.Id == new ObjectId(id), patientIn);
                if (result.IsAcknowledged && result.ModifiedCount > 0)
                {
                    return Ok(patientIn);
                }
                return NotFound();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Exception: {ex.Message}");
                Console.WriteLine($"Stack Trace: {ex.StackTrace}");
                return InternalServerError(ex);
            }
        }




        [HttpDelete]
        [Route("{id:length(24)}")]
        public async Task<IHttpActionResult> Delete(string id)
        {
            var result = await _context.Patients.DeleteOneAsync(p => p.Id == new ObjectId(id));
            if (result.IsAcknowledged && result.DeletedCount > 0) return Ok();
            return NotFound();
        }
    }
}
