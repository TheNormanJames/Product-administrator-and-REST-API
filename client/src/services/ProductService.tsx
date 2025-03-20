import { safeParse } from "valibot";
import { DraftProductSchema } from "../types";
import axios from "axios";

type ProductData = {
  [k: string]: FormDataEntryValue;
};

export function addProduct(data: ProductData) {
  try {
    const result = safeParse(DraftProductSchema, {
      ...data,
      price: +data.price,
    });
    if (data.success) {
      const url = "http:localhost:4000/api/products";
    } else {
      throw new Error("Datos no Válidos");
    }
  } catch (error) {
    console.log(error);
  }
}
