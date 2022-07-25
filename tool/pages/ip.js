import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  CircularProgress,
  Grid,
  Stack,
  Chip,
} from "@mui/material";
import Link from "next/link";

export default function ip() {
  const [list, setList] = useState([]);
  const [maplink, setmaplink] = useState();
  useEffect(() => {
    const create = async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_AWS_API}` + "/clients"
        // `${process.env.NEXT_PUBLIC_AWS_API}` + "/"+`${process.env.NEXT_PUBLIC_QUERY}`
      );

      // console.log(res.data);
      setList(res.data.data.reverse());

      return;
    };
    create();
  }, []);
  return (
    <div>
      <Box sx={{ bgcolor: "#888", p: 1, m: 3, width: "50%", color: "white" }}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography>Copy all data</Typography>{" "}
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="contained"
              color={"error"}
              onClick={() => {
                navigator.clipboard.writeText(JSON.stringify(list));
              }}
            >
              Copy
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Chip label={JSON.stringify(list)} />
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ p: 5, bgcolor: "#222" }}>
        <Grid container spacing={4}>
          {list.map((user) => (
            <Grid item md={6} xs={12}>
              <Box
                sx={{
                  color: "white",
                  borderRadius: 2,
                  width: "50%",
                  textAlign: "center",
                }}
              >
                <Typography>
                  {user.attributes.createdAt.substring(11, 19)}
                  {" on "}
                  {user.attributes.createdAt.substring(5, 7)}
                  {"/"}
                  {user.attributes.createdAt.substring(8, 10)}
                  {"/"}
                  {user.attributes.createdAt.substring(0, 4)}{" "}
                </Typography>
              </Box>
              <Box
                sx={{
                  backgroundColor: "#444",
                  p: 2,
                  borderRadius: 2,
                }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Box
                      sx={{
                        p: 1,
                        // m: 1,
                        bgcolor: "black",
                        color: "#00b159",
                        textAlign: "center",
                        borderRadius: 2,
                      }}
                    >
                      <Typography variant="h4">
                        {user.attributes.user.flag.emoji} {user.attributes.time}
                      </Typography>
                    </Box>
                  </Grid>
                  {/* <Grid item xs={12}>
                    <Box
                      sx={{
                        bgcolor: "black",
                        color: "#00aedb",
                        textAlign: "center",
                        borderRadius: 2,
                        p: 1,
                      }}
                    >
                      <Typography> {user.attributes.createdAt}</Typography>
                    </Box>
                  </Grid> */}

                  <Grid item xs={12} md={6}>
                    <Box
                      sx={{
                        textAlign: "center",
                        bgcolor: "black",
                        color: "#f37735",
                        borderRadius: 2,
                        p: 1,
                      }}
                    >
                      <Typography>
                        {" "}
                        {user.attributes.user.country},{" "}
                        {user.attributes.user.city},{" "}
                        {user.attributes.user.region},{" "}
                        {user.attributes.user.postal}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Box
                      sx={{
                        textAlign: "center",
                        bgcolor: "black",
                        color: "#d11141",
                        borderRadius: 2,
                        p: 1,
                      }}
                    >
                      <Typography>
                        {user.attributes.user.latitude},{" "}
                        {user.attributes.user.longitude}
                      </Typography>
                    </Box>{" "}
                    <Box
                      sx={{
                        textAlign: "center",
                        bgcolor: "black",
                        color: "#ffc425",
                        borderRadius: 2,
                        p: 1,
                        m: 2,
                      }}
                    >
                      <Typography variant={"caption"}>
                        {"https://www.google.com/maps/place/"}
                        {user.attributes.user.latitude},
                        {user.attributes.user.longitude}
                      </Typography>
                    </Box>
                  </Grid>

                  <Grid item xs={12}>
                    <Box sx={{ color: "#888", textAlign: "center" }}>
                      <Typography>
                        {" "}
                        {user.attributes.user.connection.domain},{" "}
                        {user.attributes.user.connection.isp},{" "}
                        {user.attributes.user.postal}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Chip label={JSON.stringify(user)} />
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
}
