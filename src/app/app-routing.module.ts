import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { FrontPageComponent } from './front-page/front-page.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { TermsOfServiceComponent } from './terms-of-service/terms-of-service.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const APP_ROUTES: Routes = [
  {path: '',
    component: FrontPageComponent,
    data: {title: 'FRONTPAGE'}
  },
  {path: 'privacy-policy',
    component: PrivacyPolicyComponent,
    data: {title: 'PRIVACY POLICY'}
  },
  {path: 'terms-of-service',
    component: TermsOfServiceComponent,
    data: {title: 'TERMS OF SERVICE'}
  },
  {path: 'unauthorized',
    component: UnauthorizedComponent,
    canActivate: [ AuthGuard ],
    data: {title: 'UNAUTHORIZED'}
  },
  {path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
    data: {title: 'HOME'}
  },
  { path: 'authentication',
    loadChildren: './authentication/authentication.module#AuthenticationModule',
    data: {title: 'AUTHENTICATION'}
  },
  { path: 'schedules',
    loadChildren: './schedules/schedules.module#SchedulesModule',
    canActivate: [ AuthGuard],
    data: {title: 'SCHEDULES'}
  },
  { path: '**',
    component: PageNotFoundComponent
  }
  // { path: '', redirectTo: '/home', pathMatch: 'full' }
];
@NgModule({
  imports: [RouterModule.forRoot(APP_ROUTES/*, {useHash: true}*/)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
