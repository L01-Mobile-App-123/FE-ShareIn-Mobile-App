import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  ActivityIndicator,
  Alert,
  RefreshControl,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

import { useEffect, useState } from 'react';
import { UserService, UserProfile } from '@/services/userService';

export default function SettingScreen() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [schoolName, setSchoolName] = useState('');
  const [dormitory, setDormitory] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [academicYear, setAcademicYear] = useState<number | null>(null);

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    try {
      setRefreshing(true);
      await loadUser();
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const data = await UserService.getMe();
      setUser(data);

      setName(data.full_name ?? '');
      setPhone(data.phone_number ?? '');
      setSchoolName(data.school_name ?? '');
      setDormitory(data.dormitory ?? '');
      setDateOfBirth(data.date_of_birth ?? '');
      setAcademicYear(
        typeof data.academic_year === 'number' ? data.academic_year : null,
      );
    } catch (err) {
      console.log('Load user failed:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    try {
      setLoading(true);

      const payload = {
        full_name: name.trim(),
        phone_number: phone.trim(),
        school_name: schoolName.trim(),
        dormitory: dormitory.trim(),
        date_of_birth: dateOfBirth.trim(),
        academic_year:
          academicYear !== null && !isNaN(academicYear)
            ? academicYear
            : undefined,
      };

      if (Object.keys(payload).length === 0) {
        Alert.alert('Info', 'Nothing to update');
        return;
      }

      const updatedUser = await UserService.updateProfile(payload);
      setUser(updatedUser);

      Alert.alert('Success', 'Profile updated successfully');
      router.back();
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Update profile failed');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return null;

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        alwaysBounceVertical
        overScrollMode="always"
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#FF9A00']} // Android
            tintColor="#FF9A00" // iOS
          />
        }
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

          <Text style={styles.headerTitle}>Profile Settings</Text>
          <Image source={{ uri: user?.avatar_url }} style={styles.avatar} />
        </LinearGradient>

        <View style={styles.content}>
          <Text style={styles.subtitle}>
            You can update your profile information below.
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Name"
            value={name}
            onChangeText={setName}
          />

          <TextInput
            style={styles.input}
            placeholder="Phone"
            value={phone}
            onChangeText={setPhone}
            autoCapitalize="none"
            keyboardType="phone-pad"
          />

          <TextInput
            style={styles.input}
            placeholder="School Name"
            value={schoolName}
            onChangeText={setSchoolName}
          />

          <TextInput
            style={styles.input}
            placeholder="Dormitory"
            value={dormitory}
            onChangeText={setDormitory}
          />

          <TextInput
            style={styles.input}
            placeholder="Date of Birth (YYYY-MM-DD)"
            value={dateOfBirth}
            onChangeText={setDateOfBirth}
          />

          <TextInput
            style={styles.input}
            placeholder="Academic Year"
            value={academicYear !== null ? String(academicYear) : ''}
            keyboardType="number-pad"
            onChangeText={(text) => {
              const value = Number(text);
              setAcademicYear(Number.isNaN(value) ? null : value);
            }}
          />

          <TouchableOpacity
            style={styles.button}
            onPress={handleUpdate}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Update</Text>
            )}
          </TouchableOpacity>
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

  avatar: {
    alignSelf: 'center',
    marginBottom: 10,
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#fff',
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

  subtitle: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
    marginBottom: 15,
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
  },
});
