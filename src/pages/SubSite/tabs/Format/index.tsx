import React, {useRef} from 'react';
import {View, StyleSheet} from 'react-native';
import {Radio} from '~/components';

export default () => {
  const {current: options} = useRef([
    {
      value: 'mp3',
      label: 'MP3',
    },
    {
      value: 'm4a',
      label: 'M4A',
    },
    {
      value: 'aifc',
      label: 'AIFC',
    },
    {
      value: 'wav',
      label: 'WAV',
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
