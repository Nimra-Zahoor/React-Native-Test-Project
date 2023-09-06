import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";
import RNPickerSelect from "react-native-picker-select";
import { signup } from "../../APIcalls/Auth/authenticationAPIs";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import { fetchConstituencies } from "../../APIcalls/Constutiency/ConstituencyAPIs";
import { styles } from "./style";

const Signup = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [cnic, setCnic] = useState("");
  const [pictureUrl, setPictureUrl] = useState("");
  const [selectedConstituency, setSelectedConstituency] = useState();
  const [constituencies, setConstituencies] = useState([]);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    cnic: "",
    constituency: "",
    picture: "",
  });

  useEffect(() => {
    const fetchConstituenciesData = async () => {
      try {
        const constituenciesData = await fetchConstituencies();
        setConstituencies(constituenciesData);
      } catch (error) {
        console.error("Error fetching constituencies:", error);
      }
    };

    fetchConstituenciesData();
  }, []);

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .matches(/^[a-zA-Z\s]+$/, "Only letters and spaces are allowed")
      .required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    cnic: Yup.string()
      .matches(
        /^\d{5}-\d{7}-\d{1}$/,
        "Invalid CNIC format (e.g., 12345-1234567-1)"
      )
      .required("CNIC is required"),
    constituency: Yup.string().required("Select a constituency"),
  });

  const handleImagePick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      setSelectedImage(result.assets[0].uri);
      setPictureUrl(result.assets[0].uri);
    }
  };

  const handleSubmit = async (values) => {
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("password", values.password);
      formData.append("cnic", values.cnic);
      formData.append("constituency", values.constituency);

      if (selectedImage) {
        const uriParts = selectedImage.split(".");
        const fileType = uriParts[uriParts.length - 1];
        const fileName = getFileNameFromUrl(selectedImage);
        formData.append("picture", {
          uri: selectedImage,
          name: fileName,
          type: `image/${fileType}`,
        });
      }

      const response = await signup(formData);

    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  const getFileNameFromUrl = (url) => {
    const parts = url.split("/");
    return parts[parts.length - 1];
  };

  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        password: "",
        cnic: "",
        constituency: "",
        picture: null,
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ handleSubmit }) => (
        <View style={styles.container}>
          <Text style={styles.title}>Register Here</Text>
          <Field
            name="name"
            placeholder="Enter Your Name"
            placeholderTextColor="#888"
            component={TextInput}
            style={styles.input}
          />
          <ErrorMessage name="name" component={Text} style={styles.error} />

          <Field
            name="email"
            placeholder="Enter Your Email"
            placeholderTextColor="#888"
            component={TextInput}
            style={styles.input}
          />
          <ErrorMessage name="email" component={Text} style={styles.error} />

          <Field
            name="password"
            placeholder="Enter Your Password"
            secureTextEntry
            placeholderTextColor="#888"
            component={TextInput}
            style={styles.input}
          />
          <ErrorMessage name="password" component={Text} style={styles.error} />

          <Field
            name="cnic"
            placeholder="Enter Your CNIC"
            placeholderTextColor="#888"
            value={cnic}
            onChangeText={setCnic}
            component={TextInput}
            style={styles.input}
          />
          <ErrorMessage name="cnic" component={Text} style={styles.error} />

          <View>
            <Text>Select a constituency:</Text>

            <RNPickerSelect
              onValueChange={(value) => console.log("Selected value:", value)}
              items={constituencies?.map((constituency) => ({
                label: constituency.name,
                value: constituency._id,
                key: constituency._id,
              }))}
            />
          </View>

          <TouchableOpacity
            style={styles.uploadbutton}
            onPress={handleImagePick}
          >
            <Text>Choose a Picture</Text>
          </TouchableOpacity>
          {selectedImage && (
            <View style={styles.container}>
              <Image
                source={{ uri: selectedImage }}
                style={styles.selectedImage}
              />
              <TextInput
                style={styles.input}
                value={getFileNameFromUrl(selectedImage)}
                onChangeText={(text) => setSelectedImage(text)}
                placeholder="Selected Image URL"
                placeholderTextColor="#888"
              />
            </View>
          )}
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Sign up</Text>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  );
};

export default Signup;
