using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using Tabloid.Models;
using Tabloid.Utils;

namespace Tabloid.Repositories
{
    public class CategoryRepository : BaseRepository
    {
        public CategoryRepository(IConfiguration configuration) : base(configuration)
        {
        }

        public List<Category> Get()
        {
            List<Category> categories = new List<Category>();

            using (var connection = Connection)
            {
                connection.Open();

                using(var cmd =  connection.CreateCommand())
                {
                    cmd.CommandText = @"Select Id, [Name] from Category";

                    using(SqlDataReader reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            categories.Add(CategoryBuilder(reader));
                        }
                    }
                }
            }

            return categories;
        }
        private Category CategoryBuilder(SqlDataReader reader)
        {
            Category category = new()
            {
                Id = DbUtils.GetInt(reader, "Id"),
                Name = DbUtils.GetString(reader, "Name")
            };
            return category;
        }
    }
}
