import React, { useState } from 'react';
import { FlatList } from 'react-native';
import C, { apply } from 'consistencss';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import TextInput from '../components/input/textinput';
import Spacer from '../components/layout/spacer';
import { Title } from '../components/typography';
import { Pressable } from '../components/pressable';
import { RootStackProps } from '../interfaces/routing';

const FinderScreen = () => {
  const {
    params: { data = [], key },
  } = useRoute<RouteProp<RootStackProps, 'Finder'>>();
  const { goBack, navigate } = useNavigation();
  const [search, setSearch] = useState('');

  return (
    <>
      <TextInput>
        <TextInput.Container style={[C.border0]}>
          <Pressable onPress={goBack}>
            <TextInput.Icon name="arrow-left" />
          </Pressable>
          <TextInput.Field placeholder="Search..." onChangeText={setSearch} />
          <TextInput.Icon name="magnify" />
        </TextInput.Container>
      </TextInput>
      <FlatList
        data={data.filter((e) =>
          e.toLowerCase().includes(search.toLowerCase()),
        )}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => navigate('Trigger', { [`${key}Selected`]: item })}
            style={apply(C.borderbottomHairline, C.borderSecondary)}>
            <Spacer horizontal={4} vertical={3}>
              <Title text={item} />
            </Spacer>
          </Pressable>
        )}
      />
    </>
  );
};

export default FinderScreen;
