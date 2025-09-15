import RxPlayer from 'rx-player';
import playerConfig from './playerConfig.json';

export class OTTMediaPlayer {
  private player: RxPlayer;
  private videoElement: HTMLVideoElement;

  constructor(videoElement: HTMLVideoElement) {
    this.videoElement = videoElement;
    this.player = new RxPlayer({
      videoElement: this.videoElement,
      ...playerConfig.playerConfig
    });

    this.setupEventListeners();
  }

  private setupEventListeners() {
    this.player.addEventListener('playerStateChange', (state) => {
      console.log('Player state:', state);
    });

    this.player.addEventListener('error', (error) => {
      console.error('Player error:', error);
    });

    this.player.addEventListener('warning', (warning) => {
      console.warn('Player warning:', warning);
    });
  }

  loadContent() {
    this.player.loadVideo({
      url: playerConfig.manifestUrl,
      transport: 'dash'
    });
  }

  play() {
    this.player.play();
  }

  pause() {
    this.player.pause();
  }

  stop() {
    this.player.stop();
  }

  seek(position: number) {
    this.player.seekTo(position);
  }

  setVolume(volume: number) {
    this.player.setVolume(volume);
  }

  getCurrentTime(): number {
    return (this.player as any).getPosition();
  }

  getDuration(): number {
    return (this.player as any).getMediaDuration();
  }

  getPlayerState() {
    return this.player.getPlayerState();
  }

  dispose() {
    this.player.dispose();
  }
}
