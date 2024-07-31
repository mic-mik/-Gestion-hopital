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
    public class Patient
    {
        [BsonId]
        public ObjectId Id { get; set; }
        public string Prenom { get; set; }
        public string Nom { get; set; }
        public string Telephone { get; set; }
        public string Email { get; set; }
        public string NumAssurMaladie { get; set; }
        public DateTime DateNaissance { get; set; }

        //Relation avec Adresse 
        public ObjectId IdAdresse { get; set; }
        public virtual Adresse Adresse { get; set; }

    }
}