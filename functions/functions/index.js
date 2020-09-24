const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const statuses = (build_number) => [
  undefined,
  `Build #${build_number} has finished successfully !`,
  `Build #${build_number} failed.`,
  `Build #${build_number} was aborted.`,
];

exports.sendPushNotification = functions.https.onRequest((req, res) => {
  const build_data = req.body;
  const token = req.headers['notification-token'];
  const appId = req.headers['bitrise-app-id'];
  if (build_data && build_data.build_status && token && appId) {
    payload = {
      notification: {
        title: statuses(build_data.build_number)[build_data.build_status],
        body: build_data.build_triggered_workflow,
      },
    };
    admin
      .messaging()
      .sendToDevice(token, payload)
      .catch((error) => {
        console.log('Notification sent failed:', error);
      });
    res.sendStatus(200);
  } else {
    res.sendStatus(400);
  }
});
