package the_creative_spark.backend.article;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ArticleRepository extends JpaRepository<ArticleModel, String> {

    List<ArticleModel> findAllByOrderByCreatedAtDesc();
    List<ArticleModel> findAllByOrderByClapsDesc();
}
