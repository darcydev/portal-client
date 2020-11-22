import { useForm } from 'react-hook-form';

import { createMedia } from '../lib/media';

export default function AssetUpload(id) {
  const { handleSubmit, register, errors } = useForm();

  const onSubmit = async (values) => {
    if (Object.keys(values).length === 0) return;

    console.log('values :>> ', values);

    // INCLUDE THE ADDITIONAL FIELDS ONTO THE VALUES OBJECT
    const { alt_text, description } = values;
    const postId = id.id;

    createMedia(values, postId, alt_text, description);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>File upload</label>
      <input
        type='file'
        name='file'
        accept='.jpg, .jpeg, .png'
        ref={register({ required: true })}
      />
      <label>Alt Text</label>
      <input type='text' name='alt_text' ref={register({ required: true })} />
      <label>Description</label>
      <input
        type='text'
        name='description'
        ref={register({ required: true })}
      />
      <input type='submit' />
    </form>
  );
}
