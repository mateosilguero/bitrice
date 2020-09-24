import React from 'react';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import useSWR from 'swr';
import Button from '../components/pressable/button';
import Spacer from '../components/layout/spacer';
import Icon from '../components/addons/icon';
import { Pressable } from '../components/pressable';
import bitrise from '../services/bitrise';
import { RootStackProps } from '../interfaces/routing';
import { throttle } from '../utils/invokes';
import EmptyState from '../components/list/empty-state';
import { BitriseWebhook } from '../interfaces/bitrise';
import { notification_token } from '../Notifications';
import { ActivityIndicator } from 'react-native';
import C, { theme, getSizeFor } from 'consistencss';
import { filterWebhooks } from '../utils/bitrise-data';

const NotificationsScreen = () => {
  const {
    params: { app },
  } = useRoute<RouteProp<RootStackProps, 'Notifications'>>();
  const { goBack } = useNavigation();

  const { data, isValidating, revalidate } = useSWR<{
    data: BitriseWebhook[];
  }>(`/apps/${app.slug}/outgoing-webhooks`);

  const webhooks = filterWebhooks(data?.data || [], notification_token.token);

  const hasWebhooks = webhooks.length > 0;

  const unsuscribe = throttle(() => {
    Promise.all(
      webhooks.map((hook) => bitrise.remove_webhook(app.slug, hook.slug)),
    ).finally(revalidate);
  });

  const suscribe = throttle(() => {
    bitrise
      .create_webhook(app.slug, notification_token.token)
      .finally(revalidate);
  });

  return (
    <Spacer horizontal={4} vertical={4}>
      <Pressable onPress={goBack} style={C.w8}>
        <Icon name="arrow-left" size={28} />
      </Pressable>
      <Spacer horizontal={0} vertical={4} />
      {isValidating ? (
        <ActivityIndicator size={getSizeFor(12)} color={theme.colors.primary} />
      ) : hasWebhooks ? (
        <>
          <EmptyState>
            <Icon name="bell-ring" size={80} color={theme.colors.primary} />
            <Spacer vertical={4} />
            <EmptyState.Title text="Too much noise ?" />
            <EmptyState.Description text="Disable push notifications for this app." />
          </EmptyState>
          <Spacer vertical={6} />
          <Button onPress={unsuscribe}>
            <Button.Text text="Unsuscribe" />
            <Button.Icon name="bell-off" />
          </Button>
        </>
      ) : (
        <>
          <EmptyState>
            <Icon name="bell-sleep" size={80} color={theme.colors.warning} />
            <Spacer vertical={4} />
            <EmptyState.Title text="Want to be up-to-date ?" />
            <EmptyState.Description text="Seems your notificationes are off." />
            <EmptyState.Description text="Suscribe to build result notifications." />
          </EmptyState>
          <Spacer vertical={6} />
          <Button onPress={suscribe}>
            <Button.Text text="Suscribe" />
            <Button.Icon name="bell" />
          </Button>
        </>
      )}
    </Spacer>
  );
};

export default NotificationsScreen;
