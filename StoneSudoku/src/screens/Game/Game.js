import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ImageBackground, Button } from 'react-native';

import BaseScreen from '../../components/BaseScreen/BaseScreen';
import RenderMatrix from '../../components/RenderMatrix/RenderMatrix'

import CONSTANTS from '../../utils/constants'

import One from '../../assets/Numbers/1.png'
import Two from '../../assets/Numbers/2.png'
import Three from '../../assets/Numbers/3.png'
import Four from '../../assets/Numbers/4.png'
import Five from '../../assets/Numbers/5.png'
import Six from '../../assets/Numbers/6.png'
import Seven from '../../assets/Numbers/7.png'
import Eight from '../../assets/Numbers/8.png'
import Nine from '../../assets/Numbers/9.png'

import Back from '../../assets/Buttons/back.png'

class Game extends Component {
    static navigationOptions = {
        header: null,
    }

    state = {
        lines: [
            [{ number: '1', i: 0, j: 0 }, { number: '', i: 0, j: 1 },
            { number: '', i: 0, j: 2 }, { number: '3', i: 0, j: 3 }],
            [{ number: '', i: 1, j: 0 }, { number: '', i: 1, j: 1 },
            { number: '', i: 1, j: 2 }, { number: '2', i: 1, j: 3 }],
            [{ number: '4', i: 2, j: 0 }, { number: '', i: 2, j: 1 },
            { number: '', i: 2, j: 2 }, { number: '1', i: 2, j: 3 }],
            [{ number: '', i: 3, j: 0 }, { number: '', i: 3, j: 1 },
            { number: '3', i: 3, j: 2 }, { number: '', i: 3, j: 3 }]
        ],
        keyboard: [],
        pressedKey: null
    }

    componentDidMount() {
        // set keyboard
        this.setState({
            keyboard: CONSTANTS.KEYBOARD
        })
        // get level wtih difficulty and levelid set in redux and set it in state
    }

    navigatePreGameScreen = () => this.props.navigation.navigate('PreGame');

    resetState = () => {
        this.setState({
            lines: [
                [{ number: '1', i: 0, j: 0 }, { number: '', i: 0, j: 1 },
                { number: '', i: 0, j: 2 }, { number: '3', i: 0, j: 3 }],
                [{ number: '', i: 1, j: 0 }, { number: '', i: 1, j: 1 },
                { number: '', i: 1, j: 2 }, { number: '2', i: 1, j: 3 }],
                [{ number: '4', i: 2, j: 0 }, { number: '', i: 2, j: 1 },
                { number: '', i: 2, j: 2 }, { number: '1', i: 2, j: 3 }],
                [{ number: '', i: 3, j: 0 }, { number: '', i: 3, j: 1 },
                { number: '3', i: 3, j: 2 }, { number: '', i: 3, j: 3 }]
            ],
            pressedKey: null
        })
    }

    checkGameFinished = () => {
        let sublines = []
        this.state.lines.forEach(line => {
            line.forEach(subline => sublines.push(subline))
        })
        let filterSublines = sublines.map(subline => subline.number).filter(number => number === '')
        return filterSublines.length ? false : true
    }

    checkAlreadyExistInLinesOrColumn = searchIn => {
        if (this.state.pressedKey) {
            let filterResult = searchIn.map(field => field.number).filter(number => parseInt(number) === this.state.pressedKey)
            return filterResult.length ? true : false
        }
    }

    getAssociatedColumn = j => {
        let linesCopy = [...this.state.lines]
        let associatedColumn = []
        linesCopy.forEach(line => {
            let jIndex = line.findIndex(idx => idx.j === j)

            if (jIndex > -1) {
                line.forEach(subline => {
                    if (subline.j === j) {
                        associatedColumn.push(subline)
                    }
                })
            }
        })

        return associatedColumn
    }

    modifyCellContent = (i, j) => {
        if (!this.state.pressedKey) {
            alert('You have to select a number')
            return
        }
        let linesCopy = [...this.state.lines]
        linesCopy.forEach(line => {
            let iIndex = line.findIndex(idx => idx.i === i)
            let jIndex = line.findIndex(idx => idx.j === j)

            if (iIndex > -1 && jIndex > -1) {
                let lineCheck = this.checkAlreadyExistInLinesOrColumn(line)
                let associatedColumn = this.getAssociatedColumn(j)
                let columnCheck = this.checkAlreadyExistInLinesOrColumn(associatedColumn)
                if (!lineCheck && !columnCheck) {
                    line.forEach(subline => {
                        if (subline.i === i && subline.j === j) {
                            subline.number = this.state.pressedKey
                            let gameFinished = this.checkGameFinished()
                            if (gameFinished) {
                                alert('Game finished')
                                this.resetState()
                            }
                        }
                    })
                }
                else {
                    alert('Wrong position')
                    return
                }
            }
        })

        this.setState({ lines: linesCopy })
    }

