package the_creative_spark.backend.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import the_creative_spark.backend.article.ArticleModel;

import java.util.List;

public interface UserRepository extends JpaRepository<UserModel, String> {
    UserModel findBySlug(String slug);
    @Query("SELECT a FROM ArticleModel a WHERE a.author.id = :id")
    List<ArticleModel> getArticlesById(@Param("id") String id);
}
