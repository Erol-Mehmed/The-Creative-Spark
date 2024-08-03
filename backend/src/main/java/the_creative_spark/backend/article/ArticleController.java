package the_creative_spark.backend.article;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@RestController
@RequestMapping("/")
public class ArticleController {

    private final ArticleService articleService;

    @Autowired
    public ArticleController(ArticleService articleService) {
        this.articleService = articleService;
    }

    @GetMapping
    public List<ArticleModel> getAllArticles(@RequestParam(required = false) String section) {
        String allOrMostLikedArticles = "all-articles".equals(section) ? "all" : "most-liked";
        List<ArticleModel> articles = articleService.getAllArticles(allOrMostLikedArticles);

        System.out.println("---------------test1>>>" + allOrMostLikedArticles + articles);

        for (ArticleModel article : articles) {
            System.out.println("---------------test2>>>" + article.getAuthor().getSlug() + article.getAuthor().getName());
        }

        return articleService.getAllArticles(allOrMostLikedArticles);
    }

    @GetMapping("/{id}")
    public ArticleModel getArticleById(@PathVariable String id) {
        return articleService.getArticleById(id);
    }
}
