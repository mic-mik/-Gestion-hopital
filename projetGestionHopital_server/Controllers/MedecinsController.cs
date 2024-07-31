using projetGestionHopital_server.Models;
using MongoDB.Bson;
using MongoDB.Driver;
using System.Threading.Tasks;
using System.Web.Http;
using System;
using System.Linq;
using static projetGestionHopital_server.Controllers.InfirmiersController;
using System.Net.Mail;
using System.Net;

namespace projetGestionHopital_server.Controllers
{
    [RoutePrefix("api/medecins")]
    public class MedecinsController : ApiController
    {
        private readonly HopitauxDb _context;

        public MedecinsController()
        {
            _context = new HopitauxDb();
        }

        [HttpGet]
        [Route("")]
        public async Task<IHttpActionResult> Get()
        {
            var medecins = await _context.Medecins.Find(_ => true).ToListAsync();

            var medecinsWithDepartments = from medecin in medecins
                                          let department = _context.Departements.Find(d => d.IdDepartement == medecin.IdDepartement).FirstOrDefault()
                                          select new
                                          {
                                              medecin.IdMedecin,
                                              medecin.Prenom,
                                              medecin.Nom,
                                              medecin.Email,
                                              medecin.Telephone,
                                              medecin.DateNaissance,
                                              medecin.Matricule,
                                              medecin.IdAdresse,
                                              medecin.Adresse,
                                              DepartmentName = department != null ? department.Nom : "Unknown",
                                              medecin.IdDepartement
                                          };

            return Ok(medecinsWithDepartments);
        }

        [HttpGet]
        [Route("{id:length(24)}")]
        public async Task<IHttpActionResult> Get(string id)
        {
            var medecin = await _context.Medecins.Find(m => m.IdMedecin == new ObjectId(id)).FirstOrDefaultAsync();
            if (medecin == null) return NotFound();

            var department = await _context.Departements.Find(d => d.IdDepartement == medecin.IdDepartement).FirstOrDefaultAsync();
            var address = await _context.Adresses.Find(a => a.IdAdresse == medecin.IdAdresse).FirstOrDefaultAsync();
            var medecinWithDetails = new
            {
                medecin.IdMedecin,
                medecin.Prenom,
                medecin.Nom,
                medecin.Email,
                medecin.Telephone,
                medecin.DateNaissance,
                medecin.Matricule,
                DepartmentName = department != null ? department.Nom : "Unknown",
                Adresse = address != null ? new
                {
                    address.Rue,
                    address.Ville,
                    address.CodePostal,
                    address.Province,
                    address.Pays
                } : null
            };

            return Ok(medecinWithDetails);
        }

        public class CreateMedecinRequest
        {
            public Medecin Medecin { get; set; }
            public string IdDepartement { get; set; }
        }


        public string GenererMatricule(CreateMedecinRequest request)
        {
            string nomInitiale = request.Medecin.Nom.Substring(0, 1).ToUpper();
            string anneeNaissance = request.Medecin.DateNaissance.Year.ToString();
            string moisNaissance = request.Medecin.DateNaissance.Month.ToString("00");
            string jourNaissance = request.Medecin.DateNaissance.Day.ToString("00");
            string anneeActuelle = DateTime.Now.Year.ToString();

            // Extraire les derniers chiffres de la date de naissance
            char dernierChiffreAnneeNaissance = anneeNaissance[anneeNaissance.Length - 1];
            char dernierChiffreMoisNaissance = moisNaissance[moisNaissance.Length - 1];
            char dernierChiffreJourNaissance = jourNaissance[jourNaissance.Length - 1];

            // Extraire les deux derniers chiffres de l'année actuelle
            string deuxDerniersChiffresAnneeActuelle = anneeActuelle.Substring(anneeActuelle.Length - 2);

            // Combiner les parties pour former le matricule
            string matricule = $"MED{nomInitiale}{dernierChiffreAnneeNaissance}{dernierChiffreMoisNaissance}{dernierChiffreJourNaissance}{deuxDerniersChiffresAnneeActuelle}";

            return matricule;
        }

