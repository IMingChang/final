using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IG.Entities.Models
{
    public class Admin
    {
        [Key]
        public int AdminId { get; set; }

        [Required]
        [Column(TypeName = "nvarchar(50)")]
        public string Account { get; set; }

        [Column(TypeName = "nvarchar(20)")]
        public string? Password { get; set; }

    }
}
