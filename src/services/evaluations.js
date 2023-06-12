import api from "./api";

export async function createNewEvaluation(data) {
  const response = await api.post("/evaluations", data);
  return response.data;
}
export async function getAllDogEvaluations(dogId) {
  const response = await api.get(`/evaluations/dog/${dogId}`);
  return response.data;
}
