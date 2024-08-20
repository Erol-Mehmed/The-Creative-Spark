package the_creative_spark.backend.user;

import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public AuthorArticles getAuthorDataBySlug(String slug) {
        UserModel author = userRepository.findBySlug(slug);

        return new AuthorArticles(author, userRepository.getArticlesByAuthorId(author.getId()));
    }
}
