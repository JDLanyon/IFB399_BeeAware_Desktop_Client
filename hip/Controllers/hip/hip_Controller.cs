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
        [Route("test")] // the route to fetch as api/[ModuleName]/[Route]. e.g: This one is for api/Example/Test
        [ProducesResponseType(StatusCodes.Status200OK)] // passibile response
        public ContentResult Test()  // same method name as route
        {
           return new ContentResult { Content = JsonSerializer.Serialize("Test success!"), StatusCode = 200 }; // { Content = JsonSerializer.Serialize([returnedElement]), StatusCode = [StatusCode] }; 
        }

        [HttpGet]
        [Route("get_mms_Address")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public ContentResult GetAddress()
        {
            SqlConnection con = new SqlConnection(_configuration.GetConnectionString("BeeAwareLogin").ToString());
            SqlCommand cmd = new SqlCommand("SELECT * FROM mms_Address;", con);

            con.Open();
            SqlDataReader read = cmd.ExecuteReader();
            var result = new List<hip_mms_Address>();

            while (read.Read())
            {
                var location = new hip_mms_Address
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
        [Route("post_mms_Address")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public ContentResult PostAddress(List<hip_mms_Address> mms_address_tables)
        {
            SqlConnection con = new SqlConnection(_configuration.GetConnectionString("BeeAwareLogin").ToString());

                //SqlCommand delete_cmd = new SqlCommand("DELETE FROM mms_Address", con);
                string json = JsonSerializer.Serialize(mms_address_tables).ToString();

                SqlCommand cmd = new SqlCommand(@$"DELETE FROM mms_Address DECLARE @JSON VARCHAR(MAX) = '{json}' 
                    INSERT INTO mms_Address SELECT * FROM OPENJSON(@JSON)
                    WITH (AddressID INT, UserID INT, AddressType VARCHAR(5), Address1 VARCHAR(50), Address2 VARCHAR(50), Address3 VARCHAR(50),
                    City VARCHAR(25), PostCode VARCHAR(5), RegionalCouncil VARCHAR(25), State VARCHAR(5), Country INT, PostDate DATE)", con);

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

        [HttpGet]
        [Route("get_hip_HiveHeader")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public ContentResult GetHiveHeader()
        {
            SqlConnection con = new SqlConnection(_configuration.GetConnectionString("BeeAwareLogin").ToString());
            SqlCommand cmd = new SqlCommand("SELECT * FROM hip_HiveHeader;", con);

            con.Open();
            SqlDataReader read = cmd.ExecuteReader();
            var result = new List<hip_HiveHeader>();

            while (read.Read())
            {
                var header = new hip_HiveHeader
                {
                    // IDs aren't needed.
                    HiveID = read.GetInt64(0),
                    UserID = read.GetInt64(1),
                    HiveCode = read.IsDBNull(2) ? null : read.GetString(2),
                    AddressID = read.IsDBNull(3) ? null : read.GetInt64(3),
                    Supers_Cnt = read.GetInt32(4),
                    Frames = read.GetInt32(5),
                    QType = read.IsDBNull(6) ? null : read.GetString(6),
                    QDOB = read.IsDBNull(7) ? null : read.GetDateTime(7),
                    QClipped = read.IsDBNull(8) ? null : read.GetBoolean(8),
                    QMarked = read.IsDBNull(9) ? null : read.GetBoolean(9),
                    Notes = read.IsDBNull(10) ? null : read.GetString(10),
                    PostDate = read.IsDBNull(11) ? null : read.GetDateTime(11),
                    //Images = read.IsDBNull(12) ? null : read.GetSqlBinary(12)
                };
                result.Add(header);
            };
            read.Close();
            con.Close();

            return new ContentResult { Content = JsonSerializer.Serialize(result), StatusCode = 200 };
        }

        [HttpPost]
        [Route("post_hip_HiveHeader")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public ContentResult PostHiveHeader(List<hip_HiveHeader> hip_HiveHeader_tables)
        {
            SqlConnection con = new SqlConnection(_configuration.GetConnectionString("BeeAwareLogin").ToString());

            //SqlCommand delete_cmd = new SqlCommand("DELETE FROM mms_Address", con);
            string json = JsonSerializer.Serialize(hip_HiveHeader_tables).ToString();

            SqlCommand cmd = new SqlCommand(@$"DELETE FROM hip_HiveHeader DECLARE @JSON VARCHAR(MAX) = '{json}'
                INSERT INTO hip_HiveHeader SELECT * FROM OPENJSON(@JSON)
                WITH (HiveID INT, UserID INT, HiveCode VARCHAR(10), AddressID BIGINT, Supers_Cnt INT, Frames INT,
                QType NCHAR(10), QDOB DATE, QClipped BIT, QMarked BIT, Notes NVARCHAR(MAX), PostDate DATE, Images VARBINARY(MAX))", con);

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

        [HttpGet]
        [Route("get_hip_HiveInspectionDetails")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public ContentResult GetHiveInspectionDetails()
        {
            SqlConnection con = new SqlConnection(_configuration.GetConnectionString("BeeAwareLogin").ToString());
            SqlCommand cmd = new SqlCommand("SELECT * FROM hip_HiveInspectionDetail;", con);

            con.Open();
            SqlDataReader read = cmd.ExecuteReader();
            var result = new List<hip_HiveInspectionDetail>();

            while (read.Read())
            {
                var detail = new hip_HiveInspectionDetail
                {
                    // IDs aren't needed.
                    InspectionID = read.GetInt64(0),
                    HiveID = read.IsDBNull(1) ? null : read.GetInt64(1),
                    InspDate = read.IsDBNull(2) ? null : read.GetDateTime(2),
                    InspTime = read.IsDBNull(3) ? null : read.GetTimeSpan(3),
                    Condition = read.IsDBNull(4) ? null : read.GetString(4),
                    Temperament = read.IsDBNull(5) ? null : read.GetString(5),
                    Population = read.IsDBNull(6) ? null : read.GetString(6),
                    FCnt_Honey = read.IsDBNull(7) ? null : read.GetInt32(7),
                    FCnt_Brood = read.IsDBNull(8) ? null : read.GetInt32(8),
                    FCnt_Pollen = read.IsDBNull(9) ? null : read.GetInt32(9),
                    FCnt_Empty = read.IsDBNull(10) ? null : read.GetInt32(10),
                    FCnt_Drone = read.IsDBNull(11) ? null : read.GetInt32(11),
                    FCon_Honey = read.IsDBNull(12) ? null : read.GetInt64(12),
                    FCon_Brood = read.IsDBNull(13) ? null : read.GetInt64(13),
                    FCon_BroodPattern = read.IsDBNull(14) ? null : read.GetInt64(14),
                    FCon_Eggs = read.IsDBNull(15) ? null : read.GetInt64(15),
                    FCon_Pollen = read.IsDBNull(16) ? null : read.GetInt64(16),
                    FCon_Empty = read.IsDBNull(17) ? null : read.GetInt64(17),
                    FCon_Drone = read.IsDBNull(18) ? null : read.GetInt64(18),
                    Notes = read.IsDBNull(19) ? null : read.GetString(19)
                };
                result.Add(detail);
            };
            read.Close();
            con.Close();

            return new ContentResult { Content = JsonSerializer.Serialize(result), StatusCode = 200 };
        }

        [HttpPost]
        [Route("post_hip_HiveInspectionDetails")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public ContentResult PostHiveInspectionDetails(List<hip_HiveInspectionDetail> hip_HiveInspectionDetail_tables)
        {
            SqlConnection con = new SqlConnection(_configuration.GetConnectionString("BeeAwareLogin").ToString());

            //SqlCommand delete_cmd = new SqlCommand("DELETE FROM mms_Address", con);
            string json = JsonSerializer.Serialize(hip_HiveInspectionDetail_tables).ToString();

            SqlCommand cmd = new SqlCommand(@$"DELETE FROM hip_HiveInspectionDetail DECLARE @JSON VARCHAR(MAX) = '{json}'
                INSERT INTO hip_HiveInspectionDetail SELECT * FROM OPENJSON(@JSON)
                WITH (InspectionID BIGINT, HiveID BIGINT, InspDate DATE, InspTime TIME, Condition VARCHAR(10), Temperament VARCHAR(10),
                Population VARCHAR(10), FCnt_Honey INT, FCnt_Brood INT, FCnt_Pollen INT, FCnt_Empty INT, FCnt_Drone INT, FCon_Honey BIGINT,
                FCon_Brood BIGINT, FCon_BroodPattern BIGINT, FCon_Eggs BIGINT, FCon_Pollen BIGINT, FCon_Empty BIGINT, FCon_Drone BIGINT, Notes NVARCHAR(MAX))", con);

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

        [HttpGet]
        [Route("get_hip_HiveHealth")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public ContentResult GetHiveHealth()
        {
            SqlConnection con = new SqlConnection(_configuration.GetConnectionString("BeeAwareLogin").ToString());
            SqlCommand cmd = new SqlCommand("SELECT * FROM hip_HiveHealth;", con);

            con.Open();
            SqlDataReader read = cmd.ExecuteReader();
            var result = new List<hip_HiveHealth>();

            while (read.Read())
            {
                var health = new hip_HiveHealth
                {
                    // IDs aren't needed.
                    HiveHealthID = read.GetInt64(0),
                    HiveInspectionID = read.GetInt64(1),
                    Date = read.GetDateTime(2),
                    Irregularity = read.IsDBNull(3) ? null : read.GetInt32(3),
                    Seriousness = read.IsDBNull(4) ? null : read.GetInt32(4),
                    Notes = read.IsDBNull(5) ? null : read.GetString(5)
                };
                result.Add(health);
            };
            read.Close();
            con.Close();

            return new ContentResult { Content = JsonSerializer.Serialize(result), StatusCode = 200 };
        }

        [HttpPost]
        [Route("post_hip_HiveHealth")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public ContentResult PostHiveHealth(List<hip_HiveHealth> hip_HiveHealth_tables)
        {
            SqlConnection con = new SqlConnection(_configuration.GetConnectionString("BeeAwareLogin").ToString());

            //SqlCommand delete_cmd = new SqlCommand("DELETE FROM mms_Address", con);
            string json = JsonSerializer.Serialize(hip_HiveHealth_tables).ToString();

            SqlCommand cmd = new SqlCommand(@$"DELETE FROM hip_HiveHealth DECLARE @JSON VARCHAR(MAX) = '{json}'
                INSERT INTO hip_HiveHealth SELECT * FROM OPENJSON(@JSON)
                WITH (HiveHealthID BIGINT, HiveInspectionID BIGINT, Date DATE, Irregularity INT, Seriousness INT, Notes NVARCHAR(MAX))", con);

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

        //[HttpGet]
        //[Route("get_hip_hiveinspectionnotes")]
        //[ProducesResponseType(StatusCodes.Status200OK)]
        //public ContentResult GetHiveInspectionNotes()
        //{
        //    SqlConnection con = new SqlConnection(_configuration.GetConnectionString("BeeAwareLogin").ToString());
        //    SqlCommand cmd = new SqlCommand("SELECT * FROM hip_HiveInspectionNotes;", con);

        //    con.Open();
        //    SqlDataReader read = cmd.ExecuteReader();
        //    var result = new List<hip_HiveInspectionNotes>();

        //    while (read.Read())
        //    {
        //        var inspection_note = new hip_HiveInspectionNotes
        //        {
        //            // IDs aren't needed.
        //            HiveInspectionNoteID = read.GetInt64(0),
        //            HiveInspectionID = read.GetInt64(1),
        //            Images = read.IsDBNull(2) ? null : read.GetSqlBinary(2),
        //            Notes = read.IsDBNull(3) ? null : read.GetSqlBinary(3)
        //        };
        //        result.Add(inspection_note);
        //    };
        //    read.Close();
        //    con.Close();

        //    return new ContentResult { Content = JsonSerializer.Serialize(result), StatusCode = 200 };
        //}

        //[HttpGet]
        //[Route("post_hip_hiveinspectionnotes")]
        //[ProducesResponseType(StatusCodes.Status200OK)]
        //public ContentResult PostHiveInspectionNotes(List<hip_HiveInspectionNotes> hip_HiveInspectionNotes)
        //{
        //    throw new NotImplementedException();
        //}
    }
}
