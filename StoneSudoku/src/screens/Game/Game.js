import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

import BaseScreen from '../../components/BaseScreen/BaseScreen';
import RenderMatrix from '../../components/RenderMatrix/RenderMatrix'


import axios from 'axios'

import Back from '../../assets/Buttons/back.png'

class Game extends Component {
    static navigationOptions = {
        header: null,
    }

    state = {
        lines: [
            [{ number: '1', i: 0, j: 0 }, { number: '', i: 0, j: 1 },
            { number: '1', i: 0, j: 2 }, { number: '3', i: 0, j: 3 }],
            [{ number: '2', i: 1, j: 0 }, { number: '', i: 1, j: 1 },
            { number: '', i: 1, j: 2 }, { number: '2', i: 1, j: 3 }],
            [{ number: '4', i: 2, j: 0 }, { number: '', i: 2, j: 1 },
            { number: '', i: 2, j: 2 }, { number: '1', i: 2, j: 3 }],
            [{ number: '1', i: 3, j: 0 }, { number: '', i: 3, j: 1 },
            { number: '3', i: 3, j: 2 }, { number: '', i: 3, j: 3 }]

        ]
    }

    componentDidMount() {
        // get level wtih difficulty and levelid set in redux and set it in state
    }

    navigatePreGameScreen = () => this.props.navigation.navigate('PreGame');

    modifyCellContent = (i, j) => {
        let linesCopy = [...this.state.lines]
        linesCopy.forEach(line => {
            let iIndex = line.findIndex(idx => idx.i === i)
            let jIndex = line.findIndex(idx => idx.j === j)

            if (iIndex > -1 && jIndex > -1) {
                line.forEach(subline => {
                    if (subline.i === i && subline.j === j) {
                        subline.number = 9
                    }
                })
            }
        })

        this.setState({ lines: linesCopy })
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
                        </View>
                    </View>
                    <View style={styles.matrixContainer}>
                        <RenderMatrix size={6} lines={this.state.lines} modifyCell={(i, j) => this.modifyCellContent(i, j)} />
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
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center'
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