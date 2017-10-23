const path = require('path');
const arrayReducer = require('./src/utils/helpers.js').arrayReducer;
process.on('unhandledRejection', (reason, promise) => {
  console.log('Reason -> ', reason);
});


exports.createPages = ({ boundActionCreators, graphql }) => {
  const { createPage } = boundActionCreators;
  const blogPostTemplate = path.resolve(`src/templates/blog-post.js`);
  const categoryTemplate = path.resolve(`src/templates/category-template.js`);
  const tagTemplate = path.resolve(`src/templates/tag-template.js`);
  
  return graphql(`{
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      limit: 1000
    ) {
      edges {
        node {
          excerpt(pruneLength: 250)
          html
          id
          frontmatter {
            date
            path
            title
            image {
              childImageSharp {
                responsiveSizes {
                  src
                }
              }
            }
            tags
            author
            category
          }
        }
      }
    }
  }`).then(result => {
    if (result.errors) {
      return Promise.reject(result.errors);
    }
    const posts = result.data.allMarkdownRemark.edges;
    posts
      .forEach(({ node }) => {
        createPage({
          path: node.frontmatter.path,
          component: blogPostTemplate,
          context: {}
        });
      });
    const categoryArray = arrayReducer(posts, 'category');
    const tagsArray = arrayReducer(posts, 'tags');
    
    categoryArray.forEach((category) => {
      createPage({
        path: `/categories/${category}`,
        component: categoryTemplate,
        context: {
          category
        }
      });
    });
    tagsArray.forEach((tag) => {
      createPage({
        path: `/tags/${tag}`,
        component: tagTemplate,
        context: {
          tag
        }
      });
    });
  });
}

