import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getDogInfoById } from "../services/dogs";
import errorHandler from "../utils/errorHandler";
import { getAllDogEvaluations } from "../services/evaluations";

function DogDetails() {
  const [dogInfo, setDogInfo] = useState({});
  const { dogId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function getInfo() {
      try {
        const response = await getDogInfoById(dogId);
        const evaluations = await getAllDogEvaluations(dogId);
        console.log(evaluations);
        setDogInfo({ ...response, evaluations });
      } catch (error) {
        errorHandler(error);
      }
    }
    getInfo();
  }, [dogId]);

  function calculateAge(birth) {
    const years =
      (new Date() - new Date(birth)) / (1000 * 60 * 60 * 24 * 30 * 12);
    const months = (years - years.toFixed(0)) * 12;
    const yearText = years.toFixed(0) > 1 ? "años" : "año";
    const monthText = months.toFixed(0) > 1 ? "meses" : "mes";
    return `${years.toFixed(0)} ${yearText} ${months.toFixed(0)} ${monthText}`;
  }

  return (
    <>
      <div className="dog-details">
        <img src={dogInfo.photo} alt="Dog Profile" width="50%" />
        <div>
          <h2>{dogInfo.name}</h2>
          <p>{`Raza: ${dogInfo.breed}`}</p>
          <p>{`Edad: ${calculateAge(dogInfo.birth)}`}</p>
          <p>{`Perfil: ${dogInfo.behavior}`}</p>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        <span>
          <h3 style={{ color: "green", margin: "20px 10px" }}>Fortalezas</h3>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div>
              {dogInfo.evaluations?.map((e) => (
                <p style={{ color: "white", margin: "15px 10px" }}>
                  {e.disciplineName}{" "}
                </p>
              ))}
            </div>
            <div>
              {dogInfo.evaluations?.map((e) => (
                <p className="strongs-bar">{`${e._avg.grade}%`}</p>
              ))}
            </div>
          </div>
        </span>
        <span>
          <h3 style={{ color: "red", margin: "20px 10px" }}>Debilidades</h3>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div>
              {dogInfo.evaluations
                ?.slice(0)
                .reverse()
                .map((e) => (
                  <p style={{ color: "white", margin: "15px 10px" }}>
                    {e.disciplineName}{" "}
                  </p>
                ))}
            </div>
            <div>
              {dogInfo.evaluations
                ?.slice(0)
                .reverse()
                .map((e) => (
                  <p className="weakness-bar">{`${e._avg.grade}%`}</p>
                ))}
            </div>
          </div>
        </span>
      </div>
      <span className="evaluate-dog">
        <button onClick={() => navigate(`/dogs/${dogId}/disciplines`)}>
          Evaluar desempeño
        </button>
      </span>
    </>
  );
}

export default DogDetails;
