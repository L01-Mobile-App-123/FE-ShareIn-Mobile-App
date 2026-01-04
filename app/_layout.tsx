import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import { Redirect, Stack } from 'expo-router';
import { View, ActivityIndicator } from 'react-native';
import * as Sentry from '@sentry/react-native';
import { useScreenTracking } from '@/config/logScreen';

Sentry.init({
  dsn: 'https://f6dffb87ce5ac1755558a06d2e2f6f17@o4510502288359424.ingest.de.sentry.io/4510650504249424',

  // Adds more context data to events (IP address, cookies, user, etc.)
  // For more information, visit: https://docs.sentry.io/platforms/react-native/data-management/data-collected/
  sendDefaultPii: true,

  // Enable Logs
  enableLogs: true,

  // Configure Session Replay
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1,
  integrations: [
    Sentry.mobileReplayIntegration(),
    Sentry.feedbackIntegration(),
  ],

  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // spotlight: __DEV__,
});

export default Sentry.wrap(function RootLayout() {
  useScreenTracking();
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Onboarding" />
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="ChatScreen" />
      <Stack.Screen name="FilterScreen" />
      <Stack.Screen name="InterestScreen" />
      <Stack.Screen name="ProfileSetting" />
      <Stack.Screen name="SavedPosts" />
      <Stack.Screen name="MyPosts" />
    </Stack>
  );
});
