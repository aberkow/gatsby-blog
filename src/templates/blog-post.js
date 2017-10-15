import React from 'react';
import Helmet from 'react-helmet';
import Img from 'gatsby-image';

import { BlogPostBuffer, BlogPostContainer, FeaturedImage } from '../utils/styles';

export default function Template({
  data
}) {
  const { markdownRemark: post } = data;
  const tagsList = post.frontmatter.tags.map((tag, index) => {
    return (
      <li key={index}>{tag}</li>
    );
  });
  return (
    <BlogPostContainer className="blog-post-container">
      <Helmet title={`AJB - ${post.frontmatter.title}`} />
      <BlogPostBuffer>
        <div className="featured-image">
          <FeaturedImage src={post.frontmatter.image.childImageSharp.responsiveSizes.src} className='featured-image' />
        </div>

        <div className="blog-post">
          
          <h1>{post.frontmatter.title}</h1>
          <div className="blog-post-content" dangerouslySetInnerHTML={{ __html: post.html }} />
        </div>
        <div className="meta-container">
          <p>{post.frontmatter.category}</p>
          <ul className="tag-list">
            {tagsList}
          </ul>
        </div>
      </BlogPostBuffer>
    </BlogPostContainer>
  );
}

export const pageQuery = graphql`
  query BlogPostByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
        tags
        author
        category
        image {
          childImageSharp {
            responsiveSizes {
              src
            }
          }
        }
      }
    }
  }
`;