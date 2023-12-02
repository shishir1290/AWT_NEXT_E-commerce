import React, { useState } from 'react'

export default function FAQ({items}) {
  // const Accordion = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <>
    <div className="max-w-md mx-auto mt-6">
      Frequently Asking Questions
      {items.map((item, index) => (
        <div key={index} style={{marginBottom:"15px"}} className="mb-4 border rounded overflow-hidden">
          <div
            onClick={() => toggleAccordion(index)}
            className={`p-4  cursor-pointer ${
              index === activeIndex ? 'bg-gray-200' : ''
            }`}
          >
            <h2 className="text-lg font-semibold">{item.title}</h2>
          </div>
          {index === activeIndex && (
            <div className="p-4  bg-gray-100">
              <p>{item.content}</p>
            </div>
          )}
        </div>
      ))}
    </div>
    

    </>
  )
}
