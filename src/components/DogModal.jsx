import { useState } from "react";
import { createNewDog, editDog } from "../services/dogs";
import errorHandler from "../utils/errorHandler";

function DogModal({
  setOpenModal,
  initialValues = {
    name: "",
    breed: "",
    birth: "",
    behavior: "",
    photo: "",
  },
}) {
  const [newDogData, setNewDogData] = useState(initialValues);

  async function handleSubmitDog(e) {
    e.preventDefault();
    try {
      const result = await createNewDog(newDogData);
      alert(result.name + " se creó exitosamente");
      setOpenModal(false);
      window.location.reload();
    } catch (error) {
      errorHandler(error);
    }
  }

  async function handleEditDog(e) {
    e.preventDefault();
    try {
      const result = await editDog({
        id: initialValues.id,
        dog: newDogData,
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
        <h3>Datos del nuevo perro</h3>
        <input
          type="text"
          label="name"
          placeholder="Nombre"
          value={newDogData.name}
          onChange={(e) =>
            setNewDogData({ ...newDogData, name: e.target.value })
          }
        />
        <input
          type="text"
          label="breed"
          placeholder="Raza"
          value={newDogData.breed}
          onChange={(e) =>
            setNewDogData({ ...newDogData, breed: e.target.value })
          }
        />
        <label>Fecha Nacimiento</label>
        <input
          type="date"
          label="birth"
          value={newDogData.birth}
          onChange={(e) =>
            setNewDogData({ ...newDogData, birth: e.target.value })
          }
        />
        <input
          type="text"
          label="behavior"
          placeholder="Perfil comportamental"
          value={newDogData.behavior}
          onChange={(e) =>
            setNewDogData({ ...newDogData, behavior: e.target.value })
          }
        />
        <input
          type="url"
          label="photo"
          placeholder="Ingresar link de foto"
          value={newDogData.photo}
          onChange={(e) =>
            setNewDogData({ ...newDogData, photo: e.target.value })
          }
        />
        <div className="modal-buttons">
          <button onClick={() => setOpenModal(false)}>Regresar</button>
          {initialValues.name === "" ? (
            <button type="submit" onClick={handleSubmitDog}>
              Crear perro
            </button>
          ) : (
            <button type="submit" onClick={handleEditDog}>
              Editar perro
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default DogModal;
