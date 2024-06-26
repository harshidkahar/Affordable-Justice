﻿using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Starterkit.Model;
using Starterkit.Models;
using Starterkit.Models.Company;
using Starterkit.Web.Logic;
using Starterkit.Web.Logic.Base;
using System.Xml.Linq;

namespace Starterkit.Controllers
{
	public class CompanyController : Controller
	{
        private readonly ILogger<CompanyController> _logger;
        private readonly IKTTheme _theme;
        private readonly IWebHostEnvironment _env;
        private readonly IHttpContextAccessor _contextAccessor;

        public CompanyController(ILogger<CompanyController> logger, IKTTheme theme, IWebHostEnvironment env, IHttpContextAccessor contextAccessor)
        {
            _logger = logger;
            _theme = theme;
            _env = env;
            _contextAccessor = contextAccessor;
        }
       
        [HttpGet("/createCompany")]
		public IActionResult createCompany()
		{
            try
            {
                _contextAccessor.HttpContext.Session.SetString("CompId", "");
            }
            catch { }
            try
            {
                if (!String.IsNullOrEmpty(HttpContext.Request.Query["CompId"]))
                {
                    _contextAccessor.HttpContext.Session.SetString("CompId", HttpContext.Request.Query["CompId"].ToString());
                }
            }
            catch { _contextAccessor.HttpContext.Session.SetString("CompId", ""); }

           

             return View("Views/Pages/Company/createCompany.cshtml");
		}
        [HttpGet("/companyOverview")]
        public IActionResult CompanyOverview()
        {
            try
            {
                _contextAccessor.HttpContext.Session.SetString("CompId", "");
            }
            catch { }
            try
            {
                if (!String.IsNullOrEmpty(HttpContext.Request.Query["CompId"]))
                {
                    _contextAccessor.HttpContext.Session.SetString("CompId", HttpContext.Request.Query["CompId"].ToString());
                }
            }
            catch { _contextAccessor.HttpContext.Session.SetString("CompId", ""); }



            return View("Views/Pages/Company/companyOverview.cshtml");
        }

        [HttpGet("/updateCompany")]
        public IActionResult updateCompany()
        {
            try
            {
                _contextAccessor.HttpContext.Session.SetString("CompId", "");
            }
            catch { }
            try
            {
                if (!String.IsNullOrEmpty(HttpContext.Request.Query["CompId"]))
                {
                    _contextAccessor.HttpContext.Session.SetString("CompId", HttpContext.Request.Query["CompId"].ToString());
                }
            }
            catch { _contextAccessor.HttpContext.Session.SetString("CompId", ""); }



            return View("Views/Pages/Company/createCompany.cshtml");
        }

        [HttpGet("/companyList")]
        public IActionResult CompanyList()
        {
            return View("Views/Pages/Company/CompanyList.cshtml");
        }
     
        [HttpGet]
        public JsonResult GetCompanyList()
        {
            try
            {
                CompanyLogic _companyLogic = new CompanyLogic();
                int userId = Convert.ToInt32(_contextAccessor.HttpContext.Session.GetString("Id")); // Replace with actual logic to fetch user ID
                var companyList = _companyLogic.GetCompanyList(userId);
                var result = new { success = true, companyList };
                return Json(result);
            }
            catch (Exception ex)
            {
                var errorResult = new { success = false, message = "Failed to retrieve company list." };
                return Json(errorResult);
            }
        }

        [AllowAnonymous]
        [HttpPost]
        public JsonResult InsertCompany([FromBody] companyInsertModel insertcompany)
        {
            try
            {
                string ErrorMessage = string.Empty;
                string _Result = string.Empty;
                CompanyLogic companyLogic = (CompanyLogic)LogicFactory.GetLogic(LogicType.Company);
                CreateCompanyModel Company = new CreateCompanyModel();


                Company.UserId = Convert.ToInt32(_contextAccessor.HttpContext.Session.GetString("Id"));
                Company.ApplicationType=insertcompany.ApplicationType?.Trim();
                Company.CompanyType=insertcompany.CompanyType?.Trim();
                Company.BusinessCity=insertcompany.City?.Trim();
                Company.BusinessLocation=insertcompany.Location?.Trim();
                
                
                Company.Opt = "I";
                _Result = companyLogic.CreateCompany(Company);
				_contextAccessor.HttpContext.Session.SetString("CompId", _Result);
				return Json(_Result);
            }
            catch
            {
                return Json("error");
            }
        }

