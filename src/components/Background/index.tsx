import * as React from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import {colors} from '../../core/theme';

const {width, height} = Dimensions.get('window');

export default () => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.top} />
      <View style={styles.bottom} />
    </View>
  );
};
const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    width,
    height,
  },
  top: {
    flex: 1,
    backgroundColor: colors.main,
  },
  bottom: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
