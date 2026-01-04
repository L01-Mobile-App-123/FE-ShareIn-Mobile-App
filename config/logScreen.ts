import { usePathname } from 'expo-router';
import { useEffect, useRef } from 'react';
import analytics from '@react-native-firebase/analytics';

export function useScreenTracking() {
  const pathname = usePathname();
  const previous = useRef<string | null>(null);

  useEffect(() => {
    if (!pathname || previous.current === pathname) return;

    analytics().logScreenView({
      screen_name: pathname,
      screen_class: pathname,
    });

    previous.current = pathname;
  }, [pathname]);
}
