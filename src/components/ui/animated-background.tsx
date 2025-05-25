
const AnimatedBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Flowing gradient orbs */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-transparent rounded-full blur-3xl animate-pulse opacity-60"></div>
      <div className="absolute top-1/3 -right-40 w-80 h-80 bg-gradient-to-bl from-purple-500/20 via-pink-500/20 to-transparent rounded-full blur-3xl animate-pulse opacity-60" style={{ animationDelay: '1s' }}></div>
      <div className="absolute -bottom-40 left-1/3 w-96 h-96 bg-gradient-to-tr from-green-500/20 via-blue-500/20 to-transparent rounded-full blur-3xl animate-pulse opacity-60" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-cyan-500/15 via-blue-500/15 to-purple-500/15 rounded-full blur-3xl animate-pulse opacity-70" style={{ animationDelay: '0.5s' }}></div>
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-gradient-to-l from-pink-500/15 via-purple-500/15 to-blue-500/15 rounded-full blur-3xl animate-pulse opacity-70" style={{ animationDelay: '1.5s' }}></div>
      
      {/* Moving gradient mesh */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 via-black/80 to-gray-900/50"></div>
      
      {/* Subtle grid overlay */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px'
      }}></div>
    </div>
  );
};

export default AnimatedBackground;
