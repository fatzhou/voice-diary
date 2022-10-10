import React, {useRef} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {SiteItem} from '../../../../components';
import {navigateWithAction} from '../../../../utils/rootNavigation';

export default () => {
  const {current: options} = useRef([
    {
      key: 'languageFormat',
      leftComponent: <Text>语音格式</Text>,
      rightComponent: <Text>MP3</Text>,
      goNextPage: () => navigateWithAction({key: 'format'}),
    },
    {
      key: 'samplingRate',
      leftComponent: <Text>采样速率</Text>,
      rightComponent: <Text>48000 HZ</Text>,
      // 暂无跳转逻辑
    },
    {
      key: 'aisle',
      leftComponent: <Text>通道</Text>,
      rightComponent: <Text>单声道</Text>,
      goNextPage: () => navigateWithAction({key: 'aisle'}),
    },
    {
      key: 'bitRate',
      leftComponent: <Text>位速率</Text>,
      rightComponent: <Text>192 kbp3</Text>,
      goNextPage: () => navigateWithAction({key: 'sampling-rate'}),
    },
    {
      key: 'speaker',
      leftComponent: <Text>发音人</Text>,
      rightComponent: <Text>甜美少女</Text>,
      goNextPage: () => navigateWithAction({key: 'speaker'}),
    },
  ]);

  return (
    <View style={styles.container}>
      {options.map(item => {
        return <SiteItem {...item} key={item.key} />;
      })}
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
