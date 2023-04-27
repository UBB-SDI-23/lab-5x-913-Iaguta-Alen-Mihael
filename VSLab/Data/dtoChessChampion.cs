namespace VSLab.Data
{
    public class dtoChessChampion
    {
        public int ID { get; set; }
        public string LastTrophy { get; set; } = string.Empty;
        public string Record { get; set; } = string.Empty;
        public int MaxRating { get; set; }
        public int ConsecutiveYears { get; set; }
        public int Current { get; set; }
        public string Description { get; set; } = string.Empty;

        public int ChessPlayerID { get; set; }

    }
}
