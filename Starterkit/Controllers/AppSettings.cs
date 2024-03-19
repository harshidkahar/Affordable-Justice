namespace Starterkit.Controllers;

class AppSettings
{
    public static SortedDictionary<string, int> Config { get; set; } = new SortedDictionary<string, int>();

    public static void init(IConfiguration configuration)
    {
        Config = configuration.GetSection("AppSettings").Get<SortedDictionary<string, int>>() ?? Config;
    }
}
