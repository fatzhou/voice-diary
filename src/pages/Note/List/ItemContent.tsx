import React, {useCallback} from 'react';
import {View, Text, Image} from 'react-native';
import {StyleSheet} from 'react-native';
import {ContentType} from './ListItem';

export default (props: any) => {
  const {content, type, image} = props;
  const isHitText = type === ContentType.Text;
  const textRender = useCallback((value: string) => {
    return <Text>{value}</Text>;
  }, []);

  const imageRender = useCallback((link: string) => {
    return <Image source={{uri: link}} style={styles.image} />;
  }, []);

  return (
    <View style={styles.container}>
      {isHitText && textRender(content)}
      {!isHitText && imageRender(image)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  image: {
    width: 350,
    height: 115,
  },
});
