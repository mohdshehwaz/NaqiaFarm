import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";
import { colors } from "../styles/colors";

function CenteredTabIcon({
  icon,
  focused,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  focused: boolean;
}) {
  return (
    <View style={styles.centerIconWrapper}>
      <Ionicons
        name={icon}
        size={26}
        color={focused ? colors.primary : colors.inactive}
      />
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        lazy: false,
        tabBarStyle: styles.tabBar,
      }}
    >
      {/* HOME */}
      <Tabs.Screen
        name="home"
        options={{
          tabBarButton: ({ onPress, accessibilityState }) => (
            <Pressable
              onPress={onPress}
              accessibilityState={accessibilityState}
              style={styles.sideTabButton}
            >
              <CenteredTabIcon
                icon="home"
                focused={!!accessibilityState?.selected}
              />
            </Pressable>
          ),
        }}
      />

      {/* CAMERA FAB */}
      <Tabs.Screen
        name="camera"
        options={{
          tabBarButton: ({ onPress, accessibilityState }) => (
            <Pressable
              onPress={onPress}
              accessibilityState={accessibilityState}
              style={styles.fabButton}
            >
              <View style={styles.fab}>
                <Ionicons name="camera" size={30} color={colors.white} />
              </View>
            </Pressable>
          ),
        }}
      />

      {/* ACCOUNT */}
      <Tabs.Screen
        name="account"
        options={{
          tabBarButton: ({ onPress, accessibilityState }) => (
            <Pressable
              onPress={onPress}
              accessibilityState={accessibilityState}
              style={styles.sideTabButton}
            >
              <CenteredTabIcon
                icon="person"
                focused={!!accessibilityState?.selected}
              />
            </Pressable>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: 72,
    backgroundColor: colors.white,
    borderTopWidth: 0,
    elevation: 12,
  },

  // 🔑 SIDE TABS — FULL HEIGHT + CENTER
  sideTabButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  centerIconWrapper: {
    justifyContent: "center",
    alignItems: "center",
  },

  // 🔑 FAB
  fabButton: {
    top: -14, // 👈 yahi tweak
    justifyContent: "center",
    alignItems: "center",
  },
  fab: {
    width: 66,
    height: 66,
    borderRadius: 33,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    elevation: 10,
  },
});
