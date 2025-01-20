import { useLocation, useNavigate } from "react-router-dom";

const CardDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { item } = location.state;

  return (
    <div className="p-8 lg:px-24 lg:py-12">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
      >
        Back
      </button>
      <div className="bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold mb-4">{item.title}</h1>
        <h2 className="text-lg font-semibold text-gray-600 mb-4">
          {item.subtitle}
        </h2>
        <div
          className="text-gray-700"
          dangerouslySetInnerHTML={{ __html: item.textArea }}
        />
      </div>
    </div>
  );
};

export default CardDetails;
