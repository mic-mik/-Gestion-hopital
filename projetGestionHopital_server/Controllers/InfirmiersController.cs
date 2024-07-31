using projetGestionHopital_server.Models;
using MongoDB.Bson;
using MongoDB.Driver;
using System.Threading.Tasks;
using System.Web.Http;
using System;
using System.Linq;
using System.Net.Mail;
using System.Net;

namespace projetGestionHopital_server.Controllers
{
    [RoutePrefix("api/infirmiers")]
    public class InfirmiersController : ApiController
    {
        private readonly HopitauxDb _context;

        public InfirmiersController()
        {
            _context = new HopitauxDb();
        }

        [HttpGet]
        [Route("")]
        public async Task<IHttpActionResult> Get()
        {
            var infirmiers = await _context.Infirmiers.Find(_ => true).ToListAsync();

            var infirmiersWithDepartments = from infirmier in infirmiers
                                            let department = _context.Departements.Find(d => d.IdDepartement == infirmier.IdDepartement).FirstOrDefault()
                                            select new
                                            {
                                                infirmier.IdInfirmier,
                                                infirmier.Prenom,
                                                infirmier.Nom,
                                                infirmier.Email,
                                                infirmier.Telephone,
                                                infirmier.DateNaissance,
                                                infirmier.Matricule,
                                                infirmier.IdAdresse,
                                                infirmier.Adresse,
                                                DepartmentName = department != null ? department.Nom : "Unknown",
                                                infirmier.IdDepartement
                                            };

            return Ok(infirmiersWithDepartments);
        }

        [HttpGet]
        [Route("{id:length(24)}")]
     
