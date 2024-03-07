import axios from "axios";

export const BASE_URL = "https://openmind-api.vercel.app/4-19/";

export const apiAxios = axios.create({
  baseURL: BASE_URL, // 기본 서버 주소 입력
  headers: {
    Accept: "application/json; charset=UTF-8",
  },
});

export const BASIC_DEPLOY_URL = "https://openmind-life.vercel.app"; // 기본 배포 주소
