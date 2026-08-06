import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UploadService } from 'src/core/services/upload.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-article-editor',
  templateUrl: './article-editor.component.html',
  styleUrls: ['./article-editor.component.scss']
})
export class ArticleEditorComponent {
  form: FormGroup;
  uploading = false;
  saving = false;
  error: string | null = null;
  imagePreview: string | null = null;

  constructor(
    private fb: FormBuilder,
    private uploadService: UploadService,
    private http: HttpClient,
  ) {
    this.form = this.fb.group({
      title: [''],
      slug: [''],
      topic: [''],
      content: [''],
      image_url: [''],
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

    this.http.post('/api/articles', this.form.value).subscribe({
      next: (article) => {
        console.log('Article created', article);
      },
      error: (err) => {
        this.error = err?.error?.message || 'Save failed.';
      },
      complete: () => (this.saving = false),
    });
  }
}
