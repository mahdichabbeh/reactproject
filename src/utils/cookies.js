import Cookies from "js-cookie";

// Maximum items in the recently viewed list
const MAX_RECENTLY_VIEWED = 5;

// Get recently viewed products from cookies
export const getRecentlyViewed = () => {
  const recentItems = Cookies.get("recentlyViewed");
  return recentItems ? JSON.parse(recentItems) : [];
};

// Add a new product to the recently viewed list
export const addRecentlyViewed = (product) => {
  let recentItems = getRecentlyViewed();

  // Remove existing entry if already in list
  recentItems = recentItems.filter((item) => item.id !== product.id);

  // Add the new product at the beginning
  recentItems.unshift(product);

  // Limit to MAX_RECENTLY_VIEWED
  if (recentItems.length > MAX_RECENTLY_VIEWED) {
    recentItems.pop(); // Remove the oldest item
  }

  // Save to cookies
  Cookies.set("recentlyViewed", JSON.stringify(recentItems), { expires: 7 });
};
