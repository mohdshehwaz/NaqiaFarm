import { View, Text } from 'react-native';
import i18n from '../localization';
import { useTranslation } from '../context/useTranslation';

export default function Account() {
  const { t } = useTranslation();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      
      <Text>{t("account.title")}</Text>
    </View>
  );
}
