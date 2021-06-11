import Styled from "styled-components";
import SynopsisType from "./types/SynopsisType";

// TODO: X top right to close Synopsis window, click outside closes window, Styling
const SynopsisWrapper = Styled.div`
  padding: 6px;
  border: 1px solid grey;
`;

const Synopsis = ({ toggleSynopsis, actualAnime }: SynopsisType) => {
  return (
    <div>
      {toggleSynopsis ? (
        <SynopsisWrapper>
          <h3>Plot:</h3>
          {actualAnime}
        </SynopsisWrapper>
      ) : null}
    </div>
  );
};

export default Synopsis;
