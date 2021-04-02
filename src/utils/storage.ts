import MMKVStorage from 'react-native-mmkv-storage';

const MMKV = new MMKVStorage.Loader()
  .setProcessingMode(MMKVStorage.MODES.SINGLE_PROCESS)
  .initialize();

export default MMKV;
