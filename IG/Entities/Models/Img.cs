using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IG.Entities.Models
{
    public class Img
    {
        [Key]
        public int ImgId { get; set; }

        [Column(TypeName = "nvarchar(50)")]
        public string ImgTitle { get; set; }

        [Column(TypeName = "nvarchar(250)")]
        public string? ImgContext { get; set; }

        [Column(TypeName = "nvarchar(250)")]
        public string ImgUrl { get; set; }

        public int? ImgLoveCount { get; set; }
        public virtual ICollection<Message> Messages { get; set; }

        public Img()
        {
            this.ImgLoveCount = 0;
        }
    }
}
