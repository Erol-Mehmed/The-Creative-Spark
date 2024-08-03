package the_creative_spark.backend.article;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ArticleService {

    private final ArticleRepository articleRepository;

    @Autowired
    public ArticleService(ArticleRepository articleRepository) {
        this.articleRepository = articleRepository;
    }

    public List<ArticleModel> getAllArticles(String allOrMostLikedArticles) {
        if ("all".equals(allOrMostLikedArticles)) {
            return articleRepository.findAllByOrderByCreatedAtDesc();
        } else if ("most-liked".equals(allOrMostLikedArticles)) {
            return articleRepository.findAllByOrderByClapsDesc();
        }

        return null;
    }

    public ArticleModel getArticleById(String id) {
        // Dummy implementation
        return new ArticleModel();
    }
}
