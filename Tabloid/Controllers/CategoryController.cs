using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using Tabloid.Models;
using Tabloid.Repositories;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Tabloid.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryRepository _categoryRepo;

        public CategoryController(ICategoryRepository categoryRepository)
        {
            _categoryRepo = categoryRepository;
        }

        // GET: api/<CategoryController>
        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                List<Category> categories = _categoryRepo.Get();
                return Ok(categories);
            }
            catch
            {
                return BadRequest();
            }
        }

        // GET api/<CategoryController>/5
        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            Category category = _categoryRepo.GetById(id);
            if(category == null)
            {
                return NotFound();
            }

            try
            {
                return Ok(category);
            }
            catch
            {
                return BadRequest();
            }
        }

        // POST api/<CategoryController>
        [HttpPost]
        public IActionResult Add(Category category)
        {
            try
            {
                _categoryRepo.Add(category);
                return CreatedAtAction(nameof(GetById), new { id = category.Id }, category);
            }
            catch
            {
                return BadRequest();
            }
        }

        // PUT api/<CategoryController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<CategoryController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
