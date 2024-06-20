namespace Starterkit.Controllers;

class AppSettings
{
    public static SortedDictionary<string, string> Config { get; set; } = new SortedDictionary<string, string>();

    public static void init(IConfiguration configuration)
    {
        Config = configuration.GetSection("AppSettings").Get<SortedDictionary<string, string>>() ?? Config;
    }
}
