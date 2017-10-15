import styled from 'styled-components';
import media from './media-query-sizes';

module.exports = {
  BlogPostWrapper: styled.div`
    flex: 1 1 50%;
    position: relative;
    border: 1px solid #efefef;
    height: 600px;
    margin: 20px 40px;
    box-shadow: 2px 6px 25px rgba(0, 0, 0, 0.1);
    transition: all .3s ease;
    &:hover {
      box-shadow: 2px 6px 30px rgba(0, 0, 0, 0.2);
    }
    ${media.tablet`margin: 40px;`}
  `,
  BlogPostContent: styled.div`
    padding: 40px 30px;
  `,
  BlogPostContainer: styled.div`
    width: 1140px;
    margin: 0 80px;
    box-shadow: 2px 6px 25px rgba(0, 0, 0, 0.1);
  `,
  BlogPostBuffer: styled.div`
    margin: 30px;
  `,
  BlogPostDetails: styled.div`
    position: absolute;
    width: 100%;
    bottom: 0;
    left: 0;
  `,
  BlogPostDetailsInner: styled.div`
    border-top: 1px solid #efefef;
    margin: 0 30px;
    padding: 30px 0;
  `,
  BlogPostFeaturedImage: styled.div`
    background-image: url(${
    props => props.backgroundImage || ''
    });
    height: 200px;
    background-repeat: no-repeat;
    background-position: center;
  `,
  CategoryDetail: styled.p`
    margin: 20px 0;
  `,
  FeaturedImage: styled.img`
    width: 100%;
  `,
  HeaderWrapper: styled.div`
    display: flex;
    align-items: baseline;
    max-width: 1140px;
    margin: 40px auto 0 auto;
    padding: 0;
    justify-content: space-between;
  `,
  HeaderTitle: styled.h1`
    margin-left: 60px;
  `,
  ContentWrapper: styled.div`
    display: flex;
    max-width: 1220px;
    margin: 0px auto 40px auto;
    padding: 20px;
  `,
  MenuToggleText: styled.h2`
    border-bottom: 2px solid transparent;
    margin-right: 60px;
    position: relative;
    transition: all 0.4s ease-out;
    z-index: 1000;
    &:hover {
      border-bottom: 2px solid;
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
    display: flex;
    flex-direction: row;
    max-width: 1220px;
    margin: 0 auto;
    ${media.tablet`flex-direction: column;`}
    `,
  PostExcerpt: styled.p`
    ${media.phone`display: none;`}
  `,
  PostMetaContainer: styled.div`
    border-top: 1px solid #efefef;
    padding-top: 30px;
  `,
  PostsWrapper: styled.div`
    margin: 0 auto;
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
    background-color: rgba(127, 127, 127, 0.9);
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

