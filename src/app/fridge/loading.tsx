
export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center gap-[3.5rem] animate-pulse">
     
      <div className="DataDisplay w-full flex flex-col gap-[1rem]">
        <div className="MetaData flex justify-between">
          <div className="h-4 bg-gray-200 rounded-full"></div>
          <div className="h-4 bg-gray-200 rounded-full "></div>
        </div>
        <div className="FridgeListContainer w-full flex flex-col gap-[1rem]">
          <div className="h-16 bg-gray-200 rounded-lg "></div>
          <div className="h-16 bg-gray-200 rounded-lg "></div>
          <div className="h-16 bg-gray-200 rounded-lg"></div>
        </div>
      </div>
    </div>
  );
} 