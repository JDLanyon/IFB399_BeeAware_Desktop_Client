
namespace BeeAware.Models
{
    public class hip_Location
    {
        // Although some fields cannot be null, it's best to have for future proofing.
        public long AddressID { get; set; }
        public long MemberID { get; set; }
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
    // have same structure as it is stored in database
}
