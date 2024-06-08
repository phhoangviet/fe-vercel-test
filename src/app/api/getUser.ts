import { API_HOST } from "../constants/configs";
import { WrapResponse } from "../model/http";
import { ListUsers } from "../model/user";

export const getUsers = async (
  offset: number,
  limit: number
): Promise<WrapResponse<ListUsers>> => {
  let resWrap: WrapResponse<ListUsers> = {};
  try {
    const res = await fetch(
      `${API_HOST}/users?offset=${offset}&limit=${limit}`
    );
    resWrap.status = res.statusText;
    resWrap.statusCode = res.status;
    const data = await res.json();
    if (!res.ok) {
      resWrap.error = data;
    } else {
      resWrap.data = data;
    }
  } catch (error) {
    resWrap.statusCode = 500;

    resWrap.error = new Error(`Failed to fetch data`);
  }
  return resWrap;
};
