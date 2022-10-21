import React, { useState } from "react";
import { Modal, View } from "react-native";
import { CenteredView, Close, ModalBody, ModalView } from "./styles";
import { AntDesign } from "@expo/vector-icons";
interface Props {
  children: any;
  modalVisible: boolean;
  setModalVisible: (value: boolean) => void;
}

export function ModalComponent({
  modalVisible,
  setModalVisible,
  children,
}: Props) {
  return (
    <CenteredView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <CenteredView>
          <ModalView>
            <View style={{ alignItems: "flex-end" }}>
              <AntDesign
                name="closecircle"
                size={24}
                color="black"
                onPress={() => setModalVisible(false)}
              />
            </View>
            <ModalBody>{children}</ModalBody>
          </ModalView>
        </CenteredView>
      </Modal>
    </CenteredView>
  );
}
