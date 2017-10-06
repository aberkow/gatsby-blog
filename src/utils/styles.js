import styled from 'styled-components';

module.exports = {
  BlogPostWrapper: styled.div`
    max-width: 600px;
    margin: 10px auto;
    padding: 10px 20px;
    border: ${props => props.border || '1px solid'};
    background-image: url(${props => props.backgroundImage || 'red'})
  `,
  NavWrapper: styled.div`
    max-width: 960px;
    margin: 20px auto;
  `
};