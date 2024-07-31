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
        public ObjectId IdInfirmier { get; set; }
        public string Prenom { get; set; }
        public string Nom { get; set; }

        public string Email { get; set; }

        public string Password { get; set; }
        public int premiereConnection { get; set; }

        public string Matricule { get; set; }
        public string Telephone { get; set; }
        public DateTime DateNaissance { get; set; }


        //Relation avec Adresse 
        public ObjectId IdAdresse { get; set; }
        public virtual Adresse Adresse { get; set; }

        // Relation avec Departement
    
        public ObjectId IdDepartement { get; set; }
        public virtual Departement Departement { get; set; }
    }
}