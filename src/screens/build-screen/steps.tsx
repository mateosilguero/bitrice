import React, { useContext, useMemo } from 'react';
import { FlatList, RefreshControl, View } from 'react-native';
import { LogContext } from './log-context';
import C, { apply, theme } from 'consistencss';
import ListItem from '../../components/list';
import EmptyState from '../../components/list/empty-state';

import EmptyImage from '../../assets/images/empty.png';
import BuildHeader from './build-header';
import { useNavigation } from '@react-navigation/native';
import { uniqueElementsBy } from '../../utils/array';

interface Step {
  name: string;
  step: string;
  version: string;
  status: number;
  time: string;
}

const StepsScreen = () => {
  const [logs, build, app, isValidating] = useContext(LogContext);
  const { navigate } = useNavigation();

  const statuses = [
    {
      color: theme.colors.success,
      icon: 'check',
    },
    {
      color: theme.colors.error,
      icon: 'close',
    },
    {
      color: theme.colors.primary,
      icon: 'debug-step-over',
    },
  ];

  const parsedLogs = useMemo(
    () =>
      uniqueElementsBy<Step>(
        logs
          ?.match(/\| ((.?)+) \| ((.?)+) \| ((.?)+(sec|min)) ?\|/g)
          ?.map((e) => {
            const [, rawStatus, name, time] = e.split('|').map((x) => x.trim());
            const [step, version = ''] = name.split('@');
            const parsedVersion = version ? `version: ${version} -` : '';
            const status = ['✓', 'x', '-'].indexOf(rawStatus);
            return { name, step, version: parsedVersion, status, time };
          }) || [],
        (a, b) => a.name === b.name,
      ).sort((a, b) => (a.status < b.status ? -1 : 1)),
    [logs],
  );

  return (
    <View style={apply(C.flex, C.bgWhite, C.justifyCenter)}>
      <BuildHeader app={app} build={build} navigate={navigate} />
      <FlatList
        data={parsedLogs}
        keyExtractor={(item) => item.step}
        refreshControl={<RefreshControl refreshing={isValidating} />}
        renderItem={({ item }) => {
          const status = statuses[item.status];
          return (
            <ListItem style={apply(C.py2, C.m2)}>
              <ListItem.Icon
                name={status?.icon || 'debug-step-over'}
                color={status?.color}
                style={apply(C.selfCenter, C.ml4, C.font7)}
              />
              <ListItem.Content>
                <ListItem.Title text={item.step} style={C.font5} />
                <ListItem.Description text={`${item.version} ${item.time}`} />
              </ListItem.Content>
            </ListItem>
          );
        }}
        ListEmptyComponent={
          !isValidating ? (
            <EmptyState>
              <EmptyState.Image source={EmptyImage} />
              <EmptyState.Title text="Your bowl is clean !" />
              <EmptyState.Description
                text={
                  build?.status === 3
                    ? 'The build was aborted.'
                    : 'There are no steps yet.'
                }
              />
            </EmptyState>
          ) : null
        }
      />
    </View>
  );
};

export default StepsScreen;
