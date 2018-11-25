// @flow
import React from 'react';

import { timestampToDate } from 'Helper';

import Gallery from './Gallery';

import './style.scss';

type Props = {
    created_on: Number,
    description: string,
    id: Number,
    name: string
};

const Project = ({ created_on: createdOn, description, id, modules, name }: Props) => {
    const images = modules.filter(module => module.type === 'image');

    return (
        <section className='project' data-project-id={id}>
            <h1>{name}</h1>
            <p>{description}</p>
            <Gallery {...{ images, name } } />
            <p>{timestampToDate(createdOn)}</p>
        </section>
    )
};

export default Project;
