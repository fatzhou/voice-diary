import React, {useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import ItemHeader from '../ItemHeader';
import moment from 'moment';
import ItemContent from '../../../Note/List/ItemContent';
import {DebounceTouchableOpacity} from '../../../../components';
import {colors} from '../../../../core/theme';
import {useNavigation} from '@react-navigation/native';
import {Note} from '~/api/note';

export default (params: Note) => {
  const nope = () => {};
  const {saveNote = nope, ...note} = params;

  const formatTime = useCallback((time: string) => {
    return moment(Number(time)).format('DD/MM/YYYY HH:mm:ss');
  }, []);

  const navigation = useNavigation();

  const goDetail = () => {
    navigation.navigate('NewNote', {
      note,
      saveNote,
    });
  };

  return (
    <DebounceTouchableOpacity activeOpacity={1} onPress={goDetail}>
      <View style={styles.container}>
        {/* <ItemHeader
          title={isHitText ? title : formatTime(String(createTime))}
          type={type}
        /> */}
        <ItemContent type={type} content={content} />
      </View>
    </DebounceTouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
});
