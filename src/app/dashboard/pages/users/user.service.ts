import { Injectable } from '@angular/core';
import { CreateUserData, UpdateUserData, User } from './models';
import { BehaviorSubject, Observable, Subject, delay, of, take } from 'rxjs';
import { NotifierService } from 'src/app/services/notifier.service';

const USER_DB: Observable<User[]> = of([
  {
    id: 1,
    name: 'Marcos',
    surname: 'Rodriguez',
    email: 'mark@mail.com',
    password: '123456',
  },
  {
    id: 2,
    name: 'Julian',
    surname: 'Perez',
    email: 'jperez@mail.com',
    password: '123456',
  },
]).pipe(delay(1000));

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _users$ = new BehaviorSubject<User[]>([]);
  private users$ = this._users$.asObservable();

  constructor(private notifier: NotifierService) {}

  loadUsers(): void {
    USER_DB.subscribe({
      next: (usuariosFromDb) => this._users$.next(usuariosFromDb),
    });
  }

  getUsers(): Observable<User[]> {
    return this.users$;
  }

  createUser(user: CreateUserData): void {
    // TAKE 1 = solo quiero recibir una emision
    // SUPER IMPORTANTE PORQUE DE LO CONTRARIO,
    // CREARIAN UN BUCLE INFINITO
    this.users$.pipe(take(1)).subscribe({
      next: (arrayActual) => {
        this._users$.next([
          ...arrayActual,
          { ...user, id: arrayActual.length + 1 },
        ]);
        this.notifier.showSuccess('Usuario creado');
      },
    });
  }

  updateUserById(id: number, usuarioActualizado: UpdateUserData): void {
    this.users$.pipe(take(1)).subscribe({
      next: (arrayActual) => {
        this._users$.next(
          arrayActual.map((u) =>
            u.id === id ? { ...u, ...usuarioActualizado } : u
          )
        );
        this.notifier.showSuccess('Usuario Actualizado');
      },
    });
  }

  deleteUserById(id: number): void {
    this._users$.pipe(take(1)).subscribe({
      next: (arrayActual) => {
        this._users$.next(arrayActual.filter((u) => u.id !== id));
        this.notifier.showSuccess('Usuario eliminado');
      },
    });
  }
}
