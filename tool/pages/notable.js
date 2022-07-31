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
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import Link from "next/link";
import Script from "next/script";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function Ip2({ serverlist }) {
  const [list, setList] = useState([]);
  const [maplink, setmaplink] = useState();

  useEffect(() => {
    if (!list) return;
    setmaplink("");
  }, []);

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
  return (
    <div>
      <Box sx={{ pl: 2, pr: 5, bgcolor: "#444" }}>
        <Box
          sx={{
            backgroundColor: "#bbb",
            p: 2,
            borderRadius: 2,
            border: 3,
            borderColor: "black",
            mt: 3,
          }}
        >
          <Typography>All Notable</Typography>
          {serverlist.map((user, i) => (
            <div key={i}>
              {user.attributes?.isNotable && (
                <Accordion
                  sx={{
                    m: 1,
                    backgroundColor: "#ccc",
                    borderRadius: 2,
                    border: 1,
                    borderColor: "black",
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Grid item sx={12}>
                      <Divider />
                    </Grid>
                    <Grid container>
                      <Grid item md={2} xs={12}>
                        {"#"}
                        {i}
                      </Grid>

                      <Grid item md={2} xs={12}>
                        <Typography>
                          {user.attributes.user.flag.emoji}{" "}
                          {user.attributes.time}
                        </Typography>
                      </Grid>
                      <Grid item md={5} xs={12}>
                        <Typography>
                          {user.attributes.user.country},{" "}
                          {user.attributes.user.city},{" "}
                          {user.attributes.user.region},{" "}
                          {user.attributes.user.postal}
                        </Typography>
                      </Grid>
                      <Grid item md={3} xs={12}>
                        <Typography>
                          {user.attributes.createdAt.substring(11, 19)}
                          {" on "}
                          {user.attributes.createdAt.substring(5, 7)}
                          {"/"}
                          {user.attributes.createdAt.substring(8, 10)}
                          {"/"}
                          {user.attributes.createdAt.substring(0, 4)}{" "}
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Divider />
                      </Grid>
                    </Grid>
                  </AccordionSummary>{" "}
                  <AccordionDetails>
                    <Box
                      sx={{
                        backgroundColor: "#bbb",
                        p: 2,
                        borderRadius: 2,
                        border: 1,
                        borderColor: "black",
                      }}
                    >
                      <Grid container spacing={2}>
                        <Grid item md={6} xs={12}>
                          <Box
                            sx={{
                              p: 1,
                              // m: 1,
                              bgcolor: "#ccc",
                              color: "#111",
                              textAlign: "center",
                              borderRadius: 2,
                              border: 1,
                              borderColor: "black",
                              minHeight: 80,
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "center",
                            }}
                          >
                            <Typography variant="h6">
                              {user.attributes.user.flag.emoji}{" "}
                              {user.attributes.time}
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Box
                            sx={{
                              textAlign: "center",
                              bgcolor: "#ccc",
                              color: "#111",
                              border: 1,
                              borderColor: "black",
                              borderRadius: 2,
                              p: 1,
                              minHeight: 80,
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "center",
                            }}
                          >
                            {" "}
                            <Typography variant="h6">
                              {user.attributes.createdAt.substring(11, 19)}
                              {" on "}
                              {user.attributes.createdAt.substring(5, 7)}
                              {"/"}
                              {user.attributes.createdAt.substring(8, 10)}
                              {"/"}
                              {user.attributes.createdAt.substring(0, 4)}{" "}
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Box
                            sx={{
                              textAlign: "center",
                              bgcolor: "#ccc",
                              color: "#111",
                              border: 1,
                              borderColor: "black",
                              borderRadius: 2,
                              p: 1,
                              minHeight: 100,
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "center",
                            }}
                          >
                            {" "}
                            <Typography variant="h6">
                              {user.attributes.user.country},{" "}
                              {user.attributes.user.city},{" "}
                              {user.attributes.user.region},{" "}
                              {user.attributes.user.postal}
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item md={6} xs={12}>
                          <Box
                            sx={{
                              textAlign: "center",
                              bgcolor: "#ccc",
                              color: "#111",
                              border: 1,
                              borderColor: "black",
                              borderRadius: 2,
                              p: 1,
                              minHeight: 100,
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "center",
                            }}
                          >
                            <Typography variant="h6">
                              {user.attributes.user.latitude},{" "}
                              {user.attributes.user.longitude}
                            </Typography>
                          </Box>{" "}
                        </Grid>
                        <Grid item md={6} xs={12}>
                          <Box
                            sx={{
                              textAlign: "center",
                              bgcolor: "#ccc",
                              color: "#111",
                              border: 1,
                              borderColor: "black",
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
                            {user.attributes.user.latitude && (
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: `<iframe
                          width="100%"
                          height="500"
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
                        <Grid item md={6} xs={12}>
                          <Box
                            sx={{
                              textAlign: "left",
                              bgcolor: "#ccc",
                              color: "#000",
                              border: 1,
                              borderColor: "black",
                              borderRadius: 2,
                              p: 1,
                              m: 2,
                              minHeight: 400,
                            }}
                          >
                            <Box sx={{ color: "#aaa" }}>
                              <Typography variant={"h5"}>
                                Descripition
                              </Typography>
                            </Box>
                            <Typography>
                              {user.attributes.description}
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
                  </AccordionDetails>
                </Accordion>
              )}
            </div>
          ))}
        </Box>
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