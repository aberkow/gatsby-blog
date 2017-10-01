import React from 'react';
import Helmet from 'react-helmet';

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
    <div className="blog-post-container">
      <Helmet title={`Your Blog Name - ${post.frontmatter.title}`} />
      <div className="blog-post">
        <h1>{post.frontmatter.title}</h1>
        <h2>By {post.frontmatter.author}</h2>
        <div className="blog-post-content" dangerouslySetInnerHTML={{ __html: post.html }} />
      </div>
      <div className="meta-container">
        <p>{post.frontmatter.category}</p>
        <ul className="tag-list">
          {tagsList}
        </ul>
      </div>
    </div>
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
      }
    }
  }
`;