import React, { Component } from 'react';
import { StyleSheet, Animated, Text } from 'react-native';

import CONSTANTS from '../../utils/constants'

let SCALE_VALUE = 1;
const elementSize = Math.floor(CONSTANTS.screenWidth / 10) - 2
const textSize = Math.floor(elementSize * 2 / 3)

export default class Timer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            count: this.props.count,
            countSeconds: 0,
            countMinutes: 0,
            animation: new Animated.Value(1)
        }
    }

    componentDidMount() {
        this.animation();
        if (this.props.gameMode === CONSTANTS.SIMPLE_GAME_MODE) {
            this.myInterval = setInterval(() => {
                this.animation()
                this.setState(
                    prevState => ({
                        countSeconds: prevState.countSeconds === 59 ? 0 : prevState.countSeconds + 1,
                        countMinutes: prevState.countSeconds === 59 ? prevState.countMinutes + 1 : prevState.countMinutes,
                    }), () => this.props.onTimeExpired(this.state.count)
                )
            }, 1000);
        }
        else {
            this.myIntervalCountdown = setInterval(() => {
                this.animation()
                this.setState(
                    prevState => ({
                        count: prevState.count - 1
                    }), () => this.props.onTimeExpired(this.state.count)
                )
            }, 1000);
        }
    }

    componentWillReceiveProps(nextProps) {
        let secondsRemainder = this.state.countSeconds
        let minutesRemainder = this.state.countMinutes
        let countDownReminder = this.state.count
        if (nextProps.levelCompleted) {
            if (this.props.gameMode === CONSTANTS.SIMPLE_GAME_MODE) {
                clearImmediate(this.myInterval);
                this.props.setCompletedTime(this.state.countSeconds, this.state.countMinutes)
                this.setState({
                    countSeconds: 0,
                    countMinutes: 0
                })
            }
            else {
                clearImmediate(this.myIntervalCountdown);
                this.props.setCompletedTime(this.state.count)
                this.setState({
                    count: this.props.count
                })
            }
        }
        if (nextProps.isPaused) {
            if (this.props.gameMode === CONSTANTS.SIMPLE_GAME_MODE) {
                clearImmediate(this.myInterval);
            }
            else clearImmediate(this.myIntervalCountdown)
        }
        if ((!this.props.isReseted && nextProps.isReseted)) {
            if (this.props.gameMode === CONSTANTS.SIMPLE_GAME_MODE) {
                clearImmediate(this.myInterval);
                this.setState({
                    countSeconds: 0,
                    countMinutes: 0
                }, () => {
                    this.myInterval = setInterval(() => {
                        this.animation()
                        this.setState(
                            prevState => ({
                                countSeconds: prevState.countSeconds === 59 ? 0 : prevState.countSeconds + 1,
                                countMinutes: prevState.countSeconds === 59 ? prevState.countMinutes + 1 : prevState.countMinutes,
                            }), () => this.props.onTimeExpired(this.state.count)
                        )
                    }, 1000);
                })
            }
            else {
                clearImmediate(this.myIntervalCountdown);
                this.setState({
                    count: this.props.count,
                }, () => {
                    this.myIntervalCountdown = setInterval(() => {
                        this.animation()
                        this.setState(
                            prevState => ({
                                count: prevState.count - 1
                            }), () => this.props.onTimeExpired(this.state.count)
                        )
                    }, 1000);
                })
            }
        }
        else if ((!nextProps.isPaused && this.props.isPaused)) {
            if (this.props.gameMode === CONSTANTS.SIMPLE_GAME_MODE) {
                this.setState({
                    countSeconds: secondsRemainder,
                    countMinutes: minutesRemainder
                }, () => {
                    this.myInterval = setInterval(() => {
                        this.animation()
                        this.setState(
                            prevState => ({
                                countSeconds: prevState.countSeconds === 59 ? 0 : prevState.countSeconds + 1,
                                countMinutes: prevState.countSeconds === 59 ? prevState.countMinutes + 1 : prevState.countMinutes,
                            }), () => this.props.onTimeExpired(this.state.count)
                        )
                    }, 1000);
                })
            }
            else {
                this.setState({
                    count: countDownReminder
                }, () => {
                    this.myIntervalCountdown = setInterval(() => {
                        this.animation()
                        this.setState(
                            prevState => ({
                                count: prevState.count - 1,
                            }), () => this.props.onTimeExpired(this.state.count)
                        )
                    }, 1000);
                })
            }
        }
        if (nextProps.isWarning) {
            if (this.props.gameMode === CONSTANTS.SIMPLE_GAME_MODE) {
                clearImmediate(this.myInterval);
            }
            else clearImmediate(this.myIntervalCountdown)
        }
        else if (!nextProps.isWarning && this.props.isWarning) {
            if (this.props.gameMode === CONSTANTS.SIMPLE_GAME_MODE) {
                this.setState({
                    countSeconds: secondsRemainder,
                    countMinutes: minutesRemainder
                }, () => {
                    this.myInterval = setInterval(() => {
                        this.animation()
                        this.setState(
                            prevState => ({
                                countSeconds: prevState.countSeconds === 59 ? 0 : prevState.countSeconds + 1,
                                countMinutes: prevState.countSeconds === 59 ? prevState.countMinutes + 1 : prevState.countMinutes,
                            }), () => this.props.onTimeExpired(this.state.count)
                        )
                    }, 1000);
                })
            }
            else {
                this.setState({
                    count: countDownReminder
                }, () => {
                    this.myIntervalCountdown = setInterval(() => {
                        this.animation()
                        this.setState(
                            prevState => ({
                                count: prevState.count - 1,
                            }), () => this.props.onTimeExpired(this.state.count)
                        )
                    }, 1000);
                })
            }
        }
    }

    componentWillUnmount() {
        clearImmediate(this.myInterval);
        clearImmediate(this.myIntervalCountdown)
        SCALE_VALUE = 1;
    }

    animation = () => {
        Animated.timing(this.state.animation, {
            toValue: SCALE_VALUE,
            duration: 500,
            useNativeDriver: true
        }).start(() => Animated.timing(this.state.animation, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true
        }).start())
    }

    displayCountdown = () => {
        if (this.state.count <= 59) return <Text style={styles.counterText}>00:{this.state.count}</Text>
        else {
            let divider = this.state.count / 60
            if (divider % 2 === 0) {
                let seconds = this.state.count - (divider * 60)
                return <Text style={styles.counterText}>{divider < 10 ? `0${divider}:${seconds < 10 ? `0${seconds}` : seconds}` : `${divider}:${seconds < 10 ? `0${seconds}` : seconds}`}</Text>
            }
            else {
                let seconds = this.state.count - (Math.floor(divider) * 60)
                return <Text style={styles.counterText}>{divider < 10 ? `0${Math.floor(divider)}:${seconds < 10 ? `0${seconds}` : seconds}` : `${Math.floor(divider)}:${seconds < 10 ? `0${seconds}` : seconds}`}</Text>
            }
        }
    }

    render() {
        const { countSeconds, countMinutes } = this.state;

        const timerAnimationStyle = {
            transform: [
                {
                    scale: this.state.animation
                }
            ]
        }

        return (
            <Animated.View style={[this.props.style, timerAnimationStyle]}>
                {this.props.gameMode === CONSTANTS.SIMPLE_GAME_MODE ? <Text style={styles.counterText}>{countMinutes < 10 ? `0${countMinutes}` : countMinutes}:{countSeconds < 10 ? `0${countSeconds}` : countSeconds}</Text> :
                    <Text style={styles.counterText}>{this.displayCountdown()}</Text>}
            </Animated.View>
        );
    }
}

const styles = StyleSheet.create({
    counterText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: textSize
    }
});