import { View, Text } from 'react-native';
import i18n from '../localization';
import { useTranslation } from '../context/useTranslation';
import { useEffect } from 'react';
import { uploadCropImage } from '@/services/uploadService';

export default function Account() {
  const { t } = useTranslation();
  useEffect(() => {
    checkApi();
  }, [])
  const checkApi = async () => {
    console.log("🚀 Checking API...");

    const response = await fetch(
      "http://192.168.31.150:5290/api/Plant/test" // 👈 backend me bana lo
    );

    const data = await response.json();
  }
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      
      <Text>{t("account.title")}</Text>
    </View>
  );
}
