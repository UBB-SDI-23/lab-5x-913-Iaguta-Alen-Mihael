namespace VSLab.Data
{
    public class dtoChessPlayer
    {
        public int ID { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Country { get; set; } = string.Empty;
        public int Rating { get; set; }
        public int IsMaster { get; set; }
        public int StartYear { get; set; }
        public string Description { get; set; } = string.Empty;

    }
}
