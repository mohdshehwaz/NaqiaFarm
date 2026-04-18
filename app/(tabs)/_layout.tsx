import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";
import { colors } from "../styles/colors";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context"; // 👈 important

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
  const router = useRouter();
  const insets = useSafeAreaInsets(); // 👈 safe area

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        lazy: false,
        tabBarStyle: [
          styles.tabBar,
          {
            height: 70 + insets.bottom, // 👈 dynamic height
            paddingBottom: insets.bottom, // 👈 bottom space fix
          },
        ],
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
        name="scanner"
        options={{
          tabBarButton: ({ onPress }) => (
            <Pressable onPress={onPress} style={styles.fabButton}>
              <View style={styles.fab}>
                <Ionicons name="camera" size={30} color="#fff" />
              </View>
            </Pressable>
          ),
        }}
      />

      {/* ACCOUNT */}
      <Tabs.Screen
        name="account"
        options={{
          tabBarButton: ({ accessibilityState }) => (
            <Pressable
              onPress={() => {
                router.replace("/(tabs)/account");
              }}
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
    backgroundColor: colors.white,
    borderTopWidth: 0,
    elevation: 12,
  },

  sideTabButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  centerIconWrapper: {
    justifyContent: "center",
    alignItems: "center",
  },

  // 🔥 FAB Button
  fabButton: {
    top: -18, // 👈 perfect lift (adjust if needed)
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