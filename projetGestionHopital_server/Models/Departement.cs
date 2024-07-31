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
    public class Departement
    {
        [BsonId]
        public ObjectId IdDepartement { get; set; }
        public string Nom { get; set; }

        //Relation avec lits
        public virtual List<Lit> Lit { get; set; }


        //Relation avec Infirmier
        public virtual List<Infirmier> Infirmier { get; set; }

        //Relation avec Medecin
        public virtual List<Medecin> Medecin { get; set; }


    }
}