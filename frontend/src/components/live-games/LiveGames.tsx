import { useEffect, useState } from "react";
import ScoreTable from "./ScoreTable"

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

    // const date = `${year}/${month}/${day}`;
    // const date = "2026/09/01"
    const dateNormal = `${month}/${day}/${year}`;

    useEffect(() => {
        const socket = new WebSocket(
            'ws://localhost:3001/ws'
        );

        socket.onopen = () => {
            console.log(
                'Connected to GameGrid WebSocket'
            );
        };

        socket.onmessage = (event) => {
            try {
                const message = JSON.parse(event.data);

                console.log(
                    'WebSocket message:',
                    message
                );

                if (
                    message.type === 'initial_data' ||
                    message.type === 'scoreboard_update'
                ) {
                    const data = message.data;

                    setGaming(data.scoreboard);
                    setGameInfos(data.gameInfos);
                }

            } catch (error) {
                console.error(
                    'Failed to process WebSocket message:',
                    error
                );
            }
        };

        socket.onerror = (error) => {
            console.error(
                'WebSocket error:',
                error
            );
        };

        socket.onclose = (event) => {
            console.log(
                'WebSocket closed:',
                event.code,
                event.reason
            );
        };

        return () => {
            socket.close();
        };
    }, []);

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
                const homeColors = teams?.find((team) => team.isHome)?.color ?? "#000";
                const awayColors = teams?.find((team) => !team.isHome)?.color ?? "#000";
                const gamePeriod = gameInfo?.contests[0]?.currentPeriod;
                const gameStartTime = gameInfo?.contests[0]?.startTime;

                const targetDate = new Date(`${month}/${day}/${year} ${gameStartTime}`);
                const currentDate = new Date();

                return (
                    <div className="game-card" key={gameId}>
                        <div className="game-card-header" style={{ background: `linear-gradient( 115deg, ${hexToRgba(homeColors, 0.75)} 40%, ${hexToRgba(awayColors, 0.75)} 60% )`,}} />
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
                                <span className="awayName"> {awayTeam.names.short.length > 12 ? awayTeam.names.char6 : awayTeam.names.short} </span>
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