import {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
  Dimensions,
  Button,
} from "react-native";
import * as React from "react";
import { SFSymbol, SymbolView } from "expo-symbols";
import {
  ToolTipView,
  TipActionEvent,
  TipDismissEvent,
  configureTips,
  resetTips,
} from "expo-ios-popover-tip";

const { width: screenWidth } = Dimensions.get("window");

type TipId = "help" | "notification" | "add_item";
const TIPS_ORDER: TipId[] = ["help", "notification", "add_item"];

export function Home() {
  const [visibleTip, setVisibleTip] = React.useState<TipId | null>(null);
  const [tipsReady, setTipsReady] = React.useState(false);

  // Initialize TipKit ONCE on mount
  React.useEffect(() => {
    async function setup() {
      await resetTips();
      setTipsReady(true);

      setTimeout(() => setVisibleTip("help"), 1000);
    }
    setup();
  }, []);

  // Move to next tip in sequence
  const goToNextTip = React.useCallback((currentTipId: TipId) => {
    const currentIndex = TIPS_ORDER.indexOf(currentTipId);
    const nextTip = TIPS_ORDER[currentIndex + 1] ?? null;

    setVisibleTip(null);
    if (nextTip) {
      setTimeout(() => setVisibleTip(nextTip), 300);
    }
  }, []);

  // Handle action press
  const handleActionPress = React.useCallback(
    (tipId: TipId) => (event: TipActionEvent) => {
      console.log("Action:", event.nativeEvent);
      goToNextTip(tipId);
    },
    [goToNextTip],
  );

  // Handle tip dismiss
  const handleTipDismiss = React.useCallback(
    (tipId: TipId) => (event: TipDismissEvent) => {
      console.log("Dismissed:", event.nativeEvent);

      // If tip was already shown or not eligible, still move to next
      goToNextTip(tipId);
    },
    [goToNextTip],
  );

  // Reset tips and start over (for testing)
  const handleResetTips = React.useCallback(async () => {
    setVisibleTip(null);

    // Reset all tip state
    await resetTips();

    // Re-initialize
    await configureTips();

    // Start showing tips again
    setTimeout(() => setVisibleTip("help"), 500);
  }, []);

  const features = [
    {
      id: 1,
      title: "Scan",
      description: "Documents, ID cards...",
      icon: "doc.text.viewfinder",
    },
    {
      id: 2,
      title: "Edit",
      description: "Sign, add text, mark...",
      icon: "square.and.pencil",
    },
    {
      id: 3,
      title: "Convert",
      description: "PDF, DOCX, JPG, TXT...",
      icon: "arrow.triangle.2.circlepath",
    },
    {
      id: 4,
      title: "Ask AI",
      description: "Summarize, finish wri...",
      icon: "brain.head.profile",
    },
  ];

  if (!tipsReady) return null;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        {/* Help Button with Tip */}
        <ToolTipView
          isVisible={visibleTip === "help"}
          onActionPress={handleActionPress("help")}
          onTipDismiss={handleTipDismiss("help")}
          tooltip={{
            id: "help_tooltip",
            title: { text: "Need Help?", bold: true },
            description: { text: "Tap here for tutorials and support." },
            image: { systemName: "questionmark.circle.fill" },
            actions: [
              { id: "view_guide", title: "View Guide" },
              { id: "contact", title: "Contact Support" },
            ],
          }}
        >
          <TouchableOpacity style={styles.iconButton}>
            <SymbolView name="questionmark.circle" size={24} tintColor="#fff" />
          </TouchableOpacity>
        </ToolTipView>

        {/* Notification Button with Tip */}
        <ToolTipView
          isVisible={visibleTip === "notification"}
          onActionPress={handleActionPress("notification")}
          onTipDismiss={handleTipDismiss("notification")}
          tooltip={{
            id: "notification_tooltip",
            title: { text: "Notifications" },
            description: { text: "You have 5 new notifications" },
          }}
        >
          <TouchableOpacity style={styles.iconButton}>
            <SymbolView name="bell.fill" size={24} tintColor="#fff" />
            <View style={styles.badge}>
              <Text style={styles.badgeText}>5</Text>
            </View>
          </TouchableOpacity>
        </ToolTipView>
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        <Text style={styles.greeting}>Hi there,</Text>
        <Text style={styles.subtitle}>How can I help you today?</Text>

        {/* Reset Button - for testing */}
        <View style={styles.resetButton}>
          <Button title="Reset Tips & Show Again" onPress={handleResetTips} />
        </View>

        {/* Features Grid */}
        <View style={styles.grid}>
          {features.map((feature) => (
            <TouchableOpacity key={feature.id} style={styles.card}>
              <SymbolView
                name={feature.icon as SFSymbol}
                size={32}
                tintColor="#fff"
              />
              <Text style={styles.cardTitle}>{feature.title}</Text>
              <Text style={styles.cardDesc}>{feature.description}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Bottom Actions */}
        <View style={styles.bottomBar}>
          <TouchableOpacity style={styles.iconButton}>
            <SymbolView name="square.grid.3x3" size={24} tintColor="#fff" />
          </TouchableOpacity>

          {/* Add Button with Tip */}
          <ToolTipView
            isVisible={visibleTip === "add_item"}
            onActionPress={handleActionPress("add_item")}
            onTipDismiss={handleTipDismiss("add_item")}
            tooltip={{
              id: "add_tooltip",
              title: { text: "Add New Item", bold: true },
              description: { text: "Quickly add a new task or note." },
              image: { systemName: "plus.circle.fill" },
              actions: [{ id: "add_now", title: "Add Now" }],
            }}
          >
            <TouchableOpacity style={styles.addButton}>
              <SymbolView name="plus" size={24} tintColor="#fff" />
            </TouchableOpacity>
          </ToolTipView>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#262626",
    justifyContent: "center",
    alignItems: "center",
  },
  badge: {
    position: "absolute",
    top: -2,
    right: -2,
    backgroundColor: "red",
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: { fontSize: 12, fontWeight: "bold", color: "#fff" },
  content: { flex: 1, paddingHorizontal: 20 },
  greeting: { fontSize: 42, fontWeight: "600", color: "#999", marginTop: 20 },
  subtitle: { fontSize: 36, fontWeight: "300", color: "#fff" },
  resetButton: { marginTop: 20 },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
    marginTop: 20,
  },
  card: {
    width: (screenWidth - 56) / 2,
    backgroundColor: "#1a1a1a",
    borderRadius: 16,
    padding: 20,
  },
  cardTitle: { fontSize: 18, fontWeight: "600", color: "#fff", marginTop: 16 },
  cardDesc: { fontSize: 14, color: "#999", marginTop: 4 },
  bottomBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 30,
  },
  addButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#333",
    justifyContent: "center",
    alignItems: "center",
  },
});
