using System.Collections.Generic;
using System.Linq;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Tabloid.Models;
using Tabloid.Utils;

namespace Tabloid.Repositories
{
    public class PostRepository : BaseRepository, IPostRepository
    {
        public PostRepository(IConfiguration configuration) : base(configuration) { }

        public List<Post> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                SELECT  
                    P.Id, P.Title as PostTitle,
                    CONCAT(U.FirstName, ' ', U.LastName) AS Author,
                    C.Name AS CategoryName
                FROM
                    Post P
                JOIN
                    UserProfile U ON P.UserProfileId = U.Id
                JOIN
                    Category C ON P.CategoryId = C.Id
                WHERE
                    P.IsApproved = 1 AND P.PublishDateTime <= GETDATE()
                ORDER BY
                    P.PublishDateTime DESC;
                ";
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        var posts = new List<Post>();
                        while (reader.Read())
                        {
                            posts.Add(new Post()
                            {
                                //Id = DbUtils.GetInt(reader, "Id"),
                                Title = DbUtils.GetString(reader, "PostTitle"),
                                //Content = DbUtils.GetString(reader, "Content"),
                                //ImageLocation = DbUtils.GetString(reader, "ImageLocation"),
                                //CreateDateTime = DbUtils.GetDateTime(reader, "CreateDateTime"),
                                //PublishDateTime = DbUtils.GetDateTime(reader, "PublishDateTime"),
                                //IsApproved = DbUtils.GetBoolean(reader, "IsApproved"),
                                //CategoryId = DbUtils.GetInt(reader, "CategoryId"),
                                CategoryName = DbUtils.GetString(reader, "CategoryName"),
                                //UserProfileId = DbUtils.GetInt(reader, "UserProfileId"),
                                UserProfile = new UserProfile
                                {
                                    //Id = DbUtils.GetInt(reader, "UserProfileId"),
                                    DisplayName = DbUtils.GetString(reader, "Author"),
                                },
                                //Category = new Category
                                //{
                                //    Id = DbUtils.GetInt(reader, "CategoryId"),
                                //    Name = DbUtils.GetString(reader, "CategoryName")
                                //}
                            });
                        }
                        return posts;
                    }
                }
            }
        }
    }
}
