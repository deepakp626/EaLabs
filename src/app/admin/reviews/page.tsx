'use client';

import { useState } from 'react';
import axiosInstance from '@/lib/axios';
import Resizer from 'react-image-file-resizer';

const AddReviewPage = () => {
  const [userName, setUserName] = useState('');
  const [userReview, setUserReview] = useState('');
  const [rating, setRating] = useState(0);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  // --- Resize Image Before Upload ---
  const resizeFile = (file: File): Promise<File> =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        300, // max width
        300, // max height
        'JPEG', // output format
        80, // quality
        0, // rotation
        (uri) => {
          resolve(uri as File);
        },
        'file' // output type (can be 'base64', 'blob', or 'file')
      );
    });

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      try {
        const resizedImage = await resizeFile(e.target.files[0]);
        setImageFile(resizedImage);
      } catch (err) {
        console.error('Image resize error:', err);
        setError('Failed to process image.');
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess('');
    setError('');

    const formData = new FormData();
    formData.append('userName', userName);
    formData.append('userReview', userReview);
    formData.append('rating', rating.toString());
    if (imageFile) {
      formData.append('image', imageFile);
    }

    try {
      const response = await axiosInstance.post('/admin/reviews', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setSuccess(response.data.message);
      // Reset form
      setUserName('');
      setUserReview('');
      setRating(0);
      setImageFile(null);
    } catch (err) {
      setError('Failed to add review. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Add a New Review</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {success && <p className="text-green-500">{success}</p>}
        {error && <p className="text-red-500">{error}</p>}
        
        <div>
          <label htmlFor="userName" className="block text-sm font-medium text-gray-700">
            User Name
          </label>
          <input
            type="text"
            id="userName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>

        <div>
          <label htmlFor="userReview" className="block text-sm font-medium text-gray-700">
            User Review
          </label>
          <textarea
            id="userReview"
            value={userReview}
            onChange={(e) => setUserReview(e.target.value)}
            rows={4}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>

        <div>
          <label htmlFor="rating" className="block text-sm font-medium text-gray-700">
            Rating
          </label>
          <select
            id="rating"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            required
          >
            <option value="0" disabled>Select a rating</option>
            <option value="1">1 Star</option>
            <option value="2">2 Stars</option>
            <option value="3">3 Stars</option>
            <option value="4">4 Stars</option>
            <option value="5">5 Stars</option>
          </select>
        </div>

        <div>
          <label htmlFor="imageFile" className="block text-sm font-medium text-gray-700">
            User Image
          </label>
          <input
            type="file"
            id="imageFile"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4"
          />
        </div>

        <div>
          <button
            type="submit"
            className="w-full py-2 px-4 rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit Review'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddReviewPage;
