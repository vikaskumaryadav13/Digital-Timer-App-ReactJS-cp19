// Write your code here
import {Component} from 'react'
import './index.css'

const START_URL = 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
const PAUSE_URL = 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'

class DigitalTimer extends Component {
  state = {
    timerLimit: 25,
    minutes: 25,
    seconds: 0,
    timerRunning: false,
  }

  startTimer = () => {
    const {seconds, timerRunning, timerLimit} = this.state
    let {minutes} = this.state
    if (minutes === 0) {
      minutes = timerLimit
    }
    if (!timerRunning) {
      let totalSeconds = minutes * 60 + seconds

      this.setState(prevState => ({
        timerRunning: !prevState.timerRunning,
      }))

      this.timerId = setInterval(() => {
        totalSeconds -= 1
        const min = Math.floor(totalSeconds / 60)
        const sec = totalSeconds % 60
        this.setState({minutes: min, seconds: sec})
        if (min === 0 && sec === 0) {
          clearInterval(this.timerId)
          this.setState({timerRunning: false})
        }
      }, 1000)
    } else {
      clearInterval(this.timerId)
      this.setState(prevState => ({
        timerRunning: !prevState.timerRunning,
      }))
    }
  }

  onClickReset = () => {
    clearInterval(this.timerId)
    this.setState(prevState => ({
      minutes: prevState.timerLimit,
      seconds: 0,
      timerRunning: false,
    }))
  }

  onClickPlus = () =>
    this.setState(prevState => ({
      timerLimit: prevState.timerLimit + 1,
      minutes: prevState.timerLimit + 1,
    }))

  onClickMinus = () => {
    const {timerLimit} = this.state
    let newTimerLimit = timerLimit
    if (timerLimit > 1) {
      newTimerLimit -= 1
    }
    this.setState({timerLimit: newTimerLimit, minutes: newTimerLimit})
  }

  render() {
    const {timerLimit, timerRunning, minutes, seconds} = this.state
    const startPauseText = timerRunning ? 'Pause' : 'Start'
    const startPauseIcon = timerRunning ? PAUSE_URL : START_URL
    const startPauseAltText = timerRunning ? 'pause icon' : 'play icon'
    const timerStatusText = timerRunning ? 'Running' : 'Paused'

    return (
      <div className="app-bg-container">
        <h1 className="app-main-heading">Digital Timer</h1>
        <div className="main-container">
          <div className="timer-bg-container">
            <div className="timer-container">
              <h1 className="timer-text">
                {minutes < 10 ? `0${minutes}` : minutes}:
                {seconds < 10 ? `0${seconds}` : seconds}
              </h1>
              <p className="timer-status">{timerStatusText}</p>
            </div>
          </div>
          <div className="timer-controls-container">
            <div className="start-reset-container">
              <div className="start-reset-item">
                <button
                  className="start-reset-button start-reset-text"
                  type="button"
                  onClick={this.startTimer}
                >
                  <img
                    className="timer-control-icon"
                    src={startPauseIcon}
                    alt={startPauseAltText}
                  />
                  {startPauseText}
                </button>
              </div>
              <div className="start-reset-item">
                <button
                  className="start-reset-button start-reset-text"
                  type="button"
                  onClick={this.onClickReset}
                >
                  <img
                    className="timer-control-icon"
                    src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                    alt="reset icon"
                  />
                  Reset
                </button>
              </div>
            </div>
            <p className="timer-limit-text">Set Timer Limit</p>
            <div className="limit-control-container">
              <button
                className="plus-minus-button"
                type="button"
                onClick={this.onClickMinus}
                disabled={timerRunning}
              >
                -
              </button>
              <p className="limit-number">{timerLimit}</p>
              <button
                className="plus-minus-button"
                type="button"
                onClick={this.onClickPlus}
                disabled={timerRunning}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
