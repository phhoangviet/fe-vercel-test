"use client";

import { useRouter } from "next/navigation";
import { ListUsers, User } from "../model/user";
import { useEffect, useState } from "react";
import { useScrollPosition } from "../hooks/useScrollPosition";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { getUsers } from "../api/getUser";

export const Users = ({
  data,
  total,
  error,
}: {
  data: User[];
  total: number;
  error?: Error;
}) => {
  const router = useRouter();
  const [isFetching, setIsFetching] = useState(false);
  const scrolling = useScrollPosition();
  const { toast } = useToast();
  const [users, setUsers] = useState<User[]>(data);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(10);
  const [_error, _setError] = useState<Error | null>(error || null);
  useEffect(() => {
    if (scrolling > 99.99) {
      setIsFetching(true);
    }
  }, [scrolling, isFetching]);
  useEffect(() => {
    async function fetchMore() {
      const { data, error } = await getUsers(offset + limit, 10);
      setIsFetching(false);
      console.log(data, "data");
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
  }, [isFetching, offset, limit, total, users]);
  const onClick = () => {};
  useEffect(() => {
    if (_error?.message) {
      toast({
        variant: "destructive",
        title: _error?.message,
      });
    }
  }, [_error, toast]);
  return (
    <main>
      {users.map((el) => (
        <div key={el.id}>
          <div>
            <div># {el.id}</div>
            {el.first_name} {el.last_name} {el.email} {el.days}
            <div>total days for meeting {el.total_day_meeting}</div>
            <div>
              total days for free working{" "}
              {el.days - (el.total_day_meeting || 0)}
            </div>
            <hr />
            {el.meetings.map((m) => (
              <div key={m.id}>
                {m.room_id}: {m.start_day} {m.end_day}
                <div> totals meetings: {m.end_day - m.start_day + 1} days</div>
              </div>
            ))}
            <hr />
          </div>
        </div>
      ))}
    </main>
  );
};
