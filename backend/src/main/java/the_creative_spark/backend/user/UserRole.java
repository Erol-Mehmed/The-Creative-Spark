package the_creative_spark.backend.user;

public class UserRole {

    // ADMIN: For administrative users who have full access to the system.
    public static final String ADMIN = "ADMIN";

    // EDITOR: For users who can create, edit, and delete content.
    public static final String EDITOR = "EDITOR";

    // AUTHOR: For users who can create and edit their own content.
    public static final String AUTHOR = "AUTHOR";

    // CONTRIBUTOR: For users who can write content but cannot publish it.
    public static final String CONTRIBUTOR = "CONTRIBUTOR";

    // SUBSCRIBER: For users who can read content and write comments but cannot write or edit content.
    public static final String SUBSCRIBER = "SUBSCRIBER";
}
