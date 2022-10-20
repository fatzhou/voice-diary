import * as React from 'react';
import {StyleSheet, View} from 'react-native';

export default () => {
  return <View style={[styles.separator]} />;
};

const styles = StyleSheet.create({
  separator: {
    height: 5,
  },
});
