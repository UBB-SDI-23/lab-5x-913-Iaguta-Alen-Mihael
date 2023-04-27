import time
from playerScript import generate_players_sql, generate_players
from tournamentScript import generate_tournament_sql, generate_tournaments
from championScript import generate_champions_sql, generate_champion
from participationScript import generate_participation_sql, generate_participation

amount = 10_000_000

if __name__ == '__main__':
    start_time = time.time()

    """
    players = generate_players(amount)
    generate_players_sql(players)
    """

    """
    tournaments = generate_tournaments(amount)
    generate_tournament_sql(tournaments)
    """

    """
    champions = generate_champion(amount)
    generate_champions_sql(champions)
    """

    particpations = generate_participation(amount)
    generate_participation_sql(particpations)

    end_time = time.time()
    time_taken = end_time - start_time
    print(time_taken)
