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

        public Category GetById(int id)
        {
            Category category = null;

            using (var connection = Connection)
            {
                connection.Open();
                using(var cmd = connection.CreateCommand())
                {
                    cmd.CommandText = @"Select Id, [Name] from Category where Id = @id";
                    cmd.Parameters.AddWithValue("@id", id);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        if(reader.Read())
                        {
                            category = CategoryBuilder(reader);
                        }
                    }
                }
            }
            return category;
        }

        public void Add(Category category)
        {
            using(var connection = Connection)
            {
                connection.Open();
                using(var cmd = connection.CreateCommand())
                {
                    cmd.CommandText = @"Insert into Category ([Name]) OUTPUT Inserted.Id Values (@name)";
                    cmd.Parameters.AddWithValue("@name", category.Name);

                    category.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Update(Category category)
        {
            using(var connection = Connection)
            {
                connection.Open();
                using( var cmd = connection.CreateCommand())
                {
                    cmd.CommandText = @"Update Category
                                            Set [Name] = @name
                                            where Id = @id";
                    cmd.Parameters.AddWithValue("@id", category.Id);
                    cmd.Parameters.AddWithValue("@name", category.Name);

                    cmd.ExecuteNonQuery();
                }
            }
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
