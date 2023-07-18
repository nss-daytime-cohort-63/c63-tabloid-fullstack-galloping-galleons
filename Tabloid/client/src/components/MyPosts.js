import React, { useState, useEffect } from 'react';
import { Card, CardBody } from 'reactstrap';
import { getPostsByAuthor } from './PostManager';
import firebase from 'firebase';

const MyPosts = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        // get current user's ID
        const firebaseUserId = firebase.auth().currentUser.uid;
        // fetch posts written by this user
        getPostsByAuthor(firebaseUserId)
            .then(setPosts);
    }, []);

    return (
        <div className="container">
            <div className="row justify-content-center">
                {posts.map((post) => (
                    <Card key={post.id} className="m-4">
                        <CardBody>
                            <h2>{post.title}</h2>
                            <strong>Author: {post.userProfile.displayName}</strong>
                            <p>Category: {post.category ? post.category.name : "Uncategorized"}</p>
                        </CardBody>
                    </Card>
                ))}
            </div>
        </div>
    );
}

export default MyPosts;
