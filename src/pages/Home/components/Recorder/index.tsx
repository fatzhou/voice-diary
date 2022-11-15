import React, {useMemo, useRef, useState} from 'react';
import {
  Dimensions,
  Image,
  PermissionsAndroid,
  Platform,
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import AudioRecorderPlayer, {
  AudioEncoderAndroidType,
  AudioSet,
  AudioSourceAndroidType,
  AVEncoderAudioQualityIOSType,
  AVEncodingOption,
  OutputFormatAndroidType,
  RecordBackType,
} from 'react-native-audio-recorder-player';
import LinearGradient from 'react-native-linear-gradient';
import {DebounceTouchableOpacity} from '~/components';
import {usePageInsets} from '~/core/hooks';
import images from '~/core/images';
import styles from './index.styles';

enum SpeakingStatus {
  Normal = 0,
  Doing = 1,
}

interface SpeakingType {
  status: SpeakingStatus;
  isLoggingIn: boolean;
  recordSecs: number;
  recordTime: string;
  currentPositionSec: number;
  currentDurationSec: number;
  playTime: string;
  duration: string;
}

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

const screenWidth = Dimensions.get('screen').width;
export default () => {
  const pageInsets = usePageInsets();
  const [speaking, setSpeaking] = useState<{
    status: SpeakingStatus;
  }>({
    status: SpeakingStatus.Normal,
  });
  const speakingStatus = useRef({
    recordSecs: 0,
    recordTime: '00:00:00',
    currentPositionSec: 0,
    currentDurationSec: 0,
    playTime: '00:00:00',
    duration: '00:00:00',
  });
  const audioRecorderPlayer = useRef(new AudioRecorderPlayer());

  // const speakingInfo = useMemo(() => {
  //   if (speaking.status === SpeakingStatus.Normal) {
  //     return {
  //       logo: images.home.audio,
  //       text: '保持长按，开始说话',
  //     };
  //   } else {
  //     return {
  //       logo: images.home.revoke,
  //       text: '松开保存，上滑取消',
  //     };
  //   }
  // }, [speaking]);

  const onAdd = async (): Promise<void> => {
    console.log('onadd..........');
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

    setSpeaking(prev => ({
      ...prev,
      status: SpeakingStatus.Doing,
    }));

    const uri = await audioRecorderPlayer.current.startRecorder(path, audioSet);

    audioRecorderPlayer.current.addRecordBackListener((e: RecordBackType) => {
      // console.log('record-back', e);
      speakingStatus.current = {
        ...speakingStatus.current,
        recordSecs: e.currentPosition,
        recordTime: audioRecorderPlayer.current.mmssss(
          Math.floor(e.currentPosition),
        ),
      };
    });
    console.log(`uri: ${uri}`);
  };

  const onSave = () => {
    if (speaking.status === SpeakingStatus.Doing) {
      onStopRecord();
      setSpeaking(prev => ({
        ...prev,
        status: SpeakingStatus.Normal,
      }));
      // setTimeout(onStartPlay, 1000);
    }
  };

  const playWidth = speaking.currentDurationSec
    ? (speaking.currentPositionSec / speaking.currentDurationSec) *
      (screenWidth - 56)
    : 0;
  console.log(`currentPlayWidth: ${playWidth}`);

  const onStatusPress = (e: any): void => {
    const touchX = e.nativeEvent.locationX;
    console.log(`touchX: ${touchX}`);
    const currentPosition = Math.round(speaking.currentPositionSec);

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
    setSpeaking(prev => ({
      ...prev,
      status: SpeakingStatus.Normal,
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
      setSpeaking(prev => ({
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

  const [focus, setFocus] = useState<undefined | 'cancel' | 'transfer'>(
    undefined,
  );

  return (
    <SafeAreaView style={[styles.flex]}>
      <LinearGradient
        colors={['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 1)']}
        start={{x: 0, y: 500}}
        style={[
          styles.container,
          {
            paddingBottom: pageInsets.bottom + 20,
          },
        ]}>
        {/* <Image style={styles.logo} source={speakingInfo.logo} />
        <Text style={styles.desc}>{speakingInfo.text}</Text>
        <Image style={styles.close} source={images.home.close} />
        <View style={styles.dividerWrapper}>
          <Image style={styles.divider} source={images.home.divider} />
        </View> */}
        <View style={styles.buttons}>
          <View style={styles.buttonContainer}>
            {focus === 'cancel' && (
              <View style={styles.tips}>
                <Text style={styles.tipsText}>松开取消</Text>
              </View>
            )}
            <DebounceTouchableOpacity
              style={[
                styles.button,
                focus === 'cancel' && styles.focusContainer,
                focus === 'cancel' && {bottom: 0},
              ]}>
              <Image
                style={[styles.close]}
                source={focus === 'cancel' ? images.home.close : images.close}
              />
            </DebounceTouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            {focus === 'transfer' && (
              <View style={styles.tips}>
                <Text style={styles.tipsText}>转文字</Text>
              </View>
            )}
            <DebounceTouchableOpacity
              style={[
                styles.button,
                focus === 'transfer' && styles.focusContainer,
                focus === 'transfer' && {bottom: 0},
              ]}>
              <Text
                style={[styles.text, focus === 'transfer' && styles.focusText]}>
                文
              </Text>
            </DebounceTouchableOpacity>
          </View>
        </View>
        <DebounceTouchableOpacity
          activeOpacity={0.8}
          style={[
            {
              marginBottom: pageInsets.bottom + 20,
              width: 50,
              height: 50,
              borderRadius: 25,
            },
          ]}
          onLongPress={onAdd}
          onPressOut={onSave}>
          <Image
            source={images.home.add}
            style={[
              styles.addNote,
              speaking.status === SpeakingStatus.Doing && {opacity: 0.3},
            ]}
          />
          {speaking.status === SpeakingStatus.Doing && (
            <View style={styles.addNoteSpeaking} />
          )}
        </DebounceTouchableOpacity>
      </LinearGradient>
    </SafeAreaView>
  );
};
