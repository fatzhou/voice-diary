import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Modal from 'react-native-modal';
import {DebounceTouchableOpacity} from '~/components';

interface Props {
  onSubmit: () => void;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export default (props: Props) => {
  const {onSubmit, visible, setVisible} = props;

  const handleSubmit = async () => {
    try {
      onSubmit();
      setVisible(true);
    } catch (error) {
    } finally {
      setVisible(true);
    }
  };

  return (
    <>
      <Modal
        isVisible={visible}
        animationIn={'fadeIn'}
        animationOut={'fadeOut'}
        backdropColor={'black'}
        backdropOpacity={0.3}
        onBackdropPress={() => setVisible(false)}
        // coverScreen={true}
      >
        <View style={styles.modal}>
          <Text>您是否确认保存笔记？</Text>
          <View style={styles.buttonView}>
            <DebounceTouchableOpacity
              style={styles.btn}
              onPress={() => setVisible(false)}>
              <Text style={styles.text}>Cancel</Text>
            </DebounceTouchableOpacity>
            <DebounceTouchableOpacity style={styles.btn} onPress={handleSubmit}>
              <Text style={styles.text}>Submit</Text>
            </DebounceTouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

export const styles = StyleSheet.create({
  modal: {
    height: 100,
    width: 300,
    backgroundColor: 'white',
    borderRadius: 8,
    marginHorizontal: 20,
    justifyContent: 'space-around',
    alignContent: 'center',
    paddingHorizontal: 10,
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
    color: '#286ab2',
  },
});
