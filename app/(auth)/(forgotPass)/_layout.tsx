import { Stack } from "expo-router";

export default function AuthLayout() {
    return <Stack>
        <Stack.Screen name="EmailScreen" options={{ headerShown: false }} />
        <Stack.Screen name="OtpScreen" options={{ headerShown: false }} />
        <Stack.Screen name="PasswordScreen" options={{ headerShown: false }} />
        <Stack.Screen name="SuccessScreen" options={{ headerShown: false }} />
    </Stack>;
}