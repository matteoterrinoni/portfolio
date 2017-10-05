import { pickBy, propEq, sortWith, prop, descend } from 'ramda';

export const properties = {
	date: {
		id: 'date',
		label: 'Date',
		visible: true
	},
	for: {
		id: 'for',
		label: 'For',
		visible: true
	},
	key: {
		id: 'key',
		label: 'Key',
		visible: false
	},
	position: {
		id: 'position',
		label: 'Position',
		visible: true
	},
	title: {
		id: 'title',
		label: 'Title',
		visible: true
	},
	what: {
		id: 'what',
		label: 'What',
		visible: true
	},
	where: {
		id: 'where',
		label: 'Where',
		visible: true
	},
	html: {
		id: 'html',
		label: 'Html',
		visible: true,
		type: 'code'
	},
	link: {
		id: 'link',
		label: 'Link',
		visible: true
	},
	technologies: {
		id: 'technologies',
		label: 'Technologies',
		visible: true
	},
	order: {
		id:'order',
		label: 'Order',
		visible: true
	},
	images: {
		id:'images',
		label:'Images',
		visible: true,
		type: 'files'
	}
}

export const shallowProperties = {
	for: properties.for,
	what: properties.what,
	technologies: properties.technologies
}

export const articleProperties = {
	position: properties.position,
	date: properties.date,
	for: properties.for,
	technologies: properties.technologies
}

const filterVisible = (props) => () => {
	return pickBy(propEq('visible', true), props)
}

export const given = (props)=>{
	return {
		filterVisible: filterVisible(props),
		result: props
	}
}

export const WorkPropsApi = {
	given,
	properties,
	shallowProperties
}

export const visibleProperties = given(properties).filterVisible();

export const sortByOrder = sortWith([descend(prop(properties.order.id))]);

const convert = (works) => {
	return Object.keys(works).map(k=>works[k]);
}

export const worksToSortedArray = (works) => {
	return sortByOrder(convert(works))
}

export const workStatuses = {
	updated: 'updated',
	toBeUpdated: 'toBeUpdated'
}
