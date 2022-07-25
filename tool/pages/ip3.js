import React from "react";
import axios from "axios";

export default function ip3() {
  return <div></div>;
}
export async function getServerSideProps({ req }) {
  const forwarded = req.headers["x-forwarded-for"];
  const ip = forwarded
    ? forwarded.split(/, /)[0]
    : req.connection.remoteAddress;
  // ADD GEOLOCATION API CALL HERE
  await axios
    .post(`${process.env.NEXT_PUBLIC_AWS_API}` + "/clients", {
      data: {
        time: ip,
      },
    })
    .then((response) => {});
  return {
    props: null,
  };
}
