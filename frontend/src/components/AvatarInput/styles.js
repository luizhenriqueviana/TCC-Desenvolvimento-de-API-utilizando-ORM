import styled from 'styled-components';

export const Container = styled.div`
  align-self: center;

  label {
    cursor: pointer;

    img {
      height: 150px;
      width: 150px;
      border-radius: 50%;
    }
    input {
      display: none;
    }

    .initials {
      font-size: 60px;
      height: 150px;
      text-align: center;
      line-height: 150px;
      width: 150px;
      background-color: #f4effc;
      border-radius: 50%;
      color: #7d40e7;
      border-style: dashed;
    }
  }
`;
