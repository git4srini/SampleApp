using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using SampleApp.Models;

namespace SampleApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private string FilePath = $"{AppDomain.CurrentDomain.BaseDirectory}sampledata.json";

        [HttpPost]
        public ActionResult<IEnumerable<UserModel>> Post([FromBody] UserModel model)
        {
            var users = new List<UserModel>();
            if (model is null)
            {
                throw new ArgumentNullException(nameof(UserModel));
            }

            users = WriteUser(model);                     


            return Ok(users);
        }

        private List<UserModel> WriteUser(UserModel model)
        {
            var userList = new List<UserModel>();

            userList = GetAllUsers().ToList();

            userList.Add(model);

            if (System.IO.File.Exists(FilePath))
            {
                string jsonData = JsonConvert.SerializeObject(userList, Formatting.Indented);
                System.IO.File.WriteAllText(FilePath, jsonData);
            }
            return userList;
        }

        private IEnumerable<UserModel> GetAllUsers()
        {
            var users = new List<UserModel>();

            if (System.IO.File.Exists(FilePath))
            {
                var data = System.IO.File.ReadAllText(FilePath);

                if (!string.IsNullOrEmpty(data))
                    users = JsonConvert.DeserializeObject<List<UserModel>>(data);
            }
            return users;
        }
    }
}