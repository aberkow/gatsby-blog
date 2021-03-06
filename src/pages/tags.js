import React from 'react';
import Link from 'gatsby-link';

import { BlogPostContent, BlogPostContainer, TagList } from '../utils/styles';
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
    <BlogPostContainer>
      <BlogPostContent>
        <h2>Tags</h2>
        <TagList className='tags-list'>{tagLinks}</TagList>
      </BlogPostContent>
    </BlogPostContainer>
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