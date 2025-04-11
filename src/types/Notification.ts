//app/types/Notification
export interface Notification {
  id: string;
  message: string;
  readStatus: boolean;
  content: string;
  notifiedAt: string;
  apartmentId: string;
  commentId: string;
}
