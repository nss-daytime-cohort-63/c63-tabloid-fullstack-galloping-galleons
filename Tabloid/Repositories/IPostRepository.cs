﻿using System.Collections.Generic;
using Tabloid.Models;

namespace Tabloid.Repositories
{
    public interface IPostRepository
    {
        List<Post> GetAll();
        List<Post> GetPostsByAuthor(string firebaseUserId);
        Post GetPostById(int postId);
    }
}