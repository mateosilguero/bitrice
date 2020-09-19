import React, { useEffect, useState, useCallback } from 'react';
import { Image } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import bitrise, { setApiToken } from '../services/bitrise';
import C from 'consistencss';
import { useNavigation } from '@react-navigation/native';
import TextInput from '../components/input/textinput';
import Spacer from '../components/layout/spacer';
import Button from '../components/pressable/button';
import Logo from '../assets/images/bitrice.png';
import { Label, Title } from '../components/typography';

const LoginScreen = () => {
  const [token, setToken] = useState('');
  const [inputHeight, setInputHeight] = useState(16);
  const { reset } = useNavigation();

  const login = useCallback(
    async (t: string) => {
      setApiToken(t);
      try {
        await bitrise.me();
        await AsyncStorage.setItem('token', t);
        reset({
          index: 0,
          routes: [{ name: 'Home' }],
        });
      } catch (e) {
        AsyncStorage.removeItem('token');
      }
    },
    [reset],
  );

  useEffect(() => {
    AsyncStorage.getItem('token').then((t) => {
      if (t) {
        login(t);
      }
    });
  }, [login]);

  return (
    <Spacer horizontal={8} vertical={4}>
      <Image source={Logo} style={[C.wFull, C.h28]} resizeMode="contain" />
      <Spacer top={4} />
      <Title text="Bitrice" style={C.alignCenter} />
      <Label text="unofficial bitirise client" style={C.alignCenter} />
      <Spacer top={2} />
      <TextInput>
        <TextInput.Label text="api token" />
        <TextInput.Container>
          <TextInput.Icon name="key" />
          <TextInput.Field
            onChangeText={setToken}
            multiline
            numberOfLines={2}
            style={{ height: inputHeight }}
            onContentSizeChange={(e) =>
              setInputHeight(e.nativeEvent.contentSize.height)
            }
          />
        </TextInput.Container>
        <TextInput.Label text="" />
      </TextInput>
      <Spacer top={0} />
      <Button disabled={!token} onPress={() => login(token)}>
        <Button.Text text="Let's build !" />
        <Button.Icon name="robot" />
      </Button>
    </Spacer>
  );
};

export default LoginScreen;
