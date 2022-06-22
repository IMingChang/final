using IG.Entities;
using IG.Entities.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace IG.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImgMessagesController : ControllerBase
    {
        private readonly MysqlDbContext _context;

        public ImgMessagesController(MysqlDbContext context)
        {
            _context = context;
        }
        // GET: api/Messages/5
        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<Message>>> GetMessage(int id)
        {
            if (_context.Message == null)
            {
                return NotFound();
            }
            var message = await _context.Message.Where(o => o.ImgId == id).ToListAsync();
            //var message = await _context.Message.FindAsync(id);

            if (message == null)
            {
                return NotFound();
            }

            return message;
        }
        private bool MessageExists(int id)
        {
            return (_context.Message?.Any(e => e.MessageId == id)).GetValueOrDefault();
        }
    }
}
