// components/LoadMorePosts.tsx
'use client'; 

import React, { useState, useMemo } from 'react';
import { ArticleCard, WPPost } from './ArticleCard'; // Assuming correct path
import parse from 'html-react-parser';

// Define the fetcher function type
type PostFetcher = (categoryId: number, page: number) => Promise<WPPost[]>;

const POSTS_PER_PAGE = 10; 

// Define the props, including the new fetcher
interface LoadMoreProps {
    initialPosts: WPPost[];
    categoryId: number;
    totalPostCount: number;
    categoryName: string | JSX.Element;
    fetcher: PostFetcher; // 🎯 NEW: Accepts the fetch function as a prop
}

const LoadMorePosts: React.FC<LoadMoreProps> = ({ 
    initialPosts, 
    categoryId, 
    totalPostCount,
    categoryName,
    fetcher // 🎯 Destructure the fetcher prop
}) => {
    
    const [posts, setPosts] = useState<WPPost[]>(initialPosts);
    const [page, setPage] = useState<number>(2); 
    const [isLoading, setIsLoading] = useState<boolean>(false);
    
    const hasMorePosts = useMemo(() => {
        return posts.length < totalPostCount;
    }, [posts.length, totalPostCount]);

    const handleLoadMore = async () => {
        if (isLoading || !hasMorePosts) return;

        setIsLoading(true);
        try {
            // Use the fetcher function passed via props
            const newPosts = await fetcher(categoryId, page); 

            if (newPosts.length > 0) {
                setPosts((prevPosts) => [...prevPosts, ...newPosts]);
                setPage((prevPage) => prevPage + 1);
            }

        } catch (error) {
            console.error('Failed to load more posts:', error);
        } finally {
            setIsLoading(false);
        }
    };

    if (posts.length === 0 && totalPostCount === 0) {
        return (
             <p className="text-lg text-gray-600">
                इस कैटेगरी (**{categoryName}**) में फ़िलहाल कोई पोस्ट उपलब्ध नहीं है।
            </p>
        );
    }

    return (
        <>
            <div className="space-y-6">
                {posts.map((post: WPPost) => ( 
                    <ArticleCard 
                        key={post.id} 
                        post={post} 
                        variant="default"
                    />
                ))}
            </div>

            <div className="flex justify-center mt-10">
                {hasMorePosts ? (
                    <button
                        onClick={handleLoadMore}
                        disabled={isLoading}
                        className="px-6 py-3 text-lg font-semibold text-white bg-red-700 rounded-lg hover:bg-red-800 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? 'लोड हो रहा है...' : 'और कहानियाँ लोड करें'}
                    </button>
                ) : (
                    <p className="text-md text-gray-500 font-medium">
                        सभी {totalPostCount} कहानियाँ लोड हो चुकी हैं।
                    </p>
                )}
            </div>
        </>
    );
};

export default LoadMorePosts;