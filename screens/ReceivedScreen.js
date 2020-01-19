import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  FlatList,
  ActivityIndicator
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import Header from "../components/UI/Header";
import Subsection from "../components/UI/Subsection";
import InformationBlock from "../components/UI/InformationBlock";
import * as receivedGiftActions from "../store/actions/received";
import Colors from "../constants/Colors";
import Layout from "../constants/Layout";

const ReceivedScreen = () => {
  const dispatch = useDispatch();
  const loadingGifts = useSelector(store => store.received.loadingGifts);
  const receivedGifts = useSelector(store => store.received.receivedGifts);

  useEffect(() => {
    dispatch(receivedGiftActions.receiveGifts());
  }, [dispatch]);

  return (
    <SafeAreaView>
      <Header main title="Received Gifts" />
      <Subsection text="Ready to embark" />
      {loadingGifts === false ? (
        <View>
          {receivedGifts.length > 0 ? (
            <FlatList
              horizontal={true}
              keyExtractor={item => item.id}
              data={receivedGifts}
              renderItem={item => (
                <InformationBlock
                  name={item.item.name}
                  city={item.item.city}
                  user={item.item.user}
                  uid={item.item.uid}
                />
              )}
            />
          ) : (
            <FlatList
              horizontal={true}
              keyExtractor={item => item.id}
              data={[{ id: "0" }, { id: "1" }, { id: "2" }]}
              renderItem={item => <InformationBlock empty />}
            />
          )}
        </View>
      ) : (
        <ActivityIndicator
          style={styles.loadingIndicator}
          size="small"
          color={Colors.primary}
        />
      )}
      <Subsection text="Recent friends" />
      <FlatList
        horizontal={true}
        keyExtractor={item => item.id}
        data={[{ id: "0" }, { id: "1" }, { id: "2" }]}
        renderItem={item => <InformationBlock empty />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  loadingIndicator: {
    height: Layout.window.height / 5 + 15,
    width: Layout.window.width,
    alignSelf: "center"
  }
});

export default ReceivedScreen;
