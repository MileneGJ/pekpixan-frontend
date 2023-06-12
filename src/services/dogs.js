import api from "./api";

export async function listAllDogs() {
  const response = await api.get("/dogs");
  return response.data;
}
export async function createNewDog(data) {
  const response = await api.post("/dogs", data);
  return response.data;
}
export async function getDogInfoById(id) {
  const response = await api.get(`/dogs/${id}`);
  return response.data;
}
export async function editDog({ id, dog }) {
  const response = await api.put(`dogs`, { id, dog });
  return response.data;
}
