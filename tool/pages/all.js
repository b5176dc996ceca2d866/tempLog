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
  Container,
} from "@mui/material";
import Link from "next/link";
import Script from "next/script";

export default function Ip({ serverlist }) {
  const [list, setList] = useState();
  const [maplink, setmaplink] = useState();

  useEffect(() => {
    if (!list) return;
    setmaplink("");
  }, [list]);

  useEffect(() => {
    const create = async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_AWS_API}` + "/clients"
        // `${process.env.NEXT_PUBLIC_STRAPI_URL}` + "/clients"
        // `${process.env.NEXT_PUBLIC_AWS_API}` + "/"+`${process.env.NEXT_PUBLIC_QUERY}`
      );

      console.log(res.data);
      setList(res.data.data.reverse());

      return;
    };
    create();
  }, []);

  const downloadTxtFile = () => {
    const element = document.createElement("a");
    const file = new Blob([JSON.stringify(list)], {
      type: "text/plain",
    });
    element.href = URL.createObjectURL(file);
    element.download = "IP_LOG: " + new Date();
    document.body.appendChild(element);
    element.click();
  };
  return (
    <div>
      <Box sx={{ pl: 5, pr: 5, pt: 3 }}>
        <Box
          sx={{
            textAlign: "center",
            p: 3,
            color: "#000",
            bgcolor: "#ccc",
            borderRadius: 2,
            width: "50%",
            m: "auto",
            mb: 3,
          }}
        >
          <Typography variant="h2">All logs</Typography>
          <Link href="/notable">
            <Chip color="error" label={"View notable logs"} />
          </Link>
        </Box>
        <Box
          sx={{
            bgcolor: "#888",
            p: 1,
            m: 3,
            width: "60%",
            ml: "20%",
            color: "white",
            borderRadius: 2,
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Box sx={{ textAlign: "center", p: 2 }}>
                <Chip label={"Download Data"} />
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box sx={{ textAlign: "center", p: 1 }}>
                {/* <Button
                variant="contained"
                color={"error"}
                onClick={() => {
                  navigator.clipboard.writeText(JSON.stringify(list));
                }}
              >
                Copy
              </Button> */}
                <Button
                  variant="contained"
                  color={"error"}
                  onClick={downloadTxtFile}
                >
                  download
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Chip label={JSON.stringify(list)} />
            </Grid>
          </Grid>
        </Box>
        <Grid container spacing={4}>
          {serverlist.map((user, i) => (
            <Grid item md={6} xs={12} key={i}>
              <Box
                sx={{
                  backgroundColor: "#ccc",
                  p: 2,
                  borderRadius: 2,
                  border: 1,
                  borderColor: "black",
                }}
              >
                <Box
                  sx={{
                    color: "black",
                    borderRadius: 2,
                    width: "50%",
                    textAlign: "center",
                  }}
                >
                  {"# "}
                  {user.id}
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
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Box
                      sx={{
                        p: 1,
                        // m: 1,
                        bgcolor: "#fff",
                        color: "#000",
                        textAlign: "center",
                        borderRadius: 2,
                        border: 1,
                        borderColor: "black",
                      }}
                    >
                      <Typography variant="h4">
                        {user.attributes.user.flag.emoji} {user.attributes.time}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Box
                      sx={{
                        textAlign: "center",
                        bgcolor: "#fff",
                        color: "#000",
                        borderRadius: 2,
                        p: 1,
                        minHeight: 70,
                        border: 1,
                        borderColor: "black",
                      }}
                    >
                      {" "}
                      <Typography>
                        {user.attributes.user.country},{" "}
                        {user.attributes.user.city},{" "}
                        {user.attributes.user.region},{" "}
                        {user.attributes.user.postal}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item md={6} xs={12}>
                    {user.attributes?.isNotable && (
                      <Link href={"/notable"}>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            textAlign: "center",
                            minWidth: 50,
                            minHeight: 70,
                            bgcolor: "#77858f",
                            color: "white",
                            borderRadius: 2,
                            cursor: "pointer",
                          }}
                        >
                          <Typography>Notable</Typography>
                        </Box>
                      </Link>
                    )}
                  </Grid>
                  <Grid item xs={12}>
                    <Box
                      sx={{
                        textAlign: "center",
                        bgcolor: "#fff",
                        color: "#000",
                        borderRadius: 2,
                        p: 1,
                        border: 1,
                        borderColor: "black",
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
                        bgcolor: "#fff",
                        color: "#000",
                        borderRadius: 2,
                        p: 1,
                        m: 2,
                        border: 1,
                        borderColor: "black",
                      }}
                    >
                      {/* <Typography variant={"caption"}>
                        {"https://www.google.com/maps/place/"}
                        {user.attributes.user.latitude},
                        {user.attributes.user.longitude}
                      </Typography> */}
                      {user.attributes.user.latitude && (
                        <div
                          dangerouslySetInnerHTML={{
                            __html: `<iframe
                          width="200"
                          height="200"
                          frameBorder="0"
                          scrolling="no"
                          loading="lazy"
                          src="https://maps.google.com/maps?f=q&amp;saddr=${user.attributes.user.latitude},${user.attributes.user.longitude}&amp;source=s_d&amp;hl=en&amp;z=15&amp;output=embed"
                        ></iframe>`,
                          }}
                        ></div>
                      )}
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

export async function getServerSideProps() {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_AWS_API}` + "/clients"
    // `${process.env.NEXT_PUBLIC_STRAPI_URL}` + "/clients"
  );
  const serverlist = res.data.data.reverse();
  return { props: { serverlist } };
}
