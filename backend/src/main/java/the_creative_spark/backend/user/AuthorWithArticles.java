package the_creative_spark.backend.user;

import the_creative_spark.backend.article.ArticleModel;

import java.util.List;

public class AuthorWithArticles {
    private UserModel author;
    private List<ArticleModel> articles;

    public AuthorWithArticles(UserModel author, List<ArticleModel> articles) {
        this.author = author;
        this.articles = articles;
    }

    // Getters and setters --------------------------------------------------------

    // author----------------------------
    public UserModel getAuthor() {
        return author;
    }

    public void setAuthor(UserModel author) {
        this.author = author;
    }

    // articles----------------------------
    public List<ArticleModel> getArticles() {
        return articles;
    }

    public void setArticles(List<ArticleModel> articles) {
        this.articles = articles;
    }
}
