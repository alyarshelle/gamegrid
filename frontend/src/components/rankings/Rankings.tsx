import { useEffect, useRef, useState } from "react";

interface RankingItem {
  RANK: string;
  SCHOOL: string;
  RECORD: string;
  "PREVIOUS RANK": string;
}

interface RankingsData {
  sport: string;
  title: string;
  updated: string;
  page: number;
  pages: number;
  data: RankingItem[];
}

export default function Rankings(){
    const [rankings, setRankings] = useState<RankingsData | null>(null);
    const hasFetched = useRef(false);

    useEffect(() => {
        if (hasFetched.current) {
        return;
        }

        hasFetched.current = true;

        const getRankings = async () => {
        try {
            const response = await fetch(
            "/api/rankings/volleyball-women/d1/avca-rankings"
            );

            const rankingInfo = await response.json();

            console.log(rankingInfo);

            setRankings(rankingInfo);
        } catch (error) {
            console.error("Network or parsing error:", error);
        }
        };

        getRankings();
    }, []);

    return (
        <>
        <h1 className="rankings-title">D1 Volleyball Rankings {rankings?.updated}</h1>
            <table className="rankings-entry">
                <thead>
                    <tr>
                    <th className="spacing">Rank</th>
                    <th className="spacing">School</th>
                    <th className="spacing">Record</th>
                    </tr>
                </thead>

                <tbody>
                    {rankings?.data.map((team) => (
                    <tr key={team.RANK}>
                        <td className="spacing">{team.RANK}</td>
                        <td className="spacing">{team.SCHOOL}</td>
                        <td className="spacing">{team.RECORD}</td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}