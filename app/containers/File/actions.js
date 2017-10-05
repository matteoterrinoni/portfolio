/*
 *
 * File actions
 *
 */

import {
	FILE_UPLOAD,
	FILE_UPLOADING,
	FILE_UPLOAD_SUCCESS,
	FILE_UPLOAD_ERROR,
	FILE_SYNC,
	FILE_SYNC_SUCCESS,
	FILE_SYNC_ERROR
} from './constants';

export function fileUpload(info) {
	return {
		type: FILE_UPLOAD,
		info
	};
}

export function fileUploading(info) {
	return {
		type: FILE_UPLOADING,
		info
	};
}

export function fileUploadSuccess(info) {
	return {
		type: FILE_UPLOAD_SUCCESS,
		info
	};
}

export function fileUploadError(info) {
	return {
		type: FILE_UPLOAD_ERROR,
		info
	};
}

export function fileSync(name) {
	return {
		type: FILE_SYNC,
		name
	};
}

export function fileSyncSuccess(info) {
	return {
		type: FILE_SYNC_SUCCESS,
		info
	};
}

export function fileSyncError(name) {
	return {
		type: FILE_SYNC_ERROR,
		name
	};
}

