import Image from "next/image";
import { API_HOST } from "./constants/configs";
import { ListUsers } from "./model/user";
import { Users } from "./components/users";
import Error from "next/error";
import { getUsers } from "./api/getUser";
import { Suspense } from "react";
import Loading from "./loading";
export default async function Home({
  params: { offset, limit },
}: {
  params: { offset: number; limit: number };
}) {
  const { data, error } = await getUsers(offset, limit);

  return (
    <main>
      <Suspense fallback={<Loading />}>
        <Users
          data={data?.users || []}
          total={data?.total || 0}
          error={error}
        />
      </Suspense>
    </main>
  );
}
