import {
  Text,
  SafeAreaView,
  StyleSheet,
  Appearance,
  View,
  TouchableOpacity,
  Dimensions,
  TextInput,
  PlatformColor,
} from "react-native";
import * as React from "react";
import { SFSymbol, SymbolView } from "expo-symbols";
import {
  ToolTipPopoverView,
  configureTips,
  resetTips,
} from "expo-ios-popover-tip";
import { AnimatedMeshGradient } from "expo-ios-mesh-gradient";

Appearance.setColorScheme("dark");

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export function Home() {
  const tipQueue = [1, 2, 3, 4];
  const [currentTipIndex, setCurrentTipIndex] = React.useState<number>(1);

  function handleTipEvent(event: any) {
    console.log(event);
    const nextIndex = currentTipIndex + 1;

    setCurrentTipIndex(nextIndex);
  }

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

  const [tipsReady, setTipsReady] = React.useState(false);
  React.useEffect(() => {
    async function setup() {
      await resetTips();
      await configureTips();
      setTimeout(() => setTipsReady(true), 500);
    }
    setup();
  });
  if (!tipsReady) return null;

  return (
    <AnimatedMeshGradient
      colors={["#000000", "#111111", "#222222", "#2f2f2f", "#1c1c1c"]}
      style={styles.gradient}
      animated={true}
      points={[
        [0.0, 0.0],
        [0.5, 0.0],
        [1.0, 0.0],
        [0.0, 0.5],
        [0.5, 0.5],
        [1.0, 0.5],
        [0.0, 1.0],
        [0.5, 1.0],
        [1.0, 1.0],
      ]}
      animationSpeed={0.003_5}
    >
      <SafeAreaView style={styles.container}>
        {/* Status Bar Area */}
        {/* Header */}
        <View style={styles.header}>
          <ToolTipPopoverView
            key={"help" + tipQueue[currentTipIndex]}
            onTipDismiss={handleTipEvent}
            tooltip={{
              id: "help_tooltip",
              title: {
                text: "Need Help?",
                bold: true,
                size: 29,
                foregroundColor: "#ffffff",
              },
              actions: [
                {
                  id: "open_help",
                  title: "View Guide",
                },
                {
                  id: "contact_support",
                  title: "Contact Support",
                },
              ],
              image: {
                systemName: "questionmark.circle.fill",
              },
              description: {
                text: "Tap here to access tutorials, FAQs, and support.",
                bold: false,
                size: 20,
                foregroundColor: "#bbbbbb",
              },
            }}
          >
            <TouchableOpacity style={styles.helpButton}>
              <SymbolView
                name="questionmark.circle"
                size={24}
                type="hierarchical"
                tintColor="#ffffff"
              />
            </TouchableOpacity>
          </ToolTipPopoverView>
          <ToolTipPopoverView
            key={"noti" + tipQueue[currentTipIndex]}
            tooltip={{
              id: "notification",
              title: {
                text: "Notifications",
                bold: false,
                size: 20,
                foregroundColor: "#ffff",
              },

              description: {
                text: "You have 5 new notifications",
                bold: false,
                size: 18,
                foregroundColor: "#ffff",
              },
            }}
            onTipDismiss={handleTipEvent}
          >
            <TouchableOpacity style={styles.notificationButton}>
              <SymbolView
                name="bell.fill"
                size={24}
                type="hierarchical"
                tintColor={PlatformColor("systemWhite")}
              />
              <View style={styles.notificationBadge}>
                <Text style={styles.badgeText}>5</Text>
              </View>
            </TouchableOpacity>
          </ToolTipPopoverView>
        </View>

        {/* Main Content */}
        <View style={styles.mainContent}>
          {/* Greeting */}
          <View style={styles.greetingSection}>
            <Text style={styles.greetingLight}>Hi Rit3zh,</Text>
            <Text style={styles.greetingBold}>How can I help you today?</Text>
          </View>

          {/* Feature Grid */}
          <View style={styles.featuresGrid}>
            {features.map((feature, index) => (
              <TouchableOpacity
                key={feature.id}
                style={styles.featureCard}
                activeOpacity={0.8}
              >
                <View style={styles.cardContent}>
                  <View style={styles.iconContainer}>
                    <SymbolView
                      name={feature.icon as SFSymbol}
                      size={32}
                      type="hierarchical"
                      tintColor="#ffffff"
                    />
                  </View>
                  <Text style={styles.featureTitle}>{feature.title}</Text>
                  <Text style={styles.featureDescription}>
                    {feature.description}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <View style={styles.searchBar}>
              <SymbolView
                name="magnifyingglass"
                size={20}
                type="hierarchical"
                tintColor="#666666"
                style={styles.searchIcon}
              />
              <TextInput
                style={styles.searchInput}
                placeholder="Search"
                placeholderTextColor="#666666"
              />
              <TouchableOpacity style={styles.voiceButton}>
                <SymbolView
                  name="waveform"
                  size={20}
                  type="hierarchical"
                  tintColor="#666666"
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Bottom Action Bar */}
          <View style={styles.bottomActionBar}>
            <View style={styles.leftActions}>
              <TouchableOpacity style={styles.actionButton}>
                <View style={styles.actionButtonContent}>
                  <SymbolView
                    name="square.grid.3x3"
                    size={24}
                    type="hierarchical"
                    tintColor="#ffffff"
                  />
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionButton}>
                <View style={styles.actionButtonContent}>
                  <SymbolView
                    name="person.circle"
                    size={24}
                    type="hierarchical"
                    tintColor="#ffffff"
                  />
                </View>
              </TouchableOpacity>
            </View>
            <ToolTipPopoverView
              key={"add" + tipQueue[currentTipIndex]} // ✅ Use a unique, reactive key
              tooltip={{
                id: "add_item",
                title: {
                  text: "Add New Item",
                  bold: true,
                  size: 29,
                  foregroundColor: "#ffffff",
                },
                actions: [
                  {
                    id: "add_action",
                    title: "Add Now",
                  },
                ],
                image: {
                  systemName: "plus.circle.fill",
                },
                description: {
                  text: "Quickly add a new task or note here.",
                  bold: false,
                  size: 20,
                  foregroundColor: "#bbbbbb",
                },
              }}
              onTipDismiss={handleTipEvent}
            >
              <View
                // colors={["#333333", "#1a1a1a"]}
                // type={LiquidGlassType.Clear}
                style={styles.primaryActionButton}
              >
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    flex: 1,
                  }}
                >
                  <SymbolView
                    name="plus"
                    size={24}
                    type="hierarchical"
                    tintColor="#ffffff"
                  />
                </View>
              </View>
            </ToolTipPopoverView>
          </View>
        </View>
      </SafeAreaView>
    </AnimatedMeshGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#000000",
  },
  gradient: {
    flex: 1,
  },
  statusBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 5,
  },
  timeText: {
    fontSize: 17,
    fontWeight: "600",
    color: "#ffffff",
  },
  statusIcons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  helpButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#262626",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#333333",
  },
  notificationButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#262626",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#333333",
    position: "relative",
  },
  notificationBadge: {
    position: "absolute",
    top: -2,
    right: -2,
    backgroundColor: PlatformColor("systemRed"),
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#fff",
  },
  mainContent: {
    flex: 1,
    paddingHorizontal: 20,
  },
  greetingSection: {
    marginBottom: 20,
    top: 20,
  },
  greetingLight: {
    fontSize: 42,
    fontWeight: "600",
    color: "#999999",
    marginBottom: 0,
  },
  greetingBold: {
    fontSize: 38,
    fontWeight: "300",
    color: "#ffffff",
    lineHeight: 38,
  },
  featuresGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
    marginBottom: 20,
    top: 50,
  },
  featureCard: {
    width: (screenWidth - 56) / 2,
    backgroundColor: "#1a1a1a",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#333333",
    overflow: "hidden",
  },
  cardContent: {
    padding: 20,
    alignItems: "flex-start",
  },
  iconContainer: {
    marginBottom: 16,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#ffffff",
    marginBottom: 6,
  },
  featureDescription: {
    fontSize: 14,
    color: "#999999",
    lineHeight: 18,
  },
  searchContainer: {
    marginBottom: 30,
    height: Dimensions.get("window").height * 0.1_6_9,

    justifyContent: "flex-end",
    bottom: 10,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1a1a1a",
    borderRadius: 12,

    borderWidth: 1,
    borderColor: "#333333",
    paddingHorizontal: 16,
    paddingVertical: 12,

    gap: 12,
  },
  searchIcon: {},
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#ffffff",
  },
  voiceButton: {
    padding: 4,
  },
  bottomActionBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  leftActions: {
    flexDirection: "row",
    gap: 12,
  },
  actionButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#1a1a1a",
    borderWidth: 1,
    borderColor: "#333333",
    overflow: "hidden",
  },
  actionButtonContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  primaryActionButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    overflow: "hidden",
  },
  primaryActionGradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
