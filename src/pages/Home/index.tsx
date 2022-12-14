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
import {PageName, RootStackParamList} from '~/types/page';
import styles from './index.styles';
import ItemSeparator from './components/ItemSeparator';
import ListItem from './components/ListItem';
import {usePageInsets} from '~/core/hooks';
import Recorder from './components/Recorder';
import {initializedNotes, loadingNotes, selectNotes} from '~/reducers/notes';
import {useSelector} from 'react-redux';
import {Note} from '~/api/note';
import {StackNavigationProp} from '@react-navigation/stack';

const HomeScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const notes = useSelector(selectNotes);
  const loading = useSelector(loadingNotes);
  const initialized = useSelector(initializedNotes);

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

  const handleRefresh = useCallback(() => {}, []);
  const pagesets = usePageInsets();
  const [modalVisible, showModalVisible] = useState(true);

  const onAdd = () => {
    showModalVisible(true);
  };

  return (
    <View style={styles.flex}>
      <SafeAreaView style={styles.flex}>
        <View style={styles.wrapper}>
          <FlatList
            keyExtractor={(item: any) => item.id}
            scrollEnabled={!loading}
            data={[]}
            initialNumToRender={4}
            ItemSeparatorComponent={() => <ItemSeparator />}
            ListEmptyComponent={
              <View style={styles.listEmpty}>
                <Empty
                  image={images.public.empty}
                  description="?????????????????????????????????"
                />
              </View>
            }
            refreshControl={
              <RefreshControl
                colors={[]} // ???android
                refreshing={loading}
                onRefresh={handleRefresh}
              />
            }
            renderItem={({item}: {item: Note}) => (
              <ListItem {...item} key={item.id} />
            )}
          />
          <DebounceTouchableOpacity
            activeOpacity={1}
            style={{
              bottom: pagesets.bottom + 20,
            }}
            onLongPress={onAdd}
            onPress={() =>
              goPage('NewNote', {
                note: null,
              })
            }>
            <Image source={images.home.add} style={styles.addNote} />
          </DebounceTouchableOpacity>
        </View>
      </SafeAreaView>
      {modalVisible && (
        <View style={[styles.modal]}>
          <Recorder />
        </View>
      )}
    </View>
  );
};

export default HomeScreen;
