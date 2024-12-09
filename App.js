import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import UserProfile from './screens/UserProfile';
import ProductList from './screens/ProductList';
import ProductDetails from './screens/ProductDetails';
import AddProduct from './screens/AddProduct';

const Stack = createStackNavigator();

const App = () => {
  // Estado centralizado para gerenciar a lista de produtos
  const [products, setProducts] = useState([]);

  // Função para adicionar um produto
  const addProduct = (product) => {
    setProducts((prevProducts) => [...prevProducts, product]);
  };

  // Função para editar um produto
  const editProduct = (updatedProduct) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
  };

  // Função para deletar um produto
  const deleteProduct = (productId) => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== productId)
    );
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen">
        {/* Tela de Login */}
        <Stack.Screen 
          name="LoginScreen" 
          component={LoginScreen} 
          options={{ title: 'Login' }} 
        />
        
        {/* Tela de Perfil do Usuário */}
        <Stack.Screen 
          name="UserProfile" 
          component={UserProfile} 
          options={{ title: 'Perfil do Usuário' }} 
        />
        
        {/* Tela de Lista de Produtos */}
        <Stack.Screen 
          name="ProductList" 
          options={{ title: 'Lista de Produtos' }}
        >
          {(props) => (
            <ProductList
              {...props}
              products={products}
              deleteProduct={deleteProduct}
            />
          )}
        </Stack.Screen>
        
        {/* Tela de Detalhes do Produto */}
        <Stack.Screen 
          name="ProductDetails" 
          options={{ title: 'Detalhes do Produto' }}
        >
          {(props) => (
            <ProductDetails 
              {...props} 
              products={products} 
              editProduct={editProduct} 
              deleteProduct={deleteProduct} 
            />
          )}
        </Stack.Screen>
        
        {/* Tela de Adicionar Produto */}
        <Stack.Screen 
          name="AddProduct" 
          options={{ title: 'Adicionar Produto' }}
        >
          {(props) => (
            <AddProduct 
              {...props} 
              addProduct={addProduct} 
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
