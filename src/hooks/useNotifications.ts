//hooks/useNotifications.ts
import { Notification } from "@/types/Notification";
import { Client } from "@stomp/stompjs";
import { useCallback, useEffect, useRef, useState } from "react";

const SOCKET_URL =
  process.env.NEXT_PUBLIC_SOCKET_URL || "ws://localhost:8080/ws";

export function useNotifications(userId: string) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const clientRef = useRef<Client | null>(null);

  const fetchNotifications = useCallback(async () => {
    if (!userId) return;
    try {
      setIsLoading(true);
      const response = await fetch(`/api/notifications/${userId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setNotifications(data.data);
      setUnreadCount(
        data.data.filter((n: Notification) => !n.readStatus).length
      );
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchNotifications();

    if (!userId) return;

    const client = new Client({
      brokerURL: SOCKET_URL,
      onConnect: () => {
        console.log("Connected to WebSocket for notifications");
        client.subscribe(`/topic/notifications/${userId}`, (message) => {
          try {
            const newNotification: Notification = JSON.parse(message.body);
            setNotifications((prev) => [newNotification, ...prev]);
            setUnreadCount((prev) => prev + 1);
          } catch (error) {
            console.error("Error parsing notification:", error);
          }
        });
      },
      onDisconnect: () => {
        console.log("Disconnected from WebSocket");
      },
      onStompError: (frame) => {
        console.error("STOMP error:", frame.headers["message"]);
        setError("WebSocket connection error");
      },
    });

    client.activate();
    clientRef.current = client;

    return () => {
      if (clientRef.current?.active) {
        clientRef.current.deactivate();
      }
    };
  }, [userId, fetchNotifications]);

  const markNotificationAsRead = useCallback(async (id: string) => {
    try {
      const response = await fetch(`/api/notifications/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to mark notification as read");
      }

      setNotifications((prev) =>
        prev.map((notification) =>
          notification.id === id
            ? { ...notification, readStatus: true }
            : notification
        )
      );
      setUnreadCount((prev) => Math.max(prev - 1, 0));
    } catch (error) {
      console.error("Error marking notification as read:", error);
      setError(error instanceof Error ? error.message : "An error occurred");
    }
  }, []);

  const markAsRead = useCallback(
    (id: string) => {
      markNotificationAsRead(id);
    },
    [markNotificationAsRead]
  );

  const clearAll = useCallback(() => {
    setNotifications([]);
    setUnreadCount(0);
  }, []);

  return {
    notifications,
    unreadCount,
    markAsRead,
    clearAll,
    isLoading,
    error,
  };
}
