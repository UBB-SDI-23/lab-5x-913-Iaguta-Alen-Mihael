﻿using System.ComponentModel.DataAnnotations;

namespace VSLab.Data
{
    public class tblChessTournament
    {
        [Key]
        public int ID { get; set; }
        public string Name { get; set; } = string.Empty;
        public int NumParticipants { get; set; }
        public string Host { get; set; } = string.Empty;    
        public int PrizeMoney { get; set; }
        public string Trophy { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public ICollection<tblChessParticipation> TournamentParticipations { get; set; } = null!;
        public ICollection<tblChessPlayer> ChessPlayers { get; set;} = null!;


    }
}
