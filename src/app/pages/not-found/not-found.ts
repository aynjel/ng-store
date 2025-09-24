import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  imports: [ReactiveFormsModule],
  templateUrl: './not-found.html',
})
export class NotFound {
  searchForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.searchForm = this.fb.group({
      query: [''],
    });
  }

  onSearch() {
    const query = this.searchForm.value.query.trim();
    if (query) {
      // Redirect to search results or handle query
      this.router.navigate(['/search'], { queryParams: { q: query } });
    }
  }
}
