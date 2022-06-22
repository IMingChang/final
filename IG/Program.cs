using IG.Entities;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
// Add services to the container.
builder.Services.AddCors(options =>
{
    options.AddPolicy(MyAllowSpecificOrigins,
                          policy =>
                          {
                              policy.WithOrigins("http://localhost:3000", "http://192.168.50.1:3000 ")
                                    .AllowAnyHeader()
                                    .AllowAnyMethod();//CRUD
                          });
});

// Add services to the container. code first
// Mysql
var connectionString = builder.Configuration.GetConnectionString("PathDbMysql");//�s�����Ʈw
builder.Services.AddDbContext<MysqlDbContext>(options =>

    options.UseLazyLoadingProxies().UseMySql(connectionString, ServerVersion.AutoDetect(connectionString)
));
//Mssql
//builder.Services.AddDbContext<MysqlDbContext>(options => options.UseLazyLoadingProxies().UseSqlServer(builder.Configuration.GetConnectionString("PathDbMssql")));

//options.UseLazyLoadingProxies().UseMySql(connectionString, ServerVersion.AutoDetect(connectionString)

builder.Services.AddControllers().AddNewtonsoftJson(options =>
    options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
);

// Add services to the container. code first
builder.Services.AddControllers();//->controller ��ݫe��
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();//API SWAGGER �}�l�إ�(�e�����O��l��)

//�[���R�A�ɮ� �۷�� wwwroot(�b��Ƨ��̥i�H���)
app.UseStaticFiles();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(MyAllowSpecificOrigins);

app.UseAuthorization();

app.MapControllers();

app.Run();
