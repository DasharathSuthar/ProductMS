const DashboardCard = ({ title, value, borderColor }) => {
  return (
    <div
      className="bg-white p-6 rounded-xl shadow-md border-l-4"
      style={{ borderColor }}
    >
      <h2 className="text-sm font-semibold text-gray-500">{title}</h2>
      <p className="text-3xl font-bold text-gray-800 mt-2">{value}</p>
    </div>
  );
};

export default DashboardCard;
