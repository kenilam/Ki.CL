import * as Unsplash from 'unsplash-js';

const unsplash = Unsplash.createApi({
  accessKey: 'i29XJ45RBhIaXCbcDGKcX30IAxHsM3_klf5HXBBiRgE',
});

const getPhotos = async (
  ...props: Parameters<typeof unsplash.search.getPhotos>
) => {
  let data: Awaited<ReturnType<typeof unsplash.search.getPhotos>> | undefined;
  let error: Error | undefined;

  try {
    data = await unsplash.search.getPhotos(...props);
  } catch (_error) {
    error = new Error((_error as Error).message);
  }

  /*
   * Always settled by the time this returns — it is awaited. The store flips
   * `loading` to true before calling and reads it back false from here.
   */
  return { data, error, loading: false };
};

export { getPhotos };
