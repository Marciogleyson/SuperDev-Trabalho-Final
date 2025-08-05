import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './services/login.service';

export const authGuard: CanActivateFn = (route, state) => {
  const loginservice = inject(LoginService);
  const router = inject(Router);

  if (loginservice.estaLogado()) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
