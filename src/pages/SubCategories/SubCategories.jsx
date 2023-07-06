import React, { useState } from "react";
import {
  useAddSubCategoryMutation,
  useDeleteSubCategoryMutation,
  useEditSubCategoryMutation,
  useGetSubCategoriesQuery,
} from "../../api/subcategories";
import Circle from "../../components/Loaders/Circle/Circle";
import Title from "../../components/Title";
import {
  Button,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import MuiCard from "../../components/Card";
import { AddCircle, Delete, Edit } from "@mui/icons-material";
import MuiModal from "../../components/Modal";
import { useGetCategoriesQuery } from "../../api/categories";
import { singleFile } from "../../api/files";
import { useGetBrandsQuery } from "../../api/brands";

const SubCategories = () => {
  const { data = [], isLoading } = useGetSubCategoriesQuery();
  const { data: categories = [] } = useGetCategoriesQuery();
  const { data: brands = [] } = useGetBrandsQuery();
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [add] = useAddSubCategoryMutation();
  const [edit] = useEditSubCategoryMutation();
  const [del] = useDeleteSubCategoryMutation();
  const [img, setImg] = useState("");
  const formik = useFormik({
    initialValues: {
      name: "",
      categoryId: "",
      brands: [],
    },
    validationSchema: yup.object({
      name: yup
        .string("Enter category name")
        .min(3, "Name should be of minimum 3 characters length")
        .required("Name is required"),
      categoryId: yup
        .number("Choose a category")
        .required("Category is required"),
    }),
    onSubmit: async (values) => {
      console.log(values);
      let category = { ...values };
      let formData = new FormData();
      formData.append("file", img);
      const file = await singleFile(formData);
      category.img = file.img;
      add(category);
      setAddModal(false);
    },
  });

  const formik_update = useFormik({
    initialValues: {
      id: null,
      name: "",
      categoryId: "",
      brands: [],
    },
    validationSchema: yup.object({
      name: yup
        .string("Enter category name")
        .min(3, "Name should be of minimum 3 characters length")
        .required("Name is required"),
      categoryId: yup
        .number("Choose a category")
        .required("Category is required"),
    }),
    onSubmit: async (values) => {
      let category = { ...values };
      if (img) {
        let formData = new FormData();
        formData.append("file", img);
        const file = await singleFile(formData);
        category.img = file.img;
      }

      edit(category);
      setEditModal(false);
    },
  });

  if (isLoading) {
    return <Circle />;
  }

  return (
    <div>
      <Title>Sub Categories</Title>
      <Grid container spacing={2} direction="row">
        {data.length > 0 &&
          data.map((subcategory) => {
            return (
              <Grid key={subcategory.id} item xs={12} sm={6} md={4} lg={3}>
                <MuiCard name={subcategory.name} img={subcategory.img}>
                  <IconButton
                    color="secondary"
                    onClick={() => {
                      formik_update.setFieldValue("id", subcategory.id);
                      formik_update.setFieldValue("name", subcategory.name);
                      formik_update.setFieldValue("brands", subcategory.brands);
                      formik_update.setFieldValue(
                        "categoryId",
                        subcategory.categoryId
                      );
                      setEditModal(true);
                    }}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => {
                      del(subcategory.id);
                    }}
                  >
                    <Delete />
                  </IconButton>
                </MuiCard>
              </Grid>
            );
          })}
        <Grid item alignSelf="flex-end">
          <IconButton color="primary" onClick={() => setAddModal(true)}>
            <AddCircle fontSize="large" />
          </IconButton>
        </Grid>
      </Grid>
      <MuiModal
        open={addModal}
        handleClose={() => setAddModal(false)}
        title="Add Sub Category"
      >
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            id="name"
            sx={{ mb: 2 }}
            name="name"
            label="Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
          <TextField
            sx={{ mb: 2 }}
            fullWidth
            className="px-2 my-2"
            variant="outlined"
            name="categoryId"
            id="category"
            select
            label="Category"
            value={formik.values.categoryId}
            onChange={formik.handleChange}
            error={
              formik.touched.categoryId && Boolean(formik.errors.categoryId)
            }
            helperText={formik.touched.categoryId && formik.errors.categoryId}
          >
            <MenuItem key={""} value={""}>
              Choose category
            </MenuItem>
            {categories.length > 0 &&
              categories.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.name}
                </MenuItem>
              ))}
          </TextField>
          <TextField
            sx={{ mb: 2 }}
            fullWidth
            className="px-2 my-2"
            variant="outlined"
            name="brands"
            id="brands"
            select
            SelectProps={{
              multiple: true,
              value: formik.values.brands,
              onChange: formik.handleChange,
              error: formik.touched.brands && Boolean(formik.errors.brands),
              helperText: formik.touched.brands && formik.errors.brands,
            }}
            label="Brands"
          >
            <MenuItem key={""} value={""}>
              Choose category
            </MenuItem>
            {brands.length > 0 &&
              brands.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.name}
                </MenuItem>
              ))}
          </TextField>
          <input
            type="file"
            name="img"
            onChange={(event) => {
              setImg(event.target.files[0]);
            }}
          />
          <Button
            color="primary"
            variant="contained"
            sx={{ mt: 3 }}
            fullWidth
            type="submit"
          >
            Submit
          </Button>
        </form>
      </MuiModal>
      <MuiModal
        open={editModal}
        handleClose={() => setEditModal(false)}
        title="Edit Category"
      >
        <form onSubmit={formik_update.handleSubmit}>
          <TextField
            fullWidth
            sx={{ mb: 2 }}
            id="name"
            name="name"
            label="Name"
            value={formik_update.values.name}
            onChange={formik_update.handleChange}
            error={
              formik_update.touched.name && Boolean(formik_update.errors.name)
            }
            helperText={formik_update.touched.name && formik_update.errors.name}
          />
          <TextField
            sx={{ mb: 2 }}
            fullWidth
            className="px-2 my-2"
            variant="outlined"
            name="categoryId"
            id="category"
            select
            label="Category"
            value={formik_update.values.categoryId}
            onChange={formik_update.handleChange}
            error={
              formik_update.touched.categoryId &&
              Boolean(formik_update.errors.categoryId)
            }
            helperText={
              formik_update.touched.categoryId &&
              formik_update.errors.categoryId
            }
          >
            <MenuItem key={""} value={""}>
              Choose category
            </MenuItem>
            {categories.length > 0 &&
              categories.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.name}
                </MenuItem>
              ))}
          </TextField>
          <TextField
            sx={{ mb: 2 }}
            fullWidth
            className="px-2 my-2"
            variant="outlined"
            name="brands"
            id="brands"
            select
            SelectProps={{
              multiple: true,
              value: formik_update.values.brands,
              onChange: formik_update.handleChange,
              error:
                formik_update.touched.brands &&
                Boolean(formik_update.errors.brands),
              helperText:
                formik_update.touched.brands && formik_update.errors.brands,
            }}
            label="Brands"
          >
            <MenuItem key={""} value={""}>
              Choose category
            </MenuItem>
            {brands.length > 0 &&
              brands.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.name}
                </MenuItem>
              ))}
          </TextField>
          <input
            type="file"
            name="img"
            onChange={(event) => {
              setImg(event.target.files[0]);
            }}
          />
          <Button
            color="primary"
            variant="contained"
            sx={{ mt: 3 }}
            fullWidth
            type="submit"
          >
            Submit
          </Button>
        </form>
      </MuiModal>
    </div>
  );
};

export default SubCategories;
