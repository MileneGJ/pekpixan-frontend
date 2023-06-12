import { useEffect, useState } from "react";
import { listAllDisciplines } from "../services/disciplines";
import errorHandler from "../utils/errorHandler";
import DisciplineModal from "./DisciplineModal";
import { useNavigate, useParams } from "react-router-dom";

function DisciplinesPage() {
  const [disciplineList, setDisciplineList] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const { dogId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function getDisciplines() {
      try {
        const response = await listAllDisciplines();
        setDisciplineList(response);
      } catch (error) {
        errorHandler(error);
      }
    }
    getDisciplines();
  }, []);
  return (
    <div className="dogs-page">
      <button className="action-button" onClick={() => setOpenModal(true)}>
        Registrar nueva disciplina
      </button>
      <ul className="discipline-list">
        {disciplineList.map((d, index) => (
          <li key={index}>
            <h2>{d.name}</h2>
            {d.disciplines.map((dd, index) => (
              <h4
                key={index}
                onClick={() =>
                  navigate(
                    dogId
                      ? `/dogs/${dogId}/disciplines/${dd.id}`
                      : `/disciplines/${dd.id}`
                  )
                }
              >
                {dd.name}
              </h4>
            ))}
          </li>
        ))}
      </ul>
      {openModal ? <DisciplineModal setOpenModal={setOpenModal} /> : null}
    </div>
  );
}

export default DisciplinesPage;
