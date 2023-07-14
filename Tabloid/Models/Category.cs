using System.ComponentModel.DataAnnotations;

namespace Tabloid.Models
{
    public class Category
    {
        public int Id { get; set; }
        [Required(ErrorMessage = "Please enter a valid category name between 3 and 50 characters.")]
        [StringLength(50, MinimumLength = 3)]
        public string Name { get; set; }
    }
}
