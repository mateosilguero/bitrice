import PushNotification from 'react-native-push-notification';

export let notification_token = {
  os: '',
  token: '',
};

PushNotification.configure({
  onRegister: function (token) {
    console.log(token);
    notification_token = token;
  },
  onNotification: function (notification) {
    notification.finish('');
  },
  popInitialNotification: true,
  requestPermissions: true,
});
