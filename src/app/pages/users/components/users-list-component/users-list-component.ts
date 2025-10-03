import { Component, input, output } from '@angular/core';
import { TUserReadonly } from '../../../../models/users.model';

@Component({
  selector: 'app-users-list-component',
  imports: [],
  templateUrl: './users-list-component.html',
})
export class UsersListComponent {
  users = input.required<TUserReadonly[]>();
  isLoading = input.required<boolean>();
  error = input.required<string | null>();

  editUser = output<TUserReadonly>();
  deleteUser = output<TUserReadonly>();

  onEditUser(user: TUserReadonly): void {
    this.editUser.emit(user);
  }

  onDeleteUser(user: TUserReadonly): void {
    this.deleteUser.emit(user);
  }
}
