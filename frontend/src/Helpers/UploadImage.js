const url = `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_API_CLOUDINARY}
/image/upload`;

const UploadImage = async (image) => {
  const formData = new FormData();
  formData.append('file', image);
  formData.append('upload_preset', 'ProductManagement')

  try {
    const dataResponse = await fetch(url, {
      method: 'POST',
      body: formData,
    });

    if (!dataResponse.ok) {
      throw new Error('Failed to upload image');
    }

    return await dataResponse.json();
  } catch (error) {
    console.error('Cloudinary upload failed:', error);
    throw error;
  }
};

export default UploadImage;
