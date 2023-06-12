import api from "./api";

export async function listAllDisciplines() {
  const response = await api.get("/disciplines");
  return response.data;
}
export async function createNewDiscipline(data) {
  const response = await api.post("/disciplines", data);
  return response.data;
}
export async function getDisciplineInfoById(id) {
  const response = await api.get(`/disciplines/${id}`);
  return response.data;
}
export async function editDiscipline({ id, discipline }) {
  const response = await api.put(`disciplines`, { id, discipline });
  return response.data;
}
