import {
  Body,
  Button,
  Header,
  Icon,
  Input,
  Item,
  Left,
  Right,
  Title,
} from "native-base";
import React, { useState } from "react";

export default function HomeHeader({
  title,
  openDrawerCallback,
  enableSearch = false,
}) {
  const [isSearching, setSearching] = useState<boolean>(false);
  const [searchString, setSearchString] = useState<string>("");
  const toggleSearchBar = () => {
    setSearchString("");
    setSearching(!isSearching);
  };

  return (
    <Header searchBar={isSearching} rounded={isSearching}>
      {enableSearch && isSearching ? (
        <>
          <Item>
            <Icon name="search-outline" />
            <Input
              placeholder={`Browse ${title}`}
              value={searchString}
              onChangeText={(text) => setSearchString(text)}
            />
            <Icon
              name="close-circle-outline"
              onPress={() => setSearchString("")}
            />
          </Item>

          <Right style={{ flex: 0.2 }}>
            <Button transparent onPress={toggleSearchBar}>
              <Icon name="close"></Icon>
            </Button>
          </Right>
        </>
      ) : (
        <>
          <Left>
            <Button transparent onPress={openDrawerCallback}>
              <Icon name="menu-outline" />
            </Button>
          </Left>
          <Body>
            <Title>{title}</Title>
          </Body>
          <Right>
            {enableSearch ? (
              <Button transparent onPress={toggleSearchBar}>
                <Icon name="search-outline" />
              </Button>
            ) : (
              <></>
            )}
          </Right>
        </>
      )}
    </Header>
  );
}
