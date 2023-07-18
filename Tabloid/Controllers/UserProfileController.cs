using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualBasic;
using System;
using Tabloid.Models;
using Tabloid.Repositories;

namespace Tabloid.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserProfileController : ControllerBase
    {
        private readonly IUserProfileRepository _userProfileRepository;
        public UserProfileController(IUserProfileRepository userProfileRepository)
        {
            _userProfileRepository = userProfileRepository;
        }

        [HttpGet()]
        public IActionResult GetAllUsers()
        {
            return Ok(_userProfileRepository.GetAllUsers());
        }

        [HttpGet("{firebaseUserId}")]
        public IActionResult GetUserProfile(string firebaseUserId)
        {
            return Ok(_userProfileRepository.GetByFirebaseUserId(firebaseUserId));
        }

        [HttpGet("DoesUserExist/{firebaseUserId}")]
        public IActionResult DoesUserExist(string firebaseUserId)
        {
            var userProfile = _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
            if (userProfile == null)
            {
                return NotFound();
            }
            return Ok();
        }

        [HttpPost]
        public IActionResult Post(UserProfile userProfile)
        {
            userProfile.CreateDateTime = DateTime.Now;
            userProfile.UserTypeId = UserType.AUTHOR_ID;
            _userProfileRepository.Add(userProfile);
            return CreatedAtAction(
                nameof(GetUserProfile),
                new { firebaseUserId = userProfile.FirebaseUserId },
                userProfile);
        }
        [HttpPut("updateActiveStatus")]
        public IActionResult UpdateActiveStatus(string firebaseId, bool activeStatus)
        {
            try
            {
                if (_userProfileRepository.GetByFirebaseUserId(firebaseId) == null)
                {
                    return NotFound();
                }
                _userProfileRepository.UpdateActiveStatus(firebaseId, activeStatus);
                return Ok("Active status updated successfully.");
            }
            catch (Exception ex)
            {
      
                return StatusCode(500, "An error occurred while updating the active status." + ex.Message);
            }
        }
        [HttpGet("GetActiveStatusByEmail")]
        public bool GetActiveStatusByEmail(string email)
        {
            return _userProfileRepository.GetActiveStatusByEmail(email);
        }

    }
}
