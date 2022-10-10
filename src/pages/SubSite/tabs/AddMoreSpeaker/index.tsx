import React, {useRef} from 'react';
import {View, StyleSheet} from 'react-native';
import {CheckBox} from '~/components';

export default () => {
  const publicText = {
    selectedText: '已下载',
    unselectedText: 'VIP免费',
  };
  const {current: options} = useRef([
    {
      value: 'sweet',
      label: '甜美少女',
      ...publicText,
    },
    {
      value: 'tender',
      label: '温柔淑女',
      ...publicText,
    },
    {
      value: 'cute',
      label: '美嘉可爱',
      ...publicText,
    },
    {
      value: 'start',
      label: '冯提莫',
      ...publicText,
    },
    {
      value: 'mature',
      label: '成熟大叔',
      ...publicText,
    },
    {
      value: 'cheerful',
      label: '开朗青年',
      ...publicText,
    },
    {
      value: 'pretty',
      label: '漂亮男生',
      ...publicText,
    },
    {
      value: 'next-door',
      label: '邻家姐姐',
      ...publicText,
    },
  ]);

  return (
    <View style={styles.container}>
      <CheckBox options={options} defaultValue={['sweet']} />
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
