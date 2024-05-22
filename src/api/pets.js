import instance from ".";

const getAllPets = async () => {
  const response = await instance.get("/pets");
  return response.data;
};
const getOnePet = async (id) => {
  const response = await instance.get(`/pets/${id}`);
  return response.data;
};

const createPet = async (name, image, type, adopted) => {
  const response = await instance.post("/pets", {
    name: name,
    image: image,
    type: type,
    adopted: adopted,
  });
  return response.data;
};
const deletePet = async (id) => {
  const response = await instance.delete(`/pets/${id}`);
  return response.data;
};
export { getAllPets, getOnePet, createPet, deletePet };