        [HttpPost]
        [Route("")]
        public async Task<IHttpActionResult> Create(CreateMedecinRequest request)
        {
            if (request == null || request.Medecin == null)
            {
                return BadRequest("Medecin data is null");
            }
            if (!ObjectId.TryParse(request.IdDepartement, out ObjectId departmentId))
            {
                return BadRequest("Invalid department ID format");
            }

            var department = await _context.Departements.Find(d => d.IdDepartement == departmentId).FirstOrDefaultAsync();
            if (department == null)
            {
                return BadRequest("Invalid department ID");
            }

            if (request.Medecin.Adresse == null)
            {
                return BadRequest("Address data is null");
            }

            // Insérer l'adresse et obtenir l'IdAdresse
            await _context.Adresses.InsertOneAsync(request.Medecin.Adresse);
            request.Medecin.IdAdresse = request.Medecin.Adresse.IdAdresse;

            // Générer un nouvel IdMedecin et définir l'IdDepartement
            request.Medecin.IdMedecin = ObjectId.GenerateNewId();
            request.Medecin.IdDepartement = departmentId;


            // Générer et assigner le matricule
            request.Medecin.Matricule = GenererMatricule(request);

            // Mot de passe défaut
            request.Medecin.Password = "ABC1234";

            // Première connexion
            request.Medecin.premiereConnection = 0;


            // Insérer le médecin
            await _context.Medecins.InsertOneAsync(request.Medecin);

            // Envoi d'email après insertion réussie
            bool emailSent = SendMail(request);
            if (emailSent)
            {
                // Email envoyé avec succès
                return Ok(new { Message = "Medecin ajouté avec succès et l'email a été envoyé.", Medecin = request.Medecin });
            }
            else
            {
                // L'email n'a pas pu être envoyé
                return Ok(new { Message = "Medecin ajouté avec succès, mais l'email n'a pas pu être envoyé.", Medecin = request.Medecin });
            }

            
        }


        private bool SendMail(CreateMedecinRequest request)
        {
            string email = request.Medecin.Email;
            string password = "ABC1234";

            string subject = "Bienvenue sur CLINIC-TECCART";
            string message = $"Bienvenue sur CLINIC-TECCART\n" +
                $"Voici les informations pour votre première connexion pour medecin :\nEmail : {email}\nMot de passe : {password}" +
                $"\nUtilisez ces informations pour vous connectez." +
                $"\nCordialement.";

            string sender = "LoicSagbo@teccart.online";
            string pw = "Tecc12123";

            try
            {
                SmtpClient smtpClient = new SmtpClient("smtp.office365.com", 587)
                {
                    Timeout = 3000,
                    EnableSsl = true,
                    DeliveryMethod = SmtpDeliveryMethod.Network,
                    UseDefaultCredentials = false,
                    Credentials = new NetworkCredential(sender, pw)
                };

                MailMessage mailMessage = new MailMessage(sender, email, subject, message)
                {
                    BodyEncoding = System.Text.Encoding.UTF8
                };

                smtpClient.Send(mailMessage);
                return true;
            }
            catch (Exception ex)
            {
                string msg = ex.Message;
                return false;
            }
        }


        public class UpdateMedecinRequest
        {
            public Medecin Medecin { get; set; }
            public string IdDepartement { get; set; }
        }

        [HttpPut]
        [Route("{id:length(24)}")]


        public async Task<IHttpActionResult> Update(string id, UpdateMedecinRequest request)
        {
            if (request == null || request.Medecin == null)
            {
                return BadRequest("Medecin data is null");
            }

            Console.WriteLine($"Updating medecin with ID: {id}");

            if (!ObjectId.TryParse(request.IdDepartement, out ObjectId departmentId))
            {
                return BadRequest("Invalid department ID format");
            }

            var department = await _context.Departements.Find(d => d.IdDepartement == departmentId).FirstOrDefaultAsync();
            if (department == null)
            {
                return BadRequest("Invalid department ID");
            }

            var existingMedecin = await _context.Medecins.Find(m => m.IdMedecin == new ObjectId(id)).FirstOrDefaultAsync();
            if (existingMedecin == null)
            {
                return NotFound();
            }

            // Conserver l'ID existant et mettre à jour les autres champs
            request.Medecin.IdMedecin = existingMedecin.IdMedecin;
            request.Medecin.IdDepartement = departmentId;

            // Mettre à jour l'adresse
            if (request.Medecin.Adresse != null)
            {
                request.Medecin.Adresse.IdAdresse = existingMedecin.IdAdresse;
                var resultAddress = await _context.Adresses.ReplaceOneAsync(
                    a => a.IdAdresse == existingMedecin.IdAdresse,
                    request.Medecin.Adresse
                );

                if (!resultAddress.IsAcknowledged)
                {
                    return BadRequest("Failed to update address");
                }
            }

            var result = await _context.Medecins.ReplaceOneAsync(m => m.IdMedecin == new ObjectId(id), request.Medecin);
            if (result.IsAcknowledged && result.ModifiedCount > 0)
            {
                return Ok(request.Medecin);
            }

            return NotFound();
        }


        [HttpDelete]
        [Route("{id:length(24)}")]
        public async Task<IHttpActionResult> Delete(string id)
        {
            var result = await _context.Medecins.DeleteOneAsync(m => m.IdMedecin == new ObjectId(id));
            if (result.IsAcknowledged && result.DeletedCount > 0) return Ok();
            return NotFound();
        }
    }
}
