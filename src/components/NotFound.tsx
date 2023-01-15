import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-2 justify-center items-center w-full h-screen">
      <h1 className="text-4xl">404</h1>
      <p className="text-xl">Not found</p>
      <button
        onClick={() => navigate("/")}
        className="bg-secondary text-primary p-3 rounded-2xl text-xl"
      >
        Back to main page
      </button>
    </div>
  );
};

export default NotFound;
