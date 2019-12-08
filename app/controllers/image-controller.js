import imageService from "../services/image-service.js";
import store from "../store.js";

//TODO Create methods for constructor, and rendering the image to the page
//      (you may wish to set it as a background image)

function _drawImage() {
  let imgUrl = "url('" + store.State.image + "')";
  document.body.style.backgroundImage = imgUrl;
}
export default class ImageController {
  constructor() {
    // remember to subscribe and to call drawImage on page load
    store.subscribe("image", _drawImage);
    imageService.getImageAsync();
  }
}
