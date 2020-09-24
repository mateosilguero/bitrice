import React from 'react';
import { ScrollView } from 'react-native';
import JSONTree from 'react-native-json-tree';
import jsyaml from 'js-yaml';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { Title, Label } from '../components/typography';
import C, { apply, View } from 'consistencss';
import ListItem from '../components/list';
import Spacer from '../components/layout/spacer';
import Header from '../components/layout/screen-header';
import { Pressable } from 'react-native';
import Icon from '../components/addons/icon';
import Row from '../components/layout/row';
import { RootStackProps } from '../interfaces/routing';
import useSWR from 'swr';

const YamlScreen = () => {
  const { goBack } = useNavigation();
  const {
    params: { app },
  } = useRoute<RouteProp<RootStackProps, 'BuildYaml'>>();

  const { data } = useSWR(`/apps/${app.slug}/bitrise.yml`);

  const json = jsyaml.load(data) || {};

  return (
    <View style={apply(C.minhFull, { backgroundColor: '#002b36' })}>
      <Header>
        <Row>
          <Pressable onPress={goBack}>
            <Icon name="arrow-left" size={28} style={C.mr2} />
          </Pressable>
          <Title text="Bitrise.yml" />
        </Row>
      </Header>
      <ScrollView contentContainerStyle={apply(C.pb16, C.mt2)}>
        <JSONTree
          data={json}
          style={C.font8}
          invertTheme={false}
          labelRenderer={(raw: string[]) => (
            <Spacer>
              <ListItem>
                <ListItem.Content>
                  <ListItem.Description text={raw[0]} />
                </ListItem.Content>
              </ListItem>
            </Spacer>
          )}
          getItemString={(
            type: string,
            _data: any,
            _itemType: any,
            itemString: string,
          ) => <Label text={`${type} ${itemString}`} />}
        />
      </ScrollView>
    </View>
  );
};

export default YamlScreen;
