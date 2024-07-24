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
    public class Medecin
    {
        [BsonId]
        public ObjectId Id { get; set; }
        public string Prenom { get; set; }
        public string Nom { get; set; }
        public string Specialite { get; set; }
        public List<ObjectId> RendezVousIds { get; set; }
    }
}