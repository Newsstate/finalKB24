// lib/api.ts

import { WPPost } from '@/components/ArticleCard'; // Import necessary types
// Define constants here or import them if they are in a central config file
const API_URL = 'https://www.khabar24live.com/wp-json/wp/v2';
const POSTS_PER_PAGE = 10; 

// 🎯 EXPORTED: This function is now safe to be imported by ANY component (Server or Client)
export async function fetchPosts(categoryId: number, page: number = 1): Promise<WPPost[]> {
    try {
        const res = await fetch(
            `${API_URL}/posts?_embed&categories=${categoryId}&per_page=${POSTS_PER_PAGE}&page=${page}`, 
            // Note: We only add `next: { revalidate: 120 }` when called by the Server Component 
            // for the initial load, so we'll pass the options in the calling file.
        );

        if (!res.ok) {
            return [];
        }
        
        return res.json() as Promise<WPPost[]>; 
        
    } catch (error) {
        console.error('Error fetching category posts:', error);
        return [];
    }
}