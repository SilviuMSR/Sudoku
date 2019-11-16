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

import CONSTANTS from '../../utils/constants'
import * as LEVELS from '../../store/actions/level'
import * as DATABASE from '../../store/actions/database'

const size = CONSTANTS.screenWidth

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

        ],
        medium: [

        ],
        hard: [

        ]
    }

    navigateHomeScreen = () => this.props.navigation.navigate('Home');
    navigateGameScreen = () => this.props.navigation.navigate('Game');

    fetchLevels = () => {
        this.props.getFromTable().then(res => {
            let easyLevels = []
            let mediumLevels = []
            let hardLevels = []

            for (let i = 0; i < res.length; i++) {
                switch (res.item(i).difficulty) {
                    case 'easy':
                        easyLevels = easyLevels.concat(res.item(i))
                        break
                    case 'medium':
                        mediumLevels = mediumLevels.concat(res.item(i))
                        break
                    case 'hard':
                        hardLevels = hardLevels.concat(res.item(i))
                        break
                }
            }

            this.setState({
                easy: easyLevels,
                medium: mediumLevels,
                hard: hardLevels
            })
        })
    }

    componentDidMount() {
        this.fetchLevels()
    }

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
                            <View style={[styles.headerOptions, { width: size }]}>
                                <TouchableOpacity style={[styles.optionButton], {}} onPress={() => this.selectLevelHandler("easy")}>
                                    <Image source={Easy} style={[styles.imageStyle]} resizeMode="contain" />
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.optionButton], {}} onPress={() => this.selectLevelHandler("medium")}>
                                    <Image source={Medium} style={styles.imageStyle} resizeMode="contain" />
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.optionButton], {}} onPress={() => this.selectLevelHandler("hard")}>
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
        position: 'relative',
        flexDirection: 'row',
        justifyContent: 'center',
        top: '14%'
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
        marginRight: 8,
        width: size / 4,
        height: size / 7.5
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
    setLevelId: levelId => dispatch(LEVELS.setLevelId(levelId)),
    getFromTable: () => dispatch(DATABASE.getFromTable())
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PreGame); 