import React, { useEffect, useState } from 'react';
import { Card, CardBody } from 'reactstrap';
import { getAllPosts } from '../modules/PostManager.js';
import { Link } from 'react-router-dom';

function Post() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        getAllPosts()
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
                        <h2>
                            <Link to={`/posts/${post.id}`}>
                                {post.title}
                            </Link>
                        </h2>
                        <p>Author: {post.userProfile.displayName}</p>
                        <p>Category: {post.categoryName}</p>
                    </CardBody>
                </Card>
            )}
        </div>
    );
}

export default Post;
