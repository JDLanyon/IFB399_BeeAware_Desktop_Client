using Microsoft.AspNetCore.Mvc;
using System.Data;
using System.Data.SqlClient;
using System.Collections.Generic;
using Microsoft.Extensions.Configuration;
using BeeAware.Models;
using System.Reflection.PortableExecutable;
using Microsoft.AspNetCore.Session;
using Microsoft.AspNetCore.Http;
using static BeeAware.SessionVariables;
using System.Text.Json;
using System.Diagnostics.Metrics;
using System.Collections;
using System.Text.Json.Serialization;


// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BeeAware.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class hipController : ControllerBase
    {
        private readonly IConfiguration _configuration; //dont change this line
        public hipController(IConfiguration configuration) // [ModuleName]Controller
        {
            _configuration = configuration;
        }
        

        [HttpGet] //depents on get or post function
        [Route("Test")] // the route to fetch as api/[ModuleName]/[Route]. e.g: This one is for api/Example/Test
        [ProducesResponseType(StatusCodes.Status200OK)] // passibile response
        public ContentResult Test()  // same method name as route
        {
           return new ContentResult { Content = JsonSerializer.Serialize("hello world"), StatusCode = 200 }; // { Content = JsonSerializer.Serialize([returnedElement]), StatusCode = [StatusCode] }; 
        }

        [HttpGet]
        [Route("getLocations")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public ContentResult GetLocations()
        {
            SqlConnection con = new SqlConnection(_configuration.GetConnectionString("BeeAwareLogin").ToString());
            SqlCommand cmd = new SqlCommand("SELECT * FROM mms_Address;", con);

            con.Open();
            SqlDataReader read = cmd.ExecuteReader();
            var result = new List<hip_Location>();

            while (read.Read())
            {
                var location = new hip_Location
                {
                    // IDs aren't needed.
                    AddressID = read.GetInt64(0),
                    UserID = read.GetInt64(1),
                    AddressType = read.IsDBNull(2) ? null : read.GetString(2),
                    Address1 = read.IsDBNull(3) ? null : read.GetString(3),
                    Address2 = read.IsDBNull(4) ? null : read.GetString(4),
                    Address3 = read.IsDBNull(5) ? null : read.GetString(5),
                    City = read.IsDBNull(6) ? null : read.GetString(6),
                    PostCode = read.IsDBNull(7) ? null : read.GetString(7),
                    RegionalCouncil = read.IsDBNull(8) ? null : read.GetString(8),
                    State = read.IsDBNull(9) ? null : read.GetString(9),
                    Country = read.IsDBNull(10) ? null : read.GetInt64(10),
                    PostDate = read.IsDBNull(11) ? null : read.GetDateTime(11)
                };
                result.Add(location);
            };
            read.Close();
            con.Close();

            return new ContentResult { Content = JsonSerializer.Serialize(result), StatusCode = 200 };
        }

        [HttpPost]
        [Route("postLocations")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public ContentResult PostLocations(List<hip_Location> location_tables)
        {
            SqlConnection con = new SqlConnection(_configuration.GetConnectionString("BeeAwareLogin").ToString());
            try
            {
                //SqlCommand delete_cmd = new SqlCommand("DELETE FROM mms_Address", con);
                string json = JsonSerializer.Serialize(location_tables).ToString();

                SqlCommand cmd = new SqlCommand($"DELETE FROM mms_Address DECLARE @JSON VARCHAR(MAX) = '{json}' INSERT INTO mms_Address SELECT * FROM OPENJSON(@JSON) WITH (AddressID INT, UserID INT, AddressType VARCHAR(5), Address1 VARCHAR(50), Address2 VARCHAR(50), Address3 VARCHAR(50), City VARCHAR(25), PostCode VARCHAR(5), RegionalCouncil VARCHAR(25), State VARCHAR(5), Country INT, PostDate DATE)", con);
                // TODO: add all entries from location_tables

                con.Open();
                //int rows_affected = delete_cmd.ExecuteNonQuery();
                int rows_affected = cmd.ExecuteNonQuery();
                con.Close();
                if (rows_affected <= 0)
                {
                    throw new Exception("no rows affected.");
                }
                return new ContentResult { Content = JsonSerializer.Serialize("Successfully updated the table!"), StatusCode = 200 };
            }
            catch
            {
                return new ContentResult { Content = JsonSerializer.Serialize("table update failed."), StatusCode = 403 };
            }
        }
    }

    /*[HttpGet]
    [Route("Check")]
    [ProducesResponseType(StatusCodes.Status200OK)] // passibile response
    public ContentResult Check()
    {
        SqlConnection con = new SqlConnection(_configuration.GetConnectionString("BeeAwareLogin").ToString());

        SqlCommand cmd = new SqlCommand("select * from modules;", con);
        con.Open();
        SqlDataReader read = cmd.ExecuteReader();
        var result = new List<Module>(); 
        while (read.Read())
        {
            var a_module = new Module
            {
                Name = read.GetString(1),
            };
            result.Add(a_module);
        };
        read.Close();
        con.Close();
        List<string> returned = new List<string> { };
        foreach (var module in result)
        {
            returned.Add(System.IO.File.ReadAllText("wwwroot/Modules/Html/"+module.Name+".html"));
        }

        return new ContentResult { Content = JsonSerializer.Serialize(returned), StatusCode = 200 };
    }*/
    // an example of a route function with sql command

}
