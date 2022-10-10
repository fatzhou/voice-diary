import React, {useRef} from 'react';
import {
  View,
  StyleSheet,
  ImageBackground,
  Text,
  TouchableOpacity,
} from 'react-native';
import {Radio} from '../../../../components';
import images from '../../../../core/images';
import {navigateWithAction} from '../../../../utils/rootNavigation';

export default () => {
  const {current: options} = useRef([
    {
      value: 'sweet',
      label: '甜美少女',
    },
    {
      value: 'tender',
      label: '温柔淑女',
    },
    {
      value: 'beautiful',
      label: '美丽可爱',
    },
    {
      value: 'celebrity',
      label: '冯提莫',
    },
  ]);

  return (
    <View style={styles.container}>
      <Radio options={options} />
      <TouchableOpacity
        onPress={() => navigateWithAction({key: 'add-more-speaker'})}
        style={styles.button}>
        <ImageBackground source={images.site.addMoreBg} style={styles.image}>
          <Text style={styles.title}>添加更多发音人</Text>
          <Text style={styles.description}>VIP会员免费下载</Text>
        </ImageBackground>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    flex: 1,
    marginTop: '110%',
    alignItems: 'center',
  },
  image: {
    resizeMode: 'contain',
    justifyContent: 'center',
    alignItems: 'center',
    width: 180,
    height: 54,
  },
  title: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  description: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.65)',
    marginTop: 10,
  },
});
