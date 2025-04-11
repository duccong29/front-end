"use client";

import { CommentForm } from "./CommentForm";
import { CommentList } from "./CommentList";
import { useComments } from "@/hooks/useComments";
import { useParams, useSearchParams } from "next/navigation";
import { Skeleton } from "../ui/skeleton";
import { useAuth } from "@/utils/AuthContext";
import { useCallback, useEffect } from "react";
import { scrollToComment } from "@/hooks/scrollToComment";

export function CommentSection() {
  const { id } = useParams<{ id: string }>();
  const searchParams = useSearchParams();
  const { comments, sendComment, isLoading, error } = useComments(id || "");
  const { isLoggedIn } = useAuth();

  const handleCommentSubmit = useCallback(
    (content: string, userId: string) => {
      sendComment(content, userId);
    },
    [sendComment]
  );

  useEffect(() => {
    if (!isLoading && comments.length > 0) {
      const commentId = searchParams.get("commentId");
      if (commentId) {
        scrollToComment(commentId);
      }
    }
  }, [isLoading, comments, searchParams]);

  if (error) {
    return (
      <div className="text-red-500 p-4 bg-red-100 rounded-lg">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="max-2xl mx-auto mt-8 p-6 bg-gray-50 dark:bg-gray-900 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
          Comments
        </h2>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {comments.length} {comments.length === 1 ? "comment" : "comments"}
        </span>
      </div>
      {isLoading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className="flex space-x-4 bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm"
            >
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-4 w-1/4" />
                <Skeleton className="h-4 w-full" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <CommentList comments={comments} />
      )}
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
          Add a Comment
        </h3>
        {isLoggedIn ? (
          <CommentForm onSubmit={handleCommentSubmit} />
        ) : (
          <div className="text-center py-4 bg-gray-100 dark:bg-gray-800 rounded-lg text-gray-600 dark:text-gray-300">
            Please log in to add a comment.
          </div>
        )}
      </div>
    </div>
  );
}
