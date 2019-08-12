import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { PostService } from "../post.service";
import { Router } from '@angular/router';
import { ActivatedRoute } from "@angular/router";
import { storage } from "../../local-storage";

@Component({
  selector: 'add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {

  title: any;
  body: any;
  userId: any;
  postArray: any;
  form: any;
  postId: any;
  save:boolean;
  canSubmit: boolean;

  constructor(
    private posts: PostService,
    private route: Router,
    private activeRoute: ActivatedRoute,
  ) { }

  async addPost(x, y) {
    this.title = x.value;
    this.body = y.value;

    if(!this.postId)
    {
      this.postArray = await this.posts.createPost({
        title: this.title,
        body: this.body,
        userId: 1
      });
  
      storage.globalPosts.splice(0,0,this.postArray[0]);

      //alert(`Your post added successfully. id:${this.postArray[this.postArray.length - 1].id}`)
  
    }
    else {
      this.postArray = await this.posts.updatePost({
        title: this.title,
        body: this.body,
        userId: this.userId,
        id: this.postId,
        
      }); 
  
      /*const index = storage.globalPosts.findIndex((post)=>{
        return post.id == this.postId;
      });*/

      storage.globalPosts = storage.globalPosts.filter((post)=>{
        return post.id != this.postId
      });

      storage.globalPosts.splice(0,0,this.postArray[0]);

      //alert(`Index:: ${index}`);

      //alert(`Your post updated successfully. id:${this.postId}`);
  
    }

    this.route.navigate(['/post-list']);

  }

  async loadPost() {
    //let postArray = [];
    if(storage.globalPosts.length == 0)
    {
      this.postArray = await this.posts.getPost(this.postId);  
    }
    else
    {
      
      this.postArray = await [storage.globalPosts.find((post)=>{
        return post.id == this.postId;
      })];

      //console.log(`Updated PostArray==>:: ${JSON.stringify(this.postArray)}`);

    }

    
    this.title = this.postArray[this.postArray.length-1].title;
    this.body = this.postArray[this.postArray.length-1].body;
    this.userId = this.postArray[this.postArray.length-1].userId;


    //console.log(`Step 9 passed:: ${JSON.stringify(this.post)}`);
  }

  ngOnInit() {
    console.log(`Add-Post Component: Step 0 passed`);
    console.log(`Global Storage:: ${storage.globalPosts.length}`);

    this.activeRoute.paramMap.subscribe(params =>{
      this.postId = params.get("id");
    })

    console.log(`Post Id :: ${this.postId}`);

    if(this.postId)
      this.loadPost();
    //console.log(`Step 3 passed:: ${JSON.stringify(this.postArray)}`);
  }

  navToPost(){
    if(this.postId)
      this.route.navigate(['/post',this.postId]);
    else
      this.route.navigate(['/post-list']);
  }

}
