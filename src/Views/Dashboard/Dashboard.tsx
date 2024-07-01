export default function Dashboard() {
  return (
    <div className="flex h-screen">
      <div className="w-1/4">
        <div className="flex p-4 items-center py-3 rounded-r-full cursor-pointer hover:bg-gray-100 bg-[#7F56D9]">
          <img src="src/assets/lightbulb.svg" alt="lightbulb" className="p-2" />
          <p className="pl-6 text-base">Notes</p>
        </div>
        <div className="flex p-4 items-center py-3 rounded-r-full cursor-pointer hover:bg-gray-100">
          <img
            src="src/assets/notifications.svg"
            alt="notifications"
            className="p-2"
          />
          <p className="pl-6 text-base">Reminders</p>
        </div>
        <div className="flex p-4 items-center py-3 rounded-r-full cursor-pointer hover:bg-gray-100">
          <img src="src/assets/label.svg" alt="label" className="p-2" />
          <p className="pl-6 text-base">Label</p>
        </div>
        <div className="flex p-4 items-center py-3 rounded-r-full cursor-pointer hover:bg-gray-100">
          <img src="src/assets/edit.svg" alt="edit" className="p-2" />
          <p className="pl-6 text-base">Edit Labels</p>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center">Dashboard</div>
    </div>
  );
}
