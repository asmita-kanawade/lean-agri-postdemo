import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostListComponent } from './post-list/post-list.component';

import { PostService } from "./post.service";
import { DisplayPostComponent } from './display-post/display-post.component';
import { PostCommentsComponent } from './post-comments/post-comments.component';
import { AddPostComponent } from './add-post/add-post.component';
import { SummaryPipe } from './summary.pipe';


@NgModule({
  declarations: [
    AppComponent,
    PostListComponent,
    DisplayPostComponent,
    PostCommentsComponent,
    AddPostComponent,
    SummaryPipe

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot([
      {
        path:'',
        redirectTo:'/post-list',
        pathMatch:'full'
      },
      {
        path:'post-list',
        component: PostListComponent
      },
      {
        path:'post/:id',
        component: DisplayPostComponent
      },
      {
        path:'responses/:id',
        component: PostCommentsComponent
      },
      {
        path:'addPost',
        component: AddPostComponent
      },
      {
        path:'updatePost/:id',
        component: AddPostComponent
      },
    ])
  ],
  providers: [
    PostService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
