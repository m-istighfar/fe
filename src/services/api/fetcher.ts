"use client";

import { BASE_URL } from "@/constants";
import { showErrorToast, showSuccessToast } from "@/utils/swal";

export const fetcher = (url: string) => {
  return fetch(`${BASE_URL}/${url}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(async (res) => {
      if (!res.ok) {
        throw new Error("Failed to fetch");
      }
      const data = await res.json();
      return data;
    })
    .catch((e) => {
      console.log(e);

      throw e;
    });
};

export const fetcherWithoutAuth = async (url: string) => {
  try {
    const response = await fetch(`${BASE_URL}/${url}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

const hasFile = (data: object): boolean => {
  return Object.values(data).some((value) => {
    if (Array.isArray(value)) {
      return value.some((item) => item instanceof File);
    }
    return value instanceof File;
  });
};

export const sendData = async <T, D extends object>(
  url: string,
  data: D,
  method: "POST" | "PUT" | "DELETE" | "PATCH"
): Promise<T> => {
  const isFormData = data instanceof FormData;
  const shouldUseFormData = isFormData || hasFile(data);

  const headers: HeadersInit = {};

  if (!shouldUseFormData) {
    headers["Content-Type"] = "application/json";
  }

  const options: RequestInit = {
    method,
    headers,
  };

  if (method !== "DELETE") {
    options.body = isFormData
      ? (data as FormData)
      : shouldUseFormData
      ? convertToFormData(data)
      : JSON.stringify(data);
  }

  const response = await fetch(`${BASE_URL}/${url}`, options);
  const responseData = await response.json();

  if (!response.ok) {
    if (responseData.message === "Invalid Input" && responseData.data) {
      const errors = Object.entries(responseData.data)
        .map(
          ([field, messages]) =>
            `• ${field.charAt(0).toUpperCase() + field.slice(1)}: ${(
              messages as string[]
            ).join(", ")}`
        )
        .join("\n");
      showErrorToast(`${responseData.message}\n\n${errors}`);
    } else {
      showErrorToast(responseData.message || "Terjadi kesalahan pada server");
    }
    throw responseData;
  }

  if (responseData.message) {
    showSuccessToast(responseData.message);
  }

  return responseData as Promise<T>;
};

const convertToFormData = <D extends object>(data: D): FormData => {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((item) => formData.append(key, item as string | Blob));
    } else {
      formData.append(key, value as string | Blob);
    }
  });

  return formData;
};
