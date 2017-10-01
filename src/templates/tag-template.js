import React, { Component } from 'react';
import Link from 'gatsby-link';

export default class TagRoute extends Component {
  render() {
    const posts = this.props.data.allMarkdownRemark.edges;
    const postLinks = posts.map((post, index) => {
      return (
        <li className='tag-list-item' key={index}>
          <Link className='tag-list-link' to={post.node.frontmatter.path} key={index}>{post.node.frontmatter.title}</Link>
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
          }
        }
      }
    }
  }
`;
