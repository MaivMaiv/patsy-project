import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  plugins: {
    CapacitorHttp: {
      enabled: true,
    },
  },

  appId: 'io.ionic.starter',
  appName: 'Patsy App',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;
