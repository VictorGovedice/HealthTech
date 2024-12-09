import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Para armazenamento persistente

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ username: false, password: false });

  // Função para validar o formulário
  const validateForm = () => {
    let isValid = true;
    const newErrors = { username: false, password: false };

    if (!username.trim()) {
      newErrors.username = true;
      isValid = false;
    }

    if (!password.trim()) {
      newErrors.password = true;
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Função para realizar o login
  const handleLogin = async () => {
    if (!validateForm()) {
      return;
    }
  
    setLoading(true);
  
    try {
      const response = await fetch("https://dummyjson.com/users");
      const data = await response.json();
  
      // Procurar o usuário pelo username
      const user = data.users.find((u) => u.username === username);
  
      if (!user) {
        // Exibe alerta se o usuário não for encontrado
        Alert.alert("Erro", "Usuário não encontrado. Verifique o username.");
      } else if (user.password !== password) {
        // Exibe alerta se a senha estiver incorreta
        Alert.alert("Erro", "Senha incorreta. Tente novamente.");
      } else {
        // Login bem-sucedido
        const fakeToken = "fake_token_12345"; // Token simulado
        await AsyncStorage.setItem("userToken", fakeToken); // Armazena o token
        await AsyncStorage.setItem("userInfo", JSON.stringify(user)); // Armazena informações do usuário
  
        Alert.alert("Sucesso", "Login realizado com sucesso!");
        console.log("Token Simulado:", fakeToken);
        console.log("Usuário Logado:", user);
  
        // Redireciona para a tela UserProfile com os dados do usuário
        navigation.navigate("UserProfile", { user });
      }
    } catch (error) {
      Alert.alert("Erro", "Erro ao se comunicar com o servidor.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Text style={styles.welcomeText}>Bem-vindo de volta!</Text>
        <Text style={styles.subText}>
          Insira seus dados para entrar na sua conta.
        </Text>
      </View>
      <View style={styles.formContainer}>
        <TextInput
          style={[styles.input, errors.username ? styles.inputError : null]}
          placeholder="Username"
          value={username}
          onChangeText={(text) => {
            setUsername(text);
            setErrors({ ...errors, username: false });
          }}
          autoCapitalize="none"
        />
        {errors.username && (
          <Text style={styles.errorText}>O campo de username é obrigatório.</Text>
        )}

        <TextInput
          style={[styles.input, errors.password ? styles.inputError : null]}
          placeholder="Senha"
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            setErrors({ ...errors, password: false });
          }}
          secureTextEntry
        />
        {errors.password && (
          <Text style={styles.errorText}>O campo de senha é obrigatório.</Text>
        )}

        <TouchableOpacity
          style={styles.button}
          onPress={handleLogin}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? "Carregando..." : "Entrar"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1c4ed8", // Fundo azul
    justifyContent: "center",
  },
  topContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff", // Texto branco
    marginBottom: 10,
  },
  subText: {
    fontSize: 14,
    color: "#d1d5db", // Cinza claro
    textAlign: "center",
    marginHorizontal: 20,
  },
  formContainer: {
    flex: 2,
    backgroundColor: "#fff", // Fundo branco
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 20,
    alignItems: "center",
  },
  input: {
    backgroundColor: "#f9fafb",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 8,
    width: "100%",
    padding: 12,
    marginBottom: 10,
    fontSize: 16,
  },
  inputError: {
    borderColor: "#f87171", // Vermelho para erros
  },
  errorText: {
    color: "#f87171", // Texto vermelho para erros
    fontSize: 14,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#1c4ed8",
    padding: 15,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default LoginScreen;
