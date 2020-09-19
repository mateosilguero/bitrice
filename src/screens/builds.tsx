import React, { useCallback } from 'react';
import {
  View,
  Pressable,
  RefreshControl,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import {
  useNavigation,
  useRoute,
  useFocusEffect,
  RouteProp,
} from '@react-navigation/native';
import { formatRelative } from 'date-fns';
import useSWR from 'swr';
import C, { apply } from 'consistencss';
import ListItem from '../components/list';
import { Title } from '../components/typography';
import Spacer from '../components/layout/spacer';
import Header from '../components/layout/screen-header';
import Row from '../components/layout/row';
import Icon from '../components/addons/icon';
import EmptyState from '../components/list/empty-state';
import Fab from '../components/pressable/fab';
import Sleeping from '../assets/images/sleeping.png';
import Button from '../components/pressable/button';
import { BitriseBuild } from '../interfaces/bitrise';
import { RootStackProps } from '../interfaces/routing';

const statuses = [
  { icon: 'loading', color: 'Primary' },
  { icon: 'check-all', color: 'Success' },
  { icon: 'close-circle-outline', color: 'Error' },
  { icon: 'cancel', color: 'Warning' },
];

function timeUnitsBetween(startDate: Date, endDate: Date) {
  // @ts-ignore
  let delta = Math.abs(endDate - startDate) / 1000;
  const isNegative = startDate > endDate ? -1 : 1;
  return [
    ['hours', 3600],
    ['minutes', 60],
    ['seconds', 1],
  ].reduce(
    (acc, [key, value]) => (
      // @ts-ignore
      (acc[key] = Math.floor(delta / value) * isNegative),
      // @ts-ignore
      (delta -= acc[key] * isNegative * value),
      acc
    ),
    {
      hours: 0,
      minutes: 0,
      seconds: 0,
    },
  );
}

const BuildsScreen = () => {
  const { goBack, navigate } = useNavigation();
  const {
    params: { app },
  } = useRoute<RouteProp<RootStackProps, 'Builds'>>();

  const { data, isValidating, mutate, revalidate } = useSWR<{
    data: BitriseBuild[];
  }>(`/apps/${app.slug}/builds`);

  const builds = data?.data || [];

  useFocusEffect(
    useCallback(() => {
      mutate();
    }, [mutate]),
  );

  return (
    <>
      <Header>
        <Row>
          <Pressable onPress={goBack} style={C.mr4}>
            <Icon name="arrow-left" size={28} style={C.textPrimary} />
          </Pressable>
          <Title text={app.title || 'Builds'} />
        </Row>
        <Pressable onPress={() => navigate('BuildYaml', { app })}>
          <Icon name="lan" size={36} style={C.textPrimary} />
        </Pressable>
      </Header>
      <FlatList
        data={builds}
        contentContainerStyle={apply(C.py4)}
        refreshControl={
          <RefreshControl refreshing={isValidating} onRefresh={revalidate} />
        }
        renderItem={({ item }) => {
          const duration = timeUnitsBetween(
            new Date(item.started_on_worker_at),
            new Date(item.finished_at),
          );
          const isInProgress = item.status === 0;
          return (
            <Spacer>
              <Pressable
                onPress={() => navigate('Build', { app, build: item })}>
                <ListItem>
                  <View
                    style={apply(
                      `bg${statuses[item.status].color}`,
                      C.justifyCenter,
                      C.px2,
                      C.py6,
                    )}>
                    {isInProgress ? (
                      <ActivityIndicator color="white" size={24} style={C.p2} />
                    ) : (
                      <ListItem.Icon
                        name={statuses[item.status].icon}
                        color="white"
                        style={apply(C.selfCenter, C.alignCenter, C.font6)}
                      />
                    )}
                  </View>
                  <ListItem.Content style={C.pb2}>
                    <ListItem.Title
                      text={`#${item.build_number}  ${item.triggered_workflow}`}
                      numberOfLines={1}
                      style={C.font5}
                    />
                    <Row>
                      <ListItem.Icon name="source-branch" style={C.mx0} />
                      <ListItem.Description text={item.branch} />
                    </Row>
                    <ListItem.Description
                      text={formatRelative(
                        new Date(item.triggered_at),
                        new Date(),
                      )}
                    />
                    {item.triggered_by && (
                      <ListItem.Description
                        text={item.triggered_by}
                        numberOfLines={1}
                      />
                    )}
                  </ListItem.Content>
                  {!isInProgress && (
                    <>
                      <Row style={[C.pr2, C.h9]}>
                        <ListItem.Icon name="timer-outline" />
                        <ListItem.Description
                          text={`${
                            duration.hours > 0 ? duration.hours + 'h ' : ''
                          }${
                            duration.minutes > 0 ? duration.minutes + 'm ' : ''
                          }${duration.seconds}s`}
                        />
                      </Row>
                    </>
                  )}
                </ListItem>
              </Pressable>
            </Spacer>
          );
        }}
        keyExtractor={(item) => item.slug}
        ListEmptyComponent={
          !isValidating ? (
            <EmptyState>
              <EmptyState.Image source={Sleeping} style={[C.mr_8, C.mb_4]} />
              <EmptyState.Title text="Bitbot is sleeping" />
              <EmptyState.Description text="Let's trigger a new build !" />
              <Spacer bottom={4} />
              <Button>
                <Button.Text text="New build" />
                <Button.Icon name="flash" />
              </Button>
            </EmptyState>
          ) : null
        }
      />
      {builds.length > 0 && (
        <Fab onPress={() => navigate('Trigger', { app })}>
          <Fab.Icon name="flash" />
        </Fab>
      )}
    </>
  );
};

export default BuildsScreen;
