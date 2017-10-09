import React, { Component } from 'react';
import Link from 'gatsby-link';
import Helmet from 'react-helmet';

import { BlogPostWrapper, Home, ImageWrapper, PostsContainer, TagList, TagListItem } from '../utils/styles';

export default class Index extends Component {
  constructor (props) {
    super(props);
    this.state = {
      backgroundImage: ''
    };
    this.handleBackgroundImage = this.handleBackgroundImage.bind(this);
  }
  handleBackgroundImage(evt) {
    let backgroundImage = evt.target.getAttribute('data-bgImage');
    this.setState({
      backgroundImage
    });
  }
  render() {
    const { edges: posts } = this.props.data.allMarkdownRemark;
    const totalPosts = posts.length;
    return (
 
      <Home className="home">
        <PostsContainer className="blog-posts">
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
              console.log(tagItems, 'tagItems');
              return (
                <BlogPostWrapper className="post-container" key={`post-${index}`}>
                  <h3>{`${totalPosts - index}`} &ndash;
                    <Link className="post-link" 
                    to={post.frontmatter.path}
                    key={`link-${index}`}
                    onMouseOver={this.handleBackgroundImage}
                    data-bgImage={post.frontmatter.image.childImageSharp.responsiveSizes.src}>
                      {` ${post.frontmatter.title}`}
                    </Link>
                  </h3>
                  <strong className="post-date" key={`date-${index}`}>{post.frontmatter.date}</strong>
                  <p className="post-excerpt" key={`excerpt-${index}`}>{post.excerpt}</p>
                  <TagList className='tag-list'><span>Tags:</span>{tagItems}</TagList>
                </BlogPostWrapper>
              );
            })}
        </PostsContainer>
        <ImageWrapper className='image-wrapper' backgroundImage={this.state.backgroundImage}>
        </ImageWrapper>
      </Home>
    );
  }
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
            date(formatString: "MMM DD YYYY")
            path
            tags
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




