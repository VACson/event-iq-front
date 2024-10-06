import { CapacitorConfig } from "@capacitor/cli"

const config: CapacitorConfig = {
  appId: "capasitor.pet",
  appName: "capasitor-pet",
  webDir: "dist",
  server: {
    androidScheme: "https"
    // allowNavigation: [".*://localhost:8000/.*"]
  }
}

export default config

// {
//   "appName": "",
//   "webDir": "dist",
//   "bundledWebRuntime": false,
//   "plugins": {
//     "PushNotifications": {
//       "presentationOptions": ["badge", "sound", "alert"]
//     }
//   },
//   "ios": {
//     "limitsNavigationsToAppBoundDomains": true,
//     "includePlugins": [
//       "@capacitor/push-notifications",
//       "@capacitor-community/fcm",
//       "@capacitor/geolocation",
//       "@capacitor/device"
//     ]
//   },
//   "android": {
//     "includePlugins": [
//       "@capacitor/push-notifications-android",
//       "@capacitor-community/fcm",
//       "@capacitor/geolocation",
//       "@capacitor/device"
//     ]
//   }
// }
