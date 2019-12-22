import React, { Component } from 'react';
import { ImageBackground, StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, TextInput, Button } from 'react-native';

import ModalTemplate from './ModalTemplate';

import AboutBackground from '../../assets/Modal/modal.png';
import Back from '../../assets/Buttons/back.png'

import CONSTANTS from '../../utils/constants'

const elementSize = Math.floor(CONSTANTS.screenWidth / 6.5)
const textSize = Math.floor(elementSize * 2 / 4.1)

class Warning extends Component {

    state = {
    }

    render() {
        return (
            <ModalTemplate background={AboutBackground} isVisible={this.props.isVisible} onClose={this.props.onClose} >
                <View style={[styles.center, { width: '70%', height: '45%', display: 'flex', textAlign: 'center', flexDirection: 'column', justifyContent: 'flex-end' }]}>
                    <Text style={{ fontSize: textSize, fontWeight: 'bold', paddingBottom: 8, textAlign: 'center' }}>{this.props.text}</Text>
                </View>
                <View style={[styles.button]}>
                    <TouchableOpacity style={[styles.max]} onPress={this.props.onClose}>
                        <Image source={Back} style={{ height: elementSize, width: elementSize }} />
                    </TouchableOpacity>
                </View>
            </ModalTemplate>
        )
    }
};

const styles = StyleSheet.create({
    max: {
        width: '100%',
        height: '100%'
    },
    imageSize: {
        width: '100%',
        height: '100%'
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    button: {
        height: '20%',
        width: '30%',
        position: 'relative',
        top: '15%',
        left: '35%'
    }
});

export default Warning;