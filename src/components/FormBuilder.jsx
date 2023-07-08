import { AddCircle, Delete, Save } from "@mui/icons-material";
import { IconButton, TextField } from "@mui/material";
import React, { useState } from "react";

const FormBuilder = (props) => {
  const { fieldChange, setSubmitDisable } = props;
  const [properties, setProperties] = useState(props.properties || []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        gap: 10,
      }}
    >
      {properties.length > 0 &&
        properties.map((elem) => {
          return (
            <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
              <TextField
                placeholder="key"
                value={elem.key}
                onChange={(e) => {
                  const prop = {
                    ...properties.find((el) => el.id === elem.id),
                  };
                  prop.key = e.target.value;

                  const copy = [
                    ...properties.map((el) => {
                      if (el.id === prop.id) {
                        return prop;
                      }
                      return el;
                    }),
                  ];
                  setProperties(copy);
                }}
              />
              <TextField
                value={elem.value}
                placeholder="value"
                onChange={(e) => {
                  const prop = {
                    ...properties.find((el) => el.id === elem.id),
                  };
                  prop.value = e.target.value;

                  const copy = [
                    ...properties.map((el) => {
                      if (el.id === prop.id) {
                        return prop;
                      }
                      return el;
                    }),
                  ];
                  setProperties(copy);
                }}
              />

              <IconButton
                color="error"
                onClick={() => {
                  const copy = [
                    ...properties.filter((item) => item.id !== elem.id),
                  ];
                  setProperties(copy);
                }}
              >
                <Delete />
              </IconButton>
            </div>
          );
        })}
      <div style={{ display: "flex", gap: 5 }}>
        <IconButton
          onClick={() => {
            let obj = {
              id: new Date().getTime(),
              key: "",
              value: "",
            };
            const copy = [...properties, obj];
            setProperties(copy);
            setSubmitDisable(true);
          }}
        >
          <AddCircle />
        </IconButton>
        <IconButton
          onClick={() => {
            fieldChange(properties);
            setSubmitDisable(false);
          }}
        >
          <Save />
        </IconButton>
      </div>
    </div>
  );
};

export default FormBuilder;
