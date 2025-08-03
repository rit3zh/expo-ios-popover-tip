import { Text, SafeAreaView, StyleSheet, Appearance } from "react-native";
import * as React from "react";
import {
  ToolKitView,
  conigureTips,
  resetTips,
  TipDisplayFrequency,
} from "expo-ios-tookit";
import * as SplashScreen from "expo-splash-screen";
Appearance.setColorScheme("dark");

// SplashScreen.preventAutoHideAsync();

export default function App<T>() {
  React.useEffect(() => {
    async function setupiOSTips() {
      await resetTips();
      return await conigureTips();
    }
    setupiOSTips();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ToolKitView
        style={{
          width: 200,
          height: 40,
          backgroundColor: "purple",
          justifyContent: "center",
          alignItems: "center",
        }}
        onActionPress={(_) => console.log("action click", _.actionId)}
        tooltip={{
          id: "welcomeTip",
          title: { text: "Welcome!", bold: true, size: 18 },
          description: {
            text: "Tap here to get started.",
            size: 20,
            foregroundColor: "",
          },
          image: {
            systemName: "sparkle",
          },
          actions: [
            { id: "gotIt", title: "Got it" },
            { id: "help", title: "Why this?" },
          ],
        }}
      >
        <Text style={{ color: "white", fontSize: 20 }}>Hallo</Text>
      </ToolKitView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontWeight: "bold",
    fontSize: 20,
    color: "#ffffff",
  },
});
