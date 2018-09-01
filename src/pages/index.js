import React, { Component } from 'react';
import Img from 'gatsby-image';
import Link from 'gatsby-link';
import Helmet from 'react-helmet';

export default class Index extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { edges: posts } = this.props.data.allMarkdownRemark;
    const totalPosts = posts.length;
    return (
      <div className="posts-wrapper">
        <div className="posts-container">
          {posts
            .filter(post => post.node.frontmatter.title.length > 0)
            .map(({ node: post }, index) => {
              {/* An alphabetical list of tags with links */}
              const tagItems = post.frontmatter.tags.sort().map((tag, index) => {
                return (
                  <li key={`tag-item-${index}`} className="tag-item">
                    <Link key={`tag-link-${index}`} to={`/tags/${tag}`}>
                      {tag}
                    </Link>
                  </li>
                );
              });
              return (
                <div className="blog-post-wrapper" key={`post-${index}`}>
                  <Link className="post-link"
                    to={post.frontmatter.path}
                    key={`link-${index}`} >
                    <Img
                      sizes={post.frontmatter.image.childImageSharp.sizes}
                      className="blog-post-featured-image" 
                      alt={post.frontmatter.alt}
                    />
                  </Link>
                  <div className="blog-post-content">
                  <h2>{`${totalPosts - index}`} &ndash;
                    <Link className="post-link" 
                    to={post.frontmatter.path}
                    key={`link-${index}`}>
                      {` ${post.frontmatter.title}`}
                    </Link>
                  </h2>
                  <p className="post-excerpt" key={`excerpt-${index}`}>
                    {post.excerpt}
                  </p>
                    <div>
                      <div>
                    <strong className="post-date" key={`date-${index}`}>{post.frontmatter.date}</strong>
                    
                    <p>Category: <span>
                      <Link to={`/categories/${post.frontmatter.category}`}> 
                        {post.frontmatter.category}
                      </Link>
                    </span></p> 
                    <ul className='tag-list'><span>Tags:</span>{tagItems}</ul>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>            
      </div>
    );
  }
}

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          excerpt(pruneLength: 140)
          id
          frontmatter {
            title
            path
            tags
            category
            alt
            image {
              childImageSharp {
                sizes {
                  base64
                  tracedSVG
                  aspectRatio
                  src
                  srcSet
                  srcWebp
                  srcSetWebp
                  sizes
                  originalImg
                  originalName
                }
              }
            }
          }
        }
      }
    }
  }
`;




