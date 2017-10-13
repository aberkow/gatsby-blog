import styled from 'styled-components';
import media from './media-query-sizes';

module.exports = {
  Home: styled.div`
    display: flex;
    max-width: 1220px;
    height: 600px;
    margin: 0 auto;
    padding: 20px;
  `,
  PostsContainer: styled.div`
    width: 50%;
  `,
  BlogPostWrapper: styled.div`
    position: relative;
    overflow: hidden;
    max-width: 600px;
  `,
  HeaderWrapper: styled.div`
    display: flex;
    align-items: baseline;
    max-width: 1220px;
    margin: 20px auto 40px;
    padding: 0 20px;
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
  TitleStyle: styled.h1`
    margin: 0;
    flex-grow: 1;
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
  MenuWrapper: styled.div`
    display: ${ props =>  props.isMenuOpen ? 'block' : 'none' };
  `
};
