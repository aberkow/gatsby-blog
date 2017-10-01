import React from 'react';
import Link from 'gatsby-link';


export default function TagsPage({
  data
}) {
  const { edges: posts } = data.allMarkdownRemark;
  const tagsArray = posts.map(({ node }) => {
    return node.frontmatter.tags;
  })
  .reduce((a, b) => {
    return a.concat(b)
  }, [])
  .filter((tag, index, array) => {
    return array.indexOf(tag) === index;
  })
  .sort();

  const tagLinks = tagsArray.map((tag, index) => {
    return (
      <li className="tag-item" key={index}>
        <Link className='tag-list-link' to={`/tags/${tag}`} key={index}>{tag}</Link>
      </li>
    )
  });

  return (
    <ul className='tags-list'>{tagLinks}</ul>
  );
}

export const query = graphql`
  query TagPage {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      totalCount
      edges {
        node {
          frontmatter {
            tags
          }
        }
      }
    }
  }
`;