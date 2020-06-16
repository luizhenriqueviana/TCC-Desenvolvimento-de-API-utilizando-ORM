import styled from 'styled-components';

export const Badge = styled.button`
  border: 0;
  color: #c6c6c6;
  background: none;
`;

export const PopUp = styled.div`
  position: absolute;
`;

export const OptionList = styled.div`
  width: 150px;
  position: absolute;
  left: calc(50% - 65px);
  top: calc(100% + 15px);
  background: #fff;
  box-shadow: 0px 0px 2px #00000026;
  padding: 20px;
  display: ${(props) => (props.visible ? 'block' : 'none')};

  &::before {
    content: '';
    position: absolute;
    left: calc(50% - 20px);
    top: -15px;
    width: 0;
    height: 0;
    border-left: 20px solid transparent;
    border-right: 20px solid transparent;
    border-bottom: 20px solid #fff;
  }
`;

export const Options = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 5px;
  padding-top: 5px;
  background-color: #fff;

  span {
    display: flex;
    align-items: center;
  }

  button {
    background: none;
    border: 0;
    margin-left: 5px;
    font-size: 16px;
    color: #999;
  }
`;

export const Overlay = styled.div`
  overflow-y: hidden;
  height: 100%;
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  display: ${(props) => (props.displayModal ? 'flex' : 'none')};
  background: rgba(0, 0, 0, 0.8);
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