        [AllowAnonymous]
		[HttpGet]
		public JsonResult GetCompanyId()
		{
			try
			{				
				string _Result = "0";
				
				_Result = _contextAccessor.HttpContext.Session.GetString("CompId");

				return Json(_Result);
			}
			catch
			{
				return Json("error");
			}
		}

        [HttpGet]
        public JsonResult GetCompanyOverview()
        {
            try
            {
                CompanyLogic _companyLogic = new CompanyLogic();
                int userId = Convert.ToInt32(_contextAccessor.HttpContext.Session.GetString("Id"));
                int CompId = Convert.ToInt32(_contextAccessor.HttpContext.Session.GetString("CompId"));
                var companyOverview = _companyLogic.GetCompanyDetails(CompId);
                var result = new { success = true, companyOverview };
                return Json(result);
            }
            catch (Exception ex)
            {
                var errorResult = new { success = false, message = "Failed to retrieve company overview." };
                return Json(errorResult);
            }
        }

        [HttpPut]
        public JsonResult ChangeStatus()
        {
            try
            {
                CompanyLogic _companyLogic = new CompanyLogic();
                int Id = Convert.ToInt32(_contextAccessor.HttpContext.Session.GetString("CompId"));
                int Status = 1;
                var companyOverview = _companyLogic.ChangeStatus(Id,Status);
                var result = new { success = true, companyOverview };
                return Json(result);
            }
            catch (Exception ex)
            {
                var errorResult = new { success = false, message = "Failed to retrieve company overview." };
                return Json(errorResult);
            }
        } 


        [HttpGet]
        public JsonResult GetCompanyDetail()
        {
            try
            {
                CompanyLogic _companyLogic = new CompanyLogic();
                int userId = Convert.ToInt32(_contextAccessor.HttpContext.Session.GetString("Id")); 
                int CompId = Convert.ToInt32(_contextAccessor.HttpContext.Session.GetString("CompId")); 
                var companyDetail = _companyLogic.CompanyDetail(userId, CompId);
                var companyOverview = _companyLogic.GetCompanyDetails(CompId);
                var result = new { success = true, companyDetail };
                return Json(result);
            }
            catch (Exception ex)
            {
                var errorResult = new { success = false, message = "Failed to retrieve company detail." };
                return Json(errorResult);
            }
        }

        //Update Starts From Here

        [AllowAnonymous]
        [HttpPut]
        public JsonResult UpdateParameter1Company([FromBody] companyInputParameterForm1Model editCompany)
        {
            try
            {
                string ErrorMessage = string.Empty;
                string _Result = string.Empty;
                CompanyLogic companyLogic = (CompanyLogic)LogicFactory.GetLogic(LogicType.Company);
                CreateCompanyModel updateCompany = new CreateCompanyModel();

             
                updateCompany.Id = Convert.ToInt32(_contextAccessor.HttpContext.Session.GetString("CompId"));
                //int userId = Convert.ToInt32(_contextAccessor.HttpContext.Session.GetString("Id"));
                updateCompany.ApplicationType = editCompany.ApplicationType?.Trim();
                updateCompany.Opt = "A";
                
                _Result = companyLogic.EditCompany(updateCompany);

                return Json(_Result);
            }
            catch
            {
                return Json("error");
            }
        }

        [AllowAnonymous]
        [HttpPut]
        public JsonResult UpdateParameter2Company([FromBody] companyInputParameterForm2Model editCompany)
        {
            try
            {
                string ErrorMessage = string.Empty;
                string _Result = string.Empty;
                CompanyLogic companyLogic = (CompanyLogic)LogicFactory.GetLogic(LogicType.Company);
                CreateCompanyModel updateCompany = new CreateCompanyModel();


                updateCompany.Id = Convert.ToInt32(_contextAccessor.HttpContext.Session.GetString("CompId"));
                //int userId = Convert.ToInt32(_contextAccessor.HttpContext.Session.GetString("Id"));
                updateCompany.CompanyType = editCompany.CompanyType?.Trim();
                updateCompany.Opt = "B";

                _Result = companyLogic.EditCompany(updateCompany);

                return Json(_Result);
            }
            catch
            {
                return Json("error");
            }
        }

