package the_creative_spark.backend.article;

import java.time.LocalDateTime;

public class ArticleResponse {

    private String id;
    private String title;
    private String content;
    private LocalDateTime createdAt;
    private String topic;
    private int claps;
    private int readTime;
    private String slug;
    private String authorName;
    private String authorSlug;

    // Getters and setters

    // Id---------------------
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
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

    // createdAt---------------------
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    // claps---------------------
    public int getClaps() {
        return claps;
    }

    public void setClaps(int claps) {
        this.claps = claps;
    }

    // readTime---------------------
    public int getReadTime() {
        return readTime;
    }

    public void setReadTime(int readTime) {
        this.readTime = readTime;
    }

    // topic---------------------
    public String getTopic() {
        return topic;
    }

    public void setTopic(String topic) {
        this.topic = topic;
    }

    // slug---------------------
    public String getSlug() {
        return slug;
    }

    public void setSlug(String slug) {
        this.slug = slug;
    }

    // authorSlug---------------------
    public String getAuthorSlug() {
        return authorSlug;
    }

    public void setAuthorSlug(String authorSlug) {
        this.authorSlug = authorSlug;
    }

    // authorName---------------------
    public String getAuthorName() {
        return authorName;
    }

    public void setAuthorName(String authorName) {
        this.authorName = authorName;
    }
}
