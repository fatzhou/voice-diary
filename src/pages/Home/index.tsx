import AudioRecorderPlayer, {
  AVEncoderAudioQualityIOSType,
  AVEncodingOption,
  AudioEncoderAndroidType,
  AudioSourceAndroidType,
  OutputFormatAndroidType,
} from 'react-native-audio-recorder-player';
import type {
  AudioSet,
  PlayBackType,
  RecordBackType,
} from 'react-native-audio-recorder-player';
import {
  Dimensions,
  PermissionsAndroid,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {Component, useEffect, useRef, useState} from 'react';

import RNFetchBlob from 'rn-fetch-blob';
import type {ReactElement} from 'react';
import Button from '~/components/Button';

const styles: any = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#455A64',
    flexDirection: 'column',
    alignItems: 'center',
  },
  titleTxt: {
    marginTop: 100,
    color: 'white',
    fontSize: 28,
  },
  viewRecorder: {
    marginTop: 40,
    width: '100%',
    alignItems: 'center',
  },
  recordBtnWrapper: {
    flexDirection: 'row',
  },
  viewPlayer: {
    marginTop: 60,
    alignSelf: 'stretch',
    alignItems: 'center',
  },
  viewBarWrapper: {
    marginTop: 28,
    marginHorizontal: 28,
    alignSelf: 'stretch',
  },
  viewBar: {
    backgroundColor: '#ccc',
    height: 4,
    alignSelf: 'stretch',
  },
  viewBarPlay: {
    backgroundColor: 'white',
    height: 4,
    width: 0,
  },
  playStatusTxt: {
    marginTop: 8,
    color: '#ccc',
  },
  playBtnWrapper: {
    flexDirection: 'row',
    marginTop: 40,
  },
  btn: {
    borderColor: 'white',
    borderWidth: 1,
  },
  txt: {
    color: 'white',
    fontSize: 14,
    marginHorizontal: 8,
    marginVertical: 4,
  },
  txtRecordCounter: {
    marginTop: 32,
    color: 'white',
    fontSize: 20,
    textAlignVertical: 'center',
    fontWeight: '200',
    fontFamily: 'Helvetica Neue',
    letterSpacing: 3,
  },
  txtCounter: {
    marginTop: 12,
    color: 'white',
    fontSize: 20,
    textAlignVertical: 'center',
    fontWeight: '200',
    fontFamily: 'Helvetica Neue',
    letterSpacing: 3,
  },
});

interface State {
  isLoggingIn: boolean;
  recordSecs: number;
  recordTime: string;
  currentPositionSec: number;
  currentDurationSec: number;
  playTime: string;
  duration: string;
}

const screenWidth = Dimensions.get('screen').width;

// const dirs = RNFetchBlob.fs.dirs;
const path = Platform.select({
  ios: undefined,
  android: undefined,
  // Discussion: https://github.com/hyochan/react-native-audio-recorder-player/discussions/479
  // ios: 'https://firebasestorage.googleapis.com/v0/b/cooni-ebee8.appspot.com/o/test-audio.mp3?alt=media&token=d05a2150-2e52-4a2e-9c8c-d906450be20b',
  // ios: 'https://staging.media.ensembl.fr/original/uploads/26403543-c7d0-4d44-82c2-eb8364c614d0',
  // ios: 'hello.m4a',
  // android: `${this.dirs.CacheDir}/hello.mp3`,
});

