
const WorkflowDiamond = () => {
  return (
    <div className="relative mb-8">
      <div className="w-24 h-24 bg-gradient-to-r from-blue-400 via-purple-500 to-green-400 rotate-45 flex items-center justify-center backdrop-blur-md border border-white/20 shadow-2xl">
        <span className="text-xl font-bold text-white -rotate-45">IF</span>
      </div>
      
      {/* Extended Connecting Lines - reaching all the way to Actions rectangles */}
      <div className="absolute top-1/2 -right-20 w-96 h-0.5 bg-gradient-to-r from-green-400 to-green-400/30"></div>
      <div className="absolute top-1/2 -left-20 w-96 h-0.5 bg-gradient-to-l from-red-400 to-red-400/30"></div>
      
      {/* TRUE/FALSE Labels */}
      <div className="absolute top-1/2 -right-32 transform -translate-y-1/2 text-green-400 font-bold text-sm">TRUE</div>
      <div className="absolute top-1/2 -left-32 transform -translate-y-1/2 text-red-400 font-bold text-sm">FALSE</div>
    </div>
  );
};

export default WorkflowDiamond;
