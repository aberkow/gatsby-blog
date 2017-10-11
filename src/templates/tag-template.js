import React, { Component } from 'react';
import Link from 'gatsby-link';

import { postsWithDataFilter } from '../utils/helpers';

export default class TagRoute extends Component {
  render() {
    const tagToFind = this.props.pathContext.tag;
    const posts = this.props.data.allMarkdownRemark.edges;
    const filteredPosts = postsWithDataFilter(posts, 'tags', tagToFind);

    const postLinks = filteredPosts.map((post, index) => {
      const tagsArray = post.node.frontmatter.tags;
      return (
        <li className='tag-list-item' key={`item-${index}`}>
          <Link className='tag-list-link' to={post.node.frontmatter.path} key={`link-${index}`}>{post.node.frontmatter.title}</Link>
        </li>
      )
    })
    return (
      <div>
        <ul className="tag-list">{postLinks}</ul>
      </div>
    );
  }
}

export const query = graphql`
  query TagItems {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      totalCount
      edges {
        node {
          frontmatter {
            path
            title
            tags
          }
        }
      }
    }
  }
`;
