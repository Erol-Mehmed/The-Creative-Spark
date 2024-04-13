interface Author {
  name: string;
  description: string;
}

interface Article {
  title: string;
  content: string;
  topic: string;
  image: string;
  claps: number;
  readTime: number;
  createdAt: string;
  authorName: string;
  authorImage: string;
  authorSlug: string;
}

export { Author, Article };
