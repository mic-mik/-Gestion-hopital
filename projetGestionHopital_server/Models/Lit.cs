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
    public class Lit
    {
        [BsonId]
        public ObjectId Id { get; set; }
        public string NumeroLit { get; set; }
        public bool EstOccupe { get; set; }
        public ObjectId PatientId { get; set; }
    }
}