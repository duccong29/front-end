import { memo } from "react";
import { formatDistanceToNow } from "date-fns";
import { Notification } from "@/types/Notification";

interface NotificationItemProps {
  notification: Notification;
  onMarkAsRead: (notification: Notification) => void;
}

export const NotificationItem = memo(function NotificationItem({
  notification,
  onMarkAsRead,
}: NotificationItemProps) {
  return (
    <div
      className="p-4 border-b last:border-b-0 cursor-pointer hover:bg-muted/50 transition-colors"
      onClick={() => onMarkAsRead(notification)}
    >
      <div className="flex items-start space-x-4">
        <div className="flex-1 space-y-1">
          <p className="text-sm font-medium leading-none">
            {notification.message}
          </p>
          <p className="text-sm text-muted-foreground">
            {notification.content}
          </p>
          <p className="text-xs text-muted-foreground">
            {formatDistanceToNow(new Date(notification.notifiedAt), {
              addSuffix: true,
            })}
          </p>
        </div>
        {!notification.readStatus && (
          <div className="w-2 h-2 bg-blue-500 rounded-full mt-1" />
        )}
      </div>
    </div>
  );
});
