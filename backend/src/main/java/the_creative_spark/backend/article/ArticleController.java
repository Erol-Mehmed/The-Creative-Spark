package the_creative_spark.backend.article;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/")
public class ArticleController {

    private final ArticleService articleService;

    @Autowired
    public ArticleController(ArticleService articleService) {
        this.articleService = articleService;
    }

    @GetMapping
    public List<ArticleResponse> getAllArticles(@RequestParam(required = false) String section) {
        String allOrMostLikedArticles = "all-articles".equals(section) ? "all" : "most-liked";
        List<ArticleModel> articles = articleService.getAllArticles(allOrMostLikedArticles);

        return articles.stream().map(article -> {
            ArticleResponse response = new ArticleResponse();
            response.setId(article.getId());
            response.setTitle(article.getTitle());
            response.setContent(article.getContent());
            response.setCreatedAt(article.getCreatedAt());
            response.setClaps(article.getClaps());
            response.setReadTime(article.getReadTime());
            response.setTopic(article.getTopic());
            response.setSlug(article.getSlug());
            response.setAuthorName(article.getAuthor().getName());
            response.setAuthorSlug(article.getAuthor().getSlug());
            return response;
        }).collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public ArticleModel getArticleById(@PathVariable String id) {
        return articleService.getArticleById(id);
    }
}
