import { useEffect, useState, useCallback } from 'react';
import { aptos } from '../config/aptosClient';
import { FUNCTIONS } from '../constants/contract';
import type { Post } from '../types';

export function useUserPosts(address: string | undefined) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = useCallback(async () => {
    if (!address) {
      setPosts([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      // Check if user is registered first
      const [isRegistered] = await aptos.view<[boolean]>({
        payload: {
          function: FUNCTIONS.IS_REGISTERED,
          functionArguments: [address],
        },
      });

      if (!isRegistered) {
        setPosts([]);
        setLoading(false);
        return;
      }

      // Fetch user's posts
      const [postData] = await aptos.view<[any[]]>({
        payload: {
          function: FUNCTIONS.GET_USER_POSTS,
          functionArguments: [address],
        },
      });

      // Transform to Post type
      const transformedPosts: Post[] = postData.map((p: any) => ({
        author: p.author,
        content: p.content,
        timestamp: Number(p.timestamp),
      }));

      setPosts(transformedPosts);
    } catch (error) {
      console.error('Error fetching posts:', error);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  }, [address]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  return { posts, loading, refetch: fetchPosts };
}
