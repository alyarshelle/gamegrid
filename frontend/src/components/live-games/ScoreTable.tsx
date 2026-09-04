interface ScoreTableProps {
  setCount: number;
  home: number[];
  away: number[];
  homeName: string;
  awayName: string;
}

export default function ScoreTable({ setCount, home, away, homeName, awayName }: ScoreTableProps){
    return (
        <table className="score-table">
            <thead className="setHeader">
                <tr>
                    <th className="row"></th>
                    {Array.from({ length: setCount }, (_, i) => (
                        <th key={i}>Set {i + 1}</th>
                    ))}
                </tr>
            </thead>

            <tbody className="setRow">
                <tr className={`team-row team-${homeName}`}>
                    <td className="logo-name-small">{homeName}</td>
                    {home.map((score, i) => (
                        <td key={i}>{score}</td>
                    ))}
                </tr>

                <tr className={`team-row team-${awayName}`}>
                    <td className="logo-name-small">{awayName}</td>
                    {away.map((score, i) => (
                        <td key={i}>{score}</td>
                    ))}
                </tr>
            </tbody>
        </table>
    )
}