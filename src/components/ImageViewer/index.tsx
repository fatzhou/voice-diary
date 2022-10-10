import React, {useState} from 'react';
import {Modal, StyleSheet, Image, View} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import {IImageInfo} from 'react-native-image-zoom-viewer/built/image-viewer.type';
import {DebounceTouchableOpacity} from '..';

interface Props {
  image: IImageInfo[];
}

// 2021-4-5 图片查看暂只单独查看
export default ({image = []}: Props) => {
  const [visible, setVisible] = useState(false);

  const currentImage = image[0] || {url: ''};
  return (
    <View>
      <DebounceTouchableOpacity onPress={() => setVisible(true)}>
        <Image
          source={{
            uri: currentImage?.url,
          }}
          style={styles.image}
        />
      </DebounceTouchableOpacity>
      <Modal visible={visible} transparent={true}>
        <ImageViewer
          imageUrls={image}
          onClick={() => setVisible(false)}
          renderIndicator={() => null}
        />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.04)',
  },
  htmlView: {
    flex: 1,
    minHeight: '90%',
    backgroundColor: '#FFFFFF',
    margin: 15,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  title: {
    fontWeight: 'normal',
    fontSize: 20,
    lineHeight: 28,
    color: 'rgba(0, 0, 0, 0.85)',
    marginBottom: 10,
  },
  image: {
    width: 300,
    height: 300,
  },
});