    onKeyPressHandler = pressedKey => {
        let keyboardCopy = [...this.state.keyboard]
        let pressedKeyIndex = keyboardCopy.findIndex(idx => idx.number === pressedKey)

        if (pressedKeyIndex > -1) {
            keyboardCopy = keyboardCopy.map(key => {
                return {
                    number: key.number,
                    pressed: false
                }
            })
            keyboardCopy[pressedKeyIndex].pressed = true
        }

        this.setState({
            pressedKey,
            keyboard: keyboardCopy
        })
    }

    render() {
        return (
            <BaseScreen>
                <View style={styles.gameContainer}>
                    <View style={styles.gameDetailsContainer}>
                        <View style={styles.gameDetailsOption}>
                            <Text>RUNDA 1</Text>
                        </View>
                        <View style={styles.gameDetailsOption}>
                            <Text>TIMER</Text>
                            <Button title="Reset" onPress={this.resetState} />
                        </View>
                    </View>
                    <View style={styles.matrixContainer}>
                        <RenderMatrix size={6} lines={this.state.lines} modifyCell={(i, j) => this.modifyCellContent(i, j)} />
                    </View>
                    <View style={styles.keyboardContainer}>
                        {
                            this.state.keyboard.map(key => {
                                if (key.number === 1) {
                                    return (
                                        <ImageBackground source={One} style={{ width: 40, height: 40 }} resizeMode="center">
                                            <TouchableOpacity style={{ width: '100%', height: '100%' }} onPress={() => this.onKeyPressHandler(key.number)} />
                                        </ImageBackground>
                                    )
                                }
                                if (key.number === 2) {
                                    return (
                                        <ImageBackground source={Two} style={{ width: 40, height: 40 }} resizeMode="center" >
                                            <TouchableOpacity style={{ width: '100%', height: '100%' }} onPress={() => this.onKeyPressHandler(key.number)} />
                                        </ImageBackground>)
                                }
                                if (key.number === 3) {
                                    return (
                                        <ImageBackground source={Three} style={{ width: 40, height: 40 }} resizeMode="center" >
                                            <TouchableOpacity style={{ width: '100%', height: '100%' }} onPress={() => this.onKeyPressHandler(key.number)} />
                                        </ImageBackground>
                                    )
                                }
                                if (key.number === 4) {
                                    return (
                                        <ImageBackground source={Four} style={{ width: 40, height: 40 }} resizeMode="center" >
                                            <TouchableOpacity style={{ width: '100%', height: '100%' }} onPress={() => this.onKeyPressHandler(key.number)} />
                                        </ImageBackground>
                                    )
                                }
                                if (key.number === 5) {
                                    return (
                                        <ImageBackground source={Five} style={{ width: 40, height: 40 }} resizeMode="center" >
                                            <TouchableOpacity style={{ width: '100%', height: '100%' }} onPress={() => this.onKeyPressHandler(key.number)} />
                                        </ImageBackground>
                                    )
                                }
                                if (key.number === 6) {
                                    return (
                                        <ImageBackground source={Six} style={{ width: 40, height: 40 }} resizeMode="center" >
                                            <TouchableOpacity style={{ width: '100%', height: '100%' }} onPress={() => this.onKeyPressHandler(key.number)} />
                                        </ImageBackground>
                                    )
                                }
                                if (key.number === 7) {
                                    return (
                                        <ImageBackground source={Seven} style={{ width: 40, height: 40 }} resizeMode="center" >
                                            <TouchableOpacity style={{ width: '100%', height: '100%' }} onPress={() => this.onKeyPressHandler(key.number)} />
                                        </ImageBackground>
                                    )
                                }
                                if (key.number === 8) {
                                    return (
                                        <ImageBackground source={Eight} style={{ width: 40, height: 40 }} resizeMode="center" >
                                            <TouchableOpacity style={{ width: '100%', height: '100%' }} onPress={() => this.onKeyPressHandler(key.number)} />
                                        </ImageBackground>
                                    )
                                }
                                if (key.number === 9) {
                                    return (
                                        <ImageBackground source={Nine} style={{ width: 40, height: 40 }} resizeMode="center" >
                                            <TouchableOpacity style={{ width: '100%', height: '100%' }} onPress={() => this.onKeyPressHandler(key.number)} />
                                        </ImageBackground>
                                    )
                                }
                            })
                        }
                    </View>
                    <View style={styles.footerContainer}>
                        <View style={styles.aboutGame}>
                            <TouchableOpacity style={{ height: 60, width: 60, marginLeft: '8%' }} onPress={this.navigatePreGameScreen}>
                                <Image source={Back} style={{ height: "100%", width: "100%" }} resizeMode="contain" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </BaseScreen>
        );
    }
}

const styles = StyleSheet.create({
    gameContainer: {
        flex: 1
    },
    gameDetailsContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: "center"
    },
    gameDetailsOption: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    matrixContainer: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    keyboardContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: "flex-end"
    },
    footerContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        flexDirection: 'row'
    },

    aboutGame: {
        flex: 1,
        justifyContent: 'center',
    }
})

export default Game;