import styled from 'styled-components';
import media from './media-query-sizes';

module.exports = {
  BlogPostWrapper: styled.div`
    flex: 1 1 50%;
    position: relative;
    border: 1px solid #efefef;
    height: 350px;
  `,
  BlogPostContent: styled.div`
    padding: 0 0 30px;
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
  HeaderWrapper: styled.div`
  display: flex;
  align-items: baseline;
  max-width: 1220px;
  margin: 20px auto 40px;
  padding: 0 20px;
  `,
  Home: styled.div`
    display: flex;
    max-width: 1220px;
    height: 600px;
    margin: 0 auto;
    padding: 20px;
  `,
  ImageWrapper: styled.div`
    position: relative;
    top: 0;
    bottom: 0;
    right: 0;
    width: 50%;
    background-image: url(${
      props => props.backgroundImage || ''
    });
    background-repeat: no-repeat;
    background-position: center;
    transition-duration: 0.5s;
    ${media.tablet`display: none;`}
  `,
  PostsContainer: styled.div`
    display: flex;
    max-width: 1220px;
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
};

