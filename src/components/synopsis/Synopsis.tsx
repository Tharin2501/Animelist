import styled from "styled-components";
import SynopsisType from "./types/SynopsisType";
import { Close } from "@styled-icons/evaicons-solid/Close";

const SynopsisWrapper = styled.div`
  padding: 6px;
  border: 1px solid grey;
`;

const Flex = styled.span`
  display: flex;
  justify-content: space-between;
  padding-bottom: 6px;
`;

const StyledButton = styled(Close)`
  border: 1px solid black;
  border-radius: 3px;
  padding: 3px;
  transition: 0.6s;
  &:hover {
    cursor: pointer;
    background: tomato;
    color: white;
  }
`;

const Synopsis = ({
  toggleSynopsis,
  actualAnime,
  setToggleSynopsis,
}: SynopsisType) => {
  const handleOnClose = () => {
    setToggleSynopsis(false);
  };
  return (
    <div>
      {toggleSynopsis ? (
        <SynopsisWrapper>
          <Flex>
            <span>Plot:</span>
            <StyledButton size={18} onClick={() => handleOnClose()} />
          </Flex>
          {actualAnime}
        </SynopsisWrapper>
      ) : null}
    </div>
  );
};

export default Synopsis;
