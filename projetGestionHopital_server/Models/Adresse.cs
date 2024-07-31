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
    public class Adresse
    {

        [BsonId]
        public ObjectId IdAdresse { get; set; }

        [BsonElement("rue")]
        public string Rue { get; set; }

        [BsonElement("ville")]
        public string Ville { get; set; }

        [BsonElement("codePostal")]
        public string CodePostal { get; set; }

        [BsonElement("pays")]
        public string Pays { get; set; }

        [BsonElement("province")]
        public string Province { get; set; }

        // Relation avec patient
        public virtual List<Patient> Patient { get; set; }

        // Relation avec Infirmier
        public virtual List<Infirmier> Infirmier { get; set; }      

        // Relation avec Medecin
        public virtual List<Medecin> Medecin { get; set; }



    }
}