import { Apartment } from "@/types/Apartment";
import { useCallback, useEffect, useState } from "react";

export function useMyPosts() {
  const [myPosts, setMyPosts] = useState<Apartment[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchMyPosts = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/apartments/myPosts');
      
      if (!response.ok) {
        throw new Error("Failed to fetch your posts");
      }
      
      const result = await response.json();
      setMyPosts(result.data || result); 
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMyPosts();
  }, [fetchMyPosts]);

  return {
    myPosts,
    isLoading,
    error,
    refetch: fetchMyPosts,
  };
}