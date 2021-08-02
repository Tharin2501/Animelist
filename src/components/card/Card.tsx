import { useState } from "react";
import styled from "styled-components";
import { CardType } from "./types/CardType";
import axios from "axios";
import Modal from "../modal/Modal";
import { AiTwotoneHeart } from "react-icons/ai";
import { DefaultButton } from "../button/DefaultButton";

const Wrapper = styled.div`
  max-width: 250px;
  max-height: 550px;
  padding: 16px;
`;

const StyledCard = styled.div`
  width: 200px;
  min-height: 450px;
  padding: 12px;
  border-radius: 5px;
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.2);
  background-color: white;
`;

const StyledUnorderedList = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

const StyledImages = styled.img`
  max-width: 100%; // width of the image won’t exceed the width of its parent (200px)
  min-height: 300px;
`;

const FlexColumn = styled.span`
  display: flex;
  flex-direction: column;
`;

const ButtonWrapper = styled.span`
  padding-top: 9px;
`;

const Card: React.FunctionComponent<CardType> = ({ item }) => {
  const [name, setName] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  // TODO: move these handlers to another directory(routes?) and export them. import here
  const handleGetRequest = async (id: number) => {
    axios
      .get(`https://api.jikan.moe/v3/anime/${id}`)
      .then((response) => {
        setName(response.data.title);
        setIsLoading(true);
        console.log(`GET success`);
      })
      .catch((error) => {
        // handle error
        throw error;
      });
    setOpenModal(true);
  };

  const handlePostRequest = () => {
    const postData = {
      name: name,
    };
    axios
      .post("http://localhost:3001/api/insert", postData)
      .then(() => {
        setIsLoading(true);
        console.log(`POST success`);
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <Wrapper>
      <StyledCard>
        <StyledUnorderedList>
          <li key={item.mal_id}>
            <StyledImages src={item.image_url} alt={item.title}></StyledImages>
            <FlexColumn>
              <h4>{item.title}</h4>
              <span>Score: {item.score}</span>
              {item.end_date ? (
                <span>End date: {item.end_date}</span>
              ) : (
                <span>Start date: {item.start_date}</span>
              )}
              {isLoading && openModal ? (
                <Modal
                  title={`${name}`}
                  onClickPost={() => handlePostRequest()}
                  onClickClose={() => setOpenModal(false)}
                >
                  {/* Added to favorites. right button(view favorites) routes to /favorites */}
                  <span style={{ paddingTop: "13px" }}>
                    Are you sure you want to add to favorites?
                  </span>
                </Modal>
              ) : (
                <ButtonWrapper>
                  <DefaultButton
                    icon={<AiTwotoneHeart color="tomato" />}
                    onClick={() => handleGetRequest(item.mal_id!)}
                    rounded
                    bordered
                  >
                    Add to favorites
                  </DefaultButton>
                </ButtonWrapper>
              )}
            </FlexColumn>
          </li>
        </StyledUnorderedList>
      </StyledCard>
    </Wrapper>
  );
};

export default Card;
