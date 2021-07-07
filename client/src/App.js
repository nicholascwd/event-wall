import logo from "./logo.svg";
import React, { useState, useEffect } from "react";
import "./App.css";
import {
  Box,
  Container,
  Stack,
  Text,
  Link,
  Flex,
  Button,
  useColorModeValue,
  Center,
  propNames,
} from "@chakra-ui/react";
import Footer from "./Footer";
import Header from "./Header";
import SubmitNewButtons from "./Screens/SubmitNewButtons";
import Wall from "./Screens/Wall";
import Join from "./Common/Join";
import SubmitImage from "./Screens/SubmitImage";

function App() {
  const [user, setUser] = useState();
  const [updateState, setUpdateState] = useState();
  const [submitImage, setSubmitImage] = useState(false);

  const storedUser = localStorage.getItem("username");

  useEffect(() => {
    console.log("once");
    setUser(storedUser);
  }, [updateState]);

  function handleLogout() {
    localStorage.removeItem("username");
    setUpdateState(null);
  }

  return (
    <>
      {user && (
        <Box>
          {submitImage && (
            <SubmitImage
              value={() => {
                setSubmitImage(false);
              }}
            />
          )}

          {!submitImage && (
            <>
              <Box m={8} textAlign='right'>
                <Text>Welcome, {user}</Text>
                <Button m={4} onClick={handleLogout}>
                  Logout
                </Button>
              </Box>
              <Header />
              <Center m={10}>
                <Stack spacing={4} direction='row' align='center'>
                  <Button
                    colorScheme='teal'
                    size='md'
                    onClick={() => {
                      setSubmitImage(true);
                    }}
                  >
                    Submit Photo
                  </Button>
                  <Button colorScheme='teal' size='md'>
                    Submit Message
                  </Button>
                </Stack>
              </Center>
              <Wall />
            </>
          )}
          <Footer />
        </Box>
      )}
      {!user && <Join value={setUpdateState} />}
    </>
  );
}

export default App;