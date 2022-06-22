using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using IG.Entities;
using IG.Entities.Models;

namespace IG.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImgsController : ControllerBase
    {
        private readonly MysqlDbContext _context;

        public ImgsController(MysqlDbContext context)
        {
            _context = context;
        }

        [HttpPut, Route("Count/{id}")]
        public async Task<IActionResult> PutCount(int id, int count)
        {
            if (count != 1) {
                return BadRequest();
            }
            var model = _context.Img.Where(s => s.ImgId == id).FirstOrDefault<Img>();

            try
            {
                model.ImgLoveCount = model.ImgLoveCount + 1;
                Console.WriteLine(model.ImgId);
                await _context.SaveChangesAsync();      
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ImgExists(id))
                {
                    return NotFound("error");
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }
        // GET: api/Imgs
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Img>>> GetImg()
        {
          if (_context.Img == null)
          {
              return NotFound();
          }
            return await _context.Img.ToListAsync();
        }

        // GET: api/Imgs/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Img>> GetImg(int id)
        {
          if (_context.Img == null)
          {
              return NotFound();
          }
            var img = await _context.Img.FindAsync(id);

            if (img == null)
            {
                return NotFound();
            }

            return img;
        }

        // PUT: api/Imgs/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutImg(int id, Img img)
        {
            if (id != img.ImgId)
            {
                return BadRequest();
            }

            _context.Entry(img).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ImgExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Imgs
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Img>> PostImg(Img img)
        {
          if (_context.Img == null)
          {
              return Problem("Entity set 'EmployeeDbContext.Img'  is null.");
          }
            _context.Img.Add(img);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetImg", new { id = img.ImgId }, img);
        }

        // DELETE: api/Imgs/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteImg(int id)
        {
            if (_context.Img == null)
            {
                return NotFound();
            }
            var img = await _context.Img.FindAsync(id);
            if (img == null)
            {
                return NotFound();
            }

            _context.Img.Remove(img);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ImgExists(int id)
        {
            return (_context.Img?.Any(e => e.ImgId == id)).GetValueOrDefault();
        }
    }
}
