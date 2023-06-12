import { useEffect, useState } from "react";
import { getDisciplineInfoById } from "../services/disciplines";
import { useNavigate, useParams } from "react-router-dom";
import errorHandler from "../utils/errorHandler";
import DisciplineModal from "./DisciplineModal";
import { createNewEvaluation } from "../services/evaluations";

function DisciplineDetails() {
  const [disciplineInfo, setDisciplineInfo] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const { disciplineId, dogId } = useParams();
  const [evaluation, setEvaluation] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function getInfo() {
      try {
        const response = await getDisciplineInfoById(disciplineId);
        setDisciplineInfo(response);
        setEvaluation(response.requirements.map((r) => false));
      } catch (error) {
        errorHandler(error);
      }
    }
    getInfo();
  }, [disciplineId]);

  async function handleSubmitEvaluation(e) {
    e.preventDefault();
    console.log(evaluation);
    try {
      await createNewEvaluation({
        record: evaluation,
        date: new Date(),
        dogId,
        disciplineId,
      });
      alert("La evaluación se creó exitosamente");
      navigate(`/dogs/${dogId}`);
    } catch (error) {
      errorHandler(error);
    }
  }

  function handleCheckbox(e, index) {
    let newEvaluation = evaluation;
    newEvaluation[index] = Boolean(e.target.value);
    setEvaluation(() => [...newEvaluation]);
  }

  return (
    <>
      <div className="discipline-details">
        <h2>{disciplineInfo.name}</h2>
        <p>{`Categoría: ${disciplineInfo.category}`}</p>
        <p>{`Nivel: ${disciplineInfo.level}`}</p>
        <p>
          {`Descripción: `}
          <br />
          {`${disciplineInfo.description}`}
        </p>
        <p>Requisitos</p>
        <ul>
          {dogId ? (
            <form>
              {disciplineInfo.requirements?.map((r, index) => (
                <label
                  className="requirements-checks"
                  key={index}
                  sx={{ display: "flex" }}
                >
                  {r}
                  <input
                    type="checkbox"
                    value={evaluation[index]}
                    onChange={(e) => handleCheckbox(e, index)}
                  />
                  <span class="checkmark"></span>
                </label>
              ))}
            </form>
          ) : (
            disciplineInfo.requirements?.map((r, index) => (
              <li key={index}>{r}</li>
            ))
          )}
        </ul>
        {dogId ? (
          <button
            type="submit"
            className="action-button"
            onClick={handleSubmitEvaluation}
          >
            Calificar
          </button>
        ) : (
          <button className="action-button" onClick={() => setOpenModal(true)}>
            Editar información
          </button>
        )}
        {openModal ? (
          <DisciplineModal
            setOpenModal={setOpenModal}
            initialValues={disciplineInfo}
          />
        ) : null}
      </div>
    </>
  );
}

export default DisciplineDetails;
