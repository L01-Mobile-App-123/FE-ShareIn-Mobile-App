import analytics from '@react-native-firebase/analytics';

export const logEvent = async (name: string, params?: Record<string, any>) => {
  try {
    await analytics().logEvent(name, params);
  } catch (err) {
    // không cho crash app
    console.warn('Analytics error:', err);
  }
};
