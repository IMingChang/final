using IG.Entities.Models;
using Microsoft.EntityFrameworkCore;

namespace IG.Entities
{
    public class MysqlDbContext : DbContext
    {
        public MysqlDbContext(DbContextOptions options) : base(options)
        {
        }
        public DbSet<Img> Img { get; set; } = null!;
        public DbSet<Message> Message { get; set; } = null!;
        //public DbSet<Pages> Pages { get; set; } = null!;
        //public DbSet<Admin> Admin { get; set; } = null!;
        public DbSet<User> User { get; set; } = null!;
    }
}
