import React from 'react';
import Link from 'gatsby-link';
import Helmet from 'react-helmet';

import { BlogPostWrapper, Home, ImageWrapper } from '../utils/styles';

export default class Index extends React.Component {
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
    console.log(this.state.backgroundImage, 'state');
  }
  render() {
    const { edges: posts } = this.props.data.allMarkdownRemark;
  
    return (
 
      <Home className="home">
        <div className="blog-posts">
          {posts
            .filter(post => post.node.frontmatter.title.length > 0)
            .map(({ node: post }, index) => {
              return (
                <BlogPostWrapper className="post-container" key={`post-${index}`}>
                  <h1>{`${index + 1}`} &ndash;
                    <Link className="post-link" 
                    to={post.frontmatter.path}
                    key={`link-${index}`}
                    onMouseOver={this.handleBackgroundImage}
                    data-bgImage={post.frontmatter.image.childImageSharp.responsiveSizes.src}>
                      {` ${post.frontmatter.title}`}
                    </Link>
                  </h1>
                  <h2 className="post-date" key={`date-${index}`}>{post.frontmatter.date}</h2>
                  <p className="post-excerpt" key={`excerpt-${index}`}>{post.excerpt}</p>
                </BlogPostWrapper>
              );
            })}
        </div>
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
            author
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




