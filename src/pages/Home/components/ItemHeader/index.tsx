import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, Text} from 'react-native';
import {DebounceTouchableOpacity, Popup} from '../../../../components';
import styles from './index.styles';

interface Props {
  title: string;
  type: number;
}

export default (props: Props) => {
  const {title} = props;

  const Options = (
    <View style={styles.option}>
      <DebounceTouchableOpacity style={styles.button}>
        <Text style={styles.text}>分享</Text>
      </DebounceTouchableOpacity>
      <DebounceTouchableOpacity style={styles.button}>
        <Text style={styles.text}>删除</Text>
      </DebounceTouchableOpacity>
    </View>
  );

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <DebounceTouchableOpacity onPress={() => navigation.navigate('Detail')}>
        <Text>{title}</Text>
      </DebounceTouchableOpacity>
      <Popup options={Options} />
    </View>
  );
};
