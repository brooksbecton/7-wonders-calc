import { useHistory } from "react-router-dom";
import React, { useState } from "react";
import * as store from "store";
import { ContentContainer } from "../components/DetailWrapper";
import {
  MyPlayerDocument,
  useCreatePlayerMutation,
  useCreateTableMutation,
} from "../generated/graphql";
import {
  Button,
  ButtonContainer,
  Form,
  FormContainer,
  Input,
  Label,
} from "./JoinGame";

export const CreateGame: React.FC = () => {
  const [name, setName] = useState(store.get("nickname"));
  const history = useHistory();
  const [createTable] = useCreateTableMutation();
  const [createPlayer] = useCreatePlayerMutation();

  const handleSubmit = async () => {
    // Create player and receive userId in cookie
    await createPlayer({
      variables: { name },
    });
    // Create table based off newly created cookie
    const { data } = await createTable({
      refetchQueries: [{ query: MyPlayerDocument }],
    });
    history.push(`/scoreboard/${data?.createTable?.id}`);

    store.set("nickname", name);
  };

  return (
    <ContentContainer>
      <h1 className="text-lg">Create Game</h1>
      <Form onSubmit={(e) => e.preventDefault()}>
        <FormContainer>
          <Label className="text-md" htmlFor="name">
            Name
          </Label>
          <Input
            id="name"
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Name"
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
