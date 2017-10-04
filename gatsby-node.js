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
                original {
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


    // result.data.allMarkdownRemark.edges
    //   .forEach(({ node }) => {
    //     console.log('hi!!!!!');
    //   })
    // console.log(tagArray, 'tagArray');

// const allTags = posts.map((post) => {
    //   return post.frontmatter.tags;
    // });
    // console.log(allTags, 'posts, allTags');
    // createTagPage(createPage, posts);
    // createCategoryPage(createPage, posts);

// console.log(node.frontmatter.tags, 'tags');
        // node.frontmatter.tags.forEach((tag, index) => {
        //   tagArray.push(tag);
        // })

// exports.createPages = ({ boundActionCreators, graphql }) => {
//   const { createPage } = boundActionCreators;
//   const tagPageTemplate = path.resolve('./src/templates/tags.js');

//   return graphql(`{
//     allMarkdownRemark(
//       sort: { order: DESC, fields: [frontmatter___date] }
//       limit: 1000
//     ) {
//       edges {
//         node {
//           id
//           frontmatter {
//             tags
//           }
//         }
//       }
//     }
//   }`).then(result => {
//       if (result.errors) {
//         console.log(`Errors -> ${result.errors}`);
//         return Promise.reject(result.errors);
//       }
//       result.data.allMarkdownRemark.edges
//         .forEach(({ node }) => {
//           console.log(node, 'node');
//           createPage({
//             path: node.frontmatter.tags,
//             component: tagPageTemplate,
//             context: {}
//           });
//         });
//         console.log(`Result -> ${result}`);
//     });
// }

// create tag pages from template


// const createCategoryPage = (createPage, edges) => {
//   const categoryTemplate = path.resolve(`src/templates/category-archive.js`);
//   // const categoryArray = [];
//   const categoryArray = edges.map(({ node }) => {
//     return node.frontmatter.category;
//   })
//   .reduce((a, b) => {
//     return a.concat(b);
//   }, [])
//   .sort();
//   // console.log(categoryArray, 'categoryArray');
//   createPage({
//     path: `/categories`,
//     component: categoryTemplate,
//     context: { categoryArray }
//   });
// };

// const createTagPage = (createPage, edges) => {
//   const tagTemplate = path.resolve(`src/templates/tags.js`);
//   // console.log(createPage, 'start', edges, 'end');
//   // tag pages can be at `tag/${tagname}`
//   const tags = [];
//   const tagsAndCounts = {};
//   edges.forEach(({ node }) => {
//     tags.push(node.frontmatter.tags);
//   });
//   console.log('start node', tags, 'end node');
//   const tagsArray = tags.reduce((a, b) => {
//     // console.log('a, b start', a, b, 'a, b');
//     // con// st test = a.concat(b);
//     // console.log('test', test, 'test');
//     return a.concat(b);
//   }, []);
//   tagsArray.forEach((tag) => {
//     tagsAndCounts[tag] = (tagsAndCounts[tag] || 0) + 1;
//   });
//   console.log(tagsArray, tagsAndCounts, 'tagsArray');

//   createPage({
//     path: `/tags`,
//     component: tagTemplate,
//     context: { tagsAndCounts }
//     // context: { tagsArray }
//   });
// };





