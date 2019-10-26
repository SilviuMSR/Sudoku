import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView, ImageBackground, FlatList } from 'react-native';
import { connect } from 'react-redux';
import axios from 'axios'

import PreGameBackground from '../../assets/Background/preGameBg.png'
import Back from '../../assets/Buttons/back.png'
import Easy from '../../assets/Buttons/easy.png'
import Medium from '../../assets/Buttons/medium.png'
import Hard from '../../assets/Buttons/hard.png'

import Level from '../../components/Level/Level'

import * as CONSTANTS from '../../utils/constants'
import * as LEVELS from '../../store/actions/level'

class PreGame extends Component {
    static navigationOptions = {
        header: null,
    }

    state = {
        activeLevel: "easy",
        levels: [
            {
                name: 'easy',
                active: true
            },
            {
                name: 'medium',
                active: false
            }, {
                name: 'hard',
                active: false
            }
        ],
        easy: [
            {
                id: 1,
                done: true,
                name: 'RUNDA 1',
                time: '01:25',
                lines: [
                    [{ number: '1', i: 0, j: 0 }, { number: '', i: 0, j: 1 },
                    { number: '2', i: 0, j: 2 }, { number: '3', i: 0, j: 3 }],
                    [{ number: '2', i: 1, j: 0 }, { number: '', i: 1, j: 1 },
                    { number: '2', i: 1, j: 2 }, { number: '2', i: 1, j: 3 }],
                    [{ number: '4', i: 2, j: 0 }, { number: '', i: 2, j: 1 },
                    { number: '', i: 2, j: 2 }, { number: '4', i: 2, j: 3 }],
                    [{ number: '7', i: 3, j: 0 }, { number: '', i: 3, j: 1 },
                    { number: '3', i: 3, j: 2 }, { number: '2', i: 3, j: 3 }]

                ]
            },
            {
                id: 2,
                done: true,
                name: 'RUNDA 2',
                time: '01:25',
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
            },

        ],
        medium: [
            {
                id: 5,
                done: false,
                name: 'RUNDA 5',
                time: null,
                lines: [
                    [{ number: '1', i: 0, j: 0 }, { number: '', i: 0, j: 1 },
                    { number: '1', i: 0, j: 2 }, { number: '3', i: 0, j: 3 }],
                    [{ number: '2', i: 1, j: 0 }, { number: '', i: 1, j: 1 },
                    { number: '', i: 1, j: 2 }, { number: '2', i: 1, j: 3 }],
                    [{ number: '4', i: 2, j: 0 }, { number: '', i: 2, j: 1 },
                    { number: '', i: 2, j: 2 }, { number: '1', i: 2, j: 3 }],
                    [{ number: '1', i: 3, j: 0 }, { number: '', i: 3, j: 1 },
                    { number: '3', i: 3, j: 2 }, { number: '', i: 3, j: 3 }],
                    [{ number: '1', i: 4, j: 0 }, { number: '', i: 4, j: 1 },
                    { number: '3', i: 4, j: 2 }, { number: '', i: 4, j: 3 }],
                    [{ number: '1', i: 5, j: 0 }, { number: '', i: 5, j: 1 },
                    { number: '3', i: 5, j: 2 }, { number: '', i: 5, j: 3 }]

                ]
            },
            {
                id: 6,
                done: true,
                name: 'RUNDA 6',
                time: '01:25',
                lines: [
                    [{ number: '1', i: 0, j: 0 }, { number: '', i: 0, j: 1 },
                    { number: '1', i: 0, j: 2 }, { number: '3', i: 0, j: 3 }],
                    [{ number: '2', i: 1, j: 0 }, { number: '', i: 1, j: 1 },
                    { number: '', i: 1, j: 2 }, { number: '2', i: 1, j: 3 }],
                    [{ number: '4', i: 2, j: 0 }, { number: '', i: 2, j: 1 },
                    { number: '', i: 2, j: 2 }, { number: '1', i: 2, j: 3 }],
                    [{ number: '1', i: 3, j: 0 }, { number: '', i: 3, j: 1 },
                    { number: '3', i: 3, j: 2 }, { number: '', i: 3, j: 3 }],
                    [{ number: '1', i: 4, j: 0 }, { number: '', i: 4, j: 1 },
                    { number: '3', i: 4, j: 2 }, { number: '', i: 4, j: 3 }],
                    [{ number: '1', i: 5, j: 0 }, { number: '', i: 5, j: 1 },
                    { number: '3', i: 5, j: 2 }, { number: '', i: 5, j: 3 }]

                ]
            }
        ],
        hard: [
            {
                id: 1,
                done: true,
                name: 'RUNDA 1',
                time: '01:25',
                lines: [
                    [{ number: '1', i: 0, j: 0 }, { number: '', i: 0, j: 1 },
                    { number: '1', i: 0, j: 2 }, { number: '3', i: 0, j: 3 }],
                    [{ number: '2', i: 1, j: 0 }, { number: '', i: 1, j: 1 },
                    { number: '', i: 1, j: 2 }, { number: '2', i: 1, j: 3 }],
                    [{ number: '4', i: 2, j: 0 }, { number: '', i: 2, j: 1 },
                    { number: '', i: 2, j: 2 }, { number: '1', i: 2, j: 3 }],
                    [{ number: '1', i: 3, j: 0 }, { number: '', i: 3, j: 1 },
                    { number: '3', i: 3, j: 2 }, { number: '', i: 3, j: 3 }],
                    [{ number: '1', i: 4, j: 0 }, { number: '', i: 4, j: 1 },
                    { number: '3', i: 4, j: 2 }, { number: '', i: 4, j: 3 }],
                    [{ number: '1', i: 5, j: 0 }, { number: '', i: 5, j: 1 },
                    { number: '3', i: 5, j: 2 }, { number: '', i: 5, j: 3 }],
                    [{ number: '1', i: 6, j: 0 }, { number: '', i: 6, j: 1 },
                    { number: '3', i: 6, j: 2 }, { number: '', i: 6, j: 3 }],
                    [{ number: '1', i: 7, j: 0 }, { number: '', i: 7, j: 1 },
                    { number: '3', i: 7, j: 2 }, { number: '', i: 7, j: 3 }]

                ]
            },
        ]
    }

