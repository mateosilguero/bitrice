import { BitriseWebhook } from '../interfaces/bitrise';

export const filterWebhooks = (
  webhooks: BitriseWebhook[],
  notification_token: string,
) =>
  webhooks.filter(
    (hook) =>
      !hook.registered_by_addon &&
      hook.headers['notification-token'] === notification_token,
  );
