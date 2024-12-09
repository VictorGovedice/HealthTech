import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator,
} from "react-native";
import axios from "axios";

const categories = {
  mens: ["mens-shirts", "mens-shoes", "mens-watches"],
  womens: ["womens-bags", "womens-dresses", "womens-jewellery", "womens-shoes", "womens-watches"],
};

const ProductList = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState("mens");
  const [products, setProducts] = useState([]); // Armazena os produtos carregados
  const [loading, setLoading] = useState(false); // Indica se está carregando os dados

  const fetchProducts = async (category) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://dummyjson.com/products/category/${category}`
      );
      setProducts(response.data.products); // Atualiza a lista de produtos
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
    setLoading(false);
  };

  // Atualiza a lista de produtos quando a aba (masculino/feminino) muda
  useEffect(() => {
    fetchProducts(categories[activeTab][0]); // Carrega a primeira categoria por padrão
  }, [activeTab]);

  // Adiciona um novo produto à lista
  const handleAddProduct = () => {
    navigation.navigate("AddProduct", {
      addProduct: (newProduct) => {
        setProducts((prevProducts) => [newProduct, ...prevProducts]);
      },
    });
  };

  // Atualiza ou remove produtos da lista
  const handleEditOrDelete = (updatedProduct, productIdToDelete) => {
    if (updatedProduct) {
      // Atualiza o produto na lista
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === updatedProduct.id ? updatedProduct : product
        )
      );
    } else if (productIdToDelete) {
      // Remove o produto da lista
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== productIdToDelete)
      );
    }
  };

  const renderTabs = () => (
    <View style={styles.tabs}>
      <TouchableOpacity
        style={[styles.tab, activeTab === "mens" && styles.activeTab]}
        onPress={() => setActiveTab("mens")}
      >
        <Text style={[styles.tabText, activeTab === "mens" && styles.activeTabText]}>
          Masculino
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.tab, activeTab === "womens" && styles.activeTab]}
        onPress={() => setActiveTab("womens")}
      >
        <Text style={[styles.tabText, activeTab === "womens" && styles.activeTabText]}>
          Feminino
        </Text>
      </TouchableOpacity>
    </View>
  );

  const renderProduct = ({ item }) => (
    <TouchableOpacity
      style={styles.product}
      onPress={() =>
        navigation.navigate("ProductDetails", {
          product: item,
          editOrDeleteProduct: handleEditOrDelete,
        })
      }
    >
      <Image source={{ uri: item.thumbnail || item.imageUrl }} style={styles.productImage} />
      <View style={styles.productInfo}>
        <Text style={styles.productTitle}>{item.title || item.name}</Text>
        <Text style={styles.productPrice}>
          R$ {(item.price || 0).toFixed(2)} - {item.discount || 0}% OFF
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {renderTabs()}

      <FlatList
        data={categories[activeTab]}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryList}
        keyExtractor={(category) => category}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.categoryButton}
            onPress={() => fetchProducts(item)}
          >
            <Text style={styles.categoryText}>{item}</Text>
          </TouchableOpacity>
        )}
      />

      {loading ? (
        <ActivityIndicator size="large" color="#1c4ed8" />
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderProduct}
          contentContainerStyle={styles.productList}
        />
      )}

      <TouchableOpacity style={styles.addButton} onPress={handleAddProduct}>
        <Text style={styles.buttonText}>Adicionar Produto</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9fafb",
  },
  tabs: {
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#fff",
    paddingVertical: 10,
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginHorizontal: 5,
    backgroundColor: "#e5e7eb",
  },
  activeTab: {
    backgroundColor: "#1c4ed8",
  },
  tabText: {
    fontSize: 14,
    color: "#000",
  },
  activeTabText: {
    color: "#fff",
  },
  productList: {
    padding: 10,
  },
  product: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 10,
  },
  productInfo: {
    flex: 1,
  },
  productTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  productPrice: {
    fontSize: 14,
    color: "#888",
  },
  addButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#1c4ed8",
    padding: 15,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  categoryList: {
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  categoryButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#f3f4f6",
    borderRadius: 20,
    marginHorizontal: 5,
  },
  categoryText: {
    fontSize: 14,
    color: "#1c4ed8",
  },
});

export default ProductList;
