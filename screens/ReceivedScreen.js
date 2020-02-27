import React, { useState, useEffect, useCallback } from "react";
import {
  ActivityIndicator,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  FlatList,
  View,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import Header from "../components/UI/Header";
import Subsection from "../components/UI/Subsection";
import InformationBlock from "../components/UI/InformationBlock";
import * as receivedGiftActions from "../store/actions/received";
import Colors from "../constants/Colors";
import Layout from "../constants/Layout";

const ReceivedScreen = props => {
  const dispatch = useDispatch();
  const loadingGifts = useSelector(store => store.received.loadingGifts);
  const receivedGifts = useSelector(store => store.received.receivedGifts);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setIsRefreshing(true);

    dispatch(receivedGiftActions.receiveGifts());
    setIsRefreshing(false);
  }, [isRefreshing]);

  useEffect(() => {
    dispatch(receivedGiftActions.receiveGifts());
  }, [dispatch]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }
      >
        <Header main title="Received Gifts" />
        <Subsection text="Ready to embark" />
        {loadingGifts === false ? (
          <View>
            {receivedGifts.length > 0 ? (
              <FlatList
                horizontal={true}
                keyExtractor={item => item.id}
                data={receivedGifts}
                showsHorizontalScrollIndicator={false}
                renderItem={item => (
                  <InformationBlock
                    navigation={props.navigation}
                    id={item.item.id}
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
                showsHorizontalScrollIndicator={false}
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
          showsHorizontalScrollIndicator={false}
          data={[{ id: "0" }, { id: "1" }, { id: "2" }]}
          renderItem={item => <InformationBlock empty />}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff"
  },
  loadingIndicator: {
    height: Layout.window.height / 5 + 15,
    width: Layout.window.width,
    alignSelf: "center"
  }
});

export default ReceivedScreen;
