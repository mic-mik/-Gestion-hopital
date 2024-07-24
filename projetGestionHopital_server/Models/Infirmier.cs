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
    public class Infirmier
    {
        [BsonId]
        public ObjectId Id { get; set; }
        public string Prenom { get; set; }
        public string Nom { get; set; }
        public string Departement { get; set; }

        //Relation avec Adresse 
        public ObjectId IdAdresse { get; set; }
        public virtual Adresse Adresse { get; set; }
    }
}