import { EnvVars } from '../interfaces/bitrise';

const base_url = 'https://api.bitrise.io/v0.1';
let token = '';

export const fetcher = (endpoint = '', method = 'GET', params = {}) =>
  fetch(`${base_url}${endpoint}`, {
    method,
    ...(method !== 'GET' && {
      body: JSON.stringify(params),
    }),
    headers: {
      Authorization: token,
      'Content-Type': 'application/json',
    },
  }).then((res) => {
    if (res.headers.get('content-type') === 'application/json; charset=utf-8') {
      return res.json();
    } else {
      return res.text();
    }
  });

export const setApiToken = (t: string) => {
  token = t;
};

export default {
  me: () => fetcher('/me'),
  post_build: (
    app_id: string,
    branch: string,
    workflow: string,
    environments: EnvVars[],
  ) =>
    fetcher(`/apps/${app_id}/builds`, 'POST', {
      build_params: {
        branch: branch,
        workflow_id: workflow,
        environments,
      },
      hook_info: {
        type: 'bitrise',
      },
    }),
  abort_build: (app_id: string, build_id: string) =>
    fetcher(`/apps/${app_id}/builds/${build_id}/abort`, 'POST'),
  webhooks: (app_id: string) => fetcher(`/apps/${app_id}/outgoing-webhooks`),
  create_webhook: (app_id: string, notification_token: string) =>
    fetcher(`/apps/${app_id}/outgoing-webhooks`, 'POST', {
      events: ['build'],
      headers: { 'notification-token': notification_token },
      secret: '',
      url: '', // env.send_notifications_url
    }),
  remove_webhook: (app_id: string, webhook_id: string) =>
    fetcher(`/apps/${app_id}/outgoing-webhooks/${webhook_id}`, 'DELETE'),
};
