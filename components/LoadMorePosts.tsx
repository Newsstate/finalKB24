// components/LoadMorePosts.tsx
'use client'; // 🎯 CRITICAL: This is a Client Component

import React, { useState, useEffect, useMemo } from 'react';
import { ArticleCard, WPPost } from './ArticleCard'; // Assuming ArticleCard is in the same directory or available
import { fetchPosts } from '@/app/[category]/page'; // 🎯 Import the fetching function
import parse from 'html-react-parser';

// Use the same constant as in the server component
const POSTS_PER_PAGE = 10; 

// 🎯 Define the props for the Client Component
interface LoadMoreProps {
    initialPosts: WPPost[];
    categoryId: number;
    totalPostCount: number;
    categoryName: string;
}

const LoadMorePosts: React.FC<LoadMoreProps> = ({ 
    initialPosts, 
    categoryId, 
    totalPostCount,
    categoryName 
}) => {
    // State to hold all currently loaded posts
    const [posts, setPosts] = useState<WPPost[]>(initialPosts);
    // State to track the next page number to fetch
    const [page, setPage] = useState<number>(2); // Start fetching from page 2
    // State to manage the loading status
    const [isLoading, setIsLoading] = useState<boolean>(false);
    
    // Calculate if we have loaded all posts based on the total count
    const hasMorePosts = useMemo(() => {
        // If the total posts loaded is less than the total count from the category data
        // AND the last fetch wasn't an empty array (checked implicitly by current post count)
        return posts.length < totalPostCount;
    }, [posts.length, totalPostCount]);

    // Function to fetch the next page of posts
    const handleLoadMore = async () => {
        if (isLoading || !hasMorePosts) return;

        setIsLoading(true);
        try {
            // Call the same server function (it can be imported and used client-side)
            const newPosts = await fetchPosts(categoryId, page);

            if (newPosts.length > 0) {
                // Add the new posts to the existing list
                setPosts((prevPosts) => [...prevPosts, ...newPosts]);
                // Increment the page counter
                setPage((prevPage) => prevPage + 1);
            }

        } catch (error) {
            console.error('Failed to load more posts:', error);
            // Optionally show a user-friendly error message
        } finally {
            setIsLoading(false);
        }
    };

    if (posts.length === 0) {
        return (
             <p className="text-lg text-gray-600">
                इस कैटेगरी (**{categoryName}**) में फ़िलहाल कोई पोस्ट उपलब्ध नहीं है।
            </p>
        );
    }


    return (
        <>
            {/* Display all loaded posts */}
            <div className="space-y-6">
                {posts.map((post: WPPost) => ( 
                    <ArticleCard 
                        key={post.id} 
                        post={post} 
                        variant="default"
                    />
                ))}
            </div>

            {/* Load More Button */}
            <div className="flex justify-center mt-10">
                {hasMorePosts ? (
                    <button
                        onClick={handleLoadMore}
                        disabled={isLoading}
                        className="px-6 py-3 text-lg font-semibold text-white bg-red-700 rounded-lg hover:bg-red-800 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? 'लोड हो रहा है...' : 'और लोड करें'}
                    </button>
                ) : (
                    // Optional message when all posts are loaded
                    <p className="text-md text-gray-500 font-medium">
                        सभी {totalPostCount} कहानियाँ लोड हो चुकी हैं।
                    </p>
                )}
            </div>
        </>
    );
};

export default LoadMorePosts;