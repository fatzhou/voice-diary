import React, {forwardRef, useState, useImperativeHandle} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Modal from 'react-native-modal';

interface Props {
  color: string;
  placeholderColor: string;
  handleSubmit: ({title, url}) => any;
}

export default forwardRef(
  ({color, placeholderColor, handleSubmit}: Props, ref) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [title, setTitle] = useState<string>('');
    const [url, setUrl] = useState<string>('');

    const handleDone = () => {
      setModalVisible(false);
      handleSubmit({title, url});
    };

    useImperativeHandle(
      ref,
      () => {
        return {
          setModalVisible: (value) => setModalVisible(value),
        };
      },
      [],
    );

    return (
      <Modal
        animationIn={'fadeIn'}
        animationOut={'fadeOut'}
        // coverScreen={false}
        isVisible={modalVisible}
        // backdropColor={color}
        backdropColor={'black'}
        backdropOpacity={0.3}
        onBackdropPress={() => setModalVisible(false)}>
        <View style={[styles.dialog]}>
          <View style={styles.linkTitle}>
            <Text style={{color}}>Insert Link</Text>
          </View>
          <View style={styles.item}>
            <TextInput
              style={[styles.input, {color}]}
              placeholderTextColor={placeholderColor}
              placeholder={'title'}
              onChangeText={(text) => setTitle(text)}
            />
          </View>
          <View style={styles.item}>
            <TextInput
              style={[styles.input, {color}]}
              placeholderTextColor={placeholderColor}
              placeholder="http(s)://"
              onChangeText={(text) => setUrl(text)}
            />
          </View>
          <View style={styles.buttonView}>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => setModalVisible(false)}>
              <Text style={styles.text}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btn} onPress={handleDone}>
              <Text style={styles.text}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  },
);

const styles = StyleSheet.create({
  dialog: {
    borderRadius: 8,
    marginHorizontal: 40,
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
  item: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    // borderColor: '#e8e8e8',
    flexDirection: 'row',
    height: 40,
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  input: {
    flex: 1,
    height: 40,
  },
  linkTitle: {
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#b3b3b3',
    color: 'black',
  },
  buttonView: {
    flexDirection: 'row',
    height: 36,
    paddingVertical: 4,
  },
  btn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'black',
  },
});
