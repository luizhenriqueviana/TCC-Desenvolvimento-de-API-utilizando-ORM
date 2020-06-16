import styled, { css } from 'styled-components';

export const Container = styled.header`
  strong {
    display: block;
    font-size: 24px;
    color: #444;
    margin-bottom: 30px;
  }
`;

export const Content = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  form {
    width: 25%;

    span {
      display: flex;
      align-items: center;
      background: #fff;
      border: 1px solid #ddd;
      border-radius: 4px;
      height: 30px;
      padding: 5px;

      input {
        border: 0;
        width: 100%;
        padding-right: 25px;
        padding-left: 4px;

        &::placeholder {
          color: #999;
          font-size: 14px;
        }
      }
    }
  }

  span {
    background: #7d40e7;
    border-radius: 4px;
    display: flex;
    align-items: center;
    padding-right: 10px;
    padding-left: 10px;

    button {
      border: 0;
      background: transparent;
      height: 30px;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }
  }
`;

export const ContainerTable = styled.div`
  overflow-x: auto;
  margin-top: 30px;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 15px;
  text-align: left;

  th {
    padding-bottom: 10px;
  }

  td {
    padding: 5px;
    text-align: left;
    font-size: 16px;
    color: #666;
    background: #fff;
  }
`;

export const Avatar = styled.div`
  display: flex;
  align-items: center;

  span {
    font-weight: bold;
    background: #f4effc;
    height: 30px;
    width: 30px;
    color: #a28fd0;
    border-radius: 50%;
    text-align: center;
    line-height: 33px;
    margin-right: 5px;
  }
  img {
    height: 30px;
    width: 30px;
    border-radius: 50%;
    margin-right: 10px;
  }
`;

export const Status = styled.span`
width:105px;
display:flex;
align-items:center;
font-weight: bold;
font-size:14px;
text-transform:uppercase;
padding:5px;
border-radius:15px;

p {
  margin-left:4px;
}

  ${(props) =>
    props.status === 'pendente' &&
    css`
      color: #c1bc35;
      background: #f0f0df;
    `}
  ${(props) =>
    props.status === 'entregue' &&
    css`
      color: #2ca42b;
      background: #dff0df;
    `}
    ${(props) =>
      props.status === 'retirada' &&
      css`
        color: #4d85ee;
        background: #bad2ff;
      `}
    ${(props) =>
      props.status === 'cancelada' &&
      css`
        color: #de3b3b;
        background: #fab0b0;
      `}
`;

export const TableRow = styled.tr``;
