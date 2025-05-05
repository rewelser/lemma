const API_BASE_URL = "http://localhost:8080"; // adjust when necessary

// Define a TypeScript interface for a Position
export interface Position {
  id: number;
  title: string;
  description: string;
}

// Fetch all positions
export const fetchPositions = async (): Promise<Position[]> => {
    const response = await fetch(`${API_BASE_URL}/positions`);
    if (!response.ok) throw new Error("Failed to fetch positions");
    return response.json();
};

// Fetch a single position by ID
export const fetchPositionById = async (id: number): Promise<Position> => {
    const response = await fetch(`${API_BASE_URL}/positions/${id}`);
    if (!response.ok) throw new Error("Failed to fetch position");
    return response.json();
};

// Create a new position
export const createPosition = async (positionData: Omit<Position, "id">): Promise<Position> => {
    const response = await fetch(`${API_BASE_URL}/positions`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(positionData),
    });
    if (!response.ok) throw new Error("Failed to create position");
    return response.json();
};
