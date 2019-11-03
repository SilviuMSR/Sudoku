import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView, ImageBackground } from 'react-native';
import { connect } from 'react-redux';
import { getUniqueId } from 'react-native-device-info';

import HomeBackground from '../../assets/Background/goodBg.png';
import ModalAbout from '../../components/Modal/AboutModal'
import RegisterModal from '../../components/Modal/RegisterModal'

import About from '../../assets/Buttons/aboutYellow.png'
import Profile from '../../assets/Buttons/profileYellow.png'
import OnTimeButton from '../../assets/Buttons/onTimeButton.png'
import SimpleButton from '../../assets/Buttons/simpleButton.png'

import * as DATABASE from '../../store/actions/database'
import CONSTANTS from '../../utils/constants'

class Home extends Component {
    static navigationOptions = {
        header: null,
    }

    state = {
        showAboutModal: false,
        notLogged: true
    }

    componentWillMount() {
        this.props.openDatabaseConnection()
            .then(() =>
                this.props.createDatabaseTable()
                    .then(res => {
                        this.props.checkExistingUser(getUniqueId()).then(result => {
                            if (result.length) {
                                this.props.setConnectedUserName(result.item(0).name)
                                this.setState({ notLogged: false })
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
                            }
                        })
                    })
            )
    }

    navigatePreGameScreen = () => this.props.navigation.navigate('PreGame');
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
        return (

            <SafeAreaView style={styles.max}>
                <ImageBackground source={HomeBackground} style={styles.max} resizeMode='cover'>
                    <View style={styles.homeContainer}>
                        <View style={styles.titleContainer}>
                        </View>
                        <View style={styles.optionsContainer}>
                            <TouchableOpacity style={[styles.optionButton, styles.onTimeGameButton]} onPress={this.navigatePreGameScreen}>
                                <Image source={OnTimeButton} style={styles.imageStyle} resizeMode="contain" />
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.optionButton, styles.simpleGameButton]} onPress={this.navigatePreGameScreen}>
                                <Image source={SimpleButton} style={styles.imageStyle} resizeMode="contain" />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.footerContainer}>
                            <View style={styles.aboutGame}>
                                <TouchableOpacity style={styles.touchableOpacityFooter} onPress={this.aboutModalHandler}>
                                    <Image source={About} style={styles.imageStyle} resizeMode="contain" />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.profile}>
                                <TouchableOpacity style={styles.touchableOpacityFooter} onPress={this.navigateProfileScreen}>
                                    <Image source={Profile} style={styles.imageStyle} resizeMode="contain" />
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
}

const styles = StyleSheet.create({
    max: {
        width: '100%',
        height: '100%'
    },
    homeContainer: {
        flex: 1
    },
    titleContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    optionsContainer: {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center'
    },
    optionButton: {
        width: '100%'
    },
    simpleGameButton: {
        marginTop: '5%',
        height: '15%'
    },
    onTimeGameButton: {
        marginTop: '25%',
        height: '14%'
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
        height: 60,
        width: 60
    },
    imageStyle: {
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
    createUser: (username, phoneId) => dispatch(DATABASE.createUser(username, phoneId))
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home); 