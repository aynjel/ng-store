import { Component, computed, Input } from '@angular/core';

@Component({
  selector: 'app-avatar',
  imports: [],
  templateUrl: './avatar.html',
  styleUrl: './avatar.css',
})
export class Avatar {
  @Input({ required: true }) name!: string;
  @Input() size: number = 40;
  @Input() borderRadius: number = 4;
  @Input() shape: 'round' | 'square' = 'round';
  @Input() textColor: string = '#FFFFFF';

  initials = computed(() => this.getInitials(this.name));
  backgroundColor = computed(() => this.generateColor(this.name));
  isRound = computed(() => this.shape === 'round');

  // Calculate font size based on avatar size
  initialsFontSize = computed(() => this.size * 0.45);

  // --- Core Logic for Initials and Color ---

  /**
   * Extracts initials from a name (up to two words).
   * @param name The full name string.
   * @returns The initials (e.g., "JD").
   */
  private getInitials(name: string): string {
    if (!name) return '?';

    // Split the name by spaces, filter out empty strings
    const parts = name
      .trim()
      .split(/\s+/)
      .filter((p) => p.length > 0);

    // Case 1: No parts, return fallback
    if (parts.length === 0) return '?';

    // Case 2: One word (or just one part), use the first letter
    if (parts.length === 1) {
      return parts[0][0].toUpperCase();
    }

    // Case 3: Two or more words, use the first letter of the first two words
    // Example: "John Fitzgerald Kennedy" -> "JK"
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }

  /**
   * Generates a color string that is consistent (deterministic) for a given input string.
   * This is done using a simple string hashing algorithm to get a Hue value for HSL.
   * @param str The string (name) to generate a color from.
   * @returns A CSS HSL color string (e.g., "hsl(120, 70%, 50%)").
   */
  private generateColor(str: string): string {
    if (!str) return '#CCCCCC'; // Default gray color for empty string

    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      // Simple non-cryptographic hash
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }

    // Convert hash to a Hue (0-360) for the HSL color model
    // Using Math.abs ensures it's positive. Modulo 360 keeps it in the Hue range.
    const hue = Math.abs(hash) % 360;

    // Define Saturation and Lightness for good contrast and readability.
    // Keeping Saturation (70%) and Lightness (50%) consistent ensures the color is bright but not too dark or light.
    const saturation = 70;
    const lightness = 50;

    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  }
}
