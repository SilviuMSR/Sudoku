import React from 'react';
import { StyleSheet, ImageBackground, SafeAreaView } from 'react-native';

import Background from '../../assets/bg.jpg';

const styles = StyleSheet.create({
    max: {
        width: '100%',
        height: '100%'
    }
});

export default props => (
    <SafeAreaView style={styles.max}>
        <ImageBackground source={Background} style={styles.max} resizeMode='cover'>
            {props.children}
        </ImageBackground>
    </SafeAreaView>
);