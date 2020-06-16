import styled from 'styled-components';

export const Container = styled.div`
  background: #fff;
  padding: 0 30px;
  border: 1px solid #ddd;
`;

export const Content = styled.div`
  height: 64px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  nav {
    display: flex;
    align-items: center;

    img {
      margin-right: 20px;
      padding-right: 20px;
      border-right: 1px solid #eee;
    }

    a {
      font-weight: bold;
      margin-right: 20px;
      color: #999;
    }

    .active {
      color: #444;
    }
  }

  aside {
    display: flex;
    align-items: center;
  }
`;

export const Profile = styled.div`
  display: flex;
  margin-left: 20px;
  padding-left: 20px;

  div {
    text-align: right;
    margin-right: 10px;

    strong {
      display: block;
      color: #666;
    }

    button {
      margin-top: 5px;
      text-decoration: none;
      border: 0;
      background: transparent;
      color: #de3b3b;
    }
  }
`;
