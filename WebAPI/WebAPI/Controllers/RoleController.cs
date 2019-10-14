using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Models;

namespace WebAPI.Migrations
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoleController : ControllerBase
    {
        private UserManager<ApplicationUser> _userManager;

        public RoleController(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<Object> Get()
        {
           //ar user = await _userManager.FindByNameAsync("admin");

            var role = new IdentityRole();
            role.Name = "Administrator";
            role.Id = "d5f98a62-965d-4123-942e-3a9f3c9a6ad9";
            ApplicationUser user = await _userManager.FindByNameAsync("admin");
            var result1 = await _userManager.AddToRoleAsync(user, role.Name);
            return new string[] {
                user.UserName
            };
        }
    }
}