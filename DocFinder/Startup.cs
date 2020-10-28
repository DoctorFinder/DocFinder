using AutoMapper;
using DocFinder.Domain;
using DocFinder.Domain.Interfaces;
using DocFinder.Domain.Service;
using DocFinder.Service;
using DocFinder.Service.ApplicationService;
using DocFinder.Service.Interfaces;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Serilog;
using System;
using System.IO;

namespace DocFinder
{
    public class Startup
    {
        public static IConfiguration configuration { get; } = new ConfigurationBuilder()
          .SetBasePath(Directory.GetCurrentDirectory())
          .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
          .AddJsonFile($"appsettings.{Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") ?? "Production"}.json", optional: true)
          .Build();

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            Log.Logger = new LoggerConfiguration().ReadFrom.
             Configuration(configuration)
            .CreateLogger();

            AppDomain.CurrentDomain.ProcessExit += (s, e) => Log.CloseAndFlush();
            services.AddSingleton(Log.Logger);
            services.AddDbContextPool<DocFinderDBContext>(options =>
            {
                options.UseSqlServer(Configuration.GetConnectionString("DocFinderDb"),
                    x => x.UseNetTopologySuite());
            });
            services.AddControllersWithViews();
            
            services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

            services.AddScoped<ILanguageApplicationService, LanguageApplicationService>();
            services.AddScoped<ISpecialityApplicationService, SpecialityApplicationService>();
            services.AddScoped<IDoctorApplicationService, DoctorApplicationService>();
            services.AddScoped<IDoctorLanguageApplicationService, DoctorLanguageApplicationService>();
            services.AddScoped<IDoctorSpecialityApplicationService, DoctorSpecialityApplicationService>();
            services.AddScoped<IDoctorAddressesApplicationService, DoctorAddressesApplicationService>();
            services.AddScoped<IPasswordHasherApplicationService, PasswordHasherApplicationService>();
            services.AddScoped<IHospitalTimingsApplicationService, HospitalTimingsApplicationService>();

            services.AddScoped<ILanguageService,LanguageService>();
            services.AddScoped<ISpecialityService, SpecialityService>();
            services.AddScoped<IDoctorService, DoctorService>();
            services.AddScoped<IDoctorLanguageService,DoctorLanguageService>();
            services.AddScoped<IDoctorSpecialityService, DoctorSpecialityService>();
            services.AddScoped<IDoctorAddressService, DoctorAddressService>();
            services.AddScoped<IHospitalTimingsService, HospitalTimingsService>();

            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseSerilogRequestLogging();
            app.UseRouting();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";                

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });
        }
    }
}