        [AllowAnonymous]
        [HttpPut]
        public JsonResult UpdateParameter3Company([FromBody] companyInputParameterForm3Model editCompany)
        {
            try
            {
                string ErrorMessage = string.Empty;
                string _Result = string.Empty;
                CompanyLogic companyLogic = (CompanyLogic)LogicFactory.GetLogic(LogicType.Company);
                CreateCompanyModel updateCompany = new CreateCompanyModel();


                updateCompany.Id = Convert.ToInt32(_contextAccessor.HttpContext.Session.GetString("CompId"));
                //int userId = Convert.ToInt32(_contextAccessor.HttpContext.Session.GetString("Id"));
                updateCompany.BusinessCity = editCompany.City?.Trim();
                updateCompany.BusinessLocation = editCompany.Location?.Trim();
                updateCompany.Opt = "C";

                _Result = companyLogic.EditCompany(updateCompany);

                return Json(_Result);
            }
            catch
            {
                return Json("error");
            }
        }

        [AllowAnonymous]
        [HttpPut]
        public JsonResult UpdateParameter4Company([FromBody] companyInputParameterForm4Model editCompany)
        {
            try
            {
                string ErrorMessage = string.Empty;
                string _Result = string.Empty;
                CompanyLogic companyLogic = (CompanyLogic)LogicFactory.GetLogic(LogicType.Company);
                CreateCompanyModel updateCompany = new CreateCompanyModel();


                updateCompany.Id = Convert.ToInt32(_contextAccessor.HttpContext.Session.GetString("CompId"));
                //int userId = Convert.ToInt32(_contextAccessor.HttpContext.Session.GetString("Id"));
                updateCompany.BusinessCategory = editCompany.BusinessCategory?.Trim();
                updateCompany.Opt = "D";

                _Result = companyLogic.EditCompany(updateCompany);

                return Json(_Result);
            }
            catch
            {
                return Json("error");
            }
        }

        [AllowAnonymous]
        [HttpPut]
        public JsonResult UpdateParameter5Company([FromBody] companyInputParameterForm5Model editCompany)
        {
            try
            {
                string ErrorMessage = string.Empty;
                string _Result = string.Empty;
                CompanyLogic companyLogic = (CompanyLogic)LogicFactory.GetLogic(LogicType.Company);
                CreateCompanyModel updateCompany = new CreateCompanyModel();


                updateCompany.Id = Convert.ToInt32(_contextAccessor.HttpContext.Session.GetString("CompId"));
                //int userId = Convert.ToInt32(_contextAccessor.HttpContext.Session.GetString("Id"));
                updateCompany.NoOfResidentVisa = editCompany.visaresidence;
                updateCompany.Opt = "E";

                _Result = companyLogic.EditCompany(updateCompany);

                return Json(_Result);
            }
            catch
            {
                return Json("error");
            }
        }

        [AllowAnonymous]
        [HttpPut]
        public JsonResult UpdateParameter6Company([FromBody] companyInputParameterForm6Model editCompany)
        {
            try
            {
                string ErrorMessage = string.Empty;
                string _Result = string.Empty;
                CompanyLogic companyLogic = (CompanyLogic)LogicFactory.GetLogic(LogicType.Company);
                CreateCompanyModel updateCompany = new CreateCompanyModel();


                updateCompany.Id = Convert.ToInt32(_contextAccessor.HttpContext.Session.GetString("CompId"));
                //int userId = Convert.ToInt32(_contextAccessor.HttpContext.Session.GetString("Id"));
                updateCompany.DependentVisaReq = editCompany.Depvisa;
                updateCompany.Opt = "F";

                _Result = companyLogic.EditCompany(updateCompany);

                return Json(_Result);
            }
            catch
            {
                return Json("error");
            }
        }

