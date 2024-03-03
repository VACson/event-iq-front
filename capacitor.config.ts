import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'capasitor.pet',
  appName: 'capasitor-pet',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
