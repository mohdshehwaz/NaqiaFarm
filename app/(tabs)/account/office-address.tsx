import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Linking,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../styles/colors";
import { useTranslation } from "../../context/useTranslation";
import MapView, { Marker } from "react-native-maps";

export default function OfficeAddressScreen() {
  const { t } = useTranslation();

  const latitude = 28.7332609;
  const longitude = 78.6750473;

  const openMap = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
    Linking.openURL(url);
  };

  const callNumber = async () => {
    const url = "tel:+919718060881";
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      alert("Calling not supported on this device");
    }
  };

  const sendEmail = () => {
    Linking.openURL("mailto:support@naqiafarm.com");
  };

  return (
    <View style={styles.container}>
      
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerText}>{t("office.title")}</Text>
      </View>

      {/* ADDRESS CARD */}
      <View style={styles.card}>
        <Ionicons name="location" size={40} color={colors.primary} />

        <Text style={styles.title}>
          {t("office.addressTitle")}
        </Text>

        <Text style={styles.address}>
          {t("office.address")}
        </Text>

        {/* MAP */}
        {/* <MapView
          style={styles.map}
          initialRegion={{
            latitude,
            longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          <Marker
            coordinate={{ latitude, longitude }}
            title="Office Location"
          />
        </MapView> */}

        {/* BUTTON */}
        <Pressable style={styles.button} onPress={openMap}>
          <Text style={styles.buttonText}>
            {t("office.openMap")}
          </Text>
        </Pressable>
      </View>

      {/* CONTACT */}
      <View style={styles.card}>
        <Pressable style={styles.row} onPress={callNumber}>
          <Ionicons name="call-outline" size={20} color={colors.primary} />
          <Text style={styles.text}>
            {t("office.phone")}
          </Text>
        </Pressable>

        <Pressable style={styles.row} onPress={sendEmail}>
          <Ionicons name="mail-outline" size={20} color={colors.primary} />
          <Text style={styles.text}>
            {t("office.email")}
          </Text>
        </Pressable>
      </View>
    </View>
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

  card: {
    backgroundColor: "#fff",
    margin: 15,
    padding: 20,
    borderRadius: 12,
    elevation: 3,
    alignItems: "center", // ✅ center everything
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    marginTop: 10,
    textAlign: "center",
  },

  address: {
    color: "#555",
    marginTop: 6,
    textAlign: "center",
  },

  map: {
    width: "100%",
    height: 180,
    marginTop: 15,
    borderRadius: 10,
  },

  button: {
    marginTop: 15,
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },

  text: {
    marginLeft: 10,
  },
});