import React from 'react';


class Timer extends React.Component {
    state = {
        time: this.props.time,
        isActive: false,
        isFinished: false
    }

    componentDidMount = () => {
        if (this.props.autostart) {
            this.startTimer();
        }
    }

    countdown = () => {
        return (
            this.setState(
                (prevState)=>({
                    time: prevState.time - this.props.step,
                })
            ))
    }

    startTimer = () =>{
        if(!this.state.isActive){
             this.timer = setInterval(this.countdown, this.props.step);
                if(this.props.onTimeStart) this.props.onTimeStart();  
        } else {
            clearInterval(this.timer);
                if(this.props.onTimePause) this.props.onTimePause();
        }
        this.setState((prevState)=>({
            isActive: !prevState.isActive
        }))
    }


    displayTime = (ms) =>{
        if(ms <= 1){      
            clearInterval(this.timer);
            this.setState({
                isFinished: true
            })
                if(this.props.onTimeEnd) this.props.onTimeEnd()
        }

        let sec = parseInt((ms / 1000) % 60),
        min = parseInt((ms / (1000 * 60)) % 60),
        hour = parseInt((ms / (1000 * 60 * 60)) % 24);


        if(this.props.onTick && ms > 1 && this.state.isActive) this.props.onTick(sec);

        hour = (hour < 10) ? '0' + hour : hour;
        min = (min < 10) ? '0' + min : min;
        sec = (sec < 10) ? '0' + sec : sec;

    return hour + ':' + min + ':' + sec;
    }

    render() {
        return (
            <div className= 'timer-wrapper'>
                <button className= {this.state.isActive ? 'start-button pause' : 'start-button'} onClick={this.startTimer}>
                    {this.state.isActive ? 'Pause' : 'Start'}
                </button>
                <span className='timer'>{this.state.isFinished ? 'Finish' : this.displayTime(this.state.time)}</span>
                <div className= {this.state.isActive ? 'timer-bar' : 'timer-bar paused'} style={{animationDuration: this.props.time + 'ms'}}> 
                </div>
            </div>
        )
    }
}

export default Timer;