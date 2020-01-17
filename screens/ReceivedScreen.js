import React from "react";
import { View, Text, StyleSheet, SafeAreaView, FlatList } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import Header from "../components/UI/Header";
import Subsection from "../components/UI/Subsection";
import InformationBlock from "../components/UI/InformationBlock";
import * as receivedGiftActions from "../store/actions/received";

const ReceivedScreen = () => {
  const dispatch = useDispatch();
  const receivedGifts = useSelector(store => store.received.receivedGifts);

  dispatch(receivedGiftActions.receiveGifts());

  return (
    <SafeAreaView>
      <Header main title="Received Gifts" />
      <Subsection text="Ready to embark" />
      {receivedGifts !== null ? (
        <FlatList
          horizontal={true}
          keyExtractor={item => item.id}
          data={receivedGifts}
          renderItem={item => (
            <InformationBlock name={item.item.name} city={item.item.city} />
          )}
        />
      ) : (
        <Text>No Received Gifts! :(</Text>
      )}

      <Subsection text="Recent friends" />
    </SafeAreaView>
  );
};

export default ReceivedScreen;
