import { useState } from 'react'
import { Match, Prediction } from '../types'
import './PredictionPanel.css'

interface PredictionPanelProps {
  match: Match
  prediction?: Prediction
  onPredict: (prediction: Prediction) => void
}

function PredictionPanel({ match, prediction, onPredict }: PredictionPanelProps) {
  const [selectedWinner, setSelectedWinner] = useState<string>(prediction?.winner || '')
  const [confidence, setConfidence] = useState<number>(prediction?.confidence || 0.5)

  const handleSubmit = () => {
    if (selectedWinner) {
      onPredict({
        winner: selectedWinner,
        confidence,
        timestamp: new Date()
      })
    }
  }

  return (
    <div className="prediction-panel">
      <div className="panel-header">
        <h3>🎯 Faire une Prédiction</h3>
      </div>

      <div className="panel-content">
        <div className="match-info">
          <div className="team-option">
            <span className="flag-big">{match.team1.flag}</span>
            <span className="team-name">{match.team1.name}</span>
          </div>
          <span className="vs-text">VS</span>
          <div className="team-option">
            <span className="flag-big">{match.team2.flag}</span>
            <span className="team-name">{match.team2.name}</span>
          </div>
        </div>

        <div className="prediction-options">
          <label className="option">
            <input
              type="radio"
              name="winner"
              value={match.team1.name}
              checked={selectedWinner === match.team1.name}
              onChange={(e) => setSelectedWinner(e.target.value)}
            />
            <span className="option-label">{match.team1.name} gagne</span>
          </label>

          <label className="option">
            <input
              type="radio"
              name="winner"
              value="Draw"
              checked={selectedWinner === 'Draw'}
              onChange={(e) => setSelectedWinner(e.target.value)}
            />
            <span className="option-label">Match nul</span>
          </label>

          <label className="option">
            <input
              type="radio"
              name="winner"
              value={match.team2.name}
              checked={selectedWinner === match.team2.name}
              onChange={(e) => setSelectedWinner(e.target.value)}
            />
            <span className="option-label">{match.team2.name} gagne</span>
          </label>
        </div>

        <div className="confidence-control">
          <label>Confiance: {(confidence * 100).toFixed(0)}%</label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={confidence}
            onChange={(e) => setConfidence(parseFloat(e.target.value))}
            className="confidence-slider"
          />
          <div className="confidence-labels">
            <span>Peu sûr</span>
            <span>Très sûr</span>
          </div>
        </div>

        <button className="btn-submit" onClick={handleSubmit} disabled={!selectedWinner}>
          📤 Valider la Prédiction
        </button>
      </div>
    </div>
  )
}

export default PredictionPanel
