import { Ionicons } from "@expo/vector-icons";
import {
  Tabs,
  usePathname,
} from "expo-router";

import {
  Pressable,
  StyleSheet,
  View,
} from "react-native";

import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors } from "../styles/colors";

function CenteredTabIcon({
  icon,
  focused,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  focused: boolean;
}) {
  return (
    <View style={styles.iconContainer}>
      <Ionicons
        name={icon}
        size={26}
        color={
          focused
            ? colors.primary
            : colors.inactive
        }
      />
    </View>
  );
}

export default function TabLayout() {
  const pathname = usePathname();
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        lazy: false,

        tabBarStyle: [
          styles.tabBar,
          {
            height: 70 + insets.bottom,
            paddingBottom: insets.bottom,
          },
        ],
      }}
    >
      {/* HOME */}
      <Tabs.Screen
        name="home"
        options={{
          tabBarButton: ({ onPress }) => {
            const focused =
              pathname === "/home" ||
              pathname === "/(tabs)/home";

            return (
              <Pressable
                onPress={onPress}
                style={styles.sideTabButton}
              >
                <CenteredTabIcon
                  icon="home"
                  focused={focused}
                />
              </Pressable>
            );
          },
        }}
      />

      {/* SCANNER */}
      <Tabs.Screen
        name="scanner"
        options={{
          tabBarButton: ({ onPress }) => {
            const focused =
              pathname === "/scanner" ||
              pathname === "/(tabs)/scanner";

            return (
              <Pressable
                onPress={onPress}
                style={styles.fabButton}
              >
                <View style={styles.fab}>
                  <Ionicons
                    name="camera"
                    size={30}
                    color={
                      focused
                        ? "#ffffff"
                        : "#d9d9d9"
                    }
                  />
                </View>
              </Pressable>
            );
          },
        }}
      />

      {/* ACCOUNT */}
      <Tabs.Screen
        name="account"
        options={{
          tabBarButton: ({ onPress }) => {
            const focused =
              pathname === "/account" ||
              pathname === "/(tabs)/account";

            return (
              <Pressable
                onPress={onPress}
                style={styles.sideTabButton}
              >
                <CenteredTabIcon
                  icon="person"
                  focused={focused}
                />
              </Pressable>
            );
          },
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "#fff",
    borderTopWidth: 0,

    elevation: 10,

    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: {
      width: 0,
      height: -2,
    },
  },

  sideTabButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
  },

  fabButton: {
    top: -18,
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