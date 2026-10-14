/**
 * Thai Web Speech API Narration Utility
 */

type SpeechCallback = () => void;

class ThaiSpeechService {
  private synth: SpeechSynthesis | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private onEndCallbacks: SpeechCallback[] = [];
  private onStartCallbacks: SpeechCallback[] = [];
  private isSpeaking = false;
  private isPaused = false;
  private currentText = '';
  private currentRate = 1.0;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
    }
  }

  public isSupported(): boolean {
    return this.synth !== null;
  }

  public getRate(): number {
    return this.currentRate;
  }

  public setRate(rate: number): void {
    this.currentRate = Math.min(Math.max(rate, 0.7), 1.5);
    if (this.isSpeaking && !this.isPaused) {
      // restart with new rate
      const text = this.currentText;
      this.stop();
      this.speak(text);
    }
  }

  public speak(
    text: string,
    onStart?: SpeechCallback,
    onEnd?: SpeechCallback
  ): void {
    if (!this.synth) return;

    this.stop();

    // Clean text for clearer TTS pronunciation in Thai
    const cleanedText = text
      .replace(/\s+/g, ' ')
      .replace(/[\(\)]/g, ' ')
      .replace(/([0-9]+)\s*บาท/g, '$1 บาท')
      .trim();

    this.currentText = text;
    this.currentUtterance = new SpeechSynthesisUtterance(cleanedText);
    this.currentUtterance.lang = 'th-TH';
    this.currentUtterance.rate = this.currentRate;
    this.currentUtterance.pitch = 1.0;

    // Try to find a Thai voice if available
    const voices = this.synth.getVoices();
    const thaiVoice = voices.find(v => v.lang.includes('th') || v.lang.includes('TH'));
    if (thaiVoice) {
      this.currentUtterance.voice = thaiVoice;
    }

    this.currentUtterance.onstart = () => {
      this.isSpeaking = true;
      this.isPaused = false;
      if (onStart) onStart();
      this.onStartCallbacks.forEach(cb => cb());
    };

    this.currentUtterance.onend = () => {
      this.isSpeaking = false;
      this.isPaused = false;
      if (onEnd) onEnd();
      this.onEndCallbacks.forEach(cb => cb());
    };

    this.currentUtterance.onerror = (e) => {
      console.warn('Speech synthesis notification:', e);
      this.isSpeaking = false;
      this.isPaused = false;
      if (onEnd) onEnd();
      this.onEndCallbacks.forEach(cb => cb());
    };

    this.synth.speak(this.currentUtterance);
  }

  public pause(): void {
    if (this.synth && this.isSpeaking && !this.isPaused) {
      this.synth.pause();
      this.isPaused = true;
    }
  }

  public resume(): void {
    if (this.synth && this.isPaused) {
      this.synth.resume();
      this.isPaused = false;
    }
  }

  public stop(): void {
    if (this.synth) {
      this.synth.cancel();
      this.isSpeaking = false;
      this.isPaused = false;
      this.currentUtterance = null;
    }
  }

  public getState() {
    return {
      isSpeaking: this.isSpeaking,
      isPaused: this.isPaused,
      currentText: this.currentText,
      rate: this.currentRate,
    };
  }
}

export const speechService = new ThaiSpeechService();
