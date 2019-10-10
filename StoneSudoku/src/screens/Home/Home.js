import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

import BaseScreen from '../../components/BaseScreen/BaseScreen';
import ModalAbout from '../../components/Modal/AboutModal'

import About from '../../assets/about.png'
import Profile from '../../assets/profile.png'
import Top from '../../assets/topLiana.png'

class Home extends Component {
    static navigationOptions = {
        header: null,
    }

    state = {
        showAboutModal: false,
        logged: false
    }


    navigateGameScreen = () => this.props.navigation.navigate('Game');
    navigateProfileScreen = () => this.props.navigation.navigate('Profile');

    aboutModalHandler = () => {
        this.setState({ showAboutModal: true })
    }

    render() {
        return (
            <BaseScreen>
                <View style={styles.homeContainer}>
                    <View style={{ flex: 1 }}>
                        <Image source={Top} style={{ width: "100%", height: "150%", marginTop: "-8%" }} resizeMode="stretch" />
                    </View>
                    <View style={styles.titleContainer}>
                        <Text style={{ color: 'white', fontSize: 28, letterSpacing: 2, paddingTop: '15%' }}>WELCOME TO</Text>
                        <Text style={{ color: 'white', fontSize: 24 }}>STONE SUDOKU</Text>

                        <View style={styles.playOption}>
                            <TouchableOpacity style={{ width: '60%', height: '25%'}} onPress={this.navigateGameScreen}>
                                <Text style={{ color: 'white', fontSize: 32 }}>PLAY GAME</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.footerContainer}>
                        <View style={styles.aboutGame}>
                            <TouchableOpacity style={{ height: 60, width: 60, marginLeft: '8%' }} onPress={this.aboutModalHandler}>
                                <Image source={About} style={{ height: "100%", width: "100%" }} resizeMode="contain" />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.profile}>
                            <TouchableOpacity style={{ height: 60, width: 60, marginRight: '8%' }} onPress={this.navigateProfileScreen}>
                                <Image source={Profile} style={{ height: "100%", width: "100%" }} resizeMode="contain" />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <ModalAbout
                        isVisible={this.state.showAboutModal}
                        onClose={() => this.setState({ showAboutModal: false })} />
                </View>
            </BaseScreen>
        );
    }
}

const styles = StyleSheet.create({
    homeContainer: {
        flex: 1
    },
    titleContainer: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    optionsContainer: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    footerContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        flexDirection: 'row'
    },
    playOption: {
        flex: 1,
        justifyContent: 'center',
    },
    aboutGame: {
        flex: 1,
        justifyContent: 'center',
    },
    profile: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end'
    }
})

export default Home;