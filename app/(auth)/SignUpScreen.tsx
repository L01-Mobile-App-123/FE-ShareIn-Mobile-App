import { auth } from '@/config/firebase';
import { UserService } from '@/services/userService';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function SignUpScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSignUp = async () => {
    if (!name || !email || !password) {
      Alert.alert('Error', 'Please fill all required fields');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }

    try {
      setLoading(true);

      // 1️⃣ Tạo user Firebase
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        password,
      );

      // 2️⃣ Cập nhật displayName
      await updateProfile(userCredential.user, {
        displayName: name,
      });

      // ✅ Đăng ký thành công
      Alert.alert('Success', 'Account created successfully');
      await UserService.login();

      const payload = {
        full_name: name.trim(),
        phone_number: phone.trim(),
      };
      await UserService.updateProfile(payload);

      router.replace('/(tabs)');
    } catch (error: any) {
      let message = 'Sign up failed';

      if (error.code === 'auth/email-already-in-use') {
        message = 'Email already in use';
      } else if (error.code === 'auth/invalid-email') {
        message = 'Invalid email';
      } else if (error.code === 'auth/weak-password') {
        message = 'Password is too weak';
      }

      console.log('API Error:', error);

      Alert.alert('Error', message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <LinearGradient
          colors={['#FFB547', '#FF8C00']}
          style={styles.headerGradient}
        >
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backBtn}
          >
            <Ionicons name="chevron-back" size={26} color="#fff" />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Sign up</Text>
        </LinearGradient>

        <View style={styles.content}>
          <Text style={styles.welcome}>Welcome to ShareIn,</Text>
          <Text style={styles.subtitle}>Hello there, create a new account</Text>

          <Image
            source={require('../../assets/images/Illustration.png')}
            style={styles.illustration}
          />

          <TextInput
            style={styles.input}
            placeholder="Name"
            value={name}
            onChangeText={setName}
          />

          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />

          <TextInput
            style={styles.input}
            placeholder="Phone number"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />

          <View style={styles.passwordWrapper}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Password"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />

            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={styles.eyeIcon}
            >
              <Ionicons
                name={showPassword ? 'eye-off' : 'eye'}
                size={22}
                color="#999"
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={handleSignUp}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Sign up</Text>
            )}
          </TouchableOpacity>

          <Text style={styles.bottomText}>
            Have an account?{' '}
            <Text
              style={{ color: '#FF9A00' }}
              onPress={() => router.push('/(auth)/LogInScreen')}
            >
              Log in
            </Text>
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFB547',
  },

  /* Header gradient */
  headerGradient: {
    paddingTop: 55,
    paddingBottom: 60,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },

  backBtn: {
    position: 'absolute',
    left: 20,
    top: 55,
    padding: 5,
  },

  headerTitle: {
    fontSize: 20,
    color: '#fff',
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 15,
  },

  /* Content box */
  content: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -40,
    paddingHorizontal: 25,
    paddingBottom: 30,
    paddingTop: 20,
  },

  welcome: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FF9A00',
    marginTop: 10,
  },

  subtitle: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
    marginBottom: 15,
  },

  illustration: {
    width: 180,
    height: 180,
    alignSelf: 'center',
    marginVertical: 20,
    resizeMode: 'contain',
  },

  input: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 12,
    padding: 14,
    marginVertical: 10,
    backgroundColor: 'white',
    fontSize: 16,
    fontWeight: '500',
    color: 'grey',
  },

  forgot: {
    color: '#FF9A00',
    alignSelf: 'flex-end',
    marginBottom: 20,
    marginTop: 5,
  },

  button: {
    backgroundColor: '#FF9A00',
    paddingVertical: 12,
    paddingHorizontal: 80,
    borderRadius: 8,
    width: '80%',
    alignSelf: 'center',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 10,
  },

  buttonText: {
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
  },

  bottomText: {
    marginTop: 25,
    textAlign: 'center',
    color: '#555',
    fontSize: 14,
    paddingBottom: 100,
  },

  passwordWrapper: {
    position: 'relative',
    marginBottom: 16,
  },

  passwordInput: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 12,
    padding: 14,
    marginVertical: 10,
    backgroundColor: 'white',
    fontSize: 16,
    fontWeight: '500',
    color: 'grey',
    paddingRight: 45, // chừa chỗ cho icon
  },

  eyeIcon: {
    position: 'absolute',
    right: 14,
    top: '50%',
    transform: [{ translateY: -11 }],
  },
});
