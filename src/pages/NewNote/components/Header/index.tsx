import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {actions, RichToolbar} from 'react-native-pell-rich-editor';
import {DebounceTouchableOpacity} from '../../../../components';

interface Props {
  editRef: any;
  save: () => void;
}

export default (props: Props) => {
  const {editRef, save} = props;

  return (
    <>
      <View style={styles.container}>
        {editRef && (
          <RichToolbar
            style={[styles.richBar, styles.richBarDark]}
            flatContainerStyle={styles.flatStyle}
            editor={editRef}
            selectedIconTint={'#2095F2'}
            disabledIconTint={'#bfbfbf'}
            actions={[actions.undo, actions.redo]}
          />
        )}
        <DebounceTouchableOpacity onPress={save}>
          <Text>保存</Text>
        </DebounceTouchableOpacity>
      </View>
    </>
  );
};

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  richBar: {
    borderColor: 'white',
    height: 30,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  richBarDark: {
    backgroundColor: 'white',
  },
  flatStyle: {
    paddingHorizontal: 12,
  },
});
