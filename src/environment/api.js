// const API_URL = "https://lbmbackend.vercel.app";
const API_URL = "http://localhost:1000";

const Easy_Base_Url = `${API_URL}/signUp`;
// const product_Base_Url = `${API_URL}/product`;

export const Easy_URL = {
  login: `${Easy_Base_Url}/login`,
  register: `${Easy_Base_Url}/register`,
};

// export const Product_URL = {
//   addcard: `${product_Base_Url}/addcard`,
//   detail: `${product_Base_Url}/detail`,
//   public: `${product_Base_Url}/public`,
//   edit: `${product_Base_Url}/edit`,
//   delete: `${product_Base_Url}/delete`,
//   addTofavourite: `${product_Base_Url}/addTofavourite`,
//   removeFavourite: `${product_Base_Url}/removeFavourite`,
//   isfavourite: `${product_Base_Url}/isfavourite`,
//   getfavourites: `${product_Base_Url}/getfavourites`,
//   getProductsById: `${product_Base_Url}/getProductsById`,
// };
export default API_URL;