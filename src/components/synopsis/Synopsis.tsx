import { Close } from "@styled-icons/evaicons-solid/Close";
import styled from "styled-components";
import DefaultButton from "../button/DefaultButton";
import SynopsisType from "./types/SynopsisType";

const SynopsisWrapper = styled.div`
  padding: 6px;
  border: 1px solid grey;
`;

const Flex = styled.span`
  display: flex;
  justify-content: space-between;
  padding-bottom: 6px;
`;

const StyledDefaultButton = styled(DefaultButton)`
  transition: 0.3s;
  background-color: ${({ theme }) => theme.color.white};
  &:hover {
    background-color: ${({ theme }) => theme.color.warning};
    color: ${({ theme }) => theme.color.white};
    border: 2px solid ${({ theme }) => theme.color.warning};
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
            <StyledDefaultButton onClick={() => handleOnClose()}>
              <Close size={18} />
            </StyledDefaultButton>
          </Flex>
          {actualAnime}
        </SynopsisWrapper>
      ) : null}
    </div>
  );
};

export default Synopsis;
