import { useEffect, useState } from "react";
import { listAllDogs } from "../services/dogs";
import errorHandler from "../utils/errorHandler";
import DogModal from "./DogModal";
import { useNavigate } from "react-router-dom";

function DogsPage() {
  const [dogsList, setDogsList] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function getDogsData() {
      try {
        const response = await listAllDogs();
        setDogsList(response);
      } catch (error) {
        errorHandler(error);
      }
    }
    getDogsData();
  }, []);

  return (
    <div className="dogs-page">
      <button className="action-button" onClick={() => setOpenModal(true)}>
        Registrar nuevo perro
      </button>
      <ul>
        {dogsList.map((d, index) => (
          <li
            className="dog-profile"
            key={index}
            onClick={() => navigate(`/dogs/${d.id}`)}
          >
            <img src={d.photo} alt="Dog profile" />
            {d.name}
          </li>
        ))}
      </ul>
      {openModal ? <DogModal setOpenModal={setOpenModal} /> : null}
    </div>
  );
}

export default DogsPage;
