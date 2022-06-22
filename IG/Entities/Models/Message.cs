using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace IG.Entities.Models
{
    public class Message
    {
        [Key]
        public int MessageId { get; set; }

        [Column(TypeName = "nvarchar(50)")]
        public string? MessageName { get; set; }

        [Column(TypeName = "nvarchar(250)")]
        public string? MessageContext { get; set; }

        public DateTime? Time { get; set; }

        [ForeignKey("Img")]
        public int ImgId { get; set; }
        //public virtual Img Img { get; set; }

        public Message()
        {
            this.Time = DateTime.UtcNow.AddHours(08);//假如沒新增值 則放現在時間 台灣+8小時
        }
    }
}