const HomeScreen = () => {
  const [state, setMyState] = useState<State>({
    isLoggingIn: false,
    recordSecs: 0,
    recordTime: '00:00:00',
    currentPositionSec: 0,
    currentDurationSec: 0,
    playTime: '00:00:00',
    duration: '00:00:00',
  });

  const playWidth = state.currentDurationSec
    ? (state.currentPositionSec / state.currentDurationSec) * (screenWidth - 56)
    : 0;
  console.log(`currentPlayWidth: ${playWidth}`);

  const audioRecorderPlayer = useRef(new AudioRecorderPlayer());

  const onStatusPress = (e: any): void => {
    const touchX = e.nativeEvent.locationX;
    console.log(`touchX: ${touchX}`);
    const currentPosition = Math.round(state.currentPositionSec);

    if (playWidth && playWidth < touchX) {
      const addSecs = Math.round(currentPosition + 1000);
      audioRecorderPlayer.current.seekToPlayer(addSecs);
      console.log(`addSecs: ${addSecs}`);
    } else {
      const subSecs = Math.round(currentPosition - 1000);
      audioRecorderPlayer.current.seekToPlayer(subSecs);
      console.log(`subSecs: ${subSecs}`);
    }
  };

  const onStartRecord = async (): Promise<void> => {
    if (Platform.OS === 'android') {
      try {
        const grants = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        ]);

        console.log('write external stroage', grants);

        if (
          grants['android.permission.WRITE_EXTERNAL_STORAGE'] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          grants['android.permission.READ_EXTERNAL_STORAGE'] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          grants['android.permission.RECORD_AUDIO'] ===
            PermissionsAndroid.RESULTS.GRANTED
        ) {
          console.log('permissions granted');
        } else {
          console.log('All required permissions not granted');

          return;
        }
      } catch (err) {
        console.warn(err);

        return;
      }
    }

    const audioSet: AudioSet = {
      AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
      AudioSourceAndroid: AudioSourceAndroidType.MIC,
      AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
      AVNumberOfChannelsKeyIOS: 2,
      AVFormatIDKeyIOS: AVEncodingOption.aac,
      OutputFormatAndroid: OutputFormatAndroidType.AAC_ADTS,
    };

    console.log('audioSet', audioSet);

    const uri = await audioRecorderPlayer.current.startRecorder(path, audioSet);

    audioRecorderPlayer.current.addRecordBackListener((e: RecordBackType) => {
      // console.log('record-back', e);
      setMyState(prev => ({
        ...prev,
        recordSecs: e.currentPosition,
        recordTime: audioRecorderPlayer.current.mmssss(
          Math.floor(e.currentPosition),
        ),
      }));
    });
    console.log(`uri: ${uri}`);
  };

  const onPauseRecord = async (): Promise<void> => {
    try {
      const r = await audioRecorderPlayer.current.pauseRecorder();
      console.log(r);
    } catch (err) {
      console.log('pauseRecord', err);
    }
  };

  const onResumeRecord = async (): Promise<void> => {
    await audioRecorderPlayer.current.resumeRecorder();
  };

  const onStopRecord = async (): Promise<void> => {
    const result = await audioRecorderPlayer.current.stopRecorder();
    audioRecorderPlayer.current.removeRecordBackListener();
    setMyState(prev => ({
      ...prev,
      recordSecs: 0,
    }));
    console.log(result);
  };

  const onStartPlay = async (): Promise<void> => {
    console.log('onStartPlay');
    //? Custom path
    // const msg = await audioRecorderPlayer.current.startPlayer(path);

    //? Default path
    const msg = await audioRecorderPlayer.current.startPlayer();
    const volume = await audioRecorderPlayer.current.setVolume(1.0);
    console.log(`file: ${msg}`, `volume: ${volume}`);

    audioRecorderPlayer.current.addPlayBackListener((e: PlayBackType) => {
      setMyState(prev => ({
        ...prev,
        currentPositionSec: e.currentPosition,
        currentDurationSec: e.duration,
        playTime: audioRecorderPlayer.current.mmssss(
          Math.floor(e.currentPosition),
        ),
        duration: audioRecorderPlayer.current.mmssss(Math.floor(e.duration)),
      }));
    });
  };

  const onPausePlay = async (): Promise<void> => {
    await audioRecorderPlayer.current.pausePlayer();
  };

  const onResumePlay = async (): Promise<void> => {
    await audioRecorderPlayer.current.resumePlayer();
  };

  const onStopPlay = async (): Promise<void> => {
    console.log('onStopPlay');
    audioRecorderPlayer.current.stopPlayer();
    audioRecorderPlayer.current.removePlayBackListener();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titleTxt}>Audio Recorder Player</Text>
      <Text style={styles.txtRecordCounter}>{state.recordTime}</Text>
      <View style={styles.viewRecorder}>
        <View style={styles.recordBtnWrapper}>
          <Button
            style={styles.btn}
            onPress={onStartRecord}
            textStyle={styles.txt}>
            Record
          </Button>
          <Button
            style={[
              styles.btn,
              {
                marginLeft: 12,
              },
            ]}
            onPress={onPauseRecord}
            textStyle={styles.txt}>
            Pause
          </Button>
          <Button
            style={[
              styles.btn,
              {
                marginLeft: 12,
              },
            ]}
            onPress={onResumeRecord}
            textStyle={styles.txt}>
            Resume
          </Button>
          <Button
            style={[styles.btn, {marginLeft: 12}]}
            onPress={onStopRecord}
            textStyle={styles.txt}>
            Stop
          </Button>
        </View>
      </View>
      <View style={styles.viewPlayer}>
        <TouchableOpacity style={styles.viewBarWrapper} onPress={onStatusPress}>
          <View style={styles.viewBar}>
            <View style={[styles.viewBarPlay, {width: playWidth}]} />
          </View>
        </TouchableOpacity>
        <Text style={styles.txtCounter}>
          {state.playTime} / {state.duration}
        </Text>
        <View style={styles.playBtnWrapper}>
          <Button
            style={styles.btn}
            onPress={onStartPlay}
            textStyle={styles.txt}>
            Play
          </Button>
          <Button
            style={[
              styles.btn,
              {
                marginLeft: 12,
              },
            ]}
            onPress={onPausePlay}
            textStyle={styles.txt}>
            Pause
          </Button>
          <Button
            style={[
              styles.btn,
              {
                marginLeft: 12,
              },
            ]}
            onPress={onResumePlay}
            textStyle={styles.txt}>
            Resume
          </Button>
          <Button
            style={[
              styles.btn,
              {
                marginLeft: 12,
              },
            ]}
            onPress={onStopPlay}
            textStyle={styles.txt}>
            Stop
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

// import {useNavigation} from '@react-navigation/native';
// import React, {useEffect} from 'react';
// import {Image, Text, TouchableOpacity, View} from 'react-native';
// import images from '../../core/images';
// import styles from './index.styles';

// export default () => {
//   const navigation = useNavigation();

//   useEffect(() => {
//     // Use `setOptions` to update the button that we previously specified
//     // Now the button includes an `onPress` handler to update the count
//     navigation.setOptions({
//       headerLeft: () => (
//         <TouchableOpacity>
//           <Image source={images.home.vip} />
//         </TouchableOpacity>
//       ),
//       title: '',
//       headerRight: () => (
//         <TouchableOpacity>
//           <Image source={images.home.setup} />
//         </TouchableOpacity>
//       ),
//     });
//   }, [navigation]);

//   return (
//     <View style={styles.container}>
//       <Text>333</Text>
//     </View>
//   );
// };
