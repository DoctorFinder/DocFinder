using DocFinder.Domain;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace DocFinder.Service
{
    public class DocFinderDBContext : DbContext
    {
        public DocFinderDBContext(DbContextOptions<DocFinderDBContext> options)
        : base(options)
        {

        }
        public DbSet<Doctor> Doctors { get; set; }
    }
}
