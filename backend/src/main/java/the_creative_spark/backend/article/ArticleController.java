package the_creative_spark.backend.article;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestParam;
import the_creative_spark.backend.shared.ArticleDetails;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/articles")
public class ArticleController {

    private final ArticleService articleService;

    @Autowired
    public ArticleController(ArticleService articleService) {
        this.articleService = articleService;
    }

    @GetMapping
    public Object handleHomePageRequests(
            @RequestParam(name = "has-articles", required = false) String hasArticles,
            @RequestParam(name = "section", required = false) String section) {

        if (hasArticles != null) {
            return hasArticles();
        } else if (section != null) {
            return getAllArticles(section);
        } else {
            return "Invalid request";
        }
    }

    private Boolean hasArticles() {
        return articleService.hasArticles();
    }

    private List<ArticleDetails> getAllArticles(String section) {
        String allOrMostLikedArticles = "all-articles".equals(section) ? "all" : "most-liked";
        List<ArticleModel> articles = articleService.getAllArticles(allOrMostLikedArticles);

        return articles.stream().map(article -> {
            ArticleDetails response = new ArticleDetails();
            response.setId(article.getId());
            response.setTitle(article.getTitle());
            response.setContent(article.getContent());
            response.setCreatedAt(article.getCreatedAt());
            response.setUpdatedAt(article.getUpdatedAt());
            response.setClaps(article.getClaps());
            response.setReadTime(article.getReadTime());
            response.setTopic(article.getTopic());
            response.setImage(article.getImage());
            response.setSlug(article.getSlug());
            response.setAuthorName(article.getAuthor().getName());
            response.setAuthorSlug(article.getAuthor().getSlug());
            response.setAuthorImage(article.getAuthor().getImage());
            return response;
        }).collect(Collectors.toList());
    }

    @GetMapping("/article-details")
    public ArticleDetails getArticleBySlug(@RequestParam(name = "slug") String slug) {

        ArticleModel article = articleService.getArticleBySlug(slug);

        System.out.println("--------------------------------------------------------------------article>>" + article.getAuthor().getSlug());

        ArticleDetails response = new ArticleDetails();
        response.setTitle(article.getTitle());
        response.setContent(article.getContent());
        response.setCreatedAt(article.getCreatedAt());
        response.setUpdatedAt(article.getUpdatedAt());
        response.setClaps(article.getClaps());
        response.setReadTime(article.getReadTime());
        response.setTopic(article.getTopic());
        response.setImage(article.getImage());
        response.setAuthorName(article.getAuthor().getName());
        response.setAuthorSlug(article.getAuthor().getSlug());
        response.setAuthorImage(article.getAuthor().getImage());
        return response;
    }
}
