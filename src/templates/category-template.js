import React, { Component } from 'react';
import Link from 'gatsby-link';

import { postsWithDataFilter } from '../utils/helpers';

export default class CategoryRoute extends Component {
  render() {
    const posts = this.props.data.allMarkdownRemark.edges;
    categoryToFind = this.props.pathContext.category;
    const filteredPosts = postsWithDataFilter(posts, 'category', categoryToFind);
    const postLinks = filteredPosts.map((post, index) => {
      return (
        <li className='category-list-item' key={`item-${index}`}>
          <Link className='category-list-link' to={post.node.frontmatter.path} key={`link-${index}`}>{post.node.frontmatter.title}</Link>
        </li>
      )
    })
    return (
      <div>
        <ul className="category-list">{postLinks}</ul>
      </div>
    );
  }
}

export const query = graphql`
  query CategoryItems {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      totalCount
      edges {
        node {
          frontmatter {
            path
            title
            category
          }
        }
      }
    }
  }
`;
