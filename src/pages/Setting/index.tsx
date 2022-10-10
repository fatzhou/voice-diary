import React from 'react';
import {Text, View} from 'react-native';
import Divider from '../../components/Divider';
import Row from '../../components/Row';
import images from '../../core/images';
import styles from './index.styles';

export default () => {
  return (
    <View style={styles.container}>
      <Row label="偏好设置" icon={images.preference} />
      <Row label="安全设置" icon={images.safety} />
      <Divider />
      <Row
        label="存储位置"
        icon={images.storage}
        value={<Text style={styles.text}>本地</Text>}
      />
      <Row
        label="主题切换"
        icon={images.theme}
        value={<View style={styles.theme} />}
      />
      <Divider />
      <Row label="推荐下载" icon={images.recommend} />
      <Row label="好评鼓励" icon={images.praise} />
      <Row label="更多精彩" icon={images.more} />
    </View>
  );
};
