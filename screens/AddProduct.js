import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";

const AddProduct = ({ route, navigation }) => {
  const { addProduct } = route.params; // Função para adicionar o produto na lista
  const [product, setProduct] = useState({
    id: Date.now(), // Gera um ID único com base no timestamp atual
    title: "",
    price: "",
    thumbnail: "",
    discount: 0,
  });

  const handleSave = () => {
    if (!product.title || !product.price || !product.thumbnail) {
      Alert.alert("Erro", "Preencha todos os campos obrigatórios!");
      return;
    }

    addProduct(product); // Adiciona o produto na lista
    navigation.goBack(); // Retorna para a tela anterior
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Título do Produto:</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o título"
        value={product.title}
        onChangeText={(text) => setProduct({ ...product, title: text })}
      />

      <Text style={styles.label}>Preço (R$):</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o preço"
        value={product.price}
        onChangeText={(text) => setProduct({ ...product, price: parseFloat(text) })}
        keyboardType="numeric"
      />

      <Text style={styles.label}>URL da Imagem:</Text>
      <TextInput
        style={styles.input}
        placeholder="Cole a URL da imagem"
        value={product.thumbnail}
        onChangeText={(text) => setProduct({ ...product, thumbnail: text })}
      />

      <Text style={styles.label}>Desconto (%):</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o desconto (opcional)"
        value={product.discount.toString()}
        onChangeText={(text) => setProduct({ ...product, discount: parseFloat(text) || 0 })}
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Salvar Produto</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9fafb",
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  saveButton: {
    backgroundColor: "#1c4ed8",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default AddProduct;
