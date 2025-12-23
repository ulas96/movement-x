import { useEffect, useState, useCallback } from 'react';
import { aptos } from '../config/aptosClient';
import { FUNCTIONS } from '../constants/contract';
import type { Post } from '../types';

// Hardcoded list of known users (can be expanded as users register)
// In a production app, this would come from an indexer or backend
const KNOWN_USERS = [
  '0x84d32d22f8590bf5e25f5ecde004f1522407ae0d2ae5a80816453c61cf6f01cb',
];

export function useGlobalFeed(currentUserAddress?: string) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchGlobalFeed = useCallback(async () => {
    try {
      setLoading(true);

      // Combine known users with current user
      const usersToFetch = currentUserAddress
        ? [...new Set([...KNOWN_USERS, currentUserAddress])]
        : KNOWN_USERS;

      // Fetch posts from all users in parallel
      const allPostsPromises = usersToFetch.map(async (address) => {
        try {
          // Check if user is registered
          const [isReg] = await aptos.view<[boolean]>({
            payload: {
              function: FUNCTIONS.IS_REGISTERED,
              functionArguments: [address],
            },
          });

          if (!isReg) return [];

          // Fetch user's posts
          const [postData] = await aptos.view<[any[]]>({
            payload: {
              function: FUNCTIONS.GET_USER_POSTS,
              functionArguments: [address],
            },
          });

          // Get user name for display
          const [userName] = await aptos.view<[string]>({
            payload: {
              function: FUNCTIONS.GET_USER_NAME,
              functionArguments: [address],
            },
          });

          // Transform posts to include author name
          return postData.map((p: any) => ({
            author: p.author,
            authorName: userName,
            content: p.content,
            timestamp: Number(p.timestamp),
          }));
        } catch (error) {
          console.error(`Error fetching posts for ${address}:`, error);
          return [];
        }
      });

      // Wait for all fetches to complete
      const allPosts = (await Promise.all(allPostsPromises)).flat();

      // Sort by timestamp (newest first)
      allPosts.sort((a, b) => b.timestamp - a.timestamp);

      setPosts(allPosts);
    } catch (error) {
      console.error('Error fetching global feed:', error);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  }, [currentUserAddress]);

  useEffect(() => {
    fetchGlobalFeed();
  }, [fetchGlobalFeed]);

  return { posts, loading, refetch: fetchGlobalFeed };
}
