using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace DocFinder.Domain
{
    public class Languages
    {
        [Key]
        public int Id { get; set; }

        public string Language { get; set; }

        public string Code { get; set; }

    }
}
