
using System.Data.SqlTypes;

namespace BeeAware.Models
{
    public class hip_mms_Address
    {
        public long AddressID { get; set; }
        public long UserID { get; set; }
        public string? AddressType { get; set; }
        public string? Address1 { get; set; }
        public string? Address2 { get; set; }
        public string? Address3 { get; set; }
        public string? City { get; set; }
        public string? PostCode { get; set; }
        public string? RegionalCouncil { get; set; }
        public string? State { get; set; }
        public long? Country { get; set; }
        public DateTime? PostDate { get; set; }
    }

    public class hip_HiveHeader
    {
        public long HiveID { get; set; }
        public long UserID { get; set; }
        public string? HiveCode { get; set; }
        public long? AddressID { get; set; }
        public int Supers_Cnt { get; set; }
        public int Frames { get; set; }
        public string? QType { get; set; }
        public DateTime? QDOB { get; set; }
        public bool? QClipped { get; set; }
        public bool? QMarked { get; set; }
        public string? Notes { get; set; }
        public DateTime? PostDate { get; set; }
        //public SqlBinary? Images { get; set; }
    }

    public class hip_HiveHealth
    {
        public long HiveHealthID { get; set; }
        public long HiveInspectionID { get; set; }
        public DateTime Date { get; set; }
        public int? Irregularity { get; set; }
        public int? Seriousness { get; set; }
        public string? Notes { get; set; }
    }

    public class hip_HiveInspectionDetail
    {
        public long InspectionID { get; set; }
        public long? HiveID { get; set; }
        public DateTime? InspDate { get; set; }
        public TimeSpan? InspTime { get; set; }
        public string? Condition { get; set; }
        public string? Temperament { get; set; }
        public string? Population { get; set; }
        public int? FCnt_Honey { get; set; }
        public int? FCnt_Brood { get; set; }
        public int? FCnt_Pollen { get; set; }
        public int? FCnt_Empty { get; set; }
        public int? FCnt_Drone { get; set; }
        public long? FCon_Honey { get; set; }
        public long? FCon_Brood { get; set; }
        public long? FCon_BroodPattern { get; set; }
        public long? FCon_Eggs { get; set; }
        public long? FCon_Pollen { get; set; }
        public long? FCon_Empty { get; set; }
        public long? FCon_Drone { get; set; }
        public string? Notes { get; set; }
    }

    //public class hip_HiveInspectionNotes
    //{
    //    public long HiveInspectionNoteID { get; set; }
    //    public long HiveInspectionID { get; set; }
    //    public SqlBinary? Images { get; set; }
    //    public SqlBinary? Notes { get; set; }
    //}
}
