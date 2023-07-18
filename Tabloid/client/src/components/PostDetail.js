import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPostById } from '../modules/PostManager';
import { Card, CardBody } from 'reactstrap';
import { Link } from 'react-router-dom';

const PostDetail = () => {
    const [post, setPost] = useState({});
    const { id } = useParams();

    useEffect(() => {
        getPostById(id)
            .then(res => {
                setPost(res);
            })
    }, []);

    return (
        <Card className="m-4">
            <CardBody>
                <h2>{post.title}</h2>
                {post.imageLocation && <img src={post.imageLocation} alt="header" />}
                <strong>Author: {post.userProfile?.displayName}</strong>
                <p>{post.content}</p>
                <p>Published on: {new Date(post.publishDateTime).toLocaleDateString()}</p>
                {/* <Link to={`/posts/edit/${post.id}`}>Edit</Link> */} {/* Edit Link for future ticket */}
            </CardBody>
        </Card>
    );
}

export default PostDetail;
