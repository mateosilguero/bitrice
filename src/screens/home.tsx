import React from 'react';
import { FlatList, View, Pressable, RefreshControl } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import C, { apply } from 'consistencss';
import ListItem from '../components/list';
import Spacer from '../components/layout/spacer';
import Header from '../components/layout/screen-header';
import { Title } from '../components/typography';
import Icon from '../components/addons/icon';
import useSWR from 'swr';
import EmptyState from '../components/list/empty-state';
import NoAppsImage from '../assets/images/empty.png';
import { BitriseApp } from '../interfaces/bitrise';

const HomeScreen = () => {
  const { navigate, reset } = useNavigation();
  const { data, isValidating, revalidate } = useSWR<{ data: BitriseApp[] }>(
    '/apps',
  );

  const apps = data?.data || [];

  return (
    <View>
      <Header>
        <Title text="Your apps" />
        <Pressable
          onPress={() => {
            AsyncStorage.removeItem('token');
            reset({ index: 0, routes: [{ name: 'Login' }] });
          }}>
          <Icon
            name="account-switch"
            size={32}
            style={apply(C.textPrimary, C.pt1)}
          />
        </Pressable>
      </Header>
      <Spacer top={0} />
      <FlatList
        contentContainerStyle={apply(C.px4, C.pb18)}
        data={apps}
        refreshControl={
          <RefreshControl refreshing={isValidating} onRefresh={revalidate} />
        }
        renderItem={({ item }) => (
          <Spacer horizontal={1}>
            <Pressable onPress={() => navigate('Builds', { app: item })}>
              <ListItem style={C.pb1}>
                {item.avatar_url ? (
                  <ListItem.Image
                    source={{ uri: item.avatar_url }}
                    style={C.ml4}
                  />
                ) : (
                  <ListItem.Icon
                    name="rice"
                    style={apply(C.font10, C.w10, C.selfCenter)}
                  />
                )}
                <ListItem.Content>
                  <ListItem.Title text={item.title} />
                  <ListItem.Description text={item.repo_owner} />
                </ListItem.Content>
              </ListItem>
            </Pressable>
          </Spacer>
        )}
        keyExtractor={(item) => item.slug}
        ListEmptyComponent={
          !isValidating ? (
            <EmptyState>
              <EmptyState.Image source={NoAppsImage} />
              <EmptyState.Title text="Your bowl is clean !" />
              <EmptyState.Description text="Seems there are no apps here." />
              <EmptyState.Description text="Go to the birtise page to create a new one." />
            </EmptyState>
          ) : null
        }
      />
    </View>
  );
};

export default HomeScreen;
