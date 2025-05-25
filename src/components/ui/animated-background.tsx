
const AnimatedBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Large flowing gradient orbs with enhanced motion */}
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-gradient-to-br from-purple-600/30 via-blue-500/25 to-cyan-400/20 rounded-full blur-3xl animate-bounce opacity-80" style={{ 
        animation: 'float 8s ease-in-out infinite, colorShift1 12s ease-in-out infinite' 
      }}></div>
      
      <div className="absolute top-1/4 -right-20 w-80 h-80 bg-gradient-to-bl from-pink-500/30 via-purple-500/25 to-blue-500/20 rounded-full blur-3xl opacity-80" style={{ 
        animation: 'float 10s ease-in-out infinite reverse, colorShift2 15s ease-in-out infinite' 
      }}></div>
      
      <div className="absolute -bottom-20 left-1/4 w-96 h-96 bg-gradient-to-tr from-green-400/30 via-teal-500/25 to-blue-400/20 rounded-full blur-3xl opacity-80" style={{ 
        animation: 'float 12s ease-in-out infinite, colorShift3 18s ease-in-out infinite' 
      }}></div>
      
      <div className="absolute top-1/3 left-1/3 w-72 h-72 bg-gradient-to-r from-yellow-400/25 via-orange-500/20 to-red-500/15 rounded-full blur-3xl opacity-70" style={{ 
        animation: 'float 9s ease-in-out infinite reverse, colorShift4 14s ease-in-out infinite' 
      }}></div>
      
      <div className="absolute bottom-1/3 right-1/3 w-64 h-64 bg-gradient-to-l from-indigo-500/30 via-purple-400/25 to-pink-400/20 rounded-full blur-3xl opacity-75" style={{ 
        animation: 'float 11s ease-in-out infinite, colorShift5 16s ease-in-out infinite' 
      }}></div>
      
      {/* Moving mesh overlay with enhanced visibility */}
      <div 
        className="absolute inset-0 opacity-40"
        style={{
          background: `
            radial-gradient(circle at 20% 50%, rgba(168, 85, 247, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 40% 80%, rgba(16, 185, 129, 0.15) 0%, transparent 50%),
            linear-gradient(45deg, rgba(0,0,0,0.8), rgba(17, 24, 39, 0.9))
          `,
          animation: 'meshMove 20s ease-in-out infinite'
        }}
      ></div>
      
      {/* Subtle grid with color tint */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `
          linear-gradient(rgba(168, 85, 247, 0.3) 1px, transparent 1px),
          linear-gradient(90deg, rgba(59, 130, 246, 0.3) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
        animation: 'gridShift 25s linear infinite'
      }}></div>
      
      <style>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(-20px, -20px) scale(1.1); }
          50% { transform: translate(20px, -10px) scale(0.9); }
          75% { transform: translate(-10px, 20px) scale(1.05); }
        }
        
        @keyframes colorShift1 {
          0%, 100% { filter: hue-rotate(0deg) brightness(1); }
          33% { filter: hue-rotate(120deg) brightness(1.2); }
          66% { filter: hue-rotate(240deg) brightness(0.9); }
        }
        
        @keyframes colorShift2 {
          0%, 100% { filter: hue-rotate(60deg) brightness(1.1); }
          50% { filter: hue-rotate(180deg) brightness(0.8); }
        }
        
        @keyframes colorShift3 {
          0%, 100% { filter: hue-rotate(180deg) brightness(0.9); }
          25% { filter: hue-rotate(270deg) brightness(1.3); }
          75% { filter: hue-rotate(90deg) brightness(1.1); }
        }
        
        @keyframes colorShift4 {
          0%, 100% { filter: hue-rotate(90deg) brightness(1); }
          50% { filter: hue-rotate(270deg) brightness(1.2); }
        }
        
        @keyframes colorShift5 {
          0%, 100% { filter: hue-rotate(300deg) brightness(1.1); }
          33% { filter: hue-rotate(60deg) brightness(0.9); }
          66% { filter: hue-rotate(180deg) brightness(1.3); }
        }
        
        @keyframes meshMove {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(-10px, -15px); }
          50% { transform: translate(15px, -10px); }
          75% { transform: translate(-5px, 10px); }
        }
        
        @keyframes gridShift {
          0% { transform: translate(0, 0); }
          100% { transform: translate(60px, 60px); }
        }
      `}</style>
    </div>
  );
};

export default AnimatedBackground;
