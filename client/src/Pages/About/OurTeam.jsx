import React from 'react';

const OurTeam = () => {
  return (
    <section className="mb-16">
      <h2 className="text-2xl font-bold mb-4 text-center">Meet Our Team</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div className="text-center">
          <img 
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSb-jx3Zo3TaJHk08PzpsNH-EpEQ2QlxiOJQ&s" 
            alt="Team Member" 
            className="w-32 h-32 mx-auto rounded-full"
          />
          <h3 className="text-xl font-bold mt-4">John Doe</h3>
          <p className="text-lg">CEO</p>
        </div>
        <div className="text-center">
          <img 
            src="https://www.storypick.com/wp-content/uploads/2022/12/6.jpeg" 
            alt="Team Member" 
            className="w-32 h-32 mx-auto rounded-full"
          />
          <h3 className="text-xl font-bold mt-4">Jane Smith</h3>
          <p className="text-lg">CTO</p>
        </div>
        <div className="text-center">
          <img 
            src="https://assets-global.website-files.com/636b968ac38dd1495ec4edcd/63c97bbbdeecd68494958b5d_manga-character_AI%20Avatar%20Dyvo.webp" 
            alt="Team Member" 
            className="w-32 h-32 mx-auto rounded-full"
          />
          <h3 className="text-xl font-bold mt-4">Alice Johnson</h3>
          <p className="text-lg">COO</p>
        </div>
        <div className="text-center">
          <img 
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5r-UNMgqnnTU75I0y5Q10gCmoGvY70bviIA&s" 
            alt="Team Member" 
            className="w-32 h-32 mx-auto rounded-full"
          />
          <h3 className="text-xl font-bold mt-4">Bob Brown</h3>
          <p className="text-lg">CFO</p>
        </div>
      </div>
    </section>
  );
};

export default OurTeam;
