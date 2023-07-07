import { AddCircle, Delete } from "@mui/icons-material";
import { IconButton, TextField } from "@mui/material";
import React, { useState } from "react";

const FormBuilder = (props) => {
  const { fieldChange } = props;
  const [properties, setProperties] = useState(props.properties);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: 10,
      }}
    >
      {properties.map((elem) => {
        return (
          <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
            <TextField
              placeholder="key"
              value={elem.key}
              onChange={(e) => {
                const copy = [
                  ...properties.map((el) => {
                    if (el.id === elem.id) {
                      el.key = e.target.value;
                    }
                    return el;
                  }),
                ];
                setProperties(copy);
                fieldChange(copy);
              }}
            />
            <TextField
              value={elem.value}
              placeholder="value"
              onChange={(e) => {
                const copy = [
                  ...properties.map((el) => {
                    if (el.id === elem.id) {
                      el.value = e.target.value;
                    }
                    return el;
                  }),
                ];
                setProperties(copy);
                fieldChange(copy);
              }}
            />

            <IconButton
              color="error"
              onClick={() => {
                const copy = [
                  ...properties.filter((item) => item.id !== elem.id),
                ];
                setProperties(copy);
                fieldChange(copy);
              }}
            >
              <Delete />
            </IconButton>
          </div>
        );
      })}
      <IconButton
        onClick={() => {
          let obj = {
            id: new Date().getTime(),
            key: "",
            value: "",
          };
          const copy = [...properties, obj];
          setProperties(copy);
        }}
      >
        <AddCircle />
      </IconButton>
    </div>
  );
};

export default FormBuilder;
