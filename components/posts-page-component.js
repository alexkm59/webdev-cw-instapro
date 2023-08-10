import { USER_POSTS_PAGE } from "../routes.js";
import { renderHeaderComponent } from "./header-component.js";
import { posts, goToPage, getToken, renderApp } from "../index.js";
import { addLike, dislike, getPosts } from "../api.js";
import { format } from "date-fns";

export function renderPostsPageComponent({ posts }) {
  
  // TODO: реализовать рендер постов из api

  console.log("Актуальный список постов:", posts);

  /**
   * TODO: чтобы отформатировать дату создания поста в виде "19 минут назад"
   * можно использовать https://date-fns.org/v2.29.3/docs/formatDistanceToNow
   */

  // getPosts({token: getToken() })
  //       .then((data) => {
  // Преобразование данных из формата api в формат приложения
  // const postElement = document.getElementById('add');


  const postsElementHtml = document.getElementById("app");
  const postsElHtml = posts.map((posts) => {
    
    const createDate = format(new Date(posts.createdAt), 'dd.mm.yy HH:mm');
    
    return ` 
              <div class="page-container">
                 <div class="header-container"></div>   
              <li class="post">
                     <div class="post-header" data-user-id="${posts.user.id}">
                         <img src="${posts.user.imageUrl}" class="post-header__user-image">
                         <p class="post-header__user-name">${posts.user.name}</p>
                     </div>
                    <div class="post-image-container">
                       <img class="post-image" src="${posts.imageUrl}">
                     </div>
                     <div class="post-likes">
                       <button data-post-id="${posts.id}" data-isliked="${(posts.isLiked) ? true : false}" class="like-button">
                         <img src= ${(posts.isLiked) ? "./assets/images/like-active.svg" : "./assets/images/like-not-active.svg"}>
                       </button>
                       <p class="post-likes-text">
                         Нравится: <strong>
                           ${posts.likes[0].name} ${(posts.likes.length - 1) === 0 ? "" : "и еще " + (posts.likes.length - 1)}
                          
                          </strong>
                       </p>
                     </div>
                     <p class="post-text">
                       <span class="user-name">${posts.user.name}</span>
                       ${posts.description}
                     </p>
                     <p class="post-date">
                       ${createDate}
                     </p>`

  }).join("");

  postsElementHtml.innerHTML = postsElHtml;

  renderHeaderComponent({
    element: document.querySelector(".header-container"),
  });


  // KAM Событие для перехода на страницу постов пользователя 
  for (let userEl of document.querySelectorAll(".post-header")) {
    userEl.addEventListener("click", () => {
      console.log(userEl);
      goToPage(USER_POSTS_PAGE, {
        userId: userEl.dataset.userId,
      });
    });
  }


  // KAM функция установки лайков

  const likeElementFunction = () => {
    const likeElements = document.querySelectorAll(".like-button");
    for (const likeElement of likeElements) {
      likeElement.addEventListener("click", () => {

        // Проверяем стоит ли уже лайк
        if (likeElement.dataset.isliked === 'true') {
          return dislike({ id: likeElement.dataset.postId, token: getToken() })
          
        }
        else {
          return addLike({ id: likeElement.dataset.postId, token: getToken() });
          

        };

      })

    }


  };


  likeElementFunction();

}
