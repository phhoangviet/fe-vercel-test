import { Meeting } from "../model/user";

export const getListDayWithoutMeeting = (
  userDays: number,
  listMeetings: Meeting[]
) => {
  const map = new Map();
  if (userDays === 0) {
    return [];
  }
  let listUserDays = Array.from({ length: userDays }, (x, i) => i + 1);
  if (listMeetings.length === 0) {
    return listUserDays;
  }
  for (let i = 0; i < listMeetings.length; i++) {
    const curMeeting = listMeetings[i];

    for (let j = curMeeting.start_day; j <= curMeeting.end_day; j++) {
      if (!map.has(j)) {
        map.set(j, 1);
        listUserDays.splice(listUserDays.indexOf(j), 1);
      }
    }
  }
  return listUserDays;
};