    navigateHomeScreen = () => this.props.navigation.navigate('Home');
    navigateGameScreen = () => this.props.navigation.navigate('Game');

    selectLevelHandler = difficulty => {
        let levelsCopy = [...this.state.levels]
        let levelIndex = levelsCopy.findIndex(level => level.name === difficulty)

        if (levelIndex > -1) {
            levelsCopy.forEach(level => level.active = false)
            levelsCopy[levelIndex].active = true
            this.setState({
                levels: levelsCopy,
                activeLevel: difficulty
            })
        }
    }

    playGameHandler = levelId => {
        this.props.setDifficulty(this.state.activeLevel)
        this.props.setLevelId(levelId)
        this.navigateGameScreen()
    }

    render() {
        return (
            <SafeAreaView style={styles.max}>
                <ImageBackground source={PreGameBackground} style={styles.max} resizeMode='cover'>
                    <View style={styles.preGameContainer}>
                        <View style={styles.headerContainer}>
                            <View style={styles.headerOptions}>
                                <TouchableOpacity style={[styles.optionButton], { marginLeft: '8%' }} onPress={() => this.selectLevelHandler("easy")}>
                                    <Image source={Easy} style={[styles.imageStyle]} resizeMode="contain" />
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.optionButton], { marginLeft: '2%', marginRight: '2%' }} onPress={() => this.selectLevelHandler("medium")}>
                                    <Image source={Medium} style={styles.imageStyle} resizeMode="contain" />
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.optionButton], { marginRight: '10%' }} onPress={() => this.selectLevelHandler("hard")}>
                                    <Image source={Hard} style={styles.imageStyle} resizeMode="contain" />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.headerTitle}>
                                <Text style={styles.headerTitleText}>AI COMPLETAT 1/<Text>{this.state[this.state.activeLevel].length}</Text></Text>
                            </View>
                        </View>
                        <View style={styles.levelsContainer}>
                            <FlatList
                                contentContainerStyle={styles.list}
                                data={this.state[this.state.activeLevel].map(level => {
                                    return ({ ...level, key: level.id || '' })
                                })}
                                renderItem={({ item }) => <Level
                                    playGame={(levelId) => this.playGameHandler(levelId)}
                                    level={item}
                                    done={item.done || ''}
                                    name={item.name || ''}
                                    time={item.time || null}
                                />}
                            />
                        </View>
                        <View style={styles.footerContainer}>
                            <TouchableOpacity style={[styles.backButton]} onPress={this.navigateHomeScreen}>
                                <Image source={Back} style={styles.backButtonImage} resizeMode="contain" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </ImageBackground>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    max: {
        width: '100%',
        height: '100%'
    },
    list: {
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    preGameContainer: {
        flex: 1
    },
    headerContainer: {
        flex: 2,
    },
    headerOptions: {
        flex: 1,
        flexDirection: 'row',
        marginTop: '7%'
    },
    headerTitle: {
        flex: 1,
        marginTop: '10%',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    headerTitleText: {
        color: 'white',
        fontSize: 24,
        letterSpacing: 1,
        fontWeight: 'bold'
    },
    optionButton: {
        flex: 1
    },
    levelsContainer: {
        marginTop: "10%",
        flex: 5,
        flexDirection: 'row'
    },
    footerContainer: {
        flex: 0.5,
        marginBottom: '1%',
    },
    imageStyle: {
        width: 110,
        height: 120
    },
    backButtonImage: {
        height: '100%',
        width: '100%'
    },
    backButton: {
        width: '20%',
        height: '100%'
    }
})

const mapStateToProps = state => ({
    level: state.level
})

const mapDispatchToProps = dispatch => ({
    setDifficulty: difficultyLevel => dispatch(LEVELS.setDifficulty(difficultyLevel)),
    setLevelId: levelId => dispatch(LEVELS.setLevelId(levelId))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PreGame); 