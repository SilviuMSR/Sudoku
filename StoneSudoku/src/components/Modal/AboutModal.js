import React from 'react';
import { ImageBackground, StyleSheet, Text, View, ScrollView, TouchableOpacity, Image } from 'react-native';

import ModalTemplate from './ModalTemplate';

import AboutBackground from '../../assets/modal.png';
import Back from '../../assets/back.png'

const about = props => (
    <ModalTemplate background={AboutBackground} isVisible={props.isVisible} onClose={props.onClose}>
        <View style={[{ width: '55%', height: '55%' }, styles.center]}>
            <ScrollView style={[{ height: '10%', width: '100%' }]}>
                <Text style={{ textAlign: 'center', color: 'white', marginTop: '50%', fontSize: 28 }}>
                    HERE WILL BE DETAILS ABOUT GAME
                </Text>
            </ScrollView>
            <View style={[styles.button]}>
                <TouchableOpacity style={[styles.max]} onPress={props.onClose}>
                    <Image source={Back} style={{ height: 50, width: 50 }} />
                </TouchableOpacity>
            </View>
        </View>
    </ModalTemplate>
);

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
        left: '55%',
        top: '25%'
    }
});

export default about;