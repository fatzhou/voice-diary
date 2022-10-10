import React, {useRef} from 'react';
import {View, StyleSheet} from 'react-native';
import {Radio} from '~/components';

export default () => {
  const {current: options} = useRef([
    {
      value: '64',
      label: '64 kbps',
    },
    {
      value: '128',
      label: '128 kbps',
    },
    {
      value: '160',
      label: '160 kbps',
    },
    {
      value: '192',
      label: '192 kbps',
    },
    {
      value: '224',
      label: '224 kbps',
    },
    {
      value: '256',
      label: '256 kbps',
    },
    {
      value: '320',
      label: '320 kbps',
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
