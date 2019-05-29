import React from 'react';
import { Icon} from 'expo';
import {Image} from 'react-native';
import * as RealNewsActive from '../assets/images/active.png';
import * as RealNewsInactive from '../assets/images/inactive.png';
import Colors from '../constants/Colors';

export default class TabBarIcon extends React.Component {
  render() {
    return (
      this.props.name !== "realNews" ? <Icon.Ionicons
        name={this.props.name}
        size={26}
        style={{ marginBottom: -3 }}
        color={this.props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
      /> :
      this.props.focused ? <Image
        source={require('../assets/images/active.png')}
        style={{ marginBottom: -3, height: 26, width: 26 }}
      /> : <Image
      source={require('../assets/images/inactive.png')}
      style={{ marginBottom: -3, height: 26, width: 26 }} />
    );
  }
}