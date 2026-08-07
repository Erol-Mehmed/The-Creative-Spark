import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UploadService } from 'src/core/services/upload.service';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-article-editor',
  templateUrl: './article-editor.component.html',
  styleUrls: ['./article-editor.component.scss']
})
export class ArticleEditorComponent implements OnInit {
  form: FormGroup;
  uploading = false;
  saving = false;
  error: string | null = null;
  imagePreview: string | null = null;
  isEditing = false;
  articleSlug: string | null = null;
  topics: any[] = [];
  selectedTopics: string[] = [];

  constructor(
    private fb: FormBuilder,
    private uploadService: UploadService,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.form = this.fb.group({
      title: [''],
      slug: [''],
      topic: [''],
      topics: [[]],
      content: [''],
      image_url: [''],
    });
  }

  ngOnInit() {
    // Load topics from backend
    this.loadTopics();

    const slug = this.route.snapshot.params['slug'];
    if (slug) {
      this.isEditing = true;
      this.articleSlug = slug;
      this.loadArticle(slug);
    }
  }

  loadTopics() {
    this.http.get<any[]>('/api/topics').subscribe({
      next: (topics) => {
        this.topics = topics;
      },
      error: () => {
        console.error('Failed to load topics');
      },
    });
  }

  toggleTopic(topicName: string) {
    const index = this.selectedTopics.indexOf(topicName);
    if (index > -1) {
      this.selectedTopics.splice(index, 1);
    } else {
      this.selectedTopics.push(topicName);
    }
    this.form.patchValue({ topics: this.selectedTopics });
  }

  isTopicSelected(topicName: string): boolean {
    return this.selectedTopics.includes(topicName);
  }

  loadArticle(slug: string) {
    this.http.get(`/api/articles/${slug}`).subscribe({
      next: (article: any) => {
        this.form.patchValue({
          title: article.title,
          slug: article.slug,
          topic: article.topic,
          content: article.content,
          image_url: article.image,
        });
        // Load topics if available - handle both array of strings and array of objects
        if (article.topics && Array.isArray(article.topics)) {
          this.selectedTopics = article.topics.map((t: any) => typeof t === 'string' ? t : t.name);
          this.form.patchValue({ topics: this.selectedTopics });
        }
        this.imagePreview = article.image;
      },
      error: (err) => {
        this.error = 'Failed to load article.';
      },
    });
  }

  onFileChange(event: any) {
    const file: File = event.target.files?.[0];
    if (!file) return;

    this.uploading = true;
    this.error = null;

    this.uploadService.uploadArticleImage(file).subscribe({
      next: (res) => {
        this.form.patchValue({ image_url: res.image_url });
        this.imagePreview = res.image_url;
      },
      error: (err) => {
        this.error = err?.error?.message || 'Upload failed.';
      },
      complete: () => this.uploading = false,
    });
  }

  save() {
    this.saving = true;
    this.error = null;

    // Ensure slug is lowercase
    const formValue = { ...this.form.value, slug: this.form.value.slug.toLowerCase() };

    if (this.isEditing && this.articleSlug) {
      this.http.patch(`/api/articles/${this.articleSlug}`, formValue).subscribe({
        next: (article: any) => {
          this.router.navigate(['/']);
        },
        error: (err) => {
          this.error = err?.error?.message || 'Save failed.';
          this.saving = false;
        },
      });
    } else {
      this.http.post('/api/articles', formValue).subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: (err) => {
          this.error = err?.error?.message || 'Save failed.';
          this.saving = false;
        },
      });
    }
  }
}
