import { Component, OnInit } from '@angular/core';
import { PostService } from "../post.service";
import { Router } from '@angular/router';
import { storage } from "../../local-storage";

@Component({
  selector: 'post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  postArray: [];
  postId;
  imageURL: any;

  constructor(private posts: PostService, private router:Router) { };

  async loadPosts() {
    if(storage.globalPosts.length == 0)
    {
      this.postArray = await this.posts.getAllPosts();

      // Store local copy
      storage.globalPosts = [...this.postArray];
    }
    else{
      this.postArray = <[]>[...storage.globalPosts];
    }
  }

  ngOnInit() {
    console.log(`Post-List Component:: Step 0 passed`);
    this.loadPosts();
  }

  onClick(post:any){
    this.router.navigate(['/post',post.id])
    //console.log( "post id of this post is "+post.id)
    // return post.id;
  }

  
  // function for searching posts
  searchPosts = (searchString) => {
    this.postArray = storage.globalPosts;

    let result = [] as any;
    result = this.postArray.filter((post:any)=>{
        return post.title.includes(searchString) || post.body.includes(searchString);
    });

    console.log(`Filtered posts:: ${result.length}`);
    this.postArray = result;
  }


}





