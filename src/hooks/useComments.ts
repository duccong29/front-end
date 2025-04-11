"use client";

import { Client } from "@stomp/stompjs";
import { useCallback, useEffect, useRef, useState } from "react";
import { Comment } from "../types/Comment";

const SOCKET_URL =
  process.env.NEXT_PUBLIC_SOCKET_URL || "ws://localhost:8080/ws";

export function useComments(apartmentId: string) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const clientRef = useRef<Client | null>(null);

  const fetchComments = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/comment/${apartmentId}`);
      if (!response.ok) throw new Error("Failed to fetch comments");
      const data = await response.json();
      setComments(data.data || []);
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  }, [apartmentId]);

  useEffect(() => {
    fetchComments();

    const newClient = new Client({
      brokerURL: SOCKET_URL,
      onConnect: () => {
        console.log("Connected to WebSocket");
        newClient.subscribe(`/topic/comments/${apartmentId}`, (message) => {
          const newComment: Comment = JSON.parse(message.body);
          setComments((prevComments) => {
            const existingCommentIndex = prevComments.findIndex(
              (c) => c.id === newComment.id
            );
            if (existingCommentIndex !== -1) {
              return prevComments.map((c, index) =>
                index === existingCommentIndex ? newComment : c
              );
            }
            return [...prevComments, newComment];
          });
        });
      },
    });

    newClient.activate();
    clientRef.current = newClient;

    return () => {
      if (clientRef.current?.active) {
        clientRef.current.deactivate();
      }
    };
  }, [apartmentId, fetchComments]);

  const sendComment = useCallback(
    (content: string, userId: string) => {
      if (clientRef.current?.active) {
        const comment: Omit<Comment, "id" | "commentedAt"> = {
          userId,
          content,
          apartmentId,
        };
        clientRef.current.publish({
          destination: `/app/comments/${apartmentId}`,
          body: JSON.stringify(comment),
        });
      }
    },
    [apartmentId]
  );

  return { comments, sendComment, isLoading, error };
}
