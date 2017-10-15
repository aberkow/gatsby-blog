import React from 'react';
import Helmet from 'react-helmet';
import Link from 'gatsby-link';
import Img from 'gatsby-image';

import { BlogPostBuffer, BlogPostContainer, FeaturedImage, TagList, TagListItem } from '../utils/styles';

export default function Template({
  data
}) {
  console.log(data);
  const { markdownRemark: post } = data;
  const tagsList = post.frontmatter.tags.map((tag, index) => {
    return (
      <TagListItem key={index}>
        <Link to={`/tags/${tag}`}>
          {tag}
        </Link>
      </TagListItem>
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
          <em>{`Reading Time About ${post.timeToRead} ${post.timeToRead < 1 ? 'minutes' : 'minute' }`}</em>
          <div className="blog-post-content" dangerouslySetInnerHTML={{ __html: post.html }} />
        </div>
        <div className="meta-container">
          <p>
            <span>
              {`Category: `}
            </span>
            <Link to={`/categories/${post.frontmatter.category}`}>   
              {post.frontmatter.category}
            </Link>
          </p>
          <TagList className="tag-list">
            <span>Tags:</span>
            {tagsList}
          </TagList>
        </div>
      </BlogPostBuffer>
    </BlogPostContainer>
  );
}

export const pageQuery = graphql`
  query BlogPostByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      timeToRead
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