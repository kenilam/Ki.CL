const windowSize = () => {
    const { innerHeight: height, innerWidth: width } = window;

    return { width, height };
};

export default windowSize;
