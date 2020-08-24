import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { TScore } from '../types';
const HIGH_SCORES = gql`
  query GetHighScores {
    allScores(orderBy: "score_DESC") {
      player {
        name
      }
      score
    }
  }
`;
export default () => {
  const { loading, error, data } = useQuery(HIGH_SCORES);
  if (error) {
    console.error(error);
  }
  return (
    <div className="container">
      <div className="text-center">
        <h1>2048</h1>
        <h2>LeaderBoard</h2>
      </div>

      {loading ? (
        <p>Loading data...</p>
      ) : (
        <pre>
          <table className="w-100">
            {data.allScores.map((score: TScore, index: number) => (
              <tr key={index} className="table-row">
                <td>{index}</td>
                <td>{score.player.name}</td>
                <td className="text-right">{score.score}</td>
              </tr>
            ))}
          </table>
        </pre>
      )}
    </div>
  );
};
