import React from 'react';

const getPostsByCategory = (evt) => {
  const category = evt.target.innerHTML;
  // needs to exclude <ul />
  console.log(category, 'category');

  return category;
}

const setPostsByCategory = (category) => {
  return category;
}

export default function CategoryArchive({
  data
}) {
  const categoryArray = data.allMarkdownRemark.edges.reduce((a, b) => {
    return a.concat(b);
  }, [])
  .sort()
  .map(({ node: node }, index) => {
    // console.log(node.frontmatter.category, 'node');
    return <li key={index} className='category-item'>{node.frontmatter.category}</li>;
  });

  return (
    <div>
      <h1>Categories</h1>
      <ul className="category-list" onClick={getPostsByCategory}>{categoryArray}</ul>
    </div>
  );
}

export const categoryQuery = graphql`
  query CategoryQuery {
    allMarkdownRemark {
      edges {
        node {
          frontmatter {
            category
          }
        }
      }
    }
  }
`;