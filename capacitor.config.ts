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
