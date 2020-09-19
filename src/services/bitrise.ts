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
  post_build: (app_id: string, branch: string, workflow: string) =>
    fetcher(`/apps/${app_id}/builds`, 'POST', {
      build_params: {
        branch: branch,
        workflow_id: workflow,
      },
      hook_info: {
        type: 'bitrise',
      },
    }),
  abort_build: (app_id: string, build_id: string) =>
    fetcher(`/apps/${app_id}/builds/${build_id}/abort`, 'POST'),
};
