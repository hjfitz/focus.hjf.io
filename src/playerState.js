class EventEmitter {
	constructor() {
		this.events = new Map()
	}

	emit(event, data) {
		if (!this.events.has(event)) {
			return
		}
		const callbacks = this.events.get(event)
		callbacks.forEach(cb => cb(data))
	}

	on(event, cb) {
		if (this.events.has(event)) {
			const callbacks = this.events.get(event)
			this.events.set(event, [...callbacks, cb])
		} else {
			this.events.set(event, [cb])
		}
	}
}

// todo: build basis event emitter
class PlayerState extends EventEmitter {
	constructor() {
		super()
		this.track = ""
		this.playing = false
	}

	setTrack(track) {
		this.track = track
		this.emit('playerTrackChanged')
	}

	setPlaying(playing) {
		this.playing = playing
		this.emit('playerStateChanged')
	}
}

class PlayerStateView {
	constructor(state, trackElem, isPlayingElem) {
		this.trackElem = trackElem
		this.isPlayingElem = isPlayingElem
		this.state = state
		state.on('playerTrackChanged', () => {
			this.setNowPlaying()
		})
		state.on('playerStateChanged', () => {
			this.setNowPlaying()
		})
	}

	setNowPlaying() {
		this.trackElem.textContent = this.state.track
		this.isPlayingElem.textContent = this.state.playing ? 'Playing' : 'Paused'
	}
}

// js singleton
let playerState;
// probably don't need to store this
let playerView;
export function getPlayerState() {
	if (!playerState) {
		const state = new PlayerState()
		const trackElem = document.getElementById('player-playing')
		const isPlayingElem = document.getElementById('player-state')
		const view = new PlayerStateView(state, trackElem, isPlayingElem)
		playerState = state
		playerView = view
	}
	return playerState
}
