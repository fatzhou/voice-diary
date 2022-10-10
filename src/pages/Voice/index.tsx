import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Sound from 'react-native-sound';
import {AudioRecorder, AudioUtils} from 'react-native-audio';
import {log} from '../../utils/common';

const VoicePage = () => {
  const [voiceSite, setVoiceSite] = useState({
    hasPermission: true, //授权状态
    audioPath: AudioUtils.DocumentDirectoryPath + '/test.aac', // 文件路径
    recording: false, //是否录音
    pause: false, //录音是否暂停
    stop: false, //录r音是否停止
    currentTime: 0, //录音时长
  });

  // 本地音乐
  const music = new Sound(require('../../assets/voice/test.mp3'), error => {
    log('click play music');
    if (error) {
      log('播放失败。。。');
    }
  });

  const handleMusicPloy = () => {
    log('开始播放音乐');
    music.play();
  };

  // 请求授权
  const checkAuthor = () => {
    log('开始获取权限');
    AudioRecorder.requestAuthorization()
      .then(isAuthor => {
        log('是否授权: ' + isAuthor);
        if (!isAuthor) {
          log('请前往设置开启录音权限');
          return;
        }
        setVoiceSite(pre => ({...pre, hasPermission: isAuthor}));
        prepareRecordingPath(voiceSite.audioPath);
        // 录音进展
        AudioRecorder.onProgress = data => {
          setVoiceSite(pre => ({
            ...pre,
            currentTime: Math.floor(data.currentTime),
          }));
        };
        // 完成录音
        AudioRecorder.onFinished = data => {
          // data 返回需要上传到后台的录音数据
          log(voiceSite.currentTime);
          // log('audio result', data);
        };
      })
      .catch(error => {
        log('拉去权限错误');
        log(error);
      });
    log('拉取权限结束');
  };

  /**
   * AudioRecorder.prepareRecordingAtPath(path,option)
   * 录制路径
   * path 路径
   * option 参数
   */
  const prepareRecordingPath = path => {
    const option = {
      SampleRate: 44100.0, //采样率
      Channels: 2, //通道
      AudioQuality: 'High', //音质
      AudioEncoding: 'aac', //音频编码
      OutputFormat: 'mpeg_4', //输出格式
      MeteringEnabled: false, //是否计量
      MeasurementMode: false, //测量模式
      AudioEncodingBitRate: 32000, //音频编码比特率
      IncludeBase64: true, //是否是base64格式
      AudioSource: 0, //音频源
    };
    AudioRecorder.prepareRecordingAtPath(path, option as any);
  };

  // 开始录音
  const handleStartVoice = async () => {
    if (!voiceSite.hasPermission) {
      log('没有授权');
      return;
    }
    if (voiceSite.recording) {
      log('正在录音中...');
      return;
    }
    if (voiceSite.stop) {
      prepareRecordingPath(voiceSite.audioPath);
    }
    setVoiceSite(pre => ({
      ...pre,
      recording: true,
      pause: false,
    }));

    try {
      await AudioRecorder.startRecording();
    } catch (err) {
      console.log(err);
    }
  };

  // 暂停录音
  const handlePauseVoice = async () => {
    if (!voiceSite.recording) {
      log('当前未录音');
      return;
    }

    try {
      await AudioRecorder.pauseRecording();
      setVoiceSite(pre => ({
        ...pre,
        pause: true,
        recording: false,
      }));
    } catch (err) {
      console.log(err);
    }
  };

  // 恢复录音
  const handleResumeVoice = async () => {
    if (!voiceSite.pause) {
      log('录音未暂停');
      return;
    }

    try {
      await AudioRecorder.resumeRecording();
      setVoiceSite(pre => ({
        ...pre,
        pause: false,
        recording: true,
      }));
    } catch (err) {
      console.log(err);
    }
  };

  // 停止录音
  const handleStopVoice = async () => {
    setVoiceSite(pre => ({
      ...pre,
      stop: true,
      recording: false,
      paused: false,
    }));
    try {
      await AudioRecorder.stopRecording();
    } catch (error) {
      console.error(error);
    }
  };

  console.log('voice', voiceSite);

  // 播放录音
  const handlePlayVoice = async () => {
    let whoosh = new Sound(voiceSite.audioPath, '', err => {
      if (err) {
        return console.log(err);
      }
      whoosh.play(success => {
        if (success) {
          console.log('success - 播放成功');
        } else {
          console.log('fail - 播放失败');
        }
      });
    });
  };

  useEffect(() => {
    console.log('进入 录音入口');
    checkAuthor();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.wrapper}>
      <Text style={styles.text} onPress={() => handleMusicPloy()}>
        播放音乐
      </Text>
      <Text style={styles.text} onPress={() => music.stop()}>
        暂停音乐
      </Text>
      <Text style={styles.text} onPress={() => checkAuthor()}>
        Record(拉去权限)
      </Text>
      <Text style={styles.text} onPress={() => handleStartVoice()}>
        Record(开始录音)
      </Text>
      <Text style={styles.text} onPress={() => handlePauseVoice()}>
        Pause(暂停录音)
      </Text>
      <Text style={styles.text} onPress={() => handleResumeVoice()}>
        Resume(恢复录音)
      </Text>
      <Text style={styles.text} onPress={() => handleStopVoice()}>
        Stop(停止录音)
      </Text>
      <Text style={styles.text} onPress={() => handlePlayVoice()}>
        Play(播放录音)
      </Text>
      <Text style={styles.text}>
        {voiceSite.recording
          ? '正在录音'
          : voiceSite.pause
          ? '已暂停'
          : '未开始'}
      </Text>
      <Text style={styles.text}>时长: {voiceSite.currentTime}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    marginVertical: 10,
  },
});
export default VoicePage;
