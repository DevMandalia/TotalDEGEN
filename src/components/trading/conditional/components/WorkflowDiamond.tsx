
const WorkflowDiamond = () => {
  return (
    <div className="relative mb-8">
      <div className="w-24 h-24 bg-gradient-to-r from-blue-400 via-purple-500 to-green-400 rotate-45 flex items-center justify-center backdrop-blur-md border border-white/20 shadow-2xl">
        <span className="text-xl font-bold text-white -rotate-45">IF</span>
      </div>
      
      {/* Horizontal lines extending from diamond sides */}
      <div className="absolute top-1/2 -right-0 w-80 h-0.5 bg-gray-400 transform -translate-y-0.5"></div>
      <div className="absolute top-1/2 -left-0 w-80 h-0.5 bg-gray-400 transform -translate-y-0.5"></div>
      
      {/* Vertical lines going down */}
      <div className="absolute top-1/2 right-80 w-0.5 h-32 bg-gray-400"></div>
      <div className="absolute top-1/2 left-80 w-0.5 h-32 bg-gray-400"></div>
      
      {/* Arrow heads pointing down */}
      <div className="absolute top-1/2 right-80 mt-32 w-0 h-0 border-l-4 border-r-4 border-t-8 border-l-transparent border-r-transparent border-t-gray-400 transform -translate-x-0.5"></div>
      <div className="absolute top-1/2 left-80 mt-32 w-0 h-0 border-l-4 border-r-4 border-t-8 border-l-transparent border-r-transparent border-t-gray-400 transform -translate-x-0.5"></div>
      
      {/* TRUE/FALSE Labels */}
      <div className="absolute top-1/2 right-64 transform -translate-y-1/2 text-green-400 font-bold text-sm">TRUE</div>
      <div className="absolute top-1/2 left-64 transform -translate-y-1/2 text-red-400 font-bold text-sm">FALSE</div>
    </div>
  );
};

export default WorkflowDiamond;
