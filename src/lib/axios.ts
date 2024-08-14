"use server"

import axios from "axios";
import {auth} from "@/auth";

const instance = axios.create({
    baseURL: process.env.API_URL,
});

// let isRefreshing = false;
// let failedQueue: any[] = [];
//
// const processQueue = (error: any, token: string | null = null) => {
//     failedQueue.forEach((prom) => {
//         if (token) {
//             prom.resolve(token);
//         } else {
//             prom.reject(error);
//         }
//     });
//
//     failedQueue = [];
// };
//
// instance.interceptors.response.use(
//     (response) => response,
//     async (error) => {
//         const originalRequest = error.config;
//
//         // Handle 401: Unauthorized (No token provided)
//         if (error.response?.status === 401 && !originalRequest._retry) {
//             originalRequest._retry = true;
//             try {
//                 const session = await auth();
//                 const token = session?.user.accessToken;
//                 instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
//                 originalRequest.headers["Authorization"] = `Bearer ${token}`;
//                 return instance(originalRequest);
//             } catch (refreshError) {
//                 return Promise.reject(refreshError);
//             }
//         }
//
//         // Handle 403: Forbidden (Invalid or expired token)
//         if (error.response?.status === 403 && !originalRequest._retry) {
//             if (isRefreshing) {
//                 return new Promise(function (resolve, reject) {
//                     failedQueue.push({ resolve, reject });
//                 })
//                     .then((token) => {
//                         originalRequest.headers["Authorization"] = `Bearer ${token}`;
//                         return instance(originalRequest);
//                     })
//                     .catch((err) => {
//                         return Promise.reject(err);
//                     });
//             }
//
//             originalRequest._retry = true;
//             isRefreshing = true;
//
//             return new Promise(async (resolve, reject) => {
//                 try {
//                     const newToken = await refreshTokenAction();
//                     console.log("New token: ", newToken);
//                     instance.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
//                     originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
//                     processQueue(null, newToken);
//                     resolve(instance(originalRequest));
//                 } catch (err) {
//                     processQueue(err, null);
//                     reject(err);
//                 } finally {
//                     isRefreshing = false;
//                 }
//             });
//         }
//
//         return Promise.reject(error);
//     }
// );

export default instance;