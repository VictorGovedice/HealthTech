import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";

const ProductDetails = ({ route, navigation }) => {
  const { product, editOrDeleteProduct } = route.params; // Produto e função de edição/remoção
  const [isEditing, setIsEditing] = useState(false); // Controla o modo de edição
  const [editedProduct, setEditedProduct] = useState({ ...product }); // Estado do produto editado

  // Salva as alterações feitas no produto
  const handleSave = () => {
    if (!editedProduct.title || !editedProduct.price || !editedProduct.thumbnail) {
      Alert.alert("Erro", "Preencha todos os campos obrigatórios!");
      return;
    }
    // Atualiza o produto na lista localmente
    editOrDeleteProduct(editedProduct); // Passa o produto atualizado para o componente pai
    setIsEditing(false); // Sai do modo de edição
    Alert.alert("Sucesso", "Produto atualizado com sucesso!");
  };

  // Deleta o produto da lista localmente
  const handleDelete = () => {
    Alert.alert(
      "Confirmação",
      "Você tem certeza que deseja deletar este produto?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Deletar",
          style: "destructive",
          onPress: () => {
            // Passa null para excluir o produto da lista
            editOrDeleteProduct(null, product.id);
            navigation.goBack(); // Retorna à tela anterior
          },
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      {isEditing ? (
        <>
          <Text style={styles.label}>Título:</Text>
          <TextInput
            style={styles.input}
            value={editedProduct.title}
            onChangeText={(text) =>
              setEditedProduct((prev) => ({ ...prev, title: text }))
            }
          />

          <Text style={styles.label}>Descrição:</Text>
          <TextInput
            style={styles.input}
            value={editedProduct.description}
            onChangeText={(text) =>
              setEditedProduct((prev) => ({ ...prev, description: text }))
            }
            multiline
          />

          <Text style={styles.label}>Preço (R$):</Text>
          <TextInput
            style={styles.input}
            value={editedProduct.price.toString()}
            onChangeText={(text) =>
              setEditedProduct((prev) => ({
                ...prev,
                price: parseFloat(text),
              }))
            }
            keyboardType="numeric"
          />

          <Text style={styles.label}>URL da Imagem:</Text>
          <TextInput
            style={styles.input}
            value={editedProduct.thumbnail}
            onChangeText={(text) =>
              setEditedProduct((prev) => ({ ...prev, thumbnail: text }))
            }
          />

          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Salvar Alterações</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Image source={{ uri: product.thumbnail }} style={styles.image} />
          <View style={styles.infoContainer}>
            <Text style={styles.title}>{product.title}</Text>
            <Text style={styles.description}>{product.description}</Text>
            <Text style={styles.price}>
              R$ {product.price.toFixed(2)}
            </Text>
            <Text style={styles.category}>Categoria: {product.category}</Text>
            <Text style={styles.rating}>Avaliação: ⭐ {product.rating}/5</Text>
            <Text style={styles.stock}>
              Estoque: {product.stock > 0 ? product.stock : "Indisponível"}
            </Text>
          </View>

          <TouchableOpacity
            style={styles.editButton}
            onPress={() => setIsEditing(true)}
          >
            <Text style={styles.editButtonText}>Editar Produto</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
            <Text style={styles.deleteButtonText}>Deletar Produto</Text>
          </TouchableOpacity>
        </>
      )}

      <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Voltar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 10 },
  image: { width: "100%", height: 250, resizeMode: "contain", marginBottom: 20 },
  infoContainer: { padding: 10 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  description: { fontSize: 16, color: "#555", marginBottom: 10 },
  price: { fontSize: 20, fontWeight: "bold", marginBottom: 10, color: "#000" },
  category: { fontSize: 16, color: "#888", marginBottom: 5 },
  rating: { fontSize: 16, color: "#888", marginBottom: 5 },
  stock: { fontSize: 16, color: "#888", marginBottom: 20 },
  label: { fontSize: 16, fontWeight: "bold", marginBottom: 5 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: "#4CAF50",
    padding: 15,
    alignItems: "center",
    borderRadius: 5,
    marginTop: 10,
  },
  saveButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  editButton: {
    backgroundColor: "#FFC107",
    padding: 15,
    alignItems: "center",
    borderRadius: 5,
    marginTop: 20,
  },
  deleteButton: {
    backgroundColor: "#F44336",
    padding: 15,
    alignItems: "center",
    borderRadius: 5,
    marginTop: 10,
  },
  deleteButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  button: {
    backgroundColor: "#000",
    padding: 15,
    alignItems: "center",
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});

export default ProductDetails;
