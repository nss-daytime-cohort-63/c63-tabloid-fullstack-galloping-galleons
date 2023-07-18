import React, { useState, useEffect } from 'react';
import { Card, CardBody } from 'reactstrap';
import { Link } from 'react-router-dom';
import firebase from 'firebase';
import { getPostsByAuthor } from '../modules/PostManager';


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
                            <h2>
                                <Link to={`/posts/${post.id}`}>
                                    {post.title}
                                </Link>
                            </h2>
                            <strong>Author: {post.userProfile.displayName}</strong>
                            <p>Category: {post.categoryName}</p>
                        </CardBody>
                    </Card>
                ))}
            </div>
        </div>
    );
}

export default MyPosts;