import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostClappedArticlesComponent } from './most-clapped-articles.component';

describe('MostClappedArticlesComponent', () => {
  let component: MostClappedArticlesComponent;
  let fixture: ComponentFixture<MostClappedArticlesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MostClappedArticlesComponent]
    });
    fixture = TestBed.createComponent(MostClappedArticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
