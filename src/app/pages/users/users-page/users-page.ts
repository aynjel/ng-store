import {
  Component,
  computed,
  inject,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { finalize, first } from 'rxjs';
import { TUser, TUserReadonly } from '../../../models/users.model';
import { UserService } from '../../../services/user-service';
import { UsersListComponent } from '../components/users-list-component/users-list-component';

@Component({
  selector: 'app-users-page',
  imports: [FormsModule, UsersListComponent],
  templateUrl: './users-page.html',
})
export class UsersPage {
  private userService = inject(UserService);

  protected isLoading = signal<boolean>(true);
  protected error = signal<string | null>(null);
  protected users: WritableSignal<TUser[]> = signal<TUser[]>([]);

  protected searchTerm: WritableSignal<string> = signal('');
  protected currentPage: WritableSignal<number> = signal(1);

  protected itemsPerPage: WritableSignal<number> = signal(10);

  protected readonly paginatedUsers: Signal<TUserReadonly[]> = computed(() => {
    const start = (this.currentPage() - 1) * this.itemsPerPage();
    const end = start + this.itemsPerPage();
    return this.users().slice(start, end);
  });

  protected readonly filteredUsers: Signal<TUserReadonly[]> = computed(() => {
    const term = this.searchTerm().toLowerCase();
    return this.paginatedUsers().filter(
      (user) =>
        user.name.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term) ||
        user.role.toLowerCase().includes(term) ||
        user.username.toLowerCase().includes(term)
    );
  });

  ngOnInit(): void {
    this.userService
      .getAll()
      .pipe(
        first(),
        finalize(() => this.isLoading.set(false))
      )
      .subscribe({
        next: (response) => {
          this.users.set(response);
        },
        error: (err) => {
          this.error.set('Failed to load users. Please try again later.');
          console.error(err);
        },
      });
  }

  addUser() {
    // Navigate to add user form or open modal
  }

  editUser(user: TUserReadonly) {
    console.log('Edit user:', user);
  }

  deleteUser(user: TUserReadonly) {
    console.log('Delete user:', user);
  }

  prevPage() {
    if (this.currentPage() > 1) {
      this.currentPage.update((n) => n - 1);
    }
  }

  nextPage() {
    this.currentPage.update((n) => n + 1);
  }

  clearSearch() {
    this.searchTerm.set('');
    this.currentPage.set(1);
  }
}
