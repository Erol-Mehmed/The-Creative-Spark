import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import Author from '../../shared/interfaces/author';
import { FormatDatePipe } from "../../shared/pipes/format-date.pipe";

@Component({
  selector: 'app-articles-list',
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.scss'],
  providers: [FormatDatePipe],
})
export class ArticlesListComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private formatDatePipe: FormatDatePipe,
    private route: ActivatedRoute
  ) {}

  @Input() authorArticles: boolean = false;
  @Output() author = new EventEmitter<Author>();

  currentData: any;
  displayedArticles: any = [];
  articlesToShow: number = 10;
  topics: string[] = [];
  selectedTopic: string | null = null;

  processAndDisplayArticles() {
    if (this.authorArticles) {
      const author = this.currentData.author;

      this.author.emit({
        name: author.name,
        description: author.description,
        image: author.image,
      });

      this.currentData = this.currentData.articles;
    }

    // Extract unique topics from articles (handle both single topic and topics array)
    const allTopics = new Set<string>();
    this.currentData.forEach((article: any) => {
      if (article.topics && Array.isArray(article.topics)) {
        article.topics.forEach((t: string) => allTopics.add(t));
      } else if (article.topic) {
        allTopics.add(article.topic);
      }
    });
    this.topics = Array.from(allTopics).sort();

    this.displayedArticles = this.currentData.slice(0, 10);
  }

  loadMoreArticles() {
    if (this.currentData) {
      this.displayedArticles = this.currentData.slice(
        0,
        (this.articlesToShow += 10)
      );
    }
  }

  filterByTopic(topic: string | null) {
    this.selectedTopic = topic;
    this.articlesToShow = 10;
    this.getArticles();
  }

  getArticles() {
    let endpoint = '';
    
    if (this.authorArticles) {
      endpoint = `/api/author?username=${this.route.snapshot.params['username']}`;
    } else if (this.selectedTopic) {
      endpoint = `/api/articles?topic=${encodeURIComponent(this.selectedTopic)}`;
    } else {
      endpoint = '/api/articles';
    }

    this.http.get(endpoint).subscribe({
      next: (data) => {
        this.currentData = data;
      },
      error: (err) => {
        // error state handled by component
      },
      complete: () => {
        this.processAndDisplayArticles();
      },
    });
  }

  ngOnInit(): void {
    // Check for topic query parameter
    this.route.queryParams.subscribe((params) => {
      if (params['topic']) {
        this.selectedTopic = params['topic'];
      }
      this.getArticles();
    });
  }
}
