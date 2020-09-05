﻿using DocFinder.Domain;
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
        public DbSet<Doctor> Doctor { get; set; }

        public DbSet<Specialities> Specialities { get; set; }

        public DbSet<Languages> Languages { get; set; }

        public DbSet<DoctorLanguages> DoctorLanguages { get; set; }
        
        public DbSet<DoctorSpecialities> DoctorSpecialities { get; set; }
    }
}