        [AllowAnonymous]
        [HttpPut]
        public JsonResult UpdateParameter7Company([FromBody] companyInputParameterForm7Model editCompany)
        {
            try
            {
                string ErrorMessage = string.Empty;
                string _Result = string.Empty;
                CompanyLogic companyLogic = (CompanyLogic)LogicFactory.GetLogic(LogicType.Company);
                CreateCompanyModel updateCompany = new CreateCompanyModel();


                updateCompany.Id = Convert.ToInt32(_contextAccessor.HttpContext.Session.GetString("CompId"));
                //int userId = Convert.ToInt32(_contextAccessor.HttpContext.Session.GetString("Id"));
                updateCompany.OfficeType = editCompany.officetype;
                updateCompany.YourOfficeType = editCompany.yourofficetype;
                updateCompany.Opt = "G";

                _Result = companyLogic.EditCompany(updateCompany);

                return Json(_Result);
            }
            catch
            {
                return Json("error");
            }
        }

        [AllowAnonymous]
        [HttpPut]
        public JsonResult UpdateParameter8Company([FromBody] companyInputParameterForm8Model editCompany)
        {
            try
            {
                string ErrorMessage = string.Empty;
                string _Result = string.Empty;
                CompanyLogic companyLogic = (CompanyLogic)LogicFactory.GetLogic(LogicType.Company);
                CreateCompanyModel updateCompany = new CreateCompanyModel();


                updateCompany.Id = Convert.ToInt32(_contextAccessor.HttpContext.Session.GetString("CompId"));
                //int userId = Convert.ToInt32(_contextAccessor.HttpContext.Session.GetString("Id"));
                updateCompany.StartBusiness = editCompany.businessPlan?.Trim();
                updateCompany.Opt = "H";

                _Result = companyLogic.EditCompany(updateCompany);

                return Json(_Result);
            }
            catch
            {
                return Json("error");
            }
        }

        [AllowAnonymous]
        [HttpPut]
        public JsonResult UpdateParameter9Company([FromBody] companyInputParameterForm9Model editCompany)
        {
            try
            {
                string ErrorMessage = string.Empty;
                string _Result = string.Empty;
                CompanyLogic companyLogic = (CompanyLogic)LogicFactory.GetLogic(LogicType.Company);
                CreateCompanyModel updateCompany = new CreateCompanyModel();


                updateCompany.Id = Convert.ToInt32(_contextAccessor.HttpContext.Session.GetString("CompId"));
                //int userId = Convert.ToInt32(_contextAccessor.HttpContext.Session.GetString("Id"));
                updateCompany.HasBusinessName = editCompany.businessname;
                updateCompany.BusinessNameOption = editCompany.concatenatedNames?.Trim();
                updateCompany.Opt = "J";

                _Result = companyLogic.EditCompany(updateCompany);

                return Json(_Result);
            }
            catch
            {
                return Json("error");
            }
        }

        [AllowAnonymous]
        [HttpPut]
        public JsonResult UpdateParameter10Company([FromBody] companyInputParameterForm10Model editCompany)
        {
            try
            {
                string ErrorMessage = string.Empty;
                string _Result = string.Empty;
                CompanyLogic companyLogic = (CompanyLogic)LogicFactory.GetLogic(LogicType.Company);
                CreateCompanyModel updateCompany = new CreateCompanyModel();


                updateCompany.Id = Convert.ToInt32(_contextAccessor.HttpContext.Session.GetString("CompId"));
                //int userId = Convert.ToInt32(_contextAccessor.HttpContext.Session.GetString("Id"));
                updateCompany.NeedAssistanceOn = editCompany.service?.Trim();
                updateCompany.Opt = "K";

                _Result = companyLogic.EditCompany(updateCompany);

                return Json(_Result);
            }
            catch
            {
                return Json("error");
            }
        }

