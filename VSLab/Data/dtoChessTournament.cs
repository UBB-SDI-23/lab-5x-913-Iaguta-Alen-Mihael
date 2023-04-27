namespace VSLab.Data
{
    public class dtoChessTournament
    {
        public int ID { get; set; }
        public string Name { get; set; } = string.Empty;
        public int NumParticipants { get; set; }
        public string Host { get; set; } = string.Empty;
        public int PrizeMoney { get; set; }
        public string Trophy { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;

    }
}
