import React from 'react';
import Link from 'gatsby-link';

import { arrayReducer } from '../utils/helpers';

export default function TagsPage({
  data
}) {
  const { edges: posts } = data.allMarkdownRemark;
  const tagsArray = arrayReducer(posts, 'tags');

  const tagLinks = tagsArray.map((tag, index) => {
    return (
      <li className="tag-item" key={index}>
        <Link className='tag-list-link' to={`/tags/${tag}`} key={index}>{tag}</Link>
      </li>
    )
  });

  return (
    <div>
      <div>
        <h2>Tags</h2>
        <ul className='tags-list'>{tagLinks}</ul>
      </div>
    </div>
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