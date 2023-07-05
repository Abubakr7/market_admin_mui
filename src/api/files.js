export const singleFile = async function (formData) {
  const response = await fetch(`http://localhost:3000/upload`, {
    method: "POST",
    body: formData,
  });
  const data = await response.json();
  return data;
};

export const multiFiles = async function (formData) {
  const response = await fetch(`http://localhost:3000/uploads`, {
    method: "POST",
    body: formData,
  });
  const data = await response.json();
  return data;
};
