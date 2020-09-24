import { BitriseApp, BitriseBuild } from '../interfaces/bitrise';

export type RootStackProps = {
  Login: undefined;
  Home: undefined;
  Builds: { app: BitriseApp };
  Trigger: {
    app: BitriseApp;
    branchSelected?: string;
    workflowSelected?: string;
  };
  Notifications: { app: BitriseApp };
  Finder: { data: string[]; key: string };
  BuildYaml: { app: BitriseApp };
  Build: { app: BitriseApp; build: BitriseBuild };
};
