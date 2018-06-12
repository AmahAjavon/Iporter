import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, Text, Image} from 'react-native';

import logoImg from '../../../../assets/img/iporter.png';

export default class Logo extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image source={logoImg} style={styles.image} />
        <Text style={styles.text}>iPORTER</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 160,
    height: 60,
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 22,
    backgroundColor: 'transparent',
    marginTop: 10,
  },
});
