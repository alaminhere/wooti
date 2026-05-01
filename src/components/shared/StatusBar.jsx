const StatusBar = ({ status }) => {
  return (
    <div className="px-5 py-3 flex justify-between items-center bg-paleGrey">
      <p className="font-semibold text-black">{status}</p>
    </div>
  );
};

export default StatusBar;