        [AllowAnonymous]
        [HttpPut]
        public JsonResult UpdateParameter11Company([FromBody] companyInputParameterForm11Model editCompany)
        {
            try
            {
                string ErrorMessage = string.Empty;
                string _Result = string.Empty;
                CompanyLogic companyLogic = (CompanyLogic)LogicFactory.GetLogic(LogicType.Company);
                CreateCompanyModel updateCompany = new CreateCompanyModel();


                updateCompany.Id = Convert.ToInt32(_contextAccessor.HttpContext.Session.GetString("CompId"));
                //int userId = Convert.ToInt32(_contextAccessor.HttpContext.Session.GetString("Id"));
                updateCompany.FirstName = editCompany.firstname?.Trim();
                updateCompany.LastName = editCompany.lastname?.Trim();
                updateCompany.EmailId = editCompany.emailId?.Trim();
                updateCompany.CountryCode = editCompany.countryCode?.Trim();
                updateCompany.Phone = editCompany.phone?.Trim();
                updateCompany.CAddress = editCompany.CurrentAddress?.Trim();
                updateCompany.RAddress = editCompany.ResidenceAddress?.Trim();
                updateCompany.Country = editCompany.country?.Trim();
                updateCompany.Nationality = editCompany.nationality?.Trim();
                updateCompany.Opt = "L";



                _Result = companyLogic.EditCompany(updateCompany);

                return Json(_Result);
            }
            catch
            {
                return Json("error");
            }
        }

       
        [HttpGet]
        public JsonResult DependentList()
        {
            try
            {
                CompanyLogic _companyLogic = new CompanyLogic();
                int compId = Convert.ToInt32(_contextAccessor.HttpContext.Session.GetString("CompId")); // Replace with actual logic to fetch user ID
                var dependentList = _companyLogic.GetDependentList(compId);
                var result = new { success = true, dependentList };
                return Json(result);
            }
            catch (Exception ex)
            {
                var errorResult = new { success = false, message = "Failed to retrieve patner list." };
                return Json(errorResult);
            }
        }

        [AllowAnonymous]
        [HttpPost]
        public JsonResult AddDependent([FromBody] DependentModel insertDependent)
        {           
            try
            {
                string ErrorMessage = string.Empty;
                string _Result = string.Empty;
                CompanyLogic companyLogic = (CompanyLogic)LogicFactory.GetLogic(LogicType.Company);
                InsertDependentModel addDependent = new InsertDependentModel();
                //addDependent.UserId= Convert.ToInt32(_contextAccessor.HttpContext.Session.GetString("Id"));
                addDependent.CompKey = Convert.ToInt32(_contextAccessor.HttpContext.Session.GetString("CompId"));
                addDependent.dependvisaName= insertDependent.dependvisaName?.Trim();
                addDependent.dependvisaEmail= insertDependent.dependvisaEmail?.Trim();
                addDependent.dependvisaDOB= insertDependent.dependvisaDOB;
                addDependent.dependvisaPasspno = insertDependent.dependvisaPasspno?.Trim();
                addDependent.dependvisaAddress= insertDependent.dependvisaAddress?.Trim();
                addDependent.dependvisacountry= insertDependent.dependvisacountry?.Trim();
                addDependent.dependvisanationality= insertDependent.dependvisanationality?.Trim();

                
                addDependent.Opt = "I";
                _Result = companyLogic.InsertDependent(addDependent);
                
                return Json(_Result);
            }
            catch
            {
                return Json("error");
            }
        }

        [HttpGet]
        public JsonResult GetDependentDetail(DependentRequestModel model)
        {
            try
            {
                CompanyLogic _companyLogic = new CompanyLogic();
                //int depId = Convert.ToInt32(_contextAccessor.HttpContext.Session.GetString("DepId")); // Replace with actual logic to fetch user ID
                //int CompId = Convert.ToInt32(_contextAccessor.HttpContext.Session.GetString("CompId")); // Replace with actual logic to fetch user ID
                var dependentDetail = _companyLogic.DependentDetail(model.DependentKey);

                var result = new { success = true, dependentDetail };
                return Json(result);
            }
            catch (Exception ex)
            {
                var errorResult = new { success = false, message = "Failed to retrieve dependent detail." };
                return Json(errorResult);
            }
        }

        [AllowAnonymous]
        [HttpPut]
        public JsonResult UpdateDependent([FromBody] DependentModel model)
        {
            try
            {
                string ErrorMessage = string.Empty;
                string _Result = string.Empty;
                CompanyLogic companyLogic = (CompanyLogic)LogicFactory.GetLogic(LogicType.Company);
                InsertDependentModel Dependent = new InsertDependentModel();
                Dependent.Id= model.Id;
                Dependent.CompKey = Convert.ToInt32(_contextAccessor.HttpContext.Session.GetString("CompId"));
                Dependent.dependvisaName = model.dependvisaName?.Trim();
                Dependent.dependvisaEmail = model.dependvisaEmail?.Trim();
                Dependent.dependvisaPasspno = model.dependvisaPasspno?.Trim();
                Dependent.dependvisaDOB = model.dependvisaDOB;
                Dependent.dependvisaAddress = model.dependvisaAddress?.Trim();
                Dependent.dependvisacountry = model.dependvisacountry?.Trim();
                Dependent.dependvisanationality = model.dependvisanationality?.Trim();


                Dependent.Opt = "U";
                _Result = companyLogic.UpdateDependent(Dependent);

                return Json(_Result);
            }
            catch
            {
                return Json("error");
            }
        }

