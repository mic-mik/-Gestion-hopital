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
        public ObjectId IdLit { get; set; }
        public string NumeroLit { get; set; }
        public bool EstOccupe { get; set; }
        public string Chambre { get; set; }

        //Relation avec Departement   
        public ObjectId IdDepartement { get; set; }
        public virtual Departement Departement { get; set; }

    }
}