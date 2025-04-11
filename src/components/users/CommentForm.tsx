"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Textarea } from "../ui/textarea";
import { useAuth } from "@/utils/AuthContext";

interface CommentFormProps {
  onSubmit: (content: string, userId: string) => void;
}

export const CommentForm = ({ onSubmit }: CommentFormProps) => {
  const [content, setContent] = useState("");
  const { isLoggedIn, userId } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim() && userId) {
      onSubmit(content.trim(), userId);
      setContent("");
    }
  };

  if (!isLoggedIn || !userId) {
    return (
      <div className="bg-gray-200 dark:bg-gray-800 rounded-lg p-4 text-center text-gray-600 dark:text-gray-300">
        Please log in to comment.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-start space-x-4">
        <Avatar className="w-10 h-10">
          <AvatarImage src="/placeholder-avatar.jpg" alt="User" />
          <AvatarFallback className="bg-primary text-primary-foreground">
            {userId[0].toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write a comment..."
          className="flex-grow min-h-[100px] resize-none"
        />
      </div>
      <div className="flex justify-end">
        <Button
          type="submit"
          disabled={!content.trim()}
          className="px-6 py-2 bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          Post Comment
        </Button>
      </div>
    </form>
  );
};
