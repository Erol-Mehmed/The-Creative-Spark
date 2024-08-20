package the_creative_spark.backend.article;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ArticleRepository extends JpaRepository<ArticleModel, String> {

    List<ArticleModel> findAllByOrderByCreatedAtDesc();
    @Query(value = "SELECT a FROM ArticleModel  a ORDER BY a.claps DESC, a.createdAt DESC LIMIT 6")
    List<ArticleModel> findTheSixMostLikedArticles();
    @Query ("SELECT a FROM ArticleModel a WHERE a.slug = :slug")
    ArticleModel findBySlug(String slug);
}
