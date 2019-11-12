import React, { Component } from 'react';
import { ImageBackground, StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, TextInput, Button } from 'react-native';

import ModalTemplate from './ModalTemplate';

import AboutBackground from '../../assets/Modal/modal.png';
import Back from '../../assets/Buttons/back.png'

class Register extends Component {

    state = {
        username: ""
    }

    onChangeText = text => {
        this.setState({ username: text })
    }

    render() {
        return (
            <ModalTemplate background={AboutBackground} isVisible={this.props.isVisible} onClose={this.props.onClose} >
                <View style={[styles.center, { width: '60%', height: '45%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }]}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', paddingBottom: 8 }}>Please insert your username!</Text>
                    <TextInput
                        style={{ width: '100%', textAlign: 'center', fontSize: 22, height: 45, borderColor: 'gray', borderWidth: 1 }}
                        onChangeText={text => this.onChangeText(text)}
                        value={this.state.username}
                    />
                    <View style={{ paddingTop: 8 }}>
                        <Button title="Register me!" color="green" onPress={() => this.props.onRegister(this.state.username)}></Button>
                    </View>

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
        left: '55%',
        top: '25%'
    }
});

export default Register;