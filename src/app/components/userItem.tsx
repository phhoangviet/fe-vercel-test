"use client";
import { Badge, badgeVariants } from "@/components/ui/badge";
import { User } from "../model/user";
import { useEffect, useState } from "react";
import { getListDayWithoutMeeting } from "../utils/getListDayWithoutMeeting";

export const UserItem = ({ user }: { user: User }) => {
  const [daysWithoutMeetings, setDaysWithoutMeeting] = useState<number[]>([]);

  useEffect(() => {
    const data = getListDayWithoutMeeting(user.days, user.meetings);
    setDaysWithoutMeeting(data);
  }, [user]);
  return (
    <div className="grid grid-cols-2 gap-2 justify-end border-b  border-b-gray-400 p-4">
      <div>ID</div>
      <div>{user.id}</div>
      <div>Fullname: </div>
      <div>
        {user.first_name} {user.last_name}
      </div>
      <div>Email: </div>
      <div>{user.email}</div>
      <div>Gender: </div>
      <div>{user.gender}</div>
      <div>Available work days</div>
      <div>{user.days}</div>
      <div>Meeting days</div>
      <div>
        {user.meetings.length > 0
          ? user.meetings.map((el) => (
              <div key={el.id}>
                <span>Room {el.room_id}</span>
                <span className="ml-2">
                  <Badge className={badgeVariants({ variant: "default" })}>
                    {`${el.start_day} -> ${el.end_day}`}
                  </Badge>{" "}
                </span>
              </div>
            ))
          : 0}
      </div>
      <div> Days without meeting </div>
      <div>{`${
        user.days === 0
          ? "No available day."
          : daysWithoutMeetings.length === 0
          ? "No day free working."
          : daysWithoutMeetings.join(", ")
      }`}</div>
    </div>
  );
};
