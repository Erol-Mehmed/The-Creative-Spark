package the_creative_spark.backend.user;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Column;
import java.time.LocalDateTime;

@Entity
@Table(name = "users")
public class UserModel {

    @Id
    @Column(name = "id", nullable = false, unique = true)
    private String id;

    @Column(name = "name", nullable = false, length = 100)
    private String name;

    @Column(name = "email", nullable = false, unique = true, length = 100)
    private String email;

    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "role", nullable = false, length = 1)
    private String role;

    @Column(name = "image")
    private String image;

    @Column(name = "slug", unique = true, nullable = false)
    private String slug;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    // No-argument constructor
    public UserModel() {
    }

    // Constructor to initialize all fields
    public UserModel(String id, String name, String email, String password, String role, String image, String slug, LocalDateTime createdAt, LocalDateTime updatedAt) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
        this.image = image;
        this.slug = slug;
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

    // name---------------------
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    // email---------------------
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    // password---------------------
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    // role---------------------
    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    // image---------------------
    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    // slug---------------------
    public String getSlug() {
        return slug;
    }

    public void setSlug(String slug) {
        this.slug = slug;
    }

    // created at---------------------
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    // updated at---------------------
    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}
