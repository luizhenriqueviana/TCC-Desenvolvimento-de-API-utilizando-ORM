import styled from 'styled-components';

export const Container = styled.div`
  max-width: 900px;
  margin: 30px auto;
`;

export const Content = styled.div`
  display: flex;
  justify-content: space-between;
  strong {
    font-size: 24px;
    color: #444;
  }
  div {
    display: flex;
  }
`;

export const BackButton = styled.button`
  border: 0;
  background: #ccc;
  border-radius: 4px;
  margin-right: 15px;
  padding: 0 10px;
  span {
    margin-right: 5px;
  }
  a {
    color: #fff;
    font-weight: bold;
  }
`;

export const SaveButton = styled.button`
  border: 0;
  background: #7d40e7;
  border-radius: 4px;
  color: #fff;
  font-weight: bold;
  padding: 0 10px;
  span {
    margin-right: 5px;
  }
`;

export const FormContent = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;

  form {
    display: flex;
    flex-direction: column;
    width: 100%;

    span {
      display: flex;
      flex-direction: column;
      align-items: center;

      p {
        font-weight: bold;
        color: #ddd;
        font-size: 16px;
      }
    }
  }
`;

export const ContainerImagePerfil = styled.div`
  align-self: center;
  margin-bottom: 10px;
  label {
    cursor: pointer;

    img {
      height: 120px;
      width: 120px;
    }
    input {
      display: none;
    }
  }
`;

export const InputContent = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;

  label {
    display: block;
    font-weight: bold;
    color: #444;
    margin-bottom: 8px;
    input {
      margin: 8px 0;
      display: block;
      width: 100%;
      padding-left: 10px;
      border-radius: 4px;
      border: 0;
      height: 45px;
      border: 1px solid #ddd;

      &::placeholder {
        padding-left: 5px;
      }
    }

    span {
      color: #e03f3f;
    }
  }
`;
