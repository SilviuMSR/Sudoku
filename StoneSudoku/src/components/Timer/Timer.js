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

    componentWillReceiveProps(nextProps) {
        if (nextProps.levelCompleted) {
            clearImmediate(this.myInterval);
            this.props.setCompletedTime(this.state.countSeconds, this.state.countMinutes)
            this.setState({
                countSeconds: 0,
                countMinutes: 0
            })
        }
    }

    componentWillUnmount() {
        clearImmediate(this.myInterval);
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
                <Text style={styles.counterText}>{countMinutes < 10 ? `0${countMinutes}` : countMinutes}:{countSeconds < 10 ? `0${countSeconds}` : countSeconds}</Text>
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