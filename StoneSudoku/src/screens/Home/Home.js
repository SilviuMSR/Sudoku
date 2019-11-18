import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView, ImageBackground } from 'react-native';
import { connect } from 'react-redux';
import { getUniqueId } from 'react-native-device-info';

import HomeBackground from '../../assets/Background/good.png';
import ButtonsContainer from '../../assets/Others/homebuttonscontainer.png'
import ModalAbout from '../../components/Modal/AboutModal'
import RegisterModal from '../../components/Modal/RegisterModal'

import About from '../../assets/Buttons/aboutYellow.png'
import Profile from '../../assets/Buttons/profileYellow.png'
import OnTimeButton from '../../assets/Buttons/onTimeButton.png'
import SimpleButton from '../../assets/Buttons/simpleButton.png'

import * as DATABASE from '../../store/actions/database'
import * as LEVEL from '../../store/actions/level'
import CONSTANTS from '../../utils/constants'

const bottomElementSize = Math.floor(CONSTANTS.screenWidth / 7.5) - 2
const screenWidth = CONSTANTS.screenWidth
const screenHeight = CONSTANTS.screenHeight

class Home extends Component {
    static navigationOptions = {
        header: null,
    }

    state = {
        showAboutModal: false,
        notLogged: true,
        renderPage: false
    }

    componentWillMount() {
        this.props.openDatabaseConnection()
            .then(() =>
                this.props.createDatabaseTable()
                    .then(res => {
                        this.props.checkExistingUser(getUniqueId()).then(result => {
                            if (result.length) {
                                this.props.setConnectedUserName(result.item(0).name)
                                this.setState({ notLogged: false, renderPage: true })
                            }
                            else {
                                if (!res) return Promise.reject({
                                    message: 'CREATE_TABLE_FAIL'
                                })

                                CONSTANTS.EASY_LEVELS.forEach(level => {
                                    this.props.insertInTable(level)
                                })

                                CONSTANTS.MEDIUM_LEVELS.forEach(level => {
                                    this.props.insertInTable(level)
                                })

                                CONSTANTS.HARD_LEVELS.forEach(level => {
                                    this.props.insertInTable(level)
                                })
                                this.setState({ renderPage: true })
                            }
                        })
                    })
            )
    }

    navigatePreGameScreen = mode => {
        this.props.setGameMode(mode).then(() => this.props.navigation.navigate('PreGame'))
    }
    navigateProfileScreen = () => this.props.navigation.navigate('Profile');

    aboutModalHandler = () => {
        this.setState({ showAboutModal: true })
    }

    onRegisterHandler = username => {
        this.props.createUser(username, getUniqueId()).then(result => {
            this.props.setConnectedUserName(username).then(() => {
                this.setState({ notLogged: false })
            })
        })
    }

    render() {
        if (this.state.renderPage) {
            return (
                <SafeAreaView style={styles.max}>
                    <ImageBackground source={HomeBackground} style={styles.max} resizeMode='cover'>
                        <View style={styles.homeContainer}>
                            <View style={{ flex: 4, width: '100%', justifyContent: 'flex-end', alignItems: 'center' }}>
                                <ImageBackground imageStyle={{ height: screenHeight / 2 }} style={{ width: screenWidth - 75, height: screenHeight / 2 }} resizeMode='contain' source={ButtonsContainer}>
                                    <View style={styles.optionsContainer}>
                                        <TouchableOpacity style={[styles.optionButton, styles.onTimeGameButton]} onPress={() => this.navigatePreGameScreen(CONSTANTS.COUNTDOWN_GAME_MODE)}>
                                            <Image source={OnTimeButton} style={styles.imageStyle} resizeMode="contain" />
                                        </TouchableOpacity>
                                        <TouchableOpacity style={[styles.optionButton, styles.simpleGameButton]} onPress={() => this.navigatePreGameScreen(CONSTANTS.SIMPLE_GAME_MODE)}>
                                            <Image source={SimpleButton} style={styles.imageStyle} resizeMode="contain" />
                                        </TouchableOpacity>
                                    </View>
                                </ImageBackground>
                            </View>
                            <View style={styles.footerContainer}>
                                <View style={styles.aboutGame}>
                                    <TouchableOpacity style={styles.touchableOpacityFooter} onPress={this.aboutModalHandler}>
                                        <Image source={About} style={styles.imageStyleFooter} resizeMode="contain" />
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.profile}>
                                    <TouchableOpacity style={styles.touchableOpacityFooter} onPress={this.navigateProfileScreen}>
                                        <Image source={Profile} style={styles.imageStyleFooter} resizeMode="contain" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <ModalAbout
                                isVisible={this.state.showAboutModal}
                                onClose={() => this.setState({ showAboutModal: false })} />
                            <RegisterModal onRegister={username => this.onRegisterHandler(username)} isVisible={this.state.notLogged} />
                        </View>
                    </ImageBackground>
                </SafeAreaView>
            );
        }
        else return null
    }
}

const styles = StyleSheet.create({
    max: {
        width: '100%',
        height: '100%'
    },
    homeContainer: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    titleContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    optionsContainer: {
        flex: 4,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    optionButton: {
        width: '100%'
    },
    simpleGameButton: {
        width: '50%',
        height: '20%',
        justifyContent: 'flex-start',

    },
    onTimeGameButton: {
        width: '50%',
        height: '20%',
        justifyContent: 'flex-end',
    },
    footerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
        flexDirection: 'row',
        marginBottom: '2%'
    },
    aboutGame: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
        marginRight: '5%'
    },
    profile: {
        flex: 1,
        justifyContent: 'center',
    },
    touchableOpacityFooter: {
        height: bottomElementSize,
        width: bottomElementSize
    },
    imageStyle: {
        width: "100%",
        height: "100%"
    },
    imageStyleFooter: {
        width: "100%",
        height: "100%"
    }
})

const mapStateToProps = state => ({
    database: state.database
})

const mapDispatchToProps = dispatch => ({
    openDatabaseConnection: () => dispatch(DATABASE.openDatabaseConnection()),
    createDatabaseTable: () => dispatch(DATABASE.createDatabaseTable()),
    insertInTable: level => dispatch(DATABASE.insertInTable(level)),
    checkExistingUser: phoneId => dispatch(DATABASE.checkExistingUser(phoneId)),
    setConnectedUserName: username => dispatch(DATABASE.setConnectedUserName(username)),
    createUser: (username, phoneId) => dispatch(DATABASE.createUser(username, phoneId)),
    setGameMode: mode => dispatch(LEVEL.setGameMode(mode))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home); 