package the_creative_spark.backend.article;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.ArrayList;

@Service
public class ArticleService {
    private final ArticleRepository articleRepository;

    @Autowired
    public ArticleService(ArticleRepository articleRepository) {
        this.articleRepository = articleRepository;
    }

    public List<ArticleModel> getAllArticles() {
        return articleRepository.findAll();
    }

    public ArticleModel getArticleById(String id) {
        // Dummy implementation
        return new ArticleModel();
    }
}