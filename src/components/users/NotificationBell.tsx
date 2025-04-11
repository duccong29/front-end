"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useNotifications } from "@/hooks/useNotifications";
import { useAuth } from "@/utils/AuthContext";
import { Notification } from "@/types/Notification";
import { NotificationItem } from "./NotificationItem";

export function NotificationBell() {
  const router = useRouter();
  const { userId } = useAuth();
  const { notifications, unreadCount, markAsRead, clearAll, isLoading, error } =
    useNotifications(userId ?? "");
  const [isOpen, setIsOpen] = useState(false);

  const handleMarkAsRead = useCallback(
    async (notification: Notification) => {
      try {
        await markAsRead(notification.id);
        router.push(
          `/apartments/${notification.apartmentId}?commentId=${notification.commentId}`
        );
        setIsOpen(false);
      } catch (error) {
        console.error("Error marking notification as read:", error);
      }
    },
    [markAsRead, router]
  );

  const handleClearAll = useCallback(async () => {
    try {
      await clearAll();
      setIsOpen(false);
    } catch (error) {
      console.error("Error clearing notifications:", error);
    }
  }, [clearAll]);

  useEffect(() => {
    if (error) {
      console.error("Error fetching notifications:", error);
    }
  }, [error]);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" className="relative rounded-full">
          <Bell className="h-[1.2rem] w-[1.2rem]" />
          {unreadCount > 0 && (
            <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
              {unreadCount}
            </span>
          )}
          <span className="sr-only">Toggle notifications</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0">
        <div className="p-4 border-b">
          <h4 className="font-semibold">Notifications</h4>
          <p className="text-sm text-muted-foreground">
            You have {unreadCount} unread notification
            {unreadCount !== 1 ? "s" : ""}.
          </p>
        </div>
        {isLoading ? (
          <div className="p-4 text-center">Loading notifications...</div>
        ) : error ? (
          <div className="p-4 text-center text-red-500">Error: {error}</div>
        ) : notifications.length > 0 ? (
          <>
            <ScrollArea className="h-[300px]">
              {notifications.map((notification) => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                  onMarkAsRead={handleMarkAsRead}
                />
              ))}
            </ScrollArea>
            <div className="p-4 border-t">
              <Button
                onClick={handleClearAll}
                variant="outline"
                size="sm"
                className="w-full"
              >
                Clear All
              </Button>
            </div>
          </>
        ) : (
          <div className="p-4 text-center text-muted-foreground">
            No notifications
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}
