import styled from 'styled-components';

module.exports = {
  Home: styled.div`
    display: flex;
    max-width: 1220px;
    margin: 0 auto;
    padding: 20px;
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
    width: 600px;
    background-image: url(${
      props => props.backgroundImage || ''
    });
    background-repeat: no-repeat;
    background-position: center;
    transition-duration: 0.5s;
  `,
  TitleStyle: styled.h1`
    margin: 0;
    flex-grow: 1;
  `,
  SubTitleStyle: styled.h2`
    margin: 0;
    flex-grow: 0;
  `,
  PsuedoBGImage: styled.img`
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: auto;
    opacity: 0.6;
  `
};


// &::after {
//   content: '';
//   position: absolute;
//   top: 0;
//   bottom: 0;
//   left: 0;
//   right: 0;
//   opacity: 0.5;
//   z - index: 1;
// }