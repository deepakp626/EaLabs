"use client"
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

const ServiceCards = () => {
  const { cards } = useSelector((state: RootState) => state.hero);

  return (
    <div className="mx-4 grid md:grid-cols-3 gap-4">
      {cards.map((card, index) => (
        <div key={index} className={`bg-${['yellow', 'orange', 'pink'][index % 3]}-300 rounded-2xl p-4 flex justify-between items-center`}>          
          <div className="flex flex-col justify-between h-full">
            <h3 className="text-base font-medium mb-2">{card.title}</h3>
            <button className="bg-black text-white w-6 h-6 flex items-center justify-center rounded-full text-sm">→</button>
          </div>
          {card.image && (
            <Image 
              src={`data:image/jpeg;base64,${Buffer.from(card.image).toString('base64')}`}
              alt={card.title}
              width={70}
              height={70}
              className="rounded-full object-cover"
            />
          )}
        </div>
      ))}
    </div>
  )
}

export default ServiceCards;