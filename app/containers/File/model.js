export const methodTypes = {
	upload : 'upload',
	listView : 'list-view',
	view: 'view'
}

export const nameToKey = (name) => {
	return name.replace(/ /g, '_');
}

export const fileKey = (file) => {
	return nameToKey(file.name);
}