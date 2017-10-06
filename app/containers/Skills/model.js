import { pickBy, propEq, sortWith, prop, descend } from 'ramda';

export const properties = {
	title: {
		id:'title',
		label: 'Title',
		visible: true
	},
	master: {
		id: 'master',
		label: 'Master',
		visible: true,
		type: 'multipleinput'
	},
	experienced: {
		id: 'experienced',
		label: 'Experienced',
		visible: true,
		type: 'multipleinput'
	},
	novice: {
		id: 'novice',
		label: 'Novice',
		visible: true,
		type: 'multipleinput'
	},
	order: {
		id:'order',
		label: 'Order',
		visible: true
	}
}

export const shallowProperties = {
	master: properties.master,
	experienced: properties.experienced,
	novice: properties.novice
}

export const articleProperties = {
	master: properties.master,
	experienced: properties.experienced,
	novice: properties.novice,
};

const filterVisible = (props) => () => {
	return pickBy(propEq('visible', true), props)
}

export const given = (props)=>{
	return {
		filterVisible: filterVisible(props),
		result: props
	}
}

export const SkillPropsApi = {
	given,
	properties,
	shallowProperties
}

export const visibleProperties = given(properties).filterVisible();

export const sortByOrder = sortWith([descend(prop(properties.order.id))]);

const convert = (skills) => {
	return Object.keys(skills).map(k=>skills[k]);
}

export const skillsToSortedArray = (skills) => {
	return sortByOrder(convert(skills))
}

export const skillStatuses = {
	updated: 'updated',
	toBeUpdated: 'toBeUpdated'
}
