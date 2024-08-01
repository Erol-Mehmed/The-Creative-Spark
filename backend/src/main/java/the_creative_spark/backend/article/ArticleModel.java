package the_creative_spark.backend.article;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Column;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.JoinColumn;
import the_creative_spark.backend.user.UserModel;
import java.time.LocalDateTime;

@Entity
@Table(name = "articles")
public class ArticleModel {
    @Id
    @Column(name = "id", nullable = false, unique = true)
    private String id;

    @ManyToOne
    @JoinColumn(name = "author_id", nullable = false)
    private UserModel author;

    @Column(name = "title", nullable = false, length = 100)
    private String title;

    @Column(name = "content", nullable = false, length = 10000)
    private String content;

    @Column(name = "topic", nullable = false)
    private String topic;

    @Column(name = "published", nullable = false)
    private boolean published;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    // No-argument constructor
    public ArticleModel() {
    }

    // Constructor to initialize all fields
    public ArticleModel(String id, UserModel author, String title, String content, String topic, boolean published, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.author = author;
        this.title = title;
        this.content = content;
        this.topic = topic;
        this.published = published;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    // Getters and setters --------------------------------------------------------

    // Id---------------------
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    // authorId---------------------
    public UserModel getAuthorId() {
        return author;
    }

    public void setAuthorId(UserModel author) {
        this.author = author;
    }

    // title---------------------
    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    // content---------------------
    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    // topic---------------------
    public String getTopic() {
        return topic;
    }

    public void setTopic(String topic) {
        this.topic = topic;
    }

    // published---------------------
    public boolean isPublished() {
        return published;
    }

    public void setPublished(boolean published) {
        this.published = published;
    }

    // createdAt---------------------
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    // updatedAt---------------------
    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}
