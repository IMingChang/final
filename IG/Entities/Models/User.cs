using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IG.Entities.Models
{
    public class User
    {
        [Key]
        public int? UserId { get; set; }

        [Column(TypeName = "nvarchar(50)")]
        public string? Account { get; set; }

        [Column(TypeName = "nvarchar(50)")]
        public string? Password { get; set; }

        [Column(TypeName = "nvarchar(50)")]
        public string? UserName { get; set; }

        [Column(TypeName = "nvarchar(200)")]
        public string? Profile { get; set; }

        [Column(TypeName = "nvarchar(1)")]
        public string? Gender { get; set; }
        [Column(TypeName = "nvarchar(250)")]
        public string? Url { get; set; }

    }
}
