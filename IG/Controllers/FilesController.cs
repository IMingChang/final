using IG.Entities;
using IG.Entities.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace IG.Controllers
{
    


    public class Img2
    {
        public int? ImgId { get; set; }

        public string? ImgTitle { get; set; }

        public string? ImgContext { get; set; }

        public List<IFormFile>? File { get; set; }
    }

    public class user2//class包起來的整筆資料
    {
        public string? Account { get; set; }

        public string? UserName { get; set; }

        public string? Profile { get; set; }

        public string? Gender { get; set; }


        public IFormFile? File { get; set; }
    }



    [Route("api/[controller]")]
    [ApiController]

    public class FilesController : ControllerBase
    {
        private readonly MysqlDbContext _context;

        public FilesController(MysqlDbContext context)
        {
            _context = context;
        }
        [HttpPost]
        public ActionResult Files([FromForm] Img2 file)
        {
            try
            {
                string str = "";
                foreach (var formFile in file.File)
                {
                    str += @"img/" + formFile.FileName + ",";
                    var filePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/img", formFile.FileName);
                    using (var stream = new FileStream(filePath, FileMode.Create))
                    {
                        formFile.CopyTo(stream);
                    }
                }

                _context.Img.Add(new Img
                {
                    ImgTitle = file.ImgTitle,
                    ImgContext = file.ImgContext,
                    ImgUrl = str
                });
                _context.SaveChanges();
                return StatusCode(StatusCodes.Status201Created, str);
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e);
            }
        }



        [HttpPut, Route("User")]//前端提交資訊
        public ActionResult PutUsersFiles([FromForm] user2 file)//提交過來 先確認有沒有 相同的話存到user
        {
            Console.WriteLine(file.Account);//確認之後抓取帳號
            Console.WriteLine(file.File?.FileName);
            var user = _context.User.Where(o => o.Account == file.Account).FirstOrDefault();
            if (user == null)
            {
                return BadRequest("找不到使用者");
            }
            try
            {
                Console.WriteLine(file.File?.FileName);
                if (file.File?.FileName != null)
                {
                    string str = "";
                    str = @"img/" + file.File.FileName;
                    var filePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/person", file.File.FileName);//照片存取位置
                    using (var stream = new FileStream(filePath, FileMode.Create))//copy進去以後 url變成字串
                    {
                        file.File.CopyTo(stream);
                    }
                    Console.WriteLine(str);
                    user.Url = str;
                }
                user.UserName = file.UserName;
                user.Gender= file.Gender;
                user.Profile = file.Profile;
                _context.SaveChanges();
                return StatusCode(StatusCodes.Status201Created);
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e);
            }
        }



        [HttpPut("{id}")]
        public ActionResult PutFiles(int id, [FromForm] Img2 file)
        {
            var model = _context.Img.Where(s => s.ImgId == id).FirstOrDefault<Img>();
            if (model == null)
            {
                return BadRequest("error Id");
            }
            try
            {
                
                if (file.File != null)
                {
                    string str = "";
                    foreach (var formFile in file.File)
                    {
                        str += @"img/" + formFile.FileName + ",";
                        var filePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/img", formFile.FileName);
                        using (var stream = new FileStream(filePath, FileMode.Create))
                        {
                            formFile.CopyTo(stream);
                        }
                    }
                    model.ImgUrl = str;
                }
                model.ImgId = id;
                model.ImgTitle = file.ImgTitle;
                model.ImgContext = file.ImgContext;
                
                    
                
                _context.SaveChanges();
                return StatusCode(StatusCodes.Status201Created);
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, e);
            }
        }
    }
}
