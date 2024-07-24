using server_web_API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace server_web_API.Controllers
{
    public class PatientsController : ApiController
    {
        static List<Patient> patients = new List<Patient>
        {
        new Patient { Id = 1, Name = "John Doe", DateOfBirth = new DateTime(1980, 1, 1), Address = "123 Main St" },
        new Patient { Id = 2, Name = "Jane Smith", DateOfBirth = new DateTime(1990, 2, 2), Address = "456 Elm St" }
        };

        public IEnumerable<Patient> Get()
        {
            return patients;
        }

        public Patient Get(int id)
        {
            return patients.Find(p => p.Id == id);
        }

        public void Post([FromBody] Patient patient)
        {
            patients.Add(patient);
        }

        public void Put(int id, [FromBody] Patient patient)
        {
            var existingPatient = patients.Find(p => p.Id == id);
            if (existingPatient != null)
            {
                existingPatient.Name = patient.Name;
                existingPatient.DateOfBirth = patient.DateOfBirth;
                existingPatient.Address = patient.Address;
            }
        }

        public void Delete(int id)
        {
            var patient = patients.Find(p => p.Id == id);
            if (patient != null)
            {
                patients.Remove(patient);
            }
        }
    }
}
