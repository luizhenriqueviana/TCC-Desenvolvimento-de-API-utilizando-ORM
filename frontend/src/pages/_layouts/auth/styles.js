import styled from 'styled-components';
import { darken } from 'polished';

export const Wrapper = styled.div`
  height: 100%;
  background: #7d40e7;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Content = styled.div`
  width: 100%;
  padding: 50px 25px;
  max-width: 360px;
  text-align: center;
  background: #fff;
  border-radius: 4px;

  form {
    display: flex;
    flex-direction: column;
    margin-top: 30px;

    label {
      text-align: left;
      color: #444;
      margin: 5px 0;
    }

    input {
      display: block;
      width: 100%;
      background: #fff;
      border: 1px solid #ddd;
      border-radius: 4px;
      height: 44px;
      padding: 0 15px;
      color: #000;
      margin: 10px 0px;

      &::placeholder {
        color: #999;
      }
    }

    button {
      margin: 5px 0 0;
      height: 44px;
      background: #7d40e7;
      font-weight: bold;
      color: #fff;
      border: 0;
      border-radius: 4px;
      font-size: 16px;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.04, '#7d40e7')};
      }
    }
  }

  span {
    color: #f64c75;
    align-self: flex-start;
    margin: 0 0 10px;
    font-weight: bold;
  }

  img {
    width: 100%;
  }
`;
