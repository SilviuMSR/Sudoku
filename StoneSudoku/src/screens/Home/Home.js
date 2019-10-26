import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView, ImageBackground } from 'react-native';

import HomeBackground from '../../assets/Background/goodBg.png';
import ModalAbout from '../../components/Modal/AboutModal'

import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'UserDatabase.db' });

import About from '../../assets/Buttons/aboutYellow.png'
import Profile from '../../assets/Buttons/profileYellow.png'
import OnTimeButton from '../../assets/Buttons/onTimeButton.png'
import SimpleButton from '../../assets/Buttons/simpleButton.png'


class Home extends Component {
    static navigationOptions = {
        header: null,
    }

    state = {
        showAboutModal: false,
        logged: false
    }

    componentDidMount() {
        db.transaction(function (txn) {
            txn.executeSql('DROP TABLE IF EXISTS users', []);
            txn.executeSql(
                "SELECT name FROM sqlite_master WHERE type='table' AND name='users'",
                [],
                function (tx, res) {
                    console.log('item:', res.rows.length);
                    if (res.rows.length == 0) {
                        console.log("DROPING TABLE")
                        txn.executeSql('DROP TABLE IF EXISTS users', []);
                        txn.executeSql(
                            'CREATE TABLE IF NOT EXISTS users(user_id INTEGER PRIMARY KEY AUTOINCREMENT, user_name VARCHAR(20), user_contact INT(10), user_address VARCHAR(255))',
                            []
                        );
                    }
                }
            );
        });
    }

    navigatePreGameScreen = () => this.props.navigation.navigate('PreGame');
    navigateProfileScreen = () => this.props.navigation.navigate('Profile');

    aboutModalHandler = () => {
        this.setState({ showAboutModal: true })
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

export default Home;