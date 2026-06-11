import { Match, Prediction } from '../types'
import './MatchCard.css'

interface MatchCardProps {
  match: Match
  prediction?: Prediction
  onAutoPredict: () => void
  onSelect: () => void
}

function MatchCard({ match, prediction, onAutoPredict, onSelect }: MatchCardProps) {
  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.7) return '#00d4ff'
    if (confidence >= 0.5) return '#ffd700'
    return '#ff6b6b'
  }

  const isPlayed = !!match.result
  const isPredictionCorrect = prediction && match.result && prediction.winner === match.result.winner

  return (
    <div className={`match-card ${isPlayed ? 'played' : ''} ${isPredictionCorrect ? 'correct' : ''}`} onClick={onSelect}>
      <div className="match-header">
        <span className="match-date">📅 {match.date}</span>
        <span className="match-stage">{match.stage}</span>
      </div>

      <div className="teams">
        <div className="team">
          <span className="flag">{match.team1.flag}</span>
          <span className="name">{match.team1.name}</span>
        </div>
        <div className="vs">vs</div>
        <div className="team">
          <span className="flag">{match.team2.flag}</span>
          <span className="name">{match.team2.name}</span>
        </div>
      </div>

      {isPlayed && match.result && (
        <div className="result">
          <span className="score">{match.result.team1Goals} - {match.result.team2Goals}</span>
          <span className="winner">✓ Gagnant: {match.result.winner}</span>
        </div>
      )}

      {prediction && (
        <div className="prediction-display">
          <div className="prediction-item">
            <span>🎯 Prédiction</span>
            <span className="prediction-winner">{prediction.winner}</span>
          </div>
          <div className="confidence" style={{ borderColor: getConfidenceColor(prediction.confidence) }}>
            <div className="confidence-bar" style={{
              width: `${prediction.confidence * 100}%`,
              backgroundColor: getConfidenceColor(prediction.confidence)
            }}></div>
            <span className="confidence-text">{(prediction.confidence * 100).toFixed(0)}%</span>
          </div>
        </div>
      )}

      <div className="actions">
        <button className="btn-predict" onClick={(e) => { e.stopPropagation(); onAutoPredict(); }}>
          🤖 Prédire
        </button>
      </div>
    </div>
  )
}

export default MatchCard
