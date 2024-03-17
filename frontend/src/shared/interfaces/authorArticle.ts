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
  created_at: string;
  author:{
    name: string;
    image: string;
    slug: string;
  }
}

export { Author, Article };
