import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from "@angular/common";

@Pipe({
  name: 'formatDate'
})
export class FormatDatePipe implements PipeTransform {

  constructor(private datePipe: DatePipe) {}

  transform(articles: any[]): any[] {
    return articles.map(article => {
      article.createdAt = this.datePipe.transform(article.createdAt, 'MMM dd, yyyy');
      return article;
    });
  }
}
