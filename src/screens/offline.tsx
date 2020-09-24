import React from 'react';
import { Modal, View, StatusBar } from 'react-native';
import { useNetInfo } from '@react-native-community/netinfo';
import C, { theme, getSizeFor, apply } from 'consistencss';
import EmptyState from '../components/list/empty-state';
import Icon from '../components/addons/icon';

const OfflineScreen = () => {
  const { isInternetReachable } = useNetInfo();

  const isOffline = isInternetReachable !== null ? !isInternetReachable : false;

  return (
    <Modal transparent={true} visible={isOffline} animationType="fade">
      <StatusBar
        backgroundColor={theme.colors.primary}
        barStyle="light-content"
      />
      <View style={apply(C.bgPrimary, C.flex, C.justifyCenter)}>
        <EmptyState>
          <Icon
            name="wifi-strength-off-outline"
            size={getSizeFor(40)}
            color="white"
          />
          <EmptyState.Title text="Seems you are offline" style={C.textWhite} />
          <EmptyState.Description
            text="Check the internet connection..."
            style={C.textWhite}
          />
        </EmptyState>
      </View>
    </Modal>
  );
};

export default OfflineScreen;
