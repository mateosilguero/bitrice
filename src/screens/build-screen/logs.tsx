import React, { useContext, useRef, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { LogContext } from './log-context';
import C, { apply } from 'consistencss';
import EmptyState from '../../components/list/empty-state';
import EmptyImage from '../../assets/images/empty.png';
import { useNavigation } from '@react-navigation/native';
import BuildHeader from './build-header';

const LogsScreen = () => {
  const [logs, build, app] = useContext(LogContext);
  const scroll = useRef<ScrollView>(null);
  const [pinned, setPinned] = useState(true);
  const { navigate } = useNavigation();

  return (
    <View style={apply(C.bgWhite, C.flex)}>
      <BuildHeader
        app={app}
        build={build}
        scroll={scroll}
        pinned={pinned}
        setPinned={setPinned}
        navigate={navigate}
      />
      <ScrollView
        ref={scroll}
        onContentSizeChange={() => pinned && scroll.current?.scrollToEnd()}
        contentContainerStyle={C.p2}>
        {logs ? (
          <ScrollView horizontal>
            <Text selectable>{logs}</Text>
          </ScrollView>
        ) : (
          <EmptyState>
            <EmptyState.Image source={EmptyImage} />
            <EmptyState.Title text="Your bowl is clean !" />
            <EmptyState.Description
              text={
                build?.status === 0
                  ? 'There are no logs yet.'
                  : 'The build was aborted.'
              }
            />
          </EmptyState>
        )}
      </ScrollView>
    </View>
  );
};

export default LogsScreen;
