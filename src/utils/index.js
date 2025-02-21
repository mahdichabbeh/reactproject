import slide1 from "../img/h4-slide.png";
import slide2 from "../img/h4-slide2.png";
import slide3 from "../img/h4-slide3.png";
import slide4 from "../img/h4-slide4.png";
import slide5 from "../img/h4-slide7.png";
import brand1 from "../img/brand1.png";
import brand2 from "../img/brand2.png";
import brand3 from "../img/brand3.png";
import brand4 from "../img/brand4.png";
import brand5 from "../img/brand5.png";
import brand6 from "../img/brand6.png";

export const recommendedProducts = [
  {
    "id": "1002",
    "name": "apple ipad 97 2018",
    "imageName": "apple-ipad-97-2018.jpg",
    "price": 351,
    "discountRate": 19,
    "review": 5,
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam tristique, diam in consequat iaculis, est purus iaculis mauris, imperdiet facilisis ante ligula at nulla. Quisque volutpat nulla risus, id maximus ex aliquet ut. Suspendisse potenti. Nulla varius lectus id turpis dignissim porta."
  },
  {
    "id": "1003",
    "name": "apple ipad air 2 new",
    "imageName": "apple-ipad-air-2-new.jpg",
    "price": 479,
    "discountRate": 20,
    "review": 5,
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam tristique, diam in consequat iaculis, est purus iaculis mauris, imperdiet facilisis ante ligula at nulla. Quisque volutpat nulla risus, id maximus ex aliquet ut. Suspendisse potenti. Nulla varius lectus id turpis dignissim porta."
  }
];



export const slides = [
    { id: 1, image: slide1},
    { id: 2, image: slide2},
    { id: 3, image: slide3},
    { id: 4, image: slide4},
    { id: 5, image: slide5},
  ];


export const brands = [
  brand1,
  brand2,
  brand3,
  brand4,
  brand5,
  brand6,
  brand1,
  brand2,
];

export const promoItems = [
  { text: "30 Days return", divClass: "promo1", iClass: "fa-refresh" },
  { text: "Free shipping", divClass: "promo2", iClass: "fa-truck" },
  { text: "Secure payments", divClass: "promo3", iClass: "fa-lock" },
  { text: "New products", divClass: "promo4", iClass: "fa-gift" },
];

export const productCategories = [
  { title: "Top Sellers", apiUrl: "http://localhost:3000/top-sellers-products" },
  { title: "Recently Viewed", apiUrl: "" },
  { title: "Top New", apiUrl: "http://localhost:3000/top-new-products" },
];

