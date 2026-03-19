import { View, Text, StyleSheet, Image, Pressable, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../styles/colors";

export default function AccountScreen() {
  return (
    <ScrollView style={styles.container}>
      
      {/* PROFILE */}
      <View style={styles.profileSection}>
        <Image
          source={{ uri: "https://i.pravatar.cc/150" }}
          style={styles.avatar}
        />
        <Text style={styles.name}>Mohd Shehwaz</Text>
        <Text style={styles.email}>shehwaz@gmail.com</Text>
      </View>

      {/* MENU */}
      <View style={styles.menu}>
        <MenuItem icon="receipt-outline" title="Orders / History" />
        <MenuItem icon="language-outline" title="Language" />
        <MenuItem icon="help-circle-outline" title="Help & Support" />
        <MenuItem icon="location-outline" title="Office Address" />
      </View>

    </ScrollView>
  );
}

function MenuItem({ icon, title }: any) {
  return (
    <Pressable style={styles.menuItem}>
      <Ionicons name={icon} size={22} color={colors.primary} />
      <Text style={styles.menuText}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },

  profileSection: {
    alignItems: "center",
    padding: 20,
    backgroundColor: colors.white,
  },

  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 10,
  },

  name: {
    fontSize: 18,
    fontWeight: "600",
  },

  email: {
    color: "#777",
  },

  menu: {
    marginTop: 10,
    backgroundColor: colors.white,
  },

  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 0.5,
    borderColor: "#ddd",
  },

  menuText: {
    marginLeft: 12,
    fontSize: 15,
  },
});