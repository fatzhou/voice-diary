import {
  FlatList,
  Image,
  RefreshControl,
  SafeAreaView,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';

// import RNFetchBlob from 'rn-fetch-blob';
import images from '~/core/images';
import {useNavigation} from '@react-navigation/native';
import {DebounceTouchableOpacity, Empty} from '~/components';
import {PageName} from '~/types/page';
import styles from './index.styles';
import ItemSeparator from './components/ItemSeparator';
import ListItem from './components/ListItem';
import {usePageInsets} from '~/core/hooks';
import Recorder from './components/Recorder';

const HomeScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    // Use `setOptions` to update the button that we previously specified
    // Now the button includes an `onPress` handler to update the count
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity>
          <Image source={images.home.vip} />
        </TouchableOpacity>
      ),
      title: '',
      headerRight: () => (
        <TouchableOpacity>
          <Image source={images.home.setup} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const goPage = (name: PageName, params: any) => {
    navigation.navigate(name, params);
  };

  const [notes, setNotes] = useState([]);
  const saveNote = () => {};
  const nope = () => {};

  const [status, setStatus] = useState({
    loading: true,
  });

  const handleRefresh = useCallback(() => {}, []);
  const pagesets = usePageInsets();

  return (
    <>
      <SafeAreaView>
        <View style={styles.wrapper}>
          <FlatList
            keyExtractor={(item: any) => item.id}
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
                shareNote={nope}
                removeNote={nope}
              />
            )}
          />
          <DebounceTouchableOpacity
            activeOpacity={1}
            style={{
              bottom: pagesets.bottom + 20,
            }}
            onLongPress={() => {}}
            onPress={() =>
              goPage('NewNote', {
                note: null,
                saveNote,
              })
            }>
            <Image source={images.home.add} style={styles.addNote} />
          </DebounceTouchableOpacity>
        </View>
      </SafeAreaView>
      <Recorder />
    </>
  );
};

export default HomeScreen;
