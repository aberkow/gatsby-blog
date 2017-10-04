import React from 'react';
import Link from 'gatsby-link';
import Helmet from 'react-helmet';
// import styled from 'styled-components';

import { BlogPostWrapper } from '../utils/styles';

export default function Index({
  data
}) {
  const { edges: posts } = data.allMarkdownRemark;
  return (
    <div className="home">
      <div className="blog-posts">
        {posts
          .filter(post => post.node.frontmatter.title.length > 0)
          .map(({ node: post }) => {
            return (
              <BlogPostWrapper className="blog-post-preview" key={post.id}>
                <img src={post.frontmatter.image.childImageSharp.original.src} />
                <h1>
                  <Link to={post.frontmatter.path}>{post.frontmatter.title}</Link>
                </h1>
                <h2>{post.frontmatter.date}</h2>
                <em>By {post.frontmatter.author}</em>
                <p>{post.excerpt}</p>
              </BlogPostWrapper>
            );
          })}
      </div>
    </div>
  )
}

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          excerpt(pruneLength: 250)
          id
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
            path
            author
            image {
              childImageSharp {
                original {
                  src
                }
              }
            }
          }
        }
      }
    }
  }
`;