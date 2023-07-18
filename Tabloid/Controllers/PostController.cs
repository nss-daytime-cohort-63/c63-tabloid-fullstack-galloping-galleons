using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using Tabloid.Repositories;
using Tabloid.Models;
using System.Collections.Generic;

namespace Tabloid.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostController : ControllerBase
    {
        private readonly IPostRepository _postRepository;
        public PostController(IPostRepository postRepository)
        {
            _postRepository = postRepository;
        }

        // https://localhost:5001/api/posts/
        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                List<Post> posts = _postRepository.GetAll();
                return Ok(posts);
            }
            catch
            {
                return BadRequest();
            }
        }

        // https://localhost:5001/api/myposts/ByAuthor/1
        [HttpGet("ByAuthor/{firebaseUserId}")]
        public IActionResult GetPostsByAuthor(string firebaseUserId)
        {
            List<Post> post = _postRepository.GetPostsByAuthor(firebaseUserId);
            if (post == null)
            {
                return NotFound();
            }
            try
            {
                return Ok(post);
            }
            catch
            {
                return BadRequest();
            }
            }
        }
}
