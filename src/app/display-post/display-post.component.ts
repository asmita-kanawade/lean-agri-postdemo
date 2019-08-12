import { Component, OnInit } from '@angular/core';
import { PostService } from "../post.service";
import { ActivatedRoute } from "@angular/router";
import { Router } from '@angular/router';
import { storage } from "../../local-storage";

// import { PostListComponent } from "../post-list/post-list.component";

@Component({
  selector: 'display-post',
  templateUrl: './display-post.component.html',
  styleUrls: ['./display-post.component.css']
})
export class DisplayPostComponent implements OnInit {
  postArray;
  postId: any;

  constructor(
    private posts: PostService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  async loadPost() {
    if(storage.globalPosts.length == 0)
    {
      this.postArray = await this.posts.getPost(this.postId);
    }
    else{
      this.postArray = [storage.globalPosts.find((post)=>{
        return post.id == this.postId;
      })];
    }
    //console.log(`Else postArray:: ${JSON.stringify(this.postArray)}`);
  }

  ngOnInit() {
    console.log(`Display-Post Component: Step 0 passed`);
    
    this.route.paramMap.subscribe(params =>{
      this.postId = params.get("id");
    })

    console.log(`Post Id :: ${this.postId}`);

    this.loadPost();
    //console.log(`Step 3 passed:: ${JSON.stringify(this.postArray)}`);
  }

  updatePost(post){    
    this.router.navigate(['/updatePost',post.id])
  }


  navToResponses(post){
    this.router.navigate(['/responses',post.id]);
  }

}
