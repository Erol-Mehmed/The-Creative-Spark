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
      content: [''],
      image_url: [''],
    });
  }

  ngOnInit() {
    const slug = this.route.snapshot.params['slug'];
    if (slug) {
      this.isEditing = true;
      this.articleSlug = slug;
      this.loadArticle(slug);
    }
  }

  loadArticle(slug: string) {
    this.http.get(`/api/articles/${slug}`).subscribe({
      next: (article: any) => {
        this.form.patchValue({
          title: article.title,
          slug: article.slug,
          topic: article.topic,
          content: article.content,
          image_url: article.image_url,
        });
        this.imagePreview = article.image_url;
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

    if (this.isEditing && this.articleSlug) {
      this.http.patch(`/api/articles/${this.articleSlug}`, this.form.value).subscribe({
        next: (article: any) => {
          this.router.navigate(['/']);
        },
        error: (err) => {
          this.error = err?.error?.message || 'Save failed.';
          this.saving = false;
        },
      });
    } else {
      this.http.post('/api/articles', this.form.value).subscribe({
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
