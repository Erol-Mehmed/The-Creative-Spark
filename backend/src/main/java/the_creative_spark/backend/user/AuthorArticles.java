package the_creative_spark.backend.user;

import the_creative_spark.backend.shared.ArticleDetails;

import java.util.List;

public class AuthorArticles {
    private UserModel author;
    private List<ArticleDetails> articles;

    public AuthorArticles(UserModel author, List<ArticleDetails> articles) {
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
    public List<ArticleDetails> getArticles() {
        return articles;
    }

    public void setArticles(List<ArticleDetails> articles) {
        this.articles = articles;
    }
}
