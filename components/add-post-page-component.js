import {renderHeaderComponent} from "./header-component.js";
import {uploadImage} from "../api.js";
import {sanitizeHtml} from "../sanitizeHtml.js";

export function renderAddPostPageComponent({ appEl, onAddPostClick }) {
  let imageUrl = "";
  const render = () => {
    // TODO: Реализовать страницу добавления поста
    

    const appHtml = `
    <div class="page-container">
      <div class="header-container"></div>
      
      <div class="form">
        <h3 class="form-title">Добавить пост</h3>
        <div class="form-inputs">
          <div class="upload-image-container">
      <div class="upload=image">

      ${
        imageUrl
          ? `
          <div class="file-upload-image-conrainer">
            <img class="file-upload-image" src="${imageUrl}">
            <button class="file-upload-remove-button button">Заменить фото</button>
          </div>
          `
          : `
            <label class="file-upload-label secondary-button">
                <input
                  type="file"
                  class="file-upload-input"
                  style="display:none"
                />
                Выберите фото
            </label>`
      }
                
  </div>
  </div>
          <label>
            Опишите фотографию:
            <textarea class="input textarea" rows="4"></textarea>
            </label>
            <button class="button" id="add-button">Добавить</button>
        </div>
      </div>
  `;

    appEl.innerHTML = appHtml;
// *

const fileInputElement = appEl.querySelector(".file-upload-input");

    fileInputElement?.addEventListener("change", () => {
      const file = fileInputElement.files[0];
      if (file) {
        const lableEl = document.querySelector(".file-upload-label");
        
        lableEl.setAttribute("disabled", true);
        lableEl.textContent = "Загружаю файл...";
        
        uploadImage({ file }).then(({ fileUrl }) => {
          imageUrl = fileUrl;
          // onImageUrlChange(imageUrl);
          render();
        });
      }
    });

    appEl
      .querySelector(".file-upload-remove-button")
      ?.addEventListener("click", () => {
        imageUrl = "";
        // onImageUrlChange(imageUrl);
        render();
      });


// *



    // KAM добавлено по аналогии для отрисовки заголовка
    renderHeaderComponent({
      element: document.querySelector(".header-container"),
    });

const descriptionElement = document.querySelector('.textarea');
const imageUrlElement = document.querySelector('.file-upload-label');

    document.getElementById("add-button").addEventListener("click", () => {
      // const file = imageUrlElement.value;
      onAddPostClick({
        description: sanitizeHtml(descriptionElement.value),
        imageUrl: imageUrl,
      });
    });


  };

  render();
}
