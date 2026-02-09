import { View, Text } from 'react-native';
import i18n from '../localization';
import { useTranslation } from '../context/useTranslation';

export default function Camera() {
  const { t } = useTranslation();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      

      <Text>{t("camera.title")}</Text>

    </View>
  );
}
