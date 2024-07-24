using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MongoDB.Driver;
using System.Threading.Tasks;

namespace projetGestionHopital_server.Models
{
    public class RendezVous
    {
        [BsonId]
        public ObjectId Id { get; set; }
        public DateTime DateRendezVous { get; set; }
        public ObjectId PatientId { get; set; }
        public ObjectId MedecinId { get; set; }
        public string Diagnostic { get; set; }
    }
}