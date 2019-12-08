import store from "../store.js";

// @ts-ignore
const imgApi = axios.create({
  baseURL: "//bcw-sandbox.herokuapp.com/api/images",
  timeout: 8000
});

//TODO create methods to retrieve data trigger the update window when it is complete
class ImageService {
  constructor() {}
  async getImageAsync() {
    let res = await imgApi.get();
    console.log(res);
    store.commit("image", res.data.large_url);
    console.log("updated store after image pushed", store.State.image);
  }
}

const imageService = new ImageService();
export default imageService;
