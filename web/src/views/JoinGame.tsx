import { useHistory } from "react-router-dom";
import React, { useState } from "react";
import {
  MyPlayerDocument,
  useCreatePlayerMutation,
  useJoinTableMutation,
} from "../generated/graphql";
import * as store from "store";
import { ContentContainer } from "../components/DetailWrapper";
import styled from "styled-components";

export const JoinGame: React.FC = () => {
  const [gameId, setGameId] = useState("");
  const [name, setName] = useState(store.get("nickname"));

  const [joinTable] = useJoinTableMutation();
  const [createPlayer] = useCreatePlayerMutation();
  const history = useHistory();

  const handleSubmit = async () => {
    // Create player and receive userId in cookie
    await createPlayer({ variables: { name } });

    // join table based off newly created cookie
    const { data } = await joinTable({
      variables: { tableId: Number(gameId) },
      refetchQueries: [{ query: MyPlayerDocument }],
    });

    history.push(`/scoreboard/${data?.joinTable?.id}`);

    store.set("nickname", name);
  };

  return (
    <ContentContainer>
      <h1 className="text-lg">Join Game</h1>
      <Form onSubmit={(e) => e.preventDefault()}>
        <FormContainer>
          <Label className="text-md" htmlFor="gameID">
            Game ID
          </Label>

          <Input
            id="gameID"
            onChange={(e) => setGameId(e.target.value)}
            type="text"
            placeholder="Enter Game ID"
            value={gameId}
          />

          <Label className="text-md" htmlFor="name">
            Name
          </Label>

          <Input
            id="name"
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Enter Name"
            value={name}
          />
        </FormContainer>
        <ButtonContainer>
          <Button className="text-md" type="submit" onClick={handleSubmit}>
            Submit
          </Button>
          <Button
            transparent
            className="text-md"
            onClick={() => history.push("/")}
          >
            Cancel
          </Button>
        </ButtonContainer>
      </Form>
    </ContentContainer>
  );
};

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: stretch;
  text-align: center;
`;
export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  flex: 1;
  align-items: stretch;
  text-align: center;
`;

export const Input = styled.input`
  padding: 10px;
  border-radius: 8px;
  border-width: 0px;
`;
export const Button = styled.button<{ transparent?: boolean }>`
  background-color: ${(props) => (props.transparent ? "transparent" : "white")};

  display: flex;
  flex-direction: row;
  justify-content: center;

  border-radius: 8px;
  border-width: 0px;
  padding: 10px;
  margin-bottom: 10px;
  margin-top: 10px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
`;

export const Label = styled.label`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;

  padding-bottom: 10px;
  padding-top: 10px;
`;
