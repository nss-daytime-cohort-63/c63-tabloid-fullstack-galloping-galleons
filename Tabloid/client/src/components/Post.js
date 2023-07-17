import React, { useEffect, useState } from 'react';
import PostManager from './PostManager.js';
import { Card, CardBody } from 'reactstrap';

function Post() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        PostManager.getAllPosts()
            .then(postsFromAPI => {
                setPosts(postsFromAPI)
            });
    }, []);

    return (
        <div>
            <h1>Posts</h1>
            {posts.map((post, index) =>
                <Card key={post.id || index}>
                    <CardBody>
                        <h2>{post.title}</h2>
                        <p>Author: {post.userProfile.displayName}</p>
                        <p>Category: {post.category ? post.category.name : "Uncategorized"}</p>
                    </CardBody>
                </Card>
            )}
        </div>
    );
}

export default Post;
