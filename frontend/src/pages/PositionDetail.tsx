import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchPositionById, Position } from "../api";

const PositionDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [position, setPosition] = useState<Position | null>(null);

  useEffect(() => {
    if (id) {
      fetchPositionById(Number(id)).then(setPosition);
    }
  }, [id]);

  return (
    <div className="p-6">
      {position ? (
        <>
          <h1 className="text-2xl font-bold">{position.title}</h1>
          <p>{position.description}</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default PositionDetail;
