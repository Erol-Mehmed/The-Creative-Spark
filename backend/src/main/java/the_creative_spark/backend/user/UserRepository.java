package the_creative_spark.backend.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import the_creative_spark.backend.shared.ArticleDetails;

import java.util.List;

public interface UserRepository extends JpaRepository<UserModel, String> {
    UserModel findBySlug(String slug);
    @Query("SELECT new the_creative_spark.backend.shared.ArticleDetails(a.id, a.title, a.content, a.createdAt, a.updatedAt, a.topic, a.image, a.claps, a.readTime, a.slug, a.author.name, a.author.slug, a.author.image) FROM ArticleModel a WHERE a.author.id = :id")
    List<ArticleDetails> getArticlesByAuthorId(@Param("id") String id);
}
