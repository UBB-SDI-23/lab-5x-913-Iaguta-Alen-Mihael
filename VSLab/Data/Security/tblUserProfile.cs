namespace VSLab.Data.Security;

public class tblUserProfile
{
    [System.ComponentModel.DataAnnotations.Key]
    public int ID { get; set; }
    public string Email { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
    public string UserName { get; set; } = string.Empty;
    public string Bio { get; set; } = string.Empty;
    public string BirthDate { get; set; } = string.Empty;
    public string PhoneNumber { get; set; } = string.Empty;
    public ICollection<tblChessPlayer> ChessPlayers { get; set; } = null!;
    public ICollection<tblChessTournament> ChessTournaments { get; set; } = null!;
}

