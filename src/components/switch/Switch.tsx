import styled from "styled-components";
import SwitchType from './types/SwitchType';

const Wrapper = styled.div`

`

const Switch: React.FunctionComponent<SwitchType> = ({children}) => {
  return (
    <Wrapper>
     {children}
    </Wrapper>
  );
};

export default Switch;