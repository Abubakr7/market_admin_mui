import { AddCircle, Edit } from "@mui/icons-material";
import { Button, Grid, IconButton, TextField } from "@mui/material";
import React, { useState } from "react";
import {
  useAddCategoryMutation,
  useEditCategoryMutation,
  useGetCategoriesQuery,
} from "../../api/categories";
import MuiCard from "../../components/Card";
import Title from "../../components/Title";
import MuiModal from "../../components/Modal";
import * as yup from "yup";
import { useFormik } from "formik";
import { singleFile } from "../../api/files";

const Categories = () => {
  const { data = [], isLoading } = useGetCategoriesQuery();
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [add] = useAddCategoryMutation();
  const [edit] = useEditCategoryMutation();
  const [img, setImg] = useState("");
  const formik = useFormik({
    initialValues: {
      name: "",
      img: "",
    },
    validationSchema: yup.object({
      name: yup
        .string("Enter category name")
        .min(3, "Name should be of minimum 3 characters length")
        .required("Name is required"),
    }),
    onSubmit: async (values) => {
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
      img: "",
    },
    validationSchema: yup.object({
      name: yup
        .string("Enter category name")
        .min(3, "Name should be of minimum 3 characters length")
        .required("Name is required"),
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
  return (
    <div>
      <Title>Categories</Title>
      <Grid container spacing={2} direction="row">
        {data.length > 0 &&
          data.map((category) => {
            return (
              <Grid key={category.id} item xs={12} sm={6} md={4} lg={3}>
                <MuiCard name={category.name} img={category.img}>
                  <IconButton
                    color="secondary"
                    onClick={() => {
                      formik_update.setFieldValue("id", category.id);
                      formik_update.setFieldValue("img", category.img);
                      formik_update.setFieldValue("name", category.name);
                      setEditModal(true);
                    }}
                  >
                    <Edit />
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
        title="Add Category"
      >
        <form onSubmit={formik.handleSubmit}>
          <TextField
            fullWidth
            id="name"
            name="name"
            label="Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />

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
        handleClose={() => setAddModal(false)}
        title="Edit Category"
      >
        <form onSubmit={formik_update.handleSubmit}>
          <TextField
            fullWidth
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

export default Categories;
