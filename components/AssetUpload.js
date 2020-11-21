import { useForm } from 'react-hook-form';

import { createMedia } from '../lib/media';

export default function AssetUpload() {
  const { handleSubmit, register, errors } = useForm();

  const onSubmit = async (values) => {
    console.log('values :>> ', values);

    if (Object.keys(values).length === 0) return;

    createMedia(values);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>File upload</label>
      <input
        type='file'
        name='file'
        accept='.jpg, .jpeg, .png'
        ref={register}
      />
      <input type='submit' />
    </form>
  );
}
