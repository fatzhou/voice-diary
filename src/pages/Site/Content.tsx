import {useNavigation} from '@react-navigation/native';
import React, {useRef} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {SiteItem} from '../../components';

export default () => {
  const navigation = useNavigation();
  const {current: options} = useRef([
    {
      key: 'preference',
      leftIcon: 'preference',
      leftComponent: <Text>偏好设置</Text>,
      goNextPage: () => navigation.navigate('SubSite', {key: 'preference'}),
    },
    {
      key: 'safety',
      leftIcon: 'safety',
      leftComponent: <Text>安全设置</Text>,
      goNextPage: () => navigation.navigate('SubSite', {key: 'safety'}),
      isLastChild: true,
    },
    {
      key: 'storage',
      leftIcon: 'storage',
      leftComponent: <Text>存储设置</Text>,
      rightComponent: <Text>本地</Text>,
      goNextPage: () => navigation.navigate('SubSite', {key: 'storage'}),
    },
    {
      key: 'theme',
      leftIcon: 'theme',
      leftComponent: <Text>主题切换</Text>,
      rightComponent: <View style={styles.theme} />,
      isLastChild: true,
    },
    {
      key: 'recommend',
      leftIcon: 'recommend',
      leftComponent: <Text>推荐下载</Text>,
    },
    {
      key: 'praise',
      leftIcon: 'praise',
      leftComponent: <Text>好评鼓励</Text>,
    },
    {
      key: 'more',
      leftIcon: 'more',
      leftComponent: <Text>更多精彩</Text>,
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
