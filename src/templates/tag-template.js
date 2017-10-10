import React, { Component } from 'react';
import Link from 'gatsby-link';

export default class TagRoute extends Component {
  render() {
    const tagToFind = this.props.pathContext.tag;
    const posts = this.props.data.allMarkdownRemark.edges;
    const postsArray = [];
    console.log(posts);
    // posts.node.frontmatter.tags.filter(tagToFind => tags === tagToFind);
    posts.forEach((post, index) => {
      const tags = post.node.frontmatter.tags;
      
    });
    console.log(postsArray, 'postsArray');
    // debugger;
    
    const postLinks = posts.map((post, index) => {
      const tagsArray = post.node.frontmatter.tags;
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
            tags
          }
        }
      }
    }
  }
`;
