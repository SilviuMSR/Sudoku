import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView, ImageBackground, FlatList } from 'react-native';

import PreGameBackground from '../../assets/Background/preGame.png'
import Back from '../../assets/Buttons/back.png'
import Easy from '../../assets/Buttons/easy.png'
import Medium from '../../assets/Buttons/medium.png'
import Hard from '../../assets/Buttons/hard.png'

import Level from '../../components/Level/Level'

class PreGame extends Component {
    static navigationOptions = {
        header: null,
    }

    state = {
        levels: [
            {
                id: 1,
                done: true,
                name: 'RUNDA 1',
                time: '01:25'
            },
            {
                id: 2,
                done: true,
                name: 'RUNDA 2',
                time: '01:25'
            },
            {
                id: 3,
                done: false,
                name: 'RUNDA 3',
                time: null
            },
            {
                id: 4,
                done: true,
                name: 'RUNDA 4',
                time: '01:25'
            },
            {
                id: 5,
                done: false,
                name: 'RUNDA 5',
                time: null
            },
            {
                id: 6,
                done: true,
                name: 'RUNDA 6',
                time: '01:25'
            },
        ]
    }

    navigateHomeScreen = () => this.props.navigation.navigate('Home');

    render() {
        return (
            <SafeAreaView style={styles.max}>
                <ImageBackground source={PreGameBackground} style={styles.max} resizeMode='cover'>
                    <View style={styles.preGameContainer}>
                        <View style={styles.headerContainer}>
                            <View style={styles.headerOptions}>
                                <TouchableOpacity style={[styles.optionButton]} onPress={this.navigatePreGameScreen}>
                                    <Image source={Easy} style={styles.imageStyle} resizeMode="contain" />
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.optionButton]} onPress={this.navigatePreGameScreen}>
                                    <Image source={Medium} style={styles.imageStyle} resizeMode="contain" />
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.optionButton]} onPress={this.navigatePreGameScreen}>
                                    <Image source={Hard} style={styles.imageStyle} resizeMode="contain" />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.headerTitle}>
                                <Text style={styles.headerTitleText}>AI COMPLETAT 1/10</Text>
                            </View>
                        </View>
                        <View style={styles.levelsContainer}>
                            <FlatList
                                contentContainerStyle={styles.list}
                                data={this.state.levels.map(level => {
                                    return ({ ...level, key: level.id || '' })
                                })}
                                renderItem={({ item }) => <Level
                                    done={item.done || ''}
                                    name={item.name || ''}
                                    time={item.time || null}
                                />}
                            />
                        </View>
                        <View style={styles.footerContainer}>
                            <TouchableOpacity style={[styles.backButton]} onPress={this.navigateHomeScreen}>
                                <Image source={Back} style={styles.imageStyle} resizeMode="contain" />
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
        marginTop: '15%'
    },
    headerTitle: {
        flex: 1,
        marginTop: '5%',
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
    backButton: {
    },
    levelsContainer: {
        marginTop: "10%",
        flex: 5,
        flexDirection: 'row'
    },
    footerContainer: {
        flex: 0.5,
    },
    imageStyle: {
        width: "100%",
        height: "100%"
    }
})

export default PreGame;