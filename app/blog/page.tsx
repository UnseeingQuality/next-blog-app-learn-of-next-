'use client'
import {Metadata} from "next";
import Link from "next/link";
import {useEffect, useState} from "react";


export const metadata: Metadata = {
    title: "Blog | Next app",
}

export default function Blog() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(response => response.json())
            .then(json => setPosts(json))
    }, [])

    return (
        <>
            <h1>Blog page</h1>
            <ul>
                {posts.map(post => 
                <li key={post.id}>
                    <Link href={`/blog/${post.id}`}>
                        {post.title}
                    </Link>
                </li>)}
            </ul>
        </>
    );
}