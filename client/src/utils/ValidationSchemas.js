import * as yup from "yup";

export const qualitySchema = yup.object({
  name: yup
    .string()
    // .matches(/^[A-Za-z]+$/,)
    .required("Name is required")
    .min(2, "Name has to be longer than 2 characters."),
  icon: yup.string(),
});

export const countrySchema = yup.object({
  name: yup
    .string()
    // .matches(/^[A-Za-z]+$/,)
    .required("Name is required")
    .min(3, "Name has to be longer than 3 characters."),
  code: yup
    .string()
    .required("Code is required")
    .min(2, "Code must to be 2 characters.")
    .max(2, "Code must to be 2 characters.")
    .matches(/^[A-Z]+$/, "Code must to bu uppercase."),
});

export const categorySchema = yup.object({
  name: yup
    .string()
    // .matches(/^[A-Za-z]+$/,)
    .required("Name is required")
    .min(3, "Name has to be longer than 3 characters."),
  icon: yup
    .string()
    .required("Icon/Image URL is required")
    .max(150, "Icon/Image hasn't to be longer 150 characters."),
});

export const compostionSchema = yup.object({
  name: yup
    .string()
    // .matches(/^[A-Za-z]+$/,)
    .required("Name is required")
    .min(3, "Name has to be longer than 3 characters."),
  icon: yup.string().max(50, "Icon/Image hasn't to be longer 50 characters."),
});

export const coinSchema = yup.object({
  name: yup
    .string()
    .required("Name is required.")
    .max(50, "Icon/Image hasn't to be longer 50 characters."),
  short_description: yup
    .string()
    .required("Short description is required.")
    .max(200, "Icon/Image hasn't to be longer 120 characters."),
  description: yup.string(),
  compositionId: yup
    .number()
    .typeError("Select compostion.")
    .required("Composition is required."),
  denomination: yup.string(),
  year: yup
    .string("Year must be a number.")
    .max(4, "Year hasn't to be longer 4 characters.")
    .min(4, "Year has to be 4 characters."),
  weight: yup.string("Weight must be a number."),
  price: yup.string("Price must be a number."),
  typeId: yup
    .number()
    .typeError("Select category.")
    .required("Category is required."),
  //   imageUrl_front: yup
  //     .string()
  //     .max(150, "Face Image hasn't to be longer 150 characters.")
  //     .required("Image is required."),
  //   imageUrl_back: yup
  //     .string()
  //     .max(150, "Back Image hasn't to be longer 150 characters.")
  //     .required("Image is required."),
  qualityId: yup
    .number()
    .typeError("Select quality.")
    .required("Quality is required."),
});
