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
using System.Net.Http;
using System.Net;
using System;
using System.IO;
using System.Text;
using System.Text.Json;
using Microsoft.AspNetCore.Identity;


// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BeeAware.Controllers
{
    public class HipUser
    {
        public int? UserID { get; set; }
        public string? UserType { get; set; }

        public string? RegNo { get; set; }

        public string? PostDate { get; set; }
    }

    public class NoteInfo {
        public int? HiveInspectionNoteID { get; set; }
        public int? HiveInspectionID { get; set; }
        public string? image { get; set; }
        public string? Notes  { get; set; }
    }

    public class HiveInfo { 
    // HiveID, Date, Time, Condition, Temperament, Population
        public int? HiveID { get; set; }
        public string? Date { get; set; }
        public string? Time { get; set; }
        public int? Condition { get; set; }
        public string? Temperament { get; set; }
        public int? Population { get; set; }
    }

    [Route("api/[controller]")]
    [ApiController]
    public class ModuleController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        public ModuleController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        [HttpPost]
        [Route("hip_users_post")]
        [ProducesResponseType(StatusCodes.Status200OK)] //回传给前端的状态
        public ContentResult HipUsersPostResponse(HipUser hUser) {
            // save to db 
            SqlConnection con = new SqlConnection(_configuration.GetConnectionString("BeeAwareLogin").ToString());
            SqlCommand cmd = new SqlCommand($"update hip_users set UserType = '{hUser.UserType}', RegNo = '{hUser.RegNo}', PostDate = '{hUser.PostDate}' where UserID = {hUser.UserID};", con);
            con.Open();
            int i = cmd.ExecuteNonQuery();
            con.Close();
            if (i <= 0)
            {
                return new ContentResult { Content = JsonSerializer.Serialize("update failed"), StatusCode = 403 };
            }
            return new ContentResult { Content = JsonSerializer.Serialize("update success"), StatusCode = 202 };
        }

        [HttpGet]
        [Route("note_config_get")]
        [ProducesResponseType(StatusCodes.Status200OK)] //回传给前端的状态
        public ContentResult NoteConfigGet() {
            string TableName = "hip_HiveInspectionNotes";
            SqlConnection con = new SqlConnection(_configuration.GetConnectionString("BeeAwareLogin").ToString());
            SqlCommand cmd = new SqlCommand($"select * from {TableName};", con);
            con.Open();
            SqlDataReader read = cmd.ExecuteReader();
            var result = new List<NoteInfo>(); //上一步read转化成result
            while (read.Read())
            {
                NoteInfo note = new NoteInfo();
                note.HiveInspectionNoteID = read.GetInt32(0);
                note.HiveInspectionID = read.GetInt32(1);
                note.image = Encoding.UTF8.GetString((byte[])read.GetValue(2));
                note.Notes = read.GetString(3);
                // append
                result.Add(note);
            };
            read.Close();
            con.Close();
            return new ContentResult { Content = JsonSerializer.Serialize(result), StatusCode = 200 };
        }

        [HttpPost]
        [Route("note_config_post")]
        [ProducesResponseType(StatusCodes.Status200OK)] //回传给前端的状态
        public ContentResult NoteConfigPost(NoteInfo note) {
            // save to db 
            SqlConnection con = new SqlConnection(_configuration.GetConnectionString("BeeAwareLogin").ToString());
            // SqlCommand cmd = new SqlCommand($"update hip_HiveInspectionNotes set image = '{note.image}', Notes = '{note.Notes}' where HiveInspectionNoteID = {note.HiveInspectionNoteID};", con);
            var updateCmd = new SqlCommand();
            updateCmd.CommandText = "UPDATE hip_HiveInspectionNotes SET Images = @image, HiveInspectionID = @HID, Notes = @notes WHERE HiveInspectionNoteID = @id";
            updateCmd.Parameters.AddWithValue("@image", Encoding.UTF8.GetBytes(note.image));
            updateCmd.Parameters.AddWithValue("@notes", note.Notes);
            updateCmd.Parameters.AddWithValue("@id", note.HiveInspectionNoteID);
            updateCmd.Parameters.AddWithValue("@HID", note.HiveInspectionID);
            updateCmd.Connection = con;

            con.Open();
            int i = updateCmd.ExecuteNonQuery();
            con.Close();
            if (i <= 0)
            {
                return new ContentResult { Content = JsonSerializer.Serialize("update failed"), StatusCode = 403 };
            }
            return new ContentResult { Content = JsonSerializer.Serialize("update success"), StatusCode = 202 };
        }


        [HttpGet]
        [Route("hip_users")]
        [ProducesResponseType(StatusCodes.Status200OK)] //回传给前端的状态
        public ContentResult HipUsers(string TableName) {
            SqlConnection con = new SqlConnection(_configuration.GetConnectionString("BeeAwareLogin").ToString());

            SqlCommand cmd = new SqlCommand($"select * from {TableName};", con);
            con.Open();
            SqlDataReader read = cmd.ExecuteReader();
            var result = new List<HipUser>(); //上一步read转化成result
            while (read.Read())
            {
                HipUser user = new HipUser();
                user.UserID = read.GetInt32(0);
                user.UserType = read.GetString(1);
                user.RegNo = read.GetString(2);
                user.PostDate = read.GetDateTime(3).ToString("yyyy-MM-dd");
                // append 
                result.Add(user);
            };
            read.Close();
            con.Close();
            return new ContentResult { Content = JsonSerializer.Serialize(result), StatusCode = 200 };
        }

        [HttpGet]
        [Route("hip_HiveInspectionDetails_Get")]
        [ProducesResponseType(StatusCodes.Status200OK)] //回传给前端的状态
        public ContentResult HiveDetailsGet() {
            string TableName = "hip_HiveInspectionDetails";
            SqlConnection con = new SqlConnection(_configuration.GetConnectionString("BeeAwareLogin").ToString());

            SqlCommand cmd = new SqlCommand($"select HiveID, Date, Time, Condition, Temperament, Population from {TableName};", con);
            con.Open();
            SqlDataReader read = cmd.ExecuteReader();
            var result = new List<HiveInfo>(); //上一步read转化成result
            while (read.Read())
            {
                HiveInfo hive = new HiveInfo();
                hive.HiveID = read.GetInt32(0);
                hive.Date = read.GetDateTime(1).ToString("yyyy-MM-dd");
                hive.Time = read.GetTimeSpan(2).ToString();
                hive.Condition = read.GetInt32(3);
                hive.Temperament = read.GetString(4);
                hive.Population = read.GetInt32(5);
                // append 
                result.Add(hive);
            };
            read.Close();
            con.Close();

            return new ContentResult { Content = JsonSerializer.Serialize(result), StatusCode = 200 };
        }

        [HttpPost]
        [Route("hip_HiveInspectionDetails_Post")]
        [ProducesResponseType(StatusCodes.Status200OK)] //回传给前端的状态
        public ContentResult HiveDetailsPost(HiveInfo hInfo) {
            // save to db 
            SqlConnection con = new SqlConnection(_configuration.GetConnectionString("BeeAwareLogin").ToString());
            SqlCommand cmd = new SqlCommand($"update hip_HiveInspectionDetails set Date = '{hInfo.Date}', Time = '{hInfo.Time}', Condition = {hInfo.Condition}, Temperament = '{hInfo.Temperament}', Population = {hInfo.Population} where HiveID = {hInfo.HiveID};", con);
            con.Open();
            try
            {
                int i = cmd.ExecuteNonQuery();
                if (i <= 0)
                {
                    return new ContentResult { Content = JsonSerializer.Serialize("update failed"), StatusCode = 403 };
                }
                return new ContentResult { Content = JsonSerializer.Serialize("update success"), StatusCode = 202 };
            }
            catch (Exception ex)
            {
                return new ContentResult { Content = JsonSerializer.Serialize("update failed"), StatusCode = 403 };
                throw;
            }
            con.Close();
        }

        [HttpGet]
        [Route("Check")]
        [ProducesResponseType(StatusCodes.Status200OK)] //回传给前端的状态
        public ContentResult Check()
        {
            SqlConnection con = new SqlConnection(_configuration.GetConnectionString("BeeAwareLogin").ToString());

            SqlCommand cmd = new SqlCommand("select * from modules;", con);
            con.Open();
            SqlDataReader read = cmd.ExecuteReader();
            var result = new List<Module>(); //上一步read转化成result
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

                returned.Add(System.IO.File.ReadAllText("wwwroot/Modules/Html/" + module.Name + ".html"));
            }

            return new ContentResult { Content = JsonSerializer.Serialize(returned), StatusCode = 200 };
        }

        [HttpGet]
        [Route("List")]
        [ProducesResponseType(StatusCodes.Status200OK)] //回传给前端的状态
        public ContentResult List()
        {
            SqlConnection con = new SqlConnection(_configuration.GetConnectionString("BeeAwareLogin").ToString());

            SqlCommand cmd = new SqlCommand("select * from modules;", con);
            con.Open();
            SqlDataReader read = cmd.ExecuteReader();
            var result = new List<Module>(); //上一步read转化成result
            while (read.Read())
            {
                var a_module = new Module
                {
                    Id = read.GetInt32(0),
                    Name = read.GetString(1),
                    Description = read.GetString(2),
                    tableUse = read.GetString(3),
                };
                result.Add(a_module);
            };
            read.Close();
            con.Close();
            return new ContentResult { Content = JsonSerializer.Serialize(result), StatusCode = 200 };
        }
        [HttpPost]
        [Route("Delete")]
        [ProducesResponseType(StatusCodes.Status200OK)] //回传给前端的状态
        public ContentResult Delete(Module module)
        {


            try
            {
                SqlConnection con = new SqlConnection(_configuration.GetConnectionString("BeeAwareLogin").ToString());
                SqlCommand cmd = new SqlCommand("DELETE FROM modules WHERE Name = '" + module.Name + "'", con);
                con.Open();//连接数据库
                int i = cmd.ExecuteNonQuery(); //执行数据库指令
                con.Close();
                if (i <= 0)
                {
                    throw new Exception();
                }
            }
            catch
            {
                return new ContentResult { Content = JsonSerializer.Serialize("delete failed"), StatusCode = 403 };
            }

            try
            {
                SqlConnection con = new SqlConnection(_configuration.GetConnectionString("BeeAwareLogin").ToString());
                SqlCommand cmd = new SqlCommand("DROP TABLE " + module.Name, con);
                con.Open();//连接数据库
                int i = cmd.ExecuteNonQuery(); //执行数据库指令
                con.Close();
                if (i <= 0)
                {
                    throw new Exception();
                }
            }
            catch
            {
            }

            if (System.IO.File.Exists("Modules/Controllers/" + module.Name + "Controllers.cs"))
            {
                System.IO.File.Delete("Modules/Controllers/" + module.Name + "Controllers.cs");
            }
            if (Directory.Exists("Modules/Models/" + module.Name + "/"))
            {
                Directory.Delete("Modules/Models/" + module.Name + "/", true);
            }
            if (System.IO.File.Exists("wwwroot/Modules/Html/" + module.Name + ".html"))
            {
                System.IO.File.Delete("wwwroot/Modules/Html/" + module.Name + ".html");
            }
            if (System.IO.File.Exists("wwwroot/Modules/Css/" + module.Name + ".css"))
            {
                System.IO.File.Delete("wwwroot/Modules/Css/" + module.Name + ".css");
            }
            if (System.IO.File.Exists("wwwroot/Modules/Js/" + module.Name + ".js"))
            {
                System.IO.File.Delete("wwwroot/Modules/Js/" + module.Name + ".js");
            }
            return new ContentResult { Content = JsonSerializer.Serialize("delete success"), StatusCode = 200 };

        }
    }
}
