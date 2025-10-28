import { DOCUMENT } from '@angular/common';
//DOCUMENT: gives access to the global document object (used when redirecting after logout).
import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';



@Component({
  selector: 'app-login-status',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './login-status.component.html',
  styleUrls: ['./login-status.component.css']
})
export class LoginStatusComponent implements OnInit{

  isAuthenticated: boolean=false;
  profileJson:string | undefined;
  userEmail:string | undefined;
  userFullName:string | undefined;
  storage: Storage=sessionStorage;

  // @Inject(DOCUMENT) → tells Angular:
  // “I want the global document object injected into this component.”
  //In a web browser, document is a built-in object that represents the web page currently loaded.

  // It’s a service (a TypeScript class that Angular provides to handle logic) that lets your app talk to Auth0.
  // Basically, it manages authentication — logging users in, logging them out, and getting info about the logged-in user.

  constructor(private auth:AuthService, @Inject(DOCUMENT) private doc: Document){}

  // When you write private auth: AuthService in the constructor:
  // Angular automatically provides an instance of AuthService to this component.
  // You don’t need to manually create it with new AuthService().
  // This instance is shared and managed by Angular.

  ngOnInit():void{
    //$It’s actually a naming convention used by developers when working with RxJS Observables.
    this.auth.isAuthenticated$.subscribe((authenticated:boolean)=>{
      this.isAuthenticated=authenticated;
      console.log('User is authenticated: ', this.isAuthenticated)
    });

    this.auth.user$.subscribe((user)=>{
      this.userEmail=user?.email;
      this.userFullName = user?.name ?? user?.nickname ?? user?.email ?? 'User';
      this.storage.setItem('userEmail',JSON.stringify(this.userEmail));
      console.log('User ID: ', this.userEmail);
      console.log('User Name:', this.userFullName, 'User Email:', this.userEmail);
    });
  }

  //   Redirects user to Auth0’s hosted login page.
  // After login, user is redirected back to your Angular app with a token.

  login(){
    this.auth.loginWithRedirect();
  }

  // Log the user out of Auth0 and your Angular app.
  // After logout, redirect them back to your Angular app’s home page.

  logout(): void{
    this.auth.logout({logoutParams:{returnTo: this.doc.location.origin}});
  }

}
