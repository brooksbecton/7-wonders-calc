import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { JoinTable } from "../../components/JoinTable";
import { getUserId } from "../../utils/getUserId";

const join: NextPage = () => {
  const [userId, setUserId] = useState<string>();
  const { tableId: tableIdQueryParameter } = useRouter().query;

  const tableId =
    typeof tableIdQueryParameter === "string" ? tableIdQueryParameter : "";
  const getInitialData = async () => {
    const newUserId = await getUserId();
    setUserId(newUserId);
  };

  useEffect(() => {
    getInitialData();
  }, []);

  const isLoading = !userId;

  if (isLoading) {
    return <p>Loading</p>;
  }

  return <JoinTable userId={userId} tableId={tableId} />;
};

export default join;
