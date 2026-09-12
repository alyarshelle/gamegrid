import { useEffect, useState } from "react";
import ScoreTable from "./ScoreTable"

const API_BASE = import.meta.env.DEV
  ? '/api'
  : 'https://gamegrid-iyzn.onrender.com';



interface Conference {
    conferenceName: string;
    conferenceSeo: string;
}

interface TeamNames {
    char6: string;
    short: string;
    seo: string;
    full: string;
}

interface Team {
    conferences: Conference[];
    description: string;
    names: TeamNames;
    rank: string;
    score: string;
    seed: string;
    winner: boolean;
}

interface Game {
    game: {
        away: Team;
        bracketId: string;
        bracketRound: string;
        contestClock: string;
        currentPeriod: string;
        finalMessage: string;
        gameID: string;
        gameState: string;
        home: Team;
        liveVideoEnabled: boolean;
        network: string;
        startDate: string;
        startTime: string;
        startTimeEpoch: string;
        title: string;
        url: string;
    };
}

interface GamesData {
    games: Game[];
}

interface LineScore {
    home: number;
    visit: number;
}

interface GameTeam {
    color: string;
    division: number;
    divisionName: string;
    gameRank: number | null;
    isHome: boolean;
    isWinner: boolean;
    name6Char: string;
    nameFull: string;
    nameShort: string;
    record: string;
    score: number;
    seed: number | null;
    seoname: string;
    teamId: string;
    teamRank: number | null;
    __typename: string;
}

interface Contest {
    championship: unknown;
    championshipGame: unknown;
    clock: string | null;
    currentPeriod: string;
    division: number;
    finalMessage: string;
    gameState: string;
    hasBoxscore: boolean;
    hasPbp: boolean;
    hasPreview: boolean;
    hasRecap: boolean;
    hasScoringSummary: boolean;
    hasStartTime: boolean;
    hasTeamStats: boolean;
    id: string;
    linescores: LineScore[];
    links: unknown[];
    liveVideos: unknown[];
    location: {
        __typename: string;
        venue: string;
        city: string;
        stateUsps: string;
    };
    network: string | null;
    seasonYear: number;
    sportCode: string;
    sportUrl: string;
    startTime: string;
    startTimeEpoch: number;
    stats: unknown;
    statusCodeDisplay: string;
    teams: GameTeam[];
    week: unknown;
    winner: number;
    __typename: string;
}

interface GameInfo {
    contests: Contest[];
}

