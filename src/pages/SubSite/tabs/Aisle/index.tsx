import React, {useRef} from 'react';
import {View, StyleSheet} from 'react-native';
import {Radio} from '~/components';

export default () => {
  const {current: options} = useRef([
    {
      value: 'single-channel',
      label: '单通道',
    },
    {
      value: 'dual-channel',
      label: '双通道',
    },
  ]);

  return (
    <View style={styles.container}>
      <Radio options={options} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  theme: {
    width: 40,
    height: 24,
    backgroundColor: 'black',
  },
});