        public async Task<IHttpActionResult> Get(string id)
        {
            var infirmier = await _context.Infirmiers.Find(i => i.IdInfirmier == new ObjectId(id)).FirstOrDefaultAsync();
            if (infirmier == null) return NotFound();

            var department = await _context.Departements.Find(d => d.IdDepartement == infirmier.IdDepartement).FirstOrDefaultAsync();
            var address = await _context.Adresses.Find(a => a.IdAdresse == infirmier.IdAdresse).FirstOrDefaultAsync();
            var infirmierWithDetails = new
            {
                infirmier.IdInfirmier,
                infirmier.Prenom,
                infirmier.Nom,
                infirmier.Email,
                infirmier.Telephone,
                infirmier.DateNaissance,
                infirmier.Matricule,
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

            return Ok(infirmierWithDetails);
        }


        public class CreateInfirmierRequest
        {
            public Infirmier Infirmier { get; set; }
            public string IdDepartement { get; set; }
        }


        public string GenererMatricule(CreateInfirmierRequest request)
        {
            string nomInitiale = request.Infirmier.Nom.Substring(0, 1).ToUpper();
            string anneeNaissance = request.Infirmier.DateNaissance.Year.ToString();
            string moisNaissance = request.Infirmier.DateNaissance.Month.ToString("00");
            string jourNaissance = request.Infirmier.DateNaissance.Day.ToString("00");
            string anneeActuelle = DateTime.Now.Year.ToString();

            // Extraire les derniers chiffres de la date de naissance
            char dernierChiffreAnneeNaissance = anneeNaissance[anneeNaissance.Length - 1];
            char dernierChiffreMoisNaissance = moisNaissance[moisNaissance.Length - 1];
            char dernierChiffreJourNaissance = jourNaissance[jourNaissance.Length - 1];

            // Extraire les deux derniers chiffres de l'année actuelle
            string deuxDerniersChiffresAnneeActuelle = anneeActuelle.Substring(anneeActuelle.Length - 2);

            // Combiner les parties pour former le matricule
            string matricule = $"IMF{nomInitiale}{dernierChiffreAnneeNaissance}{dernierChiffreMoisNaissance}{dernierChiffreJourNaissance}{deuxDerniersChiffresAnneeActuelle}";

            return matricule;
        }


        [HttpPost]
        [Route("")]
        public async Task<IHttpActionResult> Create(CreateInfirmierRequest request)
        {
            if (request == null || request.Infirmier == null)
            {
                return BadRequest("Infirmier data is null");
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

            if (request.Infirmier.Adresse == null)
            {
                return BadRequest("Address data is null");
            }

            // Insérer l'adresse et obtenir l'IdAdresse
            await _context.Adresses.InsertOneAsync(request.Infirmier.Adresse);
            request.Infirmier.IdAdresse = request.Infirmier.Adresse.IdAdresse;

            // Générer un nouvel IdInfirmier et définir l'IdDepartement
            request.Infirmier.IdInfirmier = ObjectId.GenerateNewId();
            request.Infirmier.IdDepartement = departmentId;

            // Générer et assigner le matricule
            request.Infirmier.Matricule = GenererMatricule(request);

            // Mot de passe défaut
            request.Infirmier.Password = "ABC1234";

            // Première connexion
            request.Infirmier.premiereConnection = 0;

            // Insérer l'infirmier
            await _context.Infirmiers.InsertOneAsync(request.Infirmier);

            // Envoi d'email après insertion réussie
            bool emailSent = SendMail(request);
            if (emailSent)
            {
                // Email envoyé avec succès
                return Ok(new { Message = "Infirmier ajouté avec succès et l'email a été envoyé.", Infirmier = request.Infirmier });
            }
            else
            {
                // L'email n'a pas pu être envoyé
                return Ok(new { Message = "Infirmier ajouté avec succès, mais l'email n'a pas pu être envoyé.", Infirmier = request.Infirmier });
            }
        }

        private bool SendMail(CreateInfirmierRequest request)
        {
            string email = request.Infirmier.Email;
            string password = "ABC1234";

            string subject = "Bienvenue sur CLINIC-TECCART";
            string message = $"Bienvenue sur CLINIC-TECCART\n" +
                $"Voici les informations pour votre première connexion pour infirmier:\nEmail : {email}\nMot de passe : {password}" +
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




        public class UpdateInfirmierRequest
        {
            public Infirmier Infirmier { get; set; }
            public string IdDepartement { get; set; }
        }

        [HttpPut]
        [Route("{id:length(24)}")]
        public async Task<IHttpActionResult> Update(string id, UpdateInfirmierRequest request)
        {
            if (request == null || request.Infirmier == null)
            {
                return BadRequest("Infirmier data is null");
            }

            Console.WriteLine($"Updating infirmier with ID: {id}");

            if (!ObjectId.TryParse(request.IdDepartement, out ObjectId departmentId))
            {
                return BadRequest("Invalid department ID format");
            }

            var department = await _context.Departements.Find(d => d.IdDepartement == departmentId).FirstOrDefaultAsync();
            if (department == null)
            {
                return BadRequest("Invalid department ID");
            }

            var existingInfirmier = await _context.Infirmiers.Find(i => i.IdInfirmier == new ObjectId(id)).FirstOrDefaultAsync();
            if (existingInfirmier == null)
            {
                return NotFound();
            }

            // Conserver l'ID existant et mettre à jour les autres champs
            request.Infirmier.IdInfirmier = existingInfirmier.IdInfirmier;
            request.Infirmier.IdDepartement = departmentId;

            // Mettre à jour l'adresse
            if (request.Infirmier.Adresse != null)
            {
                request.Infirmier.Adresse.IdAdresse = existingInfirmier.IdAdresse;
                var resultAddress = await _context.Adresses.ReplaceOneAsync(
                    a => a.IdAdresse == existingInfirmier.IdAdresse,
                    request.Infirmier.Adresse
                );

                if (!resultAddress.IsAcknowledged)
                {
                    return BadRequest("Failed to update address");
                }
            }

            var result = await _context.Infirmiers.ReplaceOneAsync(i => i.IdInfirmier == new ObjectId(id), request.Infirmier);
            if (result.IsAcknowledged && result.ModifiedCount > 0)
            {
                return Ok(request.Infirmier);
            }

            return NotFound();
        }

        [HttpDelete]
        [Route("{id:length(24)}")]
        public async Task<IHttpActionResult> Delete(string id)
        {
            var result = await _context.Infirmiers.DeleteOneAsync(i => i.IdInfirmier == new ObjectId(id));
            if (result.IsAcknowledged && result.DeletedCount > 0) return Ok();
            return NotFound();
        }

        public class ConnexionRequest
        {
            public string Matricule { get; set; }
            public string Password { get; set; }
        }


        [HttpPost]
        [Route("connexion")]
        public async Task<IHttpActionResult> Connexion(ConnexionRequest request)
        {
            if (request == null || string.IsNullOrEmpty(request.Matricule) || string.IsNullOrEmpty(request.Password))
            {
                return BadRequest("Matricule ou password est vide");
            }

            var infirmier = await _context.Infirmiers.Find(i => i.Matricule == request.Matricule && i.Password == request.Password).FirstOrDefaultAsync();
       

            if (infirmier == null)
            {
                return Unauthorized();
            }
            int premiereConnection = infirmier.premiereConnection;

            if (premiereConnection == 0)
            {                           
                return Ok(new {  RedirectUrl = "/PremiereConnexion", Infirmier = infirmier });
            }
            else
            {
                return Ok(new { RedirectUrl = "/Accueil", Infirmier = infirmier });
            }


        }

        public class UpdatePasswordRequest
        {
            public string Matricule { get; set; }
            public string NewPassword { get; set; }
        }

        [HttpPut]
        [Route("update-password")]
        public async Task<IHttpActionResult> UpdatePassword(UpdatePasswordRequest request)
        {
            if (request == null || string.IsNullOrEmpty(request.Matricule) || string.IsNullOrEmpty(request.NewPassword))
            {
                return BadRequest("Matricule ou nouveau mot de passe est vide");
            }

            var infirmier = await _context.Infirmiers.Find(i => i.Matricule == request.Matricule).FirstOrDefaultAsync();
            if (infirmier == null)
            {
                return NotFound();
            }
            infirmier.premiereConnection = 1;
            infirmier.Password = request.NewPassword;
            await _context.Infirmiers.ReplaceOneAsync(i => i.IdInfirmier == infirmier.IdInfirmier, infirmier);

            return Ok(new { RedirectUrl = "/Connexion", Infirmier = infirmier });
        }




    }
}
