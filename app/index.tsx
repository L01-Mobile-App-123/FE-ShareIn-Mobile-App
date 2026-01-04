import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';

export default function Index() {
  useEffect(() => {
    const init = async () => {
      const seen = await AsyncStorage.getItem('onboarding_seen');

      if (!seen) {
        router.replace('/Onboarding');
      } else {
        router.replace('/(auth)/Splash');
      }
    };

    init();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="#FFCC00" />
    </View>
  );
}
