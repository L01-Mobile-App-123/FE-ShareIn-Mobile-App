import { Stack } from "expo-router";

export default function AuthLayout() {
    return <Stack>
        <Stack.Screen name="(forgotPass)" options={{ headerShown: false }} />
        <Stack.Screen name="LoadingScreen" options={{ headerShown: false }} />
        <Stack.Screen name="Onboarding" options={{ headerShown: false }} />
        <Stack.Screen name="Splash" options={{ headerShown: false }} />
        <Stack.Screen name="SignUpScreen" options={{ headerShown: false }} />
        <Stack.Screen name="LogInScreen" options={{ headerShown: false }} />
    </Stack>;
}