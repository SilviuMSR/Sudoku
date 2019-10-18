import React, { Component } from 'react';
import { StyleSheet, ImageBackground, TouchableOpacity, View, Dimensions, Text, TextInput } from 'react-native';

import Grey from '../../assets/Buttons/square.png';

export default class RenderMatrix extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cellSize: Math.floor(Number(Dimensions.get('window').width) / props.size) - 2
        };
    }

    checkClicked = lineContent => {
        this.props.modifyCell(lineContent.i, lineContent.j)
    }

    generateSquare = (number, lineContent) => (
        <View style={[styles.center, styles.squareView, { height: Number(this.state.cellSize), width: Number(this.state.cellSize) }]}>
            <TouchableOpacity onPress={() => this.checkClicked(lineContent)} style={[styles.center, styles.max]}>
                <ImageBackground source={Grey} style={[styles.center, styles.max]} resizeMode='stretch'>
                    <Text>{number ? number : ''}</Text>
                </ImageBackground>
            </TouchableOpacity>
        </View>
    )

    render() {
        return (
            <View style={[styles.buttonSize, styles.backgroundColor, styles.center]}>
                {this.props.lines.map(line => (
                    <View style={[styles.lineView, styles.center, { height: this.state.cellSize }]}>
                        {line.map(lineContent => this.generateSquare(lineContent.number, lineContent))}
                    </View>
                ))}
            </View>
        );
    }
};

const styles = StyleSheet.create({
    squareView: {
        marginLeft: 2,
        marginRight: 2
    },
    lineView: {
        marginBottom: 2,
        marginTop: 2,
        width: '100%',
        flexDirection: 'row'
    },
    max: {
        width: '100%',
        height: '100%'
    },
    buttonSize: {
        width: '90%',
        height: '90%'
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center'
    }
});