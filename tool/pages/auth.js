import React from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Container } from "@mui/system";
import { TextField, Grid, Button, Box, Stack } from "@mui/material";
import Image from "next/image";
import bg from "../public/wires.jpg";

export default function Auth() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [pw, setPw] = useState("");
  const [redirect, setRedirect] = useState("");

  const usernameHandler = (event) => {
    setUsername(event.target.value);
  };

  const pwHandler = (event) => {
    setPw(event.target.value);
  };

  const create = async () => {
    axios
      .post(`${process.env.NEXT_PUBLIC_AWS_API}` + "/auth/local", {
        identifier: username,
        password: pw,
      })
      .then((response) => {
        console.log("User profile", response.data.user);
        // setRedirect(response.data.jwt);
        router.push(
          `${process.env.NEXT_PUBLIC_URL}` + "/all?token=" + response.data.jwt
        );
        console.log("User token", response.data.jwt);
      })
      .catch((error) => {
        console.log("An error occurred:", error.response);
      });
  };

  return (
    <div>
      <Container
        sx={{ bgcolor: "#ccc", p: 2, mt: 4, textAlign: "center", width: 300 }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Stack justifyContent={"space-around"}>
              <Image src="/wires.jpg" alt="" height={200} width={"200"} />
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label={"username"}
              onChange={usernameHandler}
              value={username}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField label={"password"} onChange={pwHandler} value={pw} type="password"/>
          </Grid>{" "}
          <Grid item xs={12}>
            <Button variant="contained" color="error" onClick={create}>
              Submit
            </Button>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
