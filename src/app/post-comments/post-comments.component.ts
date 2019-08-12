import { Component, OnInit } from '@angular/core';
import { PostService } from "../post.service";
import { ActivatedRoute } from "@angular/router";
import { storage } from "../../local-storage";
import { Router } from '@angular/router';

@Component({
  selector: 'post-comments',
  templateUrl: './post-comments.component.html',
  styleUrls: ['./post-comments.component.css']
})
export class PostCommentsComponent implements OnInit {

  commentsArray;
  postId: any;
  title: any;

  constructor(
    private posts: PostService,
    private route: ActivatedRoute,
    private router:Router
  ) { }

  async loadPostComments() {
    this.commentsArray = await this.posts.getPostComments(this.postId);
    //console.log(`Step 9 passed:: ${JSON.stringify(this.post)}`);

    this.commentsArray = this.commentsArray.filter((comment)=>{
      return comment.postId == this.postId;
    });
  }

  ngOnInit() {
    console.log(`Display-Responses Component: Step 0 passed`);

    this.route.paramMap.subscribe(params => {
      this.postId = params.get("id");
    })

    console.log(`Post Id :: ${this.postId}`);

    let postArray = [storage.globalPosts.find((post)=>{
      return post.id == this.postId;
    })];

    //console.log(`Title::> ${postArray[0].title}`);
    this.title = postArray[0].title;
    
    this.loadPostComments();

  }


  navToPost(){
    this.router.navigate(['/post',this.postId]);
  }
}