const Notification = ({ message }: { message: string }) => (
  <div className="absolute top-4 bg-red-500 text-white p-4 rounded shadow-md">
    {message}
  </div>
);

export default Notification;
