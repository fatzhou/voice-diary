import React, {useRef} from 'react';
import {View, StyleSheet} from 'react-native';
import {Switch} from '~/components';

export default () => {
  const {current: options} = useRef([
    {
      value: 'face',
      label: '面容IssD',
    },
    {
      value: 'gesture',
      label: '手势密码',
    },
  ]);

  return (
    <View style={styles.container}>
      <Switch options={options} />
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
