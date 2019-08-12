import { Injectable } from '@angular/core';
import axios from "axios";

@Injectable({  providedIn: 'root'})
export class PostService {
  
  // get all posts
  getAllPosts = async () => {
    let postArray = await axios({
      method: 'get',
      url: `https://jsonplaceholder.typicode.com/posts`,
      responseType: 'json'
    });

    console.log(`Inside Services::  ${postArray.data[0].title}`);
    return postArray.data;
  }

  // get a post
  getPost = async (postId) => {
    let post = await axios({
      method: 'get',
      url: `https://jsonplaceholder.typicode.com/posts/${postId}`,
      responseType: 'json'
    });

    console.log(`Inside Services:: :: ${JSON.stringify(post.data)}`);
    return [post.data];
  } 
  
  // get all comments of a post
  getPostComments = async (postId) => {
    let commentsArray = await axios({
      method: 'get',
      url: `https://jsonplaceholder.typicode.com/posts/${postId}/comments`,
      responseType: 'json'
    });

    console.log(`Inside Services::  ${commentsArray.data[0].email}`);
    return commentsArray.data;
  }


  //create a post
  createPost = async (post) => {
    let result = await axios({
      method: 'post',
      url: `https://jsonplaceholder.typicode.com/posts`,
      data: post,
      responseType: 'json'
    });

    console.log(`Inside Services::  ${JSON.stringify(result.data)}`);
    return [result.data];
  }

  //update a post
  updatePost = async (post) => {
    let result = await axios({
      method: 'put',
      url: `https://jsonplaceholder.typicode.com/posts/${post.id}`,
      data: post,
      responseType: 'json'
    });

    console.log(`Inside Services::  ${JSON.stringify(result.data)}`);
    return [result.data];
  }

}

