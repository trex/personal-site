import { FC } from 'react';
import { attributes as outsideJulesAttributes, ReactComponent as OutsideJules } from './posts/outside-jules.md';
import { attributes as fireworkinItAttributes, ReactComponent as FireworkinIt } from './posts/fireworkin-it.md';
import { attributes as yokaiCrittersAttributes } from './posts/yokai-critters.md';
import { attributes as avavaBuilderAttributes } from './posts/avava-builder.md';
import { attributes as pokedexAttributes } from './posts/pokedex.md';
import { attributes as personalSiteAttributes } from './posts/personal-site.md';
import { attributes as cantWearNikesAttributes } from './posts/cant-wear-nikes.md';
import { attributes as weHappenToBeMushroomsAttributes } from './posts/we-happen-to-be-mushrooms.md';
import { attributes as spiritOfTheTreeAttributes } from './posts/spirit-of-the-tree.md';
import { attributes as timeForSomeNewShitAttributes } from './posts/time-for-some-new-shit.md';
import { attributes as totoroMuralAttributes } from './posts/totoro-mural.md';
import { attributes as yieldAttributes } from './posts/yield.md';
import { attributes as blueOystersAttributes } from './posts/blue-oysters.md';
import { attributes as critterBagAttributes } from './posts/critter-bag.md';
import { attributes as moundToTheWindAttributes } from './posts/mound-to-the-wind.md';
import { attributes as spinningHeadsAttributes } from './posts/spinning-heads.md';
import { attributes as goThenAttributes } from './posts/go-then.md';
import { attributes as grandmaKnowsBestAttributes } from './posts/grandma-knows-best.md';
import { attributes as selfPortraitDiptychAttributes } from './posts/self-portrait-diptych.md';
import { attributes as xMarksTheSpotAttributes } from './posts/x-marks-the-spot.md';

interface PostAttributes extends Record<string, unknown> {
    title: string;
    description: string;
    year: number;
    medium?: string;
    image: string;
    imageAlt: string;
    tags: Array<string>;
}

interface Project {
    attributes: PostAttributes;
    component?: FC;
}

export const filteredProjects = (filters: Set<string>) => {
    return projects.filter(project => {
        return [...project.attributes.tags].some(tag => filters.has(tag));
    })
}

const projects = [
    {
        attributes: pokedexAttributes
    },
    {
        attributes: personalSiteAttributes
    },
    {
        attributes: fireworkinItAttributes,
        component: FireworkinIt
    },
    {
        attributes: yokaiCrittersAttributes
    },
    {
        attributes: avavaBuilderAttributes
    },
    {
        attributes: critterBagAttributes
    },
    {
        attributes: spinningHeadsAttributes
    },
    {
        attributes: goThenAttributes
    },
    {
        attributes: cantWearNikesAttributes
    },
    {
        attributes: spiritOfTheTreeAttributes
    },
    {
        attributes: moundToTheWindAttributes
    },
    {
        attributes: blueOystersAttributes
    },
    {
        attributes: timeForSomeNewShitAttributes
    },
    {
        attributes: yieldAttributes
    },
    {
        attributes: outsideJulesAttributes,
        component: OutsideJules
    },
    {
        attributes: weHappenToBeMushroomsAttributes
    },
    {
        attributes: grandmaKnowsBestAttributes
    },
    {
        attributes: xMarksTheSpotAttributes
    },
    {
        attributes: totoroMuralAttributes
    },
    {
        attributes: selfPortraitDiptychAttributes
    }
] as Array<Project>;