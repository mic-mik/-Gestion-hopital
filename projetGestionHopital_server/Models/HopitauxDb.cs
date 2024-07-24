using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MongoDB.Driver;

using System.Threading.Tasks;

namespace projetGestionHopital_server.Models
{
    public class HopitauxDb 
    {
        private readonly IMongoDatabase _database;

        public HopitauxDb()
        {
            var client = new MongoClient("mongodb+srv://Loic:1234@hopitauxdb.bpzy1km.mongodb.net/");
            _database = client.GetDatabase("hopitauxDb");
        }

        public IMongoCollection<Patient> Patients => _database.GetCollection<Patient>("Patients");
        public IMongoCollection<Medecin> Medecins => _database.GetCollection<Medecin>("Medecins");
        public IMongoCollection<RendezVous> RendezVous => _database.GetCollection<RendezVous>("RendezVous");
        public IMongoCollection<Infirmier> Infirmiers => _database.GetCollection<Infirmier>("Infirmiers");
        public IMongoCollection<Personnel> Personnels => _database.GetCollection<Personnel>("Personnels");
        public IMongoCollection<Lit> Lits => _database.GetCollection<Lit>("Lits");
        public IMongoCollection<Departement> Departements => _database.GetCollection<Departement>("Departements");
        public IMongoCollection<Adresse> Adresses => _database.GetCollection<Adresse>("Adresses");
    }

}