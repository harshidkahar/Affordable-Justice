global using Microsoft.EntityFrameworkCore;
global using Starterkit._keenthemes;
global using Starterkit._keenthemes.libs;
global using Starterkit.Helper;
global using System.Runtime;
global using System.Text.Json.Serialization;
using Starterkit.Controllers;
using Starterkit.Models;
//using Newtonsoft.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);
// Add services to the container.
builder.Services.AddControllersWithViews();


builder.Services.AddScoped<IKTTheme, KTTheme>();
builder.Services.AddSingleton<IKTBootstrapBase, KTBootstrapBase>();

IConfiguration themeConfiguration = new ConfigurationBuilder()
                            .AddJsonFile("_keenthemes/config/themesettings.json")
                            .Build();

IConfiguration iconsConfiguration = new ConfigurationBuilder()
                            .AddJsonFile("_keenthemes/config/icons.json")
                            .Build();

IConfiguration appSettingsConfiguration = new ConfigurationBuilder()
                            .AddJsonFile("appsettings.json")
                            .Build();
KTThemeSettings.init(themeConfiguration);
KTIconsSettings.init(iconsConfiguration);
AppSettings.init(appSettingsConfiguration);


{
    var services = builder.Services;
    var env = builder.Environment;

    services.AddCors();
    services.AddControllers().AddJsonOptions(x =>
    {   
        // serialize enums as strings in api responses (e.g. Role)
        x.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());

        // ignore omitted parameters on models to enable optional params (e.g. User update)
        x.JsonSerializerOptions.DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull;
        x.JsonSerializerOptions.PropertyNamingPolicy = null;     
    });
    //services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());


    builder.Services.AddDbContext<DataContext>(options =>
    {
        options.UseSqlServer(builder.Configuration.GetConnectionString("LawFirmConnectionString"));
    });

    //// configure DI for application services
    //services.AddSingleton<DataContext>();
    //services.AddScoped<IUserRepository, UserRepository>();
    //services.AddScoped<IUserService, UserService>();
}
builder.Host.ConfigureAppConfiguration(config =>{config.AddJsonFile("appsettings.json");});

builder.Services.Configure<AppSettingsModel>(builder.Configuration.GetSection("FileUploadLocation"));

builder.Services.AddDistributedMemoryCache();

builder.Services.AddSession(options =>
{
    options.IdleTimeout = TimeSpan.FromSeconds(10);
    options.Cookie.HttpOnly = true;
    options.Cookie.IsEssential = true;
});
var app = builder.Build();

app.Use(async (context, next) =>
    {
    await next();
    if (context.Response.StatusCode == 404)
    {
        context.Request.Path = "/not-found";
        await next();
    }
});

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseDefaultFiles();
app.UseStaticFiles();
app.UseHttpsRedirection();
app.UseSession();

app.UseRouting();

app.UseAuthorization();
app.UseThemeMiddleware();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");

app.Run();
