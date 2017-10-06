import React from 'react';
import Link from 'gatsby-link';
import Helmet from 'react-helmet';
// import styled from 'styled-components';

import { BlogPostWrapper } from '../utils/styles';

export default class Index extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      backgroundImage: ''
    };
    this.hoverHandler = this.getBackgroundImage.bind(this);
  }
  getBackgroundImage(evt) {
    let backgroundImage = evt.target.getAttribute('data-bgImage');
    console.log(evt.target.getAttribute('data-bgImage'), 'image');
    this.setState({
      backgroundImage: backgroundImage
    });
  }
  render() {
    const { edges: posts } = this.props.data.allMarkdownRemark;
    console.log(posts, this.state.backgroundImage);
    return (
      <div className="home">
        <div className="blog-posts">
          {posts
            .filter(post => post.node.frontmatter.title.length > 0)
            .map(({ node: post }) => {
              return (
                <div>
                  <h1>
                    <Link className="post-link" 
                    to={post.frontmatter.path}
                    onMouseOver={this.getBackgroundImage}
                    data-bgImage={post.frontmatter.image.childImageSharp.original.src}>
                      {post.frontmatter.title}
                    </Link>
                  </h1>
                  <h2>{post.frontmatter.date}</h2>
                  <p>{post.excerpt}</p>
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




