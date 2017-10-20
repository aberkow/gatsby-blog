import React from 'react';
import Link from 'gatsby-link';

import { BlogPostContent, BlogPostContainer, TagList } from '../utils/styles';
import { arrayReducer } from '../utils/helpers.js';

export default function TagsPage({
  data
}) {
  const { edges: posts } = data.allMarkdownRemark;
  const categoryArray = arrayReducer(posts, 'category');

  const categoryLinks = categoryArray.map((category, index) => {
    return (
      <li className="category-item" key={index}>
        <Link className='category-list-link' to={`/categories/${category}`} key={index}>{category}</Link>
      </li>
    )
  });

  return (
    <BlogPostContainer>
      <BlogPostContent>
        <h2>Categories</h2>
        <TagList className='categories-list'>{categoryLinks}</TagList>
      </BlogPostContent>
    </BlogPostContainer>
  );
}

export const query = graphql`
  query CategoryPage {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      totalCount
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