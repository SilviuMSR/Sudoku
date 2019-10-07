import { createAppContainer } from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import Home from './Home/Home';

const ApplicationStack = createStackNavigator({
    Home: {
        screen: Home
    }
}, {
    initialRouteName: 'Home'
});

export default createAppContainer(ApplicationStack);