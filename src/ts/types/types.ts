/* eslint-disable no-tabs */
export type MusicTrack = {
	id: string,
	name: string,
	description: string,
	src: URL,
	isLike: boolean,
	genres: string[]
}

export type MyRequest<T> = {
	status: string,
	message : string,
	data: T
}
