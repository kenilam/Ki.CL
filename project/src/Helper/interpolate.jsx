const interpolate = (text, props) => {
    Object.keys(props).forEach(name => {
        const regex = new RegExp(`{{${name}}}`, 'g');

        text = text.replace(regex, props[name]);
    });

    return text;
};

export default interpolate;
