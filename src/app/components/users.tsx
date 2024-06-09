"use client";

import { useRouter } from "next/navigation";
import { ListUsers, User } from "../model/user";
import { useEffect, useState } from "react";
import { useScrollPosition } from "../hooks/useScrollPosition";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { getUsers } from "../api/getUser";
import { UserItem } from "./userItem";
import { LoadingSkeleton } from "./LoadingSkeleton";

export const Users = ({
  data,
  total,
  error,
}: {
  data: User[];
  total: number;
  error?: Error;
}) => {
  const [isFetching, setIsFetching] = useState(false);
  const { scrollPosition, setScrollPosition } = useScrollPosition();
  const { toast } = useToast();
  const [users, setUsers] = useState<User[]>(data);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);
  const [_error, _setError] = useState<Error | null>(error || null);
  useEffect(() => {
    if (
      scrollPosition > 99.99 &&
      offset + limit < total &&
      isFetching == false
    ) {
      setIsFetching(true);
    }
  }, [scrollPosition, isFetching, offset, limit, total]);
  useEffect(() => {
    window.history.scrollRestoration = "manual";
  }, []);
  useEffect(() => {
    async function fetchMore() {
      const { data, error } = await getUsers(offset + limit, 10);
      setIsFetching(false);
      setScrollPosition(0);
      if (error?.message) {
        _setError(error);
        return;
      }
      if (data?.users?.length && data?.users.length > 0) {
        setUsers([...users, ...data?.users]);
        setOffset(offset + limit);
      } else {
        _setError(
          new Error(
            data?.total === total ? "No more data to fetch." : "Failed to fetch"
          )
        );
      }
    }
    if (isFetching) {
      fetchMore();
    }
  }, [isFetching, offset, limit, total, users, setScrollPosition]);
  useEffect(() => {
    if (_error?.message) {
      toast({
        variant: "destructive",
        title: _error?.message,
      });
    }
  }, [_error, toast]);
  return (
    <div className="max-w-[600px] m-auto">
      {users.map((el) => (
        <div key={el.id}>
          <UserItem user={el} />
        </div>
      ))}
      {isFetching && offset + limit < total && <LoadingSkeleton />}
      {offset + limit >= total && (
        <div className="text-center p-4 font-bold">No more data</div>
      )}
    </div>
  );
};
