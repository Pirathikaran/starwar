export const SkeletonCard = () => (
  <div className="border rounded-md p-4 shadow-md hover:shadow-lg animate-pulse">
    <div className="bg-gray-300 h-6 w-3/4 mb-4"></div>
    <div className="bg-gray-200 h-4 w-5/6 mb-2"></div>
    <div className="bg-gray-200 h-4 w-5/6 mb-2"></div>
    <div className="bg-gray-200 h-4 w-5/6 mb-2"></div>
    <div className="bg-gray-200 h-4 w-5/6 mb-2"></div>
    <div className="flex justify-between mt-4">
      <div className="bg-gray-200 h-6 w-6"></div>
    </div>
  </div>
);
