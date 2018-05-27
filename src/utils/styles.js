import styled from 'styled-components';
import media from './media-query-sizes';

module.exports = {
  BlogPostWrapper: styled.div`
  border: 1px solid;
    position: relative;
    transition: all 0.4s ease-out;
    &:hover,
    &:focus {
      background-color: rgba(0,0,0,0.85);
      color: #fafafa;
      transition: all 0.4s ease-out;
    }
  `,
  BlogPostContent: styled.div`
    padding: 40px 30px;
  `,
  BlogPostContainer: styled.div`
    display: block;
    max-width: 1020px;
    margin: 20px auto;
    box-shadow: 2px 6px 25px rgba(0, 0, 0, 0.1);
  `,
  BlogPostDetails: styled.div`
    width: 100%;
    bottom: 0;
    left: 0;
  `,
  BlogPostDetailsInner: styled.div`
    border-top: 1px solid #efefef;
    padding: 30px 0;
  `,
  BlogPostFeaturedImage: styled.div`
    background-image: url(${
    props => props.backgroundImage || ''
    });
    height: 200px;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  `,
  CategoryDetail: styled.p`
    margin: 20px 0;
  `,
  FormButton: styled.button`
    border: 1px solid cornflowerblue;
    background-color: cornflowerblue;
    padding: 0.5em 2em;
    color: black;
    &:hover,
    &:focus {
      background-color: white;
      border: 1px solid orangered;
      box-shadow: 2px 6px 25px rgba(0, 0, 0, 0.1);
      color: orangered;
    }
  `,
  FormInputContainer: styled.div`
    margin-bottom: 1em;
    padding: 0.5em 0;
  `,
  FormInput: styled.input`
    background-color: #f0f1f3;
    border: none;
    display: block;
    padding: 0.5em;
  `,
  FormTextArea: styled.textarea `
    background-color: #f0f1f3;
    border: none;
    display: block;
    padding: 0.5em;
  `,
  HeaderWrapper: styled.div`
    display: flex;
    align-items: baseline;
    max-width: 1140px;
    margin: 40px auto 0 auto;
    padding: 0;
    justify-content: space-between;
  `,
  HeaderTitle: styled.span`
    font-size: 2em;
    margin-left: 60px;
  `,
  ContentWrapper: styled.div`
    display: block;
    max-width: 1220px;
    margin: 0px auto 40px auto;
    padding: 20px;
  `,
  MenuToggleText: styled.h2`
    border-bottom: 2px solid transparent;
    color: cornflowerblue;
    margin-right: 60px;
    position: relative;
    transition: all 0.4s ease-out;
    z-index: 1000;
    &:hover {
      border-bottom: 2px solid;
      color: orangered;
      cursor: pointer;
      transition: all 0.4s ease-out;
    }
    ${media.tablet`
      transform: rotateZ(90deg);
      padding: 0 0 0 40px;
      margin: 0;
    `}
  `,
  PostsContainer: styled.div`
    display: grid;
    grid-template: auto / repeat(auto-fit, minmax(14rem, 1fr));
    grid-gap: 1em;
    max-width: 1220px;
    margin: 0 auto;
    `,
  PostExcerpt: styled.p`
    ${media.phone`display: none;`}
  `,
  PostMetaContainer: styled.div`
    border-top: 1px solid #efefef;
    margin: 30px;
    padding-top: 30px;
  `,
  PostTitle: styled.h2`
    line-height: 1.4;
    word-wrap: initial;
  `,
  PostsWrapper: styled.div`
    margin: 0 auto;
  `,
  SingleBlogPost: styled.div`
    padding: 30px;
  `,
  SubTitleStyle: styled.h2`
    margin: 0;
    flex-grow: 0;
  `,
  TagList: styled.ul`
    list-style-type: none;
    margin-left: 0;
    margin-bottom: 0;
  `,
  TagListItem: styled.li`
    margin: 0 10px;
    display: inline-block;
  `,
  TitleStyle: styled.h1`
    margin: 0;
    flex-grow: 1;
  `,
  MenuWrapper: styled.div`
    background-color: rgba(0, 0, 0, 0.7);
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 100;
  `,
  MenuList: styled.ul`
    list-style-type: none;
    margin: 0,
    text-align: center;
    transform: translate(-50%, 100%);
    position: absolute;
    top: 0;
    left: 50%;
  `
};

