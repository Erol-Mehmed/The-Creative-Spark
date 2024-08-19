package the_creative_spark.backend.user;

import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public AuthorWithArticles getAuthorDataBySlug(String slug) {
        UserModel author = userRepository.findBySlug(slug);

        return new AuthorWithArticles(author, userRepository.getArticlesById(author.getId()));
    }
}
