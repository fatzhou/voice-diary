import React, {useRef} from 'react';
import {View, StyleSheet} from 'react-native';
import {Radio} from '~/components';

export default () => {
  const {current: options} = useRef([
    {
      value: 'local',
      label: '本地',
    },
    {
      value: 'iCloud',
      label: 'iCloud',
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
