using Microsoft.AspNetCore.Mvc;
using System.Security.Cryptography;
using static System.Net.Mime.MediaTypeNames;
using IoFile = System.IO.File;

namespace AngularApp.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    [Produces("application/json")]
    public class WeatherForecastController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        private readonly ILogger<WeatherForecastController> _logger;

        public WeatherForecastController(ILogger<WeatherForecastController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public ObjectResult GetWeatherForecast()
        {
            var res =  Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                Date = DateTime.Now.AddDays(index),
                TemperatureC = Random.Shared.Next(-20, 55),
                Summary = Summaries[Random.Shared.Next(Summaries.Length)]
            })
            .ToArray();

            Response.Headers.Add("Cache-Control", "public, max-age=31536000");

            return Ok(res);
        }

        [HttpPost]
        public IActionResult UploadFile([FromForm] IFormFile file)
        {
           using(FileStream fs = IoFile.Create($".\\Images\\{file.FileName}"))
           {
                file.OpenReadStream().CopyTo(fs);
                return Ok(file.FileName);
            }
        }

        [HttpGet]
        public FileContentResult DownloadImage()
        {
            DirectoryInfo di = new DirectoryInfo(".\\Images");

            string name = di.GetFiles().Select(i => i.FullName).FirstOrDefault("");

            return File(IoFile.ReadAllBytes(name), "image/jpeg", "test.jpeg");
        }
    }
}