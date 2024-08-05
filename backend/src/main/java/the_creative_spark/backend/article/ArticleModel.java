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

    @Column(name = "image", nullable = false)
    private String image;

    @Column(name = "read_time", nullable = false)
    private int readTime;

    @Column(name = "claps", columnDefinition = "integer default 0", nullable = false)
    private int claps;

    @Column(name = "slug", nullable = false)
    private String slug;

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
    public ArticleModel(String id, UserModel author, String title, String content, String topic, String image, Integer readTime, Integer claps, String slug, boolean published, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.author = author;
        this.title = title;
        this.content = content;
        this.topic = topic;
        this.image = image;
        this.readTime = readTime;
        this.claps = claps;
        this.slug = slug;
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
    public UserModel getAuthor() {
        System.out.println("---------------user model>>>" + author);

        return author;
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

    // image---------------------
    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    // readTime---------------------
    public int getReadTime() {
        return readTime;
    }

    public void setReadTime(int readTime) {
        this.readTime = readTime;
    }

    // claps---------------------
    public int getClaps() {
        return claps;
    }

    public void setClaps(int claps) {
        this.claps = claps;
    }

    // slug---------------------
    public String getSlug() {
        return slug;
    }

    public void setSlug(String slug) {
        this.slug = slug;
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
