import { NotificationItem, NotificationService } from '@/services/notiService';
import { Ionicons } from '@expo/vector-icons';
import dayjs from 'dayjs';
import { router, useFocusEffect, useRouter } from 'expo-router';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import analytics from '@react-native-firebase/analytics';

type ListItem =
  | { type: 'header'; title: string }
  | { type: 'item'; data: NotificationItem };

function groupNotificationsByDate(
  notifications: NotificationItem[],
): ListItem[] {
  const grouped: Record<string, NotificationItem[]> = {};

  notifications.forEach((noti) => {
    const dateKey = dayjs(noti.created_at).format('YYYY-MM-DD');
    if (!grouped[dateKey]) grouped[dateKey] = [];
    grouped[dateKey].push(noti);
  });

  return Object.keys(grouped)
    .sort((a, b) => dayjs(b).unix() - dayjs(a).unix()) // mới trước
    .flatMap((dateKey) => {
      const title = dayjs(dateKey).isSame(dayjs(), 'day')
        ? 'Today'
        : dayjs(dateKey).isSame(dayjs().subtract(1, 'day'), 'day')
          ? 'Yesterday'
          : dayjs(dateKey).format('DD/MM/YYYY');

      return [
        { type: 'header', title },
        ...grouped[dateKey].map((noti) => ({
          type: 'item',
          data: noti,
        })),
      ];
    });
}

interface Props {
  item: NotificationItem;
  onRead: (id: string) => void;
  onDelete: (id: string) => void;
}

const NotificationCard = ({ item, onRead, onDelete }: Props) => {
  const isUnread = !item.is_read;

  return (
    <Pressable
      onPress={async () => {
        if (isUnread) {
          onRead(item.notification_id);
          await NotificationService.markAsRead(item.notification_id, true);
        }

        if (item.post_id) {
          router.push(`/PostDetail?postId=${item.post_id}`);
        }

        analytics().logEvent('open_noti', {
          notification_id: item.notification_id,
        });
      }}
      style={({ pressed }) => ({
        opacity: pressed ? 0.6 : 1,
      })}
    >
      <View
        style={{
          marginVertical: 4,
          paddingVertical: 14,
          paddingHorizontal: 8,
          backgroundColor: isUnread ? '#FFFBEB' : '#fcfcfcff',
          borderBottomWidth: 1,
          borderBottomColor: '#EAEAEA',
          flexDirection: 'row',
          alignItems: 'flex-start',
        }}
      >
        {/* Dot chưa đọc */}
        {isUnread && (
          <View
            style={{
              width: 8,
              height: 8,
              borderRadius: 4,
              backgroundColor: '#F59E0B',
              marginTop: 6,
              marginRight: 10,
            }}
          />
        )}

        {/* Content */}
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontWeight: isUnread ? '600' : '400',
              fontSize: 14,
              color: '#111827',
            }}
            numberOfLines={2}
          >
            {item.title}
          </Text>

          <Text
            style={{
              color: '#6B7280',
              marginTop: 4,
              fontSize: 12,
              lineHeight: 16,
            }}
            numberOfLines={3}
          >
            {item.content}
          </Text>
        </View>

        {/* Delete button */}
        <Pressable
          onPress={(e) => {
            e.stopPropagation();
            onDelete(item.notification_id);
            NotificationService.delete(item.notification_id);
          }}
          hitSlop={10}
        >
          <Ionicons name="trash-bin-outline" size={18} color="#9CA3AF" />
        </Pressable>
      </View>
    </Pressable>
  );
};

export default function NotiScreen() {
  const router = useRouter();

  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [hasMore, setHasMore] = useState(true);

  const pageRef = useRef(1);
  const loadingRef = useRef(false);

  const fetchNotifications = async () => {
    if (loadingRef.current || !hasMore) return;

    loadingRef.current = true;
    const currentPage = pageRef.current;

    try {
      const data = await NotificationService.getList({
        page: currentPage,
        limit: 20,
      });

      if (data.length === 0) {
        setHasMore(false);
        return;
      }

      setNotifications((prev) => {
        const map = new Map<string, NotificationItem>();
        for (const p of prev) map.set(p.notification_id, p);
        for (const p of data) map.set(p.notification_id, p);
        return Array.from(map.values());
      });

      pageRef.current += 1;
    } catch (e) {
      console.log(e);
    } finally {
      loadingRef.current = false;
    }
  };

  const groupedData = useMemo(
    () => groupNotificationsByDate(notifications),
    [notifications],
  );

  useFocusEffect(
    useCallback(() => {
      setNotifications([]);
      setHasMore(true);
      pageRef.current = 1;
      fetchNotifications();
    }, []),
  );

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <View style={styles.topBar}>
          <View style={styles.topLeft}>
            <Pressable onPress={() => router.back()} style={styles.topBtn}>
              <Ionicons name="chevron-back" size={22} color="#000" />
            </Pressable>
            <Text style={styles.topTitle}>Notifications</Text>
          </View>
        </View>

        <FlatList
          data={groupedData}
          keyExtractor={(item, index) =>
            item.type === 'header'
              ? `header-${item.title}`
              : item.data.notification_id
          }
          renderItem={({ item }) => {
            if (item.type === 'header') {
              return <Text style={styles.dateHeader}>{item.title}</Text>;
            }

            return (
              <NotificationCard
                item={item.data}
                onRead={() => {
                  item.data.is_read = true;
                  setNotifications([...notifications]);
                }}
                onDelete={() => {
                  setNotifications(
                    notifications.filter(
                      (n) => n.notification_id !== item.data.notification_id,
                    ),
                  );
                }}
              />
            );
          }}
          onEndReached={fetchNotifications}
          onEndReachedThreshold={0.5}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 40 }}
          ListFooterComponent={
            <View>
              {loadingRef.current && (
                <ActivityIndicator
                  size="large"
                  color="#fff"
                  style={{ marginVertical: 16 }}
                />
              )}

              {!hasMore && !loadingRef.current && (
                <Text style={styles.emptyText}>
                  There is nothing more to show
                </Text>
              )}
            </View>
          }
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#fff' },
  container: { flex: 1, paddingHorizontal: 16, marginTop: 30 },

  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 8,
  },
  topLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  topBtn: {
    paddingRight: 2,
    paddingVertical: 4,
  },
  topTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  emptyText: {
    textAlign: 'center',
    color: '#888',
    marginVertical: 12,
    fontSize: 12,
  },
  dateHeader: {
    marginTop: 8,
    paddingHorizontal: 16,
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
});