export default function LiveGames() {
    const [gaming, setGaming] = useState<GamesData | null>(null);
    const [gameInfos, setGameInfos] = useState<Record<string, GameInfo>>({});

    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    const date = `${year}/${month}/${day}`;
    const dateNormal = `${month}/${day}/${year}`;

    useEffect(() => {
        const getGames = async () => {
            try {
                const scoreboardUrl = import.meta.env.DEV
                    ? `${API_BASE}/scoreboard/volleyball-women/d1/${date}/all-conf`
                    : `${API_BASE}/api/scoreboard/volleyball-women/d1/${date}/all-conf`;

                const response = await fetch(scoreboardUrl);            

                if (!response.ok) {
                    throw new Error(`Scoreboard failed: ${response.status}`);
                }

                const gamingInfo: GamesData = await response.json();

                console.log("SCOREBOARD:");
                console.log(gamingInfo);

                setGaming(gamingInfo);

                const infos: Record<string, GameInfo> = {};

                for (const game of gamingInfo.games) {
                    const gameId = game.game.gameID;

                    try {
                        const gameUrl = import.meta.env.DEV
                        ? `${API_BASE}/game/${gameId}`
                        : `${API_BASE}/api/game/${gameId}`;

                        const gameResponse = await fetch(gameUrl);

                        if (!gameResponse.ok) {
                            const errorText = await gameResponse.text();

                            console.error(
                                `Failed to fetch game ${gameId}:`,
                                gameResponse.status,
                                errorText
                            );

                            continue;
                        }

                        const gameDetails: GameInfo = await gameResponse.json();

                        infos[gameId] = gameDetails;
                    } catch (error) {
                        console.error(`Error fetching game ${gameId}:`, error);
                    }
                }

                setGameInfos(infos);

                console.log("GAME INFOS:");
                console.log(infos);

            } catch (error) {
                console.error("Network or parsing error:", error);
            }
        };

        getGames();

        // Fetch again every 30 seconds
        const interval = setInterval(() => {
            getGames();
        }, 5_000);

        // Stop polling when leaving the page / date changes
        return () => {
            clearInterval(interval);
        };
    }, [date]);

    function hexToRgba(hex: string, alpha = 0.85) {
        hex = hex.replace(/^#/, "");

        if (hex.length === 3) {
            hex = hex.split("").map((c) => c + c).join("");
        }

        const r = parseInt(hex.slice(0, 2), 16);
        const g = parseInt(hex.slice(2, 4), 16);
        const b = parseInt(hex.slice(4, 6), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }

    return (
        <>
            <h1 className="date-title"> Live Game Results For {dateNormal} </h1>
            <div className="container">
            {gaming?.games.map((game) => {
                const gameId = game.game.gameID;
                const awayTeam = game.game.away;
                const homeTeam = game.game.home;
                const gameInfo = gameInfos[gameId];
                const teams = gameInfo?.contests[0]?.teams;
                const homeColors = teams?.find((team) => team.isHome)?.color;
                const awayColors = teams?.find((team) => !team.isHome)?.color;
                const gamePeriod = gameInfo?.contests[0]?.currentPeriod;
                const gameStartTime = gameInfo?.contests[0]?.startTime;

                const targetDate = new Date(`${month}/${day}/${year} ${gameStartTime}`);
                const currentDate = new Date();

                console.log("GAME INFO", gameInfo)

                // console.log("COLOR DEBUG", {
                //     gameId,
                //     gameInfo,
                //     teams,
                //     homeColors,
                //     awayColors,
                // });


                // const rankingHome = teams?.find((team) => team.isHome)?.teamRank ?? 0;
                // const rankingAway = teams?.find((team) => !team.isHome)?.teamRank ?? 0;
                // console.log("TEAM IS RANKED??? ")
                // console.log(rankingHome, teams?.find((team) => team.isHome))
                // console.log(rankingAway, teams?.find((team) => !team.isHome))

                return (
                    <div className="game-card" key={gameId}>
                    <div
                        className="game-card-header"
                        style={{
                            background: `linear-gradient(
                                115deg,
                                ${hexToRgba(homeColors ?? "#000", 0.75)} 40%,
                                ${hexToRgba(awayColors ?? "#000", 0.75)} 60%
                            )`,
                        }}
                    />                        
                    <div className="teamName">
                            <div className="homeTeamContainer">
                                <span className="homeScore"> {homeTeam.score} </span>
                                <span className="homeName"> {homeTeam.names.short.length > 12 ? homeTeam.names.char6 : homeTeam.names.short}</span>
                            </div>
                            <div className="game-period">
                                {currentDate.getTime() > targetDate.getTime() ? (
                                    <span className="game-period-value">{gamePeriod}</span>
                                ) : (
                                    <span className="game-start-time">{gameStartTime}</span>
                                )}
                            </div>
                            <div className="awayTeamContainer">
                                <span className="awayName"> <span className="rank-away">{}</span>{awayTeam.names.short.length > 12 ? awayTeam.names.char6 : awayTeam.names.short} </span>
                                <span className="awayScore"> {awayTeam.score} </span>
                            </div>
                        </div>
                        {currentDate.getTime() > targetDate.getTime() && (
                            <ScoreTable 
                                setCount={gameInfo?.contests[0]?.linescores.length} 
                                home={gameInfo?.contests[0]?.linescores.map(set => set.home) ?? []} 
                                away={gameInfo?.contests[0]?.linescores.map(set => set.visit) ?? []} 
                                homeName={homeTeam.names.short.length > 15 ? homeTeam.names.char6 : homeTeam.names.short} 
                                awayName={awayTeam.names.short.length > 15 ? awayTeam.names.char6 : awayTeam.names.short} 
                            />
                        )}
                    </div>
                );
            })}
            </div>
        </>
    );
}