const uploadImage = async file => {
  const formdata = new FormData();
  formdata.append('file', file);
  formdata.append('upload_preset', `${process.env.CLOUDINARY_PRESET_NAME}`);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`,
    {
      method: 'POST',
      body: formdata,
    },
  );

  const data = await res.json();
  return {
    url: data.secure_url,
    public_id: data.public_id,
  };
};

export default uploadImage;
