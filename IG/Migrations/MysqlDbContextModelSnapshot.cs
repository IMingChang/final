﻿// <auto-generated />
using System;
using IG.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace IG.Migrations
{
    [DbContext(typeof(MysqlDbContext))]
    partial class MysqlDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.6")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            modelBuilder.Entity("IG.Entities.Models.Img", b =>
                {
                    b.Property<int>("ImgId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("ImgContext")
                        .HasColumnType("nvarchar(250)");

                    b.Property<int?>("ImgLoveCount")
                        .HasColumnType("int");

                    b.Property<string>("ImgTitle")
                        .IsRequired()
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("ImgUrl")
                        .IsRequired()
                        .HasColumnType("nvarchar(250)");

                    b.HasKey("ImgId");

                    b.ToTable("Img");
                });

            modelBuilder.Entity("IG.Entities.Models.Message", b =>
                {
                    b.Property<int>("MessageId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int>("ImgId")
                        .HasColumnType("int");

                    b.Property<string>("MessageContext")
                        .HasColumnType("nvarchar(250)");

                    b.Property<string>("MessageName")
                        .HasColumnType("nvarchar(50)");

                    b.Property<DateTime?>("Time")
                        .HasColumnType("datetime(6)");

                    b.HasKey("MessageId");

                    b.HasIndex("ImgId");

                    b.ToTable("Message");
                });

            modelBuilder.Entity("IG.Entities.Models.User", b =>
                {
                    b.Property<int?>("UserId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("Account")
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("Gender")
                        .HasColumnType("nvarchar(1)");

                    b.Property<string>("Password")
                        .HasColumnType("nvarchar(50)");

                    b.Property<string>("Profile")
                        .HasColumnType("nvarchar(200)");

                    b.Property<string>("Url")
                        .HasColumnType("nvarchar(250)");

                    b.Property<string>("UserName")
                        .HasColumnType("nvarchar(50)");

                    b.HasKey("UserId");

                    b.ToTable("User");
                });

            modelBuilder.Entity("IG.Entities.Models.Message", b =>
                {
                    b.HasOne("IG.Entities.Models.Img", null)
                        .WithMany("Messages")
                        .HasForeignKey("ImgId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("IG.Entities.Models.Img", b =>
                {
                    b.Navigation("Messages");
                });
#pragma warning restore 612, 618
        }
    }
}