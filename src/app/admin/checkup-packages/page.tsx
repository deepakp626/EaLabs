
"use client"
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { saveCheckupPackages, addCategory, addCard } from '@/store/features/checkupPackagesSlice';
import { AppDispatch, RootState } from '@/store/store';
import toast from 'react-hot-toast';

interface PackageCard {
  image: File | string | null;
  title: string;
  testCount: number;
  category: string;
}

interface CheckupPackageListProps {
  packages: string[];
  setPackages: React.Dispatch<React.SetStateAction<string[]>>;
}

const CheckupPackageList: React.FC<CheckupPackageListProps> = ({ packages, setPackages }) => {
  const [newPackage, setNewPackage] = useState('');

  const handleAddPackage = () => {
    if (newPackage.trim()) {
      setPackages([...packages, newPackage.trim()]);
      setNewPackage('');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Checkup Package List</h2>
      <div className="mb-4">
        <input
          type="text"
          value={newPackage}
          onChange={(e) => setNewPackage(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Enter new package name"
        />
        <button
          onClick={handleAddPackage}
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Package
        </button>
      </div>
      <ul className="list-disc pl-5">
        {packages.map((pkg, index) => (
          <li key={index}>{pkg}</li>
        ))}
      </ul>
    </div>
  );
};

interface CheckupPackageCardProps {
  packages: string[];
  cards: PackageCard[];
  setCards: React.Dispatch<React.SetStateAction<PackageCard[]>>;
}

const CheckupPackageCard: React.FC<CheckupPackageCardProps> = ({ packages, cards, setCards }) => {
  const [newCard, setNewCard] = useState<PackageCard>({
    image: null,
    title: '',
    testCount: 0,
    category: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === 'image' && e.target instanceof HTMLInputElement && e.target.files) {
      setNewCard({ ...newCard, [name]: e.target.files[0] });
    } else {
      setNewCard({ ...newCard, [name]: name === 'testCount' ? parseInt(value) : value });
    }
  };

  const handleAddCard = () => {
    if (newCard.title && newCard.category && newCard.image) {
      setCards([...cards, newCard]);
      setNewCard({ image: null, title: '', testCount: 0, category: '' });
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Checkup Package Card</h2>
      <div className="space-y-4">
        <input
          type="file"
          name="image"
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
          accept="image/*"
        />
        <input
          type="text"
          name="title"
          value={newCard.title}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
          placeholder="Card Title"
        />
        <input
          type="number"
          name="testCount"
          value={newCard.testCount}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
          placeholder="Number of Tests"
        />
        <select
          name="category"
          value={newCard.category}
          onChange={handleInputChange}
          className="w-full p-2 border rounded"
        >
          <option value="">Select Category</option>
          {packages.map((pkg, index) => (
            <option key={index} value={pkg}>
              {pkg}
            </option>
          ))}
        </select>
        <button
          onClick={handleAddCard}
          className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Add Card
        </button>
      </div>
      
    </div>
  );
};

const CheckupPackagesPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { categories, cards } = useSelector((state: RootState) => state.checkupPackages);
  const [localCategories, setLocalCategories] = useState<string[]>([]);
  const [localCards, setLocalCards] = useState<PackageCard[]>([]);


  useEffect(() => {
    setLocalCategories(categories);
    setLocalCards(cards);
  }, [categories, cards]);

  const handleSubmit = async () => {
    // console.log('Categories to save:', localCategories);
    // console.log('Cards to save:', localCards);

    try {
      await dispatch(saveCheckupPackages({ categories: localCategories, cards: localCards })).unwrap();
      toast.success('Checkup packages saved successfully!');
    } catch (error) {
      toast.error('Failed to save checkup packages. Please try again.');
      console.error('Error saving checkup packages:', error);
    }
  };

  const handleAddPackage = (newPackage: string) => {
    dispatch(addCategory(newPackage));
  };

  const handleAddCard = (newCard: PackageCard) => {
    dispatch(addCard(newCard));
  };

  return (
    <>
      <h1 className="text-2xl font-bold mb-4">Checkup Packages Management</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <CheckupPackageList 
          packages={localCategories} 
          setPackages={(packages) => {
            setLocalCategories(packages);
            handleAddPackage(packages[packages.length - 1]);
          }} 
        />
        <CheckupPackageCard 
          packages={localCategories} 
          cards={localCards} 
          setCards={(cards) => {
            setLocalCards(cards);
            handleAddCard(cards[cards.length - 1]);
          }} 
        />
      </div>
      
      {/* New section to list all cards */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">All Cards</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {localCards.map((card, index) => (
            <div key={index} className="border p-4 rounded shadow-sm">
              {card.image && (
                <Image 
                  src={card.image instanceof File ? URL.createObjectURL(card.image) : card.image}
                  alt={card.title} 
                  width={100} 
                  height={100} 
                  className="mb-2 object-cover" 
                />
              )}
              <h3 className="font-semibold">{card.title}</h3>
              <p>Tests: {card.testCount}</p>
              <p>Category: {card.category}</p>
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex justify-end">
        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Save All Changes
        </button>
      </div>
    </>
  );
};

export default CheckupPackagesPage;
