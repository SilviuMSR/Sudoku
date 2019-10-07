import React, { Component } from 'react';
import { View, Text } from 'react-native';

import BaseScreen from '../../components/BaseScreen/BaseScreen';

class Home extends Component {
    static navigationOptions = {
        header: null,
    }

    render() {
        return (
            <BaseScreen>
                <View>
                    <Text style={{textAlign: 'center', color: 'white', fontSize: 24}}>
                        Welcome to Stone Sudoku
                    </Text>
                </View>
            </BaseScreen>
        );
    }
}

export default Home;