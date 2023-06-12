import { useState } from "react";
import errorHandler from "../utils/errorHandler";
import { createNewDiscipline, editDiscipline } from "../services/disciplines";

function DisciplineModal({
  setOpenModal,
  initialValues = {
    name: "",
    category: "",
    level: "",
    description: "",
    requirements: [],
  },
}) {
  const [newDisciplineData, setNewDisciplineData] = useState(initialValues);

  async function handleSubmitDiscipline(e) {
    e.preventDefault();
    const requirements = newDisciplineData.requirements.split("; ");
    try {
      const result = await createNewDiscipline({
        ...newDisciplineData,
        requirements,
      });
      alert(result.name + " se creó exitosamente");
      setOpenModal(false);
      window.location.reload();
    } catch (error) {
      errorHandler(error);
    }
  }

  async function handleEditDiscipline(e) {
    e.preventDefault();
    let requirements = [];
    if (typeof newDisciplineData.requirements == "string") {
      requirements = newDisciplineData.requirements.split("; ");
    } else {
      for (let req of newDisciplineData.requirements) {
        requirements.push(...req.split("; "));
      }
    }
    try {
      const result = await editDiscipline({
        id: initialValues.id,
        discipline: {
          ...newDisciplineData,
          requirements,
        },
      });
      alert(result.name + " se editó exitosamente");
      setOpenModal(false);
      window.location.reload();
    } catch (error) {
      errorHandler(error);
    }
  }

  return (
    <div className="modal">
      <form>
        <h3>Datos de la nueva disciplina</h3>
        <input
          type="text"
          label="name"
          placeholder="Nombre"
          value={newDisciplineData.name}
          onChange={(e) =>
            setNewDisciplineData({ ...newDisciplineData, name: e.target.value })
          }
        />
        <input
          type="text"
          label="category"
          placeholder="Categoría"
          value={newDisciplineData.category}
          onChange={(e) =>
            setNewDisciplineData({
              ...newDisciplineData,
              category: e.target.value,
            })
          }
        />
        <input
          type="text"
          label="level"
          placeholder="Nivel"
          value={newDisciplineData.level}
          onChange={(e) =>
            setNewDisciplineData({
              ...newDisciplineData,
              level: e.target.value,
            })
          }
        />
        <input
          type="text"
          label="description"
          placeholder="Descripción"
          value={newDisciplineData.description}
          onChange={(e) =>
            setNewDisciplineData({
              ...newDisciplineData,
              description: e.target.value,
            })
          }
        />
        <input
          type="text"
          label="requirements"
          placeholder="Requisitos separados por ;"
          value={newDisciplineData.requirements}
          onChange={(e) =>
            setNewDisciplineData({
              ...newDisciplineData,
              requirements: e.target.value,
            })
          }
        />
        <div className="modal-buttons">
          <button onClick={() => setOpenModal(false)}>Regresar</button>
          {initialValues.name === "" ? (
            <button type="submit" onClick={handleSubmitDiscipline}>
              Crear disciplina
            </button>
          ) : (
            <button type="submit" onClick={handleEditDiscipline}>
              Editar disciplina
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default DisciplineModal;
