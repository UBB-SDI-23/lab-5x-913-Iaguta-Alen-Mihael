namespace VSLab.Data
{
    public class dtoChessParticipation
    {
        public int ChessPlayerID { get; set; }
        public int ChessTournamentID { get; set; }
        public string DateSigned { get; set; } = string.Empty;
        public string DurationPlayed { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;

    }
}
