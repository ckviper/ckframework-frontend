import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthCallbackStore} from "./auth-callback.store";

@Component({
  selector: 'app-auth-callback',
  standalone: true,
  imports: [],
  templateUrl: './auth-callback.component.html',
  styleUrl: './auth-callback.component.css'
})
export class AuthCallbackComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authCallbackStore: AuthCallbackStore
  ) {}

  ngOnInit(): void {
    this.authCallbackStore.tokenSaved$.subscribe(() => {
      this.router.navigate(['/token-management']);
    });
    const fragment = this.route.snapshot.fragment;
    if (fragment) {
      const accessToken = new URLSearchParams(fragment).get('access_token');
      if (accessToken) {
        this.authCallbackStore.saveAccessToken(accessToken);
      } else {
        this.router.navigate(['/auth-error']);
      }
    }
  }
}
