"use client";
import React, { use, useState } from "react";
import styles from "./page.module.css";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

const Dashboard = () => {
  // const [data, setData] = useState([]);
  // const [err, setErr] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     setIsLoading(true);
  //     try {
  //       const response = await fetch("/api/dashboard", {
  //         cache: "no-store",
  //       });
  //       const result = await response.json();
  //       setData(result);
  //     } catch (error) {
  //       console.error("Error fetching dashboard data:", error);
  //       setErr(true);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };
  //   fetchData();
  // });

  const { data, error, isLoading } = useSWR(
    "https://jsonplaceholder.typicode.com/posts",
    fetcher,
  );

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Failed to load</p>;
  console.log(data);
  return <div className={styles.container}>Dashboard {data[0].body}</div>;
};

export default Dashboard;
