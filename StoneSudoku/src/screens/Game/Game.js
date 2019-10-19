import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ImageBackground, Button } from 'react-native';
import { connect } from 'react-redux';

import BaseScreen from '../../components/BaseScreen/BaseScreen';
import RenderMatrix from '../../components/RenderMatrix/RenderMatrix'

import CONSTANTS from '../../utils/constants'

import TopBar from '../../assets/Others/topBar.png'
import Board from '../../assets/Others/board.png'
import StoneSquare from '../../assets/Buttons/stoneSquare.png'
import CancelButton from '../../assets/Buttons/xButton.png'
import ResetButton from '../../assets/Buttons/reset.png'


class Game extends Component {
    static navigationOptions = {
        header: null,
    }

    state = {
        lines: [
            [{ number: '1', i: 0, j: 0 }, { number: '', i: 0, j: 1 },
            { number: '', i: 0, j: 2 }, { number: '3', i: 0, j: 3 }],

            [{ number: '', i: 1, j: 0 }, { number: '', i: 1, j: 1 },
            { number: '', i: 1, j: 2 }, { number: '', i: 1, j: 3 }],

            [{ number: '4', i: 2, j: 0 }, { number: '', i: 2, j: 1 },
            { number: '', i: 2, j: 2 }, { number: '1', i: 2, j: 3 }],

            [{ number: '3', i: 3, j: 0 }, { number: '', i: 3, j: 1 },
            { number: '', i: 3, j: 2 }, { number: '', i: 3, j: 3 }],
        ],
        keyboard: [],
        predfinedPositions: [],
        deleteOption: false,
        pressedKey: null
    }

    componentDidMount() {
        // set keyboard
        this.setState({
            keyboard: CONSTANTS.KEYBOARD
        })
        this.setPredefinedPositions()
        // get level wtih difficulty and levelid set in redux and set it in state
    }

    navigatePreGameScreen = () => this.props.navigation.navigate('PreGame');

    deleteNumber = (i, j) => {
        if (this.checkExistInPredefinedPositions(i, j)) {
            alert('You can t delete predefined positions')
            return
        }
        let linesCopy = [...this.state.lines]
        linesCopy.forEach(line => {
            let iIndex = line.findIndex(idx => idx.i === i)
            let jIndex = line.findIndex(idx => idx.j === j)

            if (iIndex > -1 && jIndex > -1) {
                line.forEach(subline => {
                    if (subline.i === i && subline.j === j) {
                        subline.number = ''
                    }
                })
            }
        })

        this.setState({ lines: linesCopy })
    }

    checkExistInPredefinedPositions = (i, j) => {
        let iIndex = this.state.predfinedPositions.findIndex(idx => idx.i === i)
        let jIndex = this.state.predfinedPositions.findIndex(idx => idx.j === j)

        if (iIndex > -1 && jIndex > -1) {
            return true
        }

        return false
    }

    setPredefinedPositions = () => {
        let sublines = []
        this.state.lines.forEach(line => {
            line.forEach(subline => sublines.push(subline))
        })
        let filterSublines = sublines.filter(field => field.number !== '')
        filterSublines = filterSublines.map(subline => {
            return ({
                i: subline.i,
                j: subline.j
            })
        })

        this.setState({
            predfinedPositions: filterSublines
        })
    }

    resetState = () => {
        this.setState({
            lines: [
                [{ number: '1', i: 0, j: 0 }, { number: '', i: 0, j: 1 },
                { number: '', i: 0, j: 2 }, { number: '3', i: 0, j: 3 }],

                [{ number: '', i: 1, j: 0 }, { number: '', i: 1, j: 1 },
                { number: '', i: 1, j: 2 }, { number: '', i: 1, j: 3 }],

                [{ number: '4', i: 2, j: 0 }, { number: '', i: 2, j: 1 },
                { number: '', i: 2, j: 2 }, { number: '1', i: 2, j: 3 }],

                [{ number: '3', i: 3, j: 0 }, { number: '', i: 3, j: 1 },
                { number: '', i: 3, j: 2 }, { number: '', i: 3, j: 3 }],
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
        if (!this.state.pressedKey && !this.state.deleteOption) {
            alert('You have to select a number')
            return
        }

        if (this.state.deleteOption) {
            this.deleteNumber(i, j)
        }
        else {
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
            deleteOption: false,
            keyboard: keyboardCopy
        })
    }

    render() {
        return (
            <BaseScreen>
                <View style={styles.gameContainer}>
                    <View style={styles.gameDetailsContainer}>
                        <ImageBackground source={TopBar} style={{ width: '100%', height: '85%', display: 'flex', flexDirection: 'row' }}>
                            <TouchableOpacity onPress={this.resetState} style={{ width: 50, height: 50 }}>
                                <Image source={ResetButton} style={{ width: 50, height: 50 }} />
                            </TouchableOpacity>
                            <Text style={{ color: 'white', fontSize: 26, fontWeight: 'bold', marginLeft: '32%' }}>00:00</Text>
                            <TouchableOpacity onPress={this.navigatePreGameScreen} style={{ width: 50, height: 50, marginLeft: 'auto' }}>
                                <Image source={CancelButton} style={{ width: 50, height: 50 }} />
                            </TouchableOpacity>
                        </ImageBackground>
                    </View>
                    <View style={styles.matrixContainer}>
                        <ImageBackground source={Board} style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }} resizeMode="stretch">
                            <RenderMatrix selectedNumber={this.state.pressedKey} size={this.props.level.difficulty === 'easy' ? 6 : this.props.level.difficulty === 'medium' ? 8 : 11} lines={this.state.lines} modifyCell={(i, j) => this.modifyCellContent(i, j)} />
                        </ImageBackground>
                    </View>
                    <View style={styles.keyboardContainer}>
                        <Button title="delete" onPress={() => this.setState({ deleteOption: true, pressedKey: null })}></Button>
                        {
                            this.state.keyboard.slice(0, this.state.lines.length).map(key => {
                                return (
                                    <TouchableOpacity onPress={() => this.onKeyPressHandler(key.number)} style={[styles.center, { width: 40, height: 50, paddingRight: '1%' }]}>
                                        <ImageBackground source={StoneSquare} style={[styles.center, styles.max]} resizeMode='stretch'>
                                            <Text style={{ color: 'white', fontSize: 30, fontWeight: 'bold', position: 'relative', bottom: '5%' }}>{key.number}</Text>
                                        </ImageBackground>
                                    </TouchableOpacity>
                                )
                            })
                        }
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
        alignItems: "center"
    },
    gameDetailsOption: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    matrixContainer: {
        flex: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    keyboardContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: "center"
    },

    aboutGame: {
        flex: 1,
        justifyContent: 'center',
    },
    max: {
        width: '100%',
        height: '100%'
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center'
    }
})

const mapStateToProps = state => ({
    level: state.level
})

const mapDispatchToProps = dispatch => ({
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Game); 