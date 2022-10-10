import React, {ReactNode} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import images from '../../core/images';
import styles from './index.styles';

interface Props {
  icon?: number;
  label?: string;
  value?: ReactNode;
  onPress?: () => void;
}

export default ({icon, label, value, onPress}: Props) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <>
        <View style={styles.row}>
          {icon && <Image style={styles.image} source={icon} />}
          {label && <Text style={styles.text}>{label}</Text>}
        </View>
        <View style={styles.row}>
          {value}
          <Image source={images.next} style={styles.next} />
        </View>
      </>
    </TouchableOpacity>
  );
};
