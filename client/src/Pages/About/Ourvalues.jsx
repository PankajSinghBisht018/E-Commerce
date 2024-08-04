import React from 'react';

const Ourvalues = () => {
  return (
    <section className="mb-16">
      <h2 className="text-2xl font-bold mb-4 text-center">Our Values</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white text-black p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold mb-2">Customer Satisfaction</h3>
          <p>We prioritize our customers' needs and strive to exceed their expectations.</p>
        </div>
        <div className="bg-white text-black p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold mb-2">Quality Assurance</h3>
          <p>We ensure that every product we sell meets our high standards of quality.</p>
        </div>
        <div className="bg-white text-black p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold mb-2">Transparency</h3>
          <p>We maintain complete transparency in our processes and pricing.</p>
        </div>
      </div>
    </section>
  );
};

export default Ourvalues;
