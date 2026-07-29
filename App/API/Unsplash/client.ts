import * as Unsplash from 'unsplash-js';

const unsplash = Unsplash.createApi({
  accessKey: 'i29XJ45RBhIaXCbcDGKcX30IAxHsM3_klf5HXBBiRgE',
});

const getPhotos = async (
  ...props: Parameters<typeof unsplash.search.getPhotos>
) => {
  let loading = true;
  let data: Awaited<ReturnType<typeof unsplash.search.getPhotos>> | undefined;
  let error: Error | undefined;

  try {
    data = await unsplash.search.getPhotos(...props);
  } catch (_error) {
    error = new Error((_error as Error).message);
  } finally {
    loading = false;
  }

  return { data, error, loading };
};

export { getPhotos };
