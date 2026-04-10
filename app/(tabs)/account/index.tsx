import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../styles/colors";
import { useTranslation } from "../../context/useTranslation";
import { useRouter } from "expo-router";

export default function AccountScreen() {
  const { t } = useTranslation();
  const router = useRouter(); // ✅ correct place

  return (
    <ScrollView style={styles.container}>
      
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerText}>
          {t("account.title")}
        </Text>
      </View>

      {/* COMPANY PROFILE */}
      <View style={styles.profileSection}>
        <Image
          source={require("../../../assets/images/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.companyName}>
          {t("account.companyName")}
        </Text>
        <Text style={styles.tagline}>
          {t("account.tagline")}
        </Text>
      </View>

      {/* MENU */}
      <View style={styles.menu}>
        <MenuItem
          icon="receipt-outline"
          title={t("account.menu.orders")}
          onPress={() => router.push("/(tabs)/account/history")}
        />

        <MenuItem
          icon="language-outline"
          title={t("account.menu.language")}
          onPress={() => router.push("/(tabs)/account/language")}
        />

        <MenuItem
            icon="help-circle-outline"
            title={t("account.menu.help")}
            onPress={() => router.push("/(tabs)/account/help")}
        />

        <MenuItem
          icon="location-outline"
          title={t("account.menu.address")}
          onPress={() => router.push("/account/office-address")} // ✅ working
        />
      </View>
    </ScrollView>
  );
}

function MenuItem({ icon, title, onPress }: any) {
  return (
    <Pressable style={styles.menuItem} onPress={onPress}>
      <Ionicons name={icon} size={22} color={colors.primary} />
      <Text style={styles.menuText}>{title}</Text>
      <Ionicons
        name="chevron-forward"
        size={18}
        color="#999"
        style={{ marginLeft: "auto" }}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f7f6",
  },

  header: {
    backgroundColor: colors.primary,
    paddingVertical: 15,
    alignItems: "center",
  },

  headerText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },

  profileSection: {
    alignItems: "center",
    padding: 25,
    backgroundColor: "#eaf5ea",
  },

  logo: {
    width: 110,
    height: 110,
    marginBottom: 10,
  },

  companyName: {
    fontSize: 20,
    fontWeight: "700",
    color: "#2e7d32",
  },

  tagline: {
    fontSize: 13,
    color: "#666",
    marginTop: 4,
    textAlign: "center",
  },

  menu: {
    marginTop: 10,
    backgroundColor: "#fff",
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