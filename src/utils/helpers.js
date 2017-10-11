module.exports = {
  /*
  *
  * Take a group of posts and get rid of duplicate instances of tags, categories, etc...
  *
  */
  arrayReducer: (postsArray, type) => {
    return postsArray = postsArray.map(( { node }) => { return node.frontmatter[type]; } )
    .reduce((a, b) => { return a.concat(b) }, [])
    .filter((type, index, array) => { return array.indexOf(type) === index})
    .sort();
  },
  /*
  *
  * filter graphql query so that only posts with the desired tag/category/whatever
  * are displayed.
  *
  */
  postsWithDataFilter: (postsArray, type, valueToFind) => {
    const newArray = postsArray.filter((post) => {
      const frontmatterType = post.node.frontmatter[type];
      if (frontmatterType.includes(valueToFind)) {
        return post;
      }
    });
    return newArray;
  }
};