        [HttpDelete]
        public JsonResult DeleteDependent([FromBody] DependentModel model)
        {
            try
            {
                CompanyLogic _companyLogic = new CompanyLogic();
                InsertDependentModel Dependent = new InsertDependentModel();
                Dependent.Id = model.Id;
                Dependent.Opt = "D";
                //int depId = Convert.ToInt32(_contextAccessor.HttpContext.Session.GetString("DepId")); // Replace with actual logic to fetch user ID
                //int CompId = Convert.ToInt32(_contextAccessor.HttpContext.Session.GetString("CompId")); // Replace with actual logic to fetch user ID
                var dependentDetail = _companyLogic.DeleteDependent(Dependent);

                var result = new { success = true, dependentDetail };
                return Json(result);
            }
            catch (Exception ex)
            {
                var errorResult = new { success = false, message = "Failed to retrieve dependent detail." };
                return Json(errorResult);
            }
        }


        [HttpGet]
        public JsonResult PartnerList()
        {
            try
            {
                CompanyLogic _companyLogic = new CompanyLogic();
                int compId = Convert.ToInt32(_contextAccessor.HttpContext.Session.GetString("CompId")); // Replace with actual logic to fetch user ID
                var partnerList = _companyLogic.GetPartnerList(compId);
                var result = new { success = true, partnerList };
                return Json(result);
            }
            catch (Exception ex)
            {
                var errorResult = new { success = false, message = "Failed to retrieve patner list." };
                return Json(errorResult);
            }
        }

        [AllowAnonymous]
        [HttpPost]
        public JsonResult AddPartner([FromBody] PartnerModel insertPartner)
        {
            try
            {
                string ErrorMessage = string.Empty;
                string _Result = string.Empty;
                CompanyLogic companyLogic = (CompanyLogic)LogicFactory.GetLogic(LogicType.Company);
                PatnerDetailsModel addPartner = new PatnerDetailsModel();

                //this needed to change.
                //addPartner.Id = Convert.ToInt32(_contextAccessor.HttpContext.Session.GetString("Id"));
                addPartner.CompId = Convert.ToInt32(_contextAccessor.HttpContext.Session.GetString("CompId"));
                addPartner.UAEResidence = insertPartner.ResidenceUAE;
                addPartner.IsCompanyManager = insertPartner.CompanyManager;
                addPartner.Name = insertPartner.Name?.Trim();
                addPartner.EmailId = insertPartner.Email?.Trim();
                addPartner.DateOfBirth = insertPartner.Dob;
                addPartner.CountryCode = insertPartner.CountryCode?.Trim();
                addPartner.Phone = insertPartner.Phone?.Trim();
                addPartner.EMRId = insertPartner.EmiratesId?.Trim();
                addPartner.PassportNo = insertPartner.PassportNo?.Trim();
                addPartner.Address = insertPartner.Address?.Trim();
                addPartner.Country = insertPartner.Country?.Trim();
                addPartner.Nationality = insertPartner.Nationality?.Trim();
                addPartner.PatnerOwnership = insertPartner.ManageBudget;
               

                addPartner.Opt = "I";
                _Result = companyLogic.InsertPartner(addPartner);
               
                return Json(_Result);
            }
            catch
            {
                return Json("error");
            }
        }

        [HttpGet]
        public JsonResult GetPartnerDetail(PartnerRequestModel model)
        {
            try
            {
                CompanyLogic _companyLogic = new CompanyLogic();
                //int CompId = Convert.ToInt32(_contextAccessor.HttpContext.Session.GetString("CompId")); // Replace with actual logic to fetch user ID
                var partnerDetail = _companyLogic.PartnerDetail(model.PartnerKey);

                var result = new { success = true, partnerDetail };
                return Json(result);
            }
            catch (Exception ex)
            {
                var errorResult = new { success = false, message = "Failed to retrieve partner detail." };
                return Json(errorResult);
            }
        }

