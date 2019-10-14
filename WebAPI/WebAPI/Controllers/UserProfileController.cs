﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Models;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserProfileController : ControllerBase
    {
        private UserManager<ApplicationUser> _userManager;
        private RoleManager<IdentityRole> _roleManger;

        public UserProfileController(UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManger)
        {
            _userManager = userManager;
            _roleManger = roleManger;
        }

        [HttpGet]
        [Authorize(Policy = "RequireAdministratorRole")]
        public async Task<Object> GetUserProfile()
        {
            string userId = User.Claims.First(c => c.Type == "UserID").Value;
            var user = await _userManager.FindByIdAsync(userId);
            return new
            {
               user.FullName,
               user.Email,
               user.UserName,

            };
        }
    }
}