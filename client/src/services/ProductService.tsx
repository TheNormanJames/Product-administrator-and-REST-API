import { safeParse, pipe, string, transform, number, parse } from 'valibot';
import {
  DraftProductSchema,
  Product,
  ProductSchema,
  ProductsSchema,
} from '../types';
import axios from 'axios';
import { toBoolean } from '../utils';

type ProductData = {
  [k: string]: FormDataEntryValue;
};

export async function addProduct(data: ProductData) {
  try {
    const result = safeParse(DraftProductSchema, {
      ...data,
      price: +data.price,
    });
    // console.log(result);

    if (result.success) {
      const url = `${import.meta.env.VITE_API_URL}/api/products`;
      // console.log(url);

      await axios.post(url, {
        name: result.output.name,
        price: result.output.price,
      });
    } else {
      throw new Error('Datos no Válidos');
    }
  } catch (error) {
    console.log(error);
  }
}

export async function getProducts() {
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/products`;
    const { data } = await axios(url);
    console.log(data);

    const result = safeParse(ProductsSchema, data.data);
    if (result.success) {
      return result.output;
    } else {
      throw new Error('Hubo un error En el safeParse');
    }
  } catch (error) {
    console.log(error);
  }
}
export async function getProductById(id: Product['id']) {
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
    const { data } = await axios(url);
    const result = safeParse(ProductSchema, data.data);
    if (result.success) {
      return result.output;
    } else {
      throw new Error('Hubo un error En el safeParse');
    }
  } catch (error) {
    console.log(error);
  }
}
export async function updateProductById(data: ProductData, id: Product['id']) {
  try {
    const NumberSchema = pipe(string(), transform(Number), number());
    const result = safeParse(ProductSchema, {
      id,
      name: data.name,
      price: parse(NumberSchema, data.price),
      availability: toBoolean(data.availability.toString()),
    });
    if (result.success) {
      const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
      await axios.put(url, result.output);
    }
  } catch (error) {
    console.log(error);
  }
}

export async function deleteProduct(id: Product['id']) {
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
    await axios.delete(url);
  } catch (error) {
    console.log(error);
  }
}
export async function updateProductAvailability(id: Product['id']) {
  try {
    const url = `${import.meta.env.VITE_API_URL}/api/products/${id}`;
    await axios.patch(url);
  } catch (error) {
    console.log(error);
  }
}
