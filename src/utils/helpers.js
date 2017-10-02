module.exports = {
  arrayReducer: (postsArray, type) => {
    return postsArray = postsArray.map(( { node }) => { return node.frontmatter[type]; } )
    .reduce((a, b) => { return a.concat(b) }, [])
    .filter((type, index, array) => { return array.indexOf(type) === index})
    .sort();
  }
};