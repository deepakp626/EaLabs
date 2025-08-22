import Image from 'next/image';

const services = [
  {
    title: 'Book Lab Tests',
    bg: 'bg-yellow-300',
    icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTWfKU53G_dKTqay0DwUdMIKDauowk5_Ruug&s'
  },
  {
    title: 'Popular Health Checks',
    bg: 'bg-orange-300',
    icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTWfKU53G_dKTqay0DwUdMIKDauowk5_Ruug&s'
  },
  {
    title: 'X-rays Scans & MRI',
    bg: 'bg-pink-300',
    icon: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTWfKU53G_dKTqay0DwUdMIKDauowk5_Ruug&s'
  }
];

const ServiceCards = () => {
  return (
    <div className=" mx-4 grid md:grid-cols-3 gap-6">
      {services.map((s,i)=>(
        <div key={i} className={`${s.bg} rounded-3xl p-6 flex justify-between items-center`}>          
          <div>
            <h3 className="text-lg font-medium mb-4">{s.title}</h3>
            <button className="bg-black text-white w-8 h-8 flex items-center justify-center rounded-full">→</button>
          </div>
          <Image src={s.icon} alt={s.title} width={80} height={80} />
        </div>
      ))}
    </div>
  )
}

export default ServiceCards;
