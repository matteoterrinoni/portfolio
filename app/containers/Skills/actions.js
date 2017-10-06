/*
 *
 * Skills actions
 *
 */

import {
	LOAD_SKILLS,
	LOAD_SKILLS_SUCCESS,
	LOAD_SKILLS_ERROR,
	LOAD_SKILL,
	LOAD_SKILL_SUCCESS,
	LOAD_SKILL_ERROR,
	PATCH_SKILL,
	PATCH_SKILL_SUCCESS,
	PATCH_SKILL_ERROR,
	ADD_SKILL,
	ADD_SKILL_SUCCESS,
	ADD_SKILL_ERROR,
	EDIT_SKILL,
	EDIT_SKILL_SUCCESS,
	EDIT_SKILL_ERROR,
} from './constants'

export function loadSkills() {
	return {
		type: LOAD_SKILLS,
	};
}

export function skillsLoaded(skills) {
	return {
		type: LOAD_SKILLS_SUCCESS,
		skills
	};
}

export function skillsLoadingError(error) {
	return {
		type: LOAD_SKILLS_ERROR,
		error,
	};
}

export function loadSkill(id) {
	return {
		type: LOAD_SKILL,
		id
	};
}

export function skillLoaded(skill) {
	return {
		type: LOAD_SKILL_SUCCESS,
		skill
	};
}

export function skillLoadingError(error) {
	return {
		type: LOAD_SKILL_ERROR,
		error,
	};
}

export function patchSkill(skill) {
	return {
		type: PATCH_SKILL,
		skill
	};
}

export function skillPatched(skill) {
	return {
		type: PATCH_SKILL_SUCCESS,
		skill
	};
}

export function skillPatchingError(error) {
	return {
		type: PATCH_SKILL_ERROR,
		error
	};
}

export function addSkill(skill) {
	return {
		type: ADD_SKILL,
		skill
	};
}

export function addSkillSuccess(info) {
	return {
		type: ADD_SKILL_SUCCESS,
		info
	};
}

export function addSkillError(error) {
	return {
		type: ADD_SKILL_ERROR,
		error
	};
}

export function editSkill(skill) {
	return {
		type: EDIT_SKILL,
		skill
	};
}

export function skillEdited(skill) {
	return {
		type: EDIT_SKILL_SUCCESS,
		skill
	};
}

export function skillEditingError(error) {
	return {
		type: EDIT_SKILL_ERROR,
		error
	};
}