        [AllowAnonymous]
        [HttpPut]
        public JsonResult UpdatePartner([FromBody] PartnerModel updatePartner)
        {
            try
            {
                string ErrorMessage = string.Empty;
                string _Result = string.Empty;
                CompanyLogic companyLogic = (CompanyLogic)LogicFactory.GetLogic(LogicType.Company);
                PatnerDetailsModel Partner = new PatnerDetailsModel();

                //this needed to change.
                Partner.PartnerKey = updatePartner.Id; 
                Partner.CompId = Convert.ToInt32(_contextAccessor.HttpContext.Session.GetString("CompId"));
                Partner.UAEResidence = updatePartner.ResidenceUAE;
                Partner.IsCompanyManager = updatePartner.CompanyManager;
                Partner.Name = updatePartner.Name?.Trim();
                Partner.EmailId = updatePartner.Email?.Trim();
                Partner.DateOfBirth = updatePartner.Dob;
                Partner.CountryCode = updatePartner.CountryCode?.Trim();
                Partner.Phone = updatePartner.Phone?.Trim();
                Partner.EMRId = updatePartner.EmiratesId?.Trim();
                Partner.PassportNo = updatePartner.PassportNo?.Trim();
                Partner.Address = updatePartner.Address?.Trim();
                Partner.Country = updatePartner.Country?.Trim();
                Partner.Nationality = updatePartner.Nationality?.Trim();
                Partner.PatnerOwnership = updatePartner.ManageBudget;


                Partner.Opt = "U";
                _Result = companyLogic.UpdatePartner(Partner);

                return Json(_Result);
            }
            catch
            {
                return Json("error");
            }
        }

        [HttpDelete]
        public JsonResult PartnerDelete([FromBody] PartnerModel model)
        {
            try
            {
                CompanyLogic _companyLogic = new CompanyLogic();
                PatnerDetailsModel Partner = new PatnerDetailsModel();
                Partner.PartnerKey = model.Id;
                Partner.Opt= "D";
                //int CompId = Convert.ToInt32(_contextAccessor.HttpContext.Session.GetString("CompId")); // Replace with actual logic to fetch user ID
                var partnerDetail = _companyLogic.DeletePartner(Partner);

                
                var result = new { success = true, partnerDetail };
                return Json(result);
            }
            catch (Exception ex)
            {
                var errorResult = new { success = false, message = "Failed to retrieve partner detail." };
                return Json(errorResult);
            }
        }


        [AllowAnonymous]
        [HttpPost]
        public JsonResult ResidenceVisaDetails([FromBody] VisaModel insertVisa)
        {
            try
            {
                string _Result = string.Empty;
                CompanyLogic companyLogic = (CompanyLogic)LogicFactory.GetLogic(LogicType.Company);
                VisaDetailsModel addVisa = new VisaDetailsModel();

                addVisa.CompId = Convert.ToInt32(_contextAccessor.HttpContext.Session.GetString("CompId"));
                addVisa.Name = insertVisa.Name?.Trim();
                addVisa.DateOfBirth = insertVisa.DateOfBirth;
                addVisa.EmiratesId = insertVisa.EmiratesId?.Trim();
                addVisa.CurrentAddress = insertVisa.CurrentAddress?.Trim();
                addVisa.ResidenceAddress = insertVisa.ResidenceAddress?.Trim();
                addVisa.Country = insertVisa.Country?.Trim();
                addVisa.Nationality = insertVisa.Nationality?.Trim();
                
                _Result = companyLogic.InsertVisaDetails(addVisa);

                return Json(_Result);
            }
            catch
            {
                return Json("error");
            }
        }


        [HttpGet]
        public JsonResult GetvisaDetail()
        {
            try
            {
                CompanyLogic _companyLogic = new CompanyLogic();
                //int userId = Convert.ToInt32(_contextAccessor.HttpContext.Session.GetString("PartId")); // Replace with actual logic to fetch user ID
                int CompId = Convert.ToInt32(_contextAccessor.HttpContext.Session.GetString("CompId")); // Replace with actual logic to fetch user ID
                var visaDetail = _companyLogic.VisaDetail(CompId);

                var result = new { success = true, visaDetail };
                return Json(result);
            }
            catch (Exception ex)
            {
                var errorResult = new { success = false, message = "Failed to retrieve visa detail." };
                return Json(errorResult);
            }
        }



        
      
       


    }
}
