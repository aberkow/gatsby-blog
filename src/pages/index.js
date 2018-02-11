import React, { Component } from 'react';
import Link from 'gatsby-link';
import Helmet from 'react-helmet';
import MetaContainer from '../layouts/MetaContainer/metacontainer';
import { BlogPostContent, BlogPostDetails, BlogPostDetailsInner, BlogPostFeaturedImage, BlogPostWrapper, CategoryDetail, PostsContainer, PostExcerpt, PostTitle, PostsWrapper, TagList, TagListItem } from '../utils/styles';

export default class Index extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { edges: posts } = this.props.data.allMarkdownRemark;
    const totalPosts = posts.length;
    console.log(posts)
    return (
      <PostsWrapper className="posts-wrapper">
        <PostsContainer className="posts-container">
          {posts
            .filter(post => post.node.frontmatter.title.length > 0)
            .map(({ node: post }, index) => {
              {/* An alphabetical list of tags with links */}
              const tagItems = post.frontmatter.tags.sort().map((tag, index) => {
                return (
                  <TagListItem key={`tag-item-${index}`} className="tag-item">
                    <Link key={`tag-link-${index}`} to={`/tags/${tag}`}>
                      {tag}
                    </Link>
                  </TagListItem>
                );
              });
              return (
                <BlogPostWrapper className="blog-post-wrapper" key={`post-${index}`}>
                  <Link className="post-link"
                    to={post.frontmatter.path}
                    key={`link-${index}`} >
                    <BlogPostFeaturedImage 
                      className="blog-post-featured-image" 
                      backgroundImage={post.frontmatter.image.childImageSharp.responsiveSizes.src}
                      alt={`Featured Image for ${post.frontmatter.title}`}
                      >
                    </BlogPostFeaturedImage>
                  </Link>
                  <BlogPostContent className="blog-post-content">
                  <PostTitle>{`${totalPosts - index}`} &ndash;
                    <Link className="post-link" 
                    to={post.frontmatter.path}
                    key={`link-${index}`}>
                      {` ${post.frontmatter.title}`}
                    </Link>
                  </PostTitle>
                  <PostExcerpt className="post-excerpt" key={`excerpt-${index}`}>
                    {post.excerpt}
                  </PostExcerpt>
                    <BlogPostDetails>
                      <BlogPostDetailsInner>
                    <strong className="post-date" key={`date-${index}`}>{post.frontmatter.date}</strong>
                    
                    <CategoryDetail>Category: <span>
                      <Link to={`/categories/${post.frontmatter.category}`}> 
                        {post.frontmatter.category}
                      </Link>
                    </span></CategoryDetail> 
                    <TagList className='tag-list'><span>Tags:</span>{tagItems}</TagList>
                      </BlogPostDetailsInner>
                    </BlogPostDetails>
                  </BlogPostContent>
                </BlogPostWrapper>
              );
            })}
        </PostsContainer>            
      </PostsWrapper>
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
            date(formatString: "MMM DD YYYY")
            path
            tags
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
    }
  }
`;


// export default function Index({ data }) {
//   const { edges: posts } = data.allMarkdownRemark;
//   return (
//     <div className="home">
//       <div className="blog-posts">
//         {posts
//           .filter(post => post.node.frontmatter.title.length > 0)
//           .map(({ node: post }) => {
//             return (
//               <div>
//                 <h1>
//                   <Link className="post-link" to={post.frontmatter.path}>{post.frontmatter.title}</Link>
//                 </h1>
//                 <h2>{post.frontmatter.date}</h2>
//                 <em>By {post.frontmatter.author}</em>
//                 <p>{post.excerpt}</p>
//               </div>
//             );
//           })}
//       </div>
//     </div>
//   )
// }

// {/* <BlogPostWrapper
//   backgroundImage={post.frontmatter.image.childImageSharp.original.src} className="blog-post-preview"
//   key={post.id}>
//   {/* <img src={post.frontmatter.image.childImageSharp.original.src} /> */}

// </BlogPostWrapper> */}




