import React, {useRef, useState, useCallback, useEffect} from 'react';
import {StyleSheet, Image, View, FlatList, RefreshControl} from 'react-native';
import {DebounceTouchableOpacity, Empty} from '../../components';
import useNote from '../../core/hooks/useNote';
import images from '../../core/images';
import {ComponentProps, PageName} from '../../types/page.d';
import {ItemSeparator, ListItem} from './List';

export default (props: ComponentProps<'Note'>) => {
  const {navigation} = props;
  const flatListRef = useRef();
  const goPage = (name: PageName, params: any) => {
    navigation.navigate(name, params);
  };

  const handleRefresh = useCallback(() => {}, []);
  const {status, notes, getNotes, saveNote, shareNote, removeNote} = useNote();

  useEffect(() => {
    getNotes();
  }, [getNotes]);

  console.log(notes);

  return (
    <View style={styles.wrapper}>
      <FlatList
        ref={flatListRef}
        style={styles.flatList}
        keyExtractor={(item: any) => item.id}
        contentContainerStyle={{}}
        scrollEnabled={!status.loading}
        data={notes}
        initialNumToRender={4}
        ItemSeparatorComponent={() => <ItemSeparator />}
        ListEmptyComponent={
          <View style={styles.listEmpty}>
            <Empty
              image={images.public.empty}
              description="您还没有创建过余音日记"
              saveNote={saveNote}
            />
          </View>
        }
        refreshControl={
          <RefreshControl
            colors={[]} // 仅android
            refreshing={status.loading}
            onRefresh={handleRefresh}
          />
        }
        renderItem={({item}) => (
          <ListItem
            {...item}
            key={item.id}
            saveNote={saveNote}
            shareNote={shareNote}
            removeNote={removeNote}
          />
        )}
      />
      <DebounceTouchableOpacity
        activeOpacity={1}
        onPress={() =>
          goPage('NewNote', {
            note: null,
            saveNote,
          })
        }>
        <Image source={images.home.add} style={styles.addNote} />
      </DebounceTouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatList: {
    width: '100%',
  },
  listEmpty: {
    marginTop: 154,
  },
  addNote: {
    position: 'absolute',
    bottom: 10,
    left: -10,
  },
});
