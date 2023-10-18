export function getUniqueTagsAndTotalPriceByTag(array, tagType) {
  // Create a new object to store the unique tags and their total price according to the tag type.
  const uniqueTagsAndTotalPriceByTag = [];

  // Loop through the array of objects.
  array.forEach((object) => {
    // Get the tag based on the tag type.
    const tag = tagType === 'primary' ? object.primaryTag : object.secondaryTag;

    // Get the other tag.
    const otherTag =
      tagType === 'primary' ? object.secondaryTag : object.primaryTag;

    // Get the price.
    const price = object.price;

    // If the tag does not exist in the new object, create a new object for it.
    if (!uniqueTagsAndTotalPriceByTag.hasOwnProperty(tag)) {
      uniqueTagsAndTotalPriceByTag[tag] = {};
    }

    // If the other tag does not exist in the object for the tag, create a new property for it.
    if (!uniqueTagsAndTotalPriceByTag[tag].hasOwnProperty(otherTag)) {
      uniqueTagsAndTotalPriceByTag[tag][otherTag] = 0;
    }

    // Add the price to the total price for the other tag.
    uniqueTagsAndTotalPriceByTag[tag][otherTag] += price;
  });

  // Return the new object.
  return uniqueTagsAndTotalPriceByTag;
}
