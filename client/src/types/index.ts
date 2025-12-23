export interface Post {
  author: string;
  authorName?: string;
  content: string;
  timestamp: number;
}

export interface User {
  address: string;
  name: string;
  posts: Post[];
